#!/usr/bin/env node
const fs = require('fs');
const { program } = require('commander');
const path = require('path');
const crypto = require('crypto');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env'), quiet: true }); // Load workspace .env

// Import shared client (Refactored Cycle #51396)
const { getToken, fetchWithRetry } = require('../common/feishu-client.js');

const IMAGE_KEY_CACHE_FILE = path.resolve(__dirname, '../../memory/feishu_image_keys.json');

async function uploadImage(token, filePath) {
    let fileBuffer;
    let fileHash;
    try {
        fileBuffer = fs.readFileSync(filePath);
        fileHash = crypto.createHash('md5').update(fileBuffer).digest('hex');
    } catch (e) {
        throw new Error(`Error reading image file: ${e.message}`);
    }

    let cache = {};
    if (fs.existsSync(IMAGE_KEY_CACHE_FILE)) {
        try { cache = JSON.parse(fs.readFileSync(IMAGE_KEY_CACHE_FILE, 'utf8')); } catch (e) {}
    }
    
    if (cache[fileHash]) {
        console.log(`Using cached image key (Hash: ${fileHash.substring(0,8)})`);
        return cache[fileHash];
    }

    console.log(`Uploading image (Hash: ${fileHash.substring(0,8)})...`);
    
    const formData = new FormData();
    formData.append('image_type', 'message');
    const blob = new Blob([fileBuffer]); 
    formData.append('image', blob, path.basename(filePath));

    try {
        const res = await fetchWithRetry('https://open.feishu.cn/open-apis/im/v1/images', {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: formData
        });
        const data = await res.json();
        
        if (data.code !== 0) throw new Error(JSON.stringify(data));
        
        const imageKey = data.data.image_key;
        cache[fileHash] = imageKey;
        try { 
            const cacheDir = path.dirname(IMAGE_KEY_CACHE_FILE);
            if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });
            fs.writeFileSync(IMAGE_KEY_CACHE_FILE, JSON.stringify(cache, null, 2)); 
        } catch(e) {}
        
        return imageKey;
    } catch (e) {
        throw new Error(`Image upload failed: ${e.message}`);
    }
}

function buildCardContent(elements, title, color) {
    const card = {
        config: {
            wide_screen_mode: true
        },
        elements: elements
    };

    if (title) {
        card.header = {
            title: { tag: 'plain_text', content: title },
            template: color || 'blue'
        };
    }
    return card;
}

async function sendCard(options) {
    try {
        const token = await getToken();
        const elements = [];
        
        if (options.imagePath) {
            try {
                const imageKey = await uploadImage(token, options.imagePath);
                elements.push({
                    tag: 'img',
                    img_key: imageKey,
                    alt: { tag: 'plain_text', content: options.imageAlt || 'Image' },
                    mode: 'fit_horizontal'
                });
            } catch (imgError) {
                console.warn(`[Feishu-Card] Image upload failed: ${imgError.message}. Sending text only.`);
                // Continue without image
            }
        }

        let contentText = '';
        if (options.textFile) {
            try { contentText = fs.readFileSync(options.textFile, 'utf8'); } catch (e) {
                throw new Error(`Failed to read file: ${options.textFile}`);
            }
        } else if (options.text) {
            contentText = options.text;
        }

        if (contentText) {
            // Use 'markdown' tag directly for better rendering support
            const markdownElement = {
                tag: 'markdown',
                content: contentText
            };
            
            if (options.textAlign) {
                markdownElement.text_align = options.textAlign;
            }

            elements.push(markdownElement);
        }

        if (options.buttonText && options.buttonUrl) {
            elements.push({
                tag: 'action',
                actions: [{
                    tag: 'button',
                    text: { tag: 'plain_text', content: options.buttonText },
                    type: 'primary',
                    multi_url: { url: options.buttonUrl, pc_url: '', android_url: '', ios_url: '' }
                }]
            });
        }

        const cardObj = buildCardContent(elements, options.title, options.color);
        
        let receiveIdType = 'open_id';
        if (options.target.startsWith('oc_')) receiveIdType = 'chat_id';
        else if (options.target.startsWith('ou_')) receiveIdType = 'open_id';
        else if (options.target.includes('@')) receiveIdType = 'email';

        const messageBody = {
            receive_id: options.target,
            msg_type: 'interactive',
            content: JSON.stringify(cardObj)
        };

        console.log(`Sending card to ${options.target} (Elements: ${elements.length})`);

        if (options.dryRun) {
            console.log('DRY RUN MODE. Payload:');
            console.log(JSON.stringify(messageBody, null, 2));
            return;
        }

        const res = await fetchWithRetry(
            `https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=${receiveIdType}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageBody)
            }
        );
        const data = await res.json();
        
        if (data.code !== 0) {
                console.warn(`[Feishu-Card] Card send failed (Code: ${data.code}, Msg: ${data.msg}). Attempting fallback to plain text...`);
                return await sendPlainTextFallback(token, receiveIdType, options.target, contentText, options.title);
        }
        
        console.log('Success:', JSON.stringify(data.data, null, 2));

    } catch (e) {
        console.error('Error during Card Send:', e.message);
        console.log('[Feishu-Card] Attempting fallback to plain text...');
        // Need token for fallback, try to get it again or assume it failed
        try {
            const token = await getToken();
             let contentText = options.text || '';
             if (options.textFile) try { contentText = fs.readFileSync(options.textFile, 'utf8'); } catch(e){}
            let receiveIdType = 'open_id';
            if (options.target.startsWith('oc_')) receiveIdType = 'chat_id';
            else if (options.target.startsWith('ou_')) receiveIdType = 'open_id';
            else if (options.target.includes('@')) receiveIdType = 'email';
            
            return await sendPlainTextFallback(token, receiveIdType, options.target, contentText, options.title);
        } catch (fallbackError) {
             console.error('Fallback failed dramatically:', fallbackError.message);
             process.exit(1);
        }
    }
}

async function sendPlainTextFallback(token, receiveIdType, receiveId, text, title) {
    if (!text) {
        console.error('Fallback failed: No text content available.');
        process.exit(1);
    }

    let finalContent = text;
    if (title) finalContent = `【${title}】\n\n${text}`;

    const messageBody = {
        receive_id: receiveId,
        msg_type: 'text',
        content: JSON.stringify({ text: finalContent })
    };

    console.log(`Sending Fallback Text to ${receiveId}...`);

    try {
        const res = await fetchWithRetry(
            `https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=${receiveIdType}`,
            {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(messageBody)
            }
        );
        const data = await res.json();
        if (data.code !== 0) {
             console.error('Fallback Text Send Failed:', JSON.stringify(data, null, 2));
             process.exit(1);
        }
        console.log('Fallback Success:', JSON.stringify(data.data, null, 2));
    } catch (e) {
        console.error('Fallback Network Error:', e.message);
        process.exit(1);
    }
}



async function resolveContent(options) {
    let contentText = '';

    // 1. Priority: --text-file
    if (options.textFile) {
        try { 
            contentText = fs.readFileSync(options.textFile, 'utf8'); 
        } catch (e) {
            throw new Error(`Failed to read file: ${options.textFile}`);
        }
    } 
    // 2. Fallback: --text
    else if (options.text) {
        // Smart Check: Is it a file path?
        const isPotentialPath = options.text.length < 255 && !options.text.includes('\n') && !/[<>:"|?*]/.test(options.text);
        
        if (isPotentialPath && fs.existsSync(options.text)) {
            console.log(`[Smart Input] Treating --text argument as file path: ${options.text}`);
            try {
                contentText = fs.readFileSync(options.text, 'utf8');
            } catch (e) {
                 contentText = options.text;
            }
        } else {
            contentText = options.text;
            // Hardening: BAN complex content via --text (User Request: 2026-02-03)
            if (contentText.length > 200 || /[\n\`\$\"\\\*]/.test(contentText)) {
                console.error('\x1b[31m%s\x1b[0m', '⛔ ERROR: Complex content detected in --text argument.');
                console.error('\x1b[31m%s\x1b[0m', '👉 POLICY ENFORCEMENT: You MUST use --text-file <path> for markdown or long messages.');
                process.exit(1);
            }
            // Warning for edge cases
            if (contentText.length > 50) {
                console.warn('\x1b[33m%s\x1b[0m', '⚠️ WARNING: You are passing text via --text flag. Use --text-file for better safety.');
            }
        }
        if (contentText) contentText = contentText.replace(/\\n/g, '\n');
    } 
    // 3. Fallback: STDIN
    else {
        try {
            const { stdin } = process;
            if (!stdin.isTTY) {
                stdin.setEncoding('utf8');
                for await (const chunk of stdin) contentText += chunk;
            }
        } catch (e) {}
    }
    
    return contentText;
}


// Export for programmatic use
module.exports = { sendCard };

if (require.main === module) {
    program
      .requiredOption('-t, --target <open_id>', 'Target User Open ID')
      .option('-x, --text <markdown>', 'Card body text (Markdown)')
      .option('-f, --text-file <path>', 'Read card body text from file')
      .option('--title <text>', 'Card header title')
      .option('--color <color>', 'Header color (blue/red/orange/purple/etc)', 'blue')
      .option('--button-text <text>', 'Bottom button text')
      .option('--button-url <url>', 'Bottom button URL')
      .option('--text-size <size>', 'Text size')
      .option('--text-align <align>', 'Text alignment')
      .option('--image-path <path>', 'Path to local image to embed')
      .option('--image-alt <text>', 'Alt text for image')
      .option('--dry-run', 'Print JSON body without sending');

    program.parse(process.argv);
    const options = program.opts();

    (async () => {
        try {
            const textContent = await resolveContent(options);
            
            if (textContent) {
                options.text = textContent; // Normalize to options.text for sendCard
                options.textFile = null;    // Clear file flag to prevent double-read
            }

            if (!options.text && !options.imagePath) {
                console.error('Error: No content provided. Use --text, --text-file, --image-path or pipe STDIN.');
                process.exit(1);
            }

            sendCard(options);
        } catch (e) {
            console.error(e.message);
            process.exit(1);
        }
    })();
}
