---
name: rubicon
description: >
  Geopolitical sovereignty analyzer — an homage to Secretary Marco Rubio's vision for Western civilization.
  Scans news, X/Twitter, and web sources for sovereignty threats, deindustrialization signals, and
  transatlantic alliance shifts. Produces sovereignty scores, AI-synthesized briefings, Rubio quotes,
  memes, and tweetable summaries. Use when asked to: analyze Western sovereignty, scan geopolitical
  news, assess alliance strength, monitor deindustrialization risks, run a Rubicon scan, or trigger
  sovereignty analysis. Triggers on: "Rubicon scan", "Rubicon", "sovereignty scan", "analyze sovereignty",
  "geopolitical scan", "alliance check", "deep Rubicon", "Rubicon scan on [topic]", "Rubicon meme",
  "Rubicon tweet", "Rubicon quote", or "Rubicon alert".

---

# Rubicon

*An epic homage to Secretary Marco Rubio's fiery Munich masterclass — clawing back our heritage, borders, and industrial might from the globalist grip. AI-powered scans of news for red-pill insights, sovereignty scores that hit hard, Rubio truth bombs. No more delusions — time to reclaim the West like a boss.*

No setup required. Just say **"Rubicon scan"** and it runs. Zero config. No excuses.

## Requirements
- `web_search` tool (any provider: Perplexity, Brave, etc.)
- `web_fetch` for Deep Scans only
- Image generation (optional, for memes — any image gen skill or tool works; text fallback if unavailable)

---

## 📡 Quick Scan (trigger: "Rubicon scan")

1. Run 4 parallel `web_search` calls:
   - `"Western sovereignty geopolitical developments [current month year]"`
   - `"NATO alliance strength recent news [year]"`
   - `"reshoring manufacturing Western nations [year]"`
   - `"Marco Rubio foreign policy [year]"`

2. Read references/scoring.md. Score each dimension 0-25:
   - **Alliance Strength** — defense pacts, joint ops, burden-sharing
   - **Industrial Sovereignty** — reshoring, supply chains, semiconductor investment
   - **Border & Migration Control** — policy effectiveness, stability
   - **Cultural & Institutional Resilience** — civic institutions, civilizational confidence

3. Sum → **Sovereignty Score** (0-100):  🟢 80-100 Strong | 🟡 50-79 Watch | 🔴 0-49 Alert

4. Read references/quotes.md. Pick a contextually relevant Rubio quote. If no quote fits well or variety is needed, `web_search` for a fresh Rubio quote relevant to the findings.

5. Reply with this format:

```
🏛️ RUBICON INTELLIGENCE BRIEFING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 [Date] | Sovereignty Score: [N]/100 [emoji]

## Key Findings
- [Finding 1 — one line with source]
- [Finding 2]
- [Finding 3]
- [Finding 4]
- [Finding 5]

## Scoring Breakdown
| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Alliance Strength | N/25 | ... |
| Industrial Sovereignty | N/25 | ... |
| Border & Migration | N/25 | ... |
| Cultural & Institutional | N/25 | ... |
| **Total** | **N/100** | **[emoji] [STATUS]** |

## Threat Assessment
[2-3 bullets on sovereignty risks]

## Opportunity Signals
[2-3 bullets on positive developments]

## Rubio's Word
> "[Quote]"
> — Secretary Marco Rubio
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## 🔬 Deep Scan (trigger: "deep Rubicon scan")

Same as Quick Scan, plus:
- Read references/queries.md. Use ALL queries, not just the 4 core ones.
- `web_fetch` top 3 results for deeper analysis.
- Add a **Sources** list at bottom with full URLs.

## 🎯 Topic Scan (trigger: "Rubicon scan on [topic]")

Replace default queries with topic-focused variants. Keep same scoring and output format.
Example: "Rubicon scan on semiconductor supply chains" → queries about chip sovereignty, CHIPS Act, fab construction, etc.

---

## 🎨 Sovereignty Meme (trigger: "Rubicon meme")

Generate a meme based on the latest scan or current events:

1. If no recent scan context, run a Quick Scan first.
2. Pick the most dramatic or ironic finding.
3. Generate the meme:
   - Try to generate an image with a prompt like: `"Political meme, bold Impact font. Top: [setup]. Bottom: [punchline]. Background: [relevant imagery — eagles, factories, flags, NATO logos]. Style: classic internet meme, high contrast"`
   - If image generation is not available, output as text with setup/punchline and a suggested image description.
4. Tone: sharp, witty, pro-Western. Think r/geopolitics meets r/MemeEconomy. Can be edgy but not offensive.

Example memes:
- Top: "EU PROPOSES SOVEREIGNTY ACT" / Bottom: "STILL CAN'T AGREE ON PIZZA TOPPINGS" 🍕
- Top: "93% OF MANUFACTURERS RESHORING" / Bottom: "CHINA: AM I A JOKE TO YOU?" 🏭
- Top: "RUBIO AT MUNICH: 'REBUILD OUR CAPACITY'" / Bottom: "EUROPE: 'WE'LL START MONDAY'" 🇪🇺

## 🐦 Tweet Draft (trigger: "Rubicon tweet")

Compose a tweetable summary (≤280 chars) from the latest scan:

1. If no recent scan context, run a Quick Scan first.
2. Write a punchy tweet with:
   - Sovereignty score and emoji indicator
   - One key finding (the spiciest one)
   - Rubio quote snippet (short)
   - Hashtags: #Rubicon #WesternSovereignty + 1-2 topical tags
3. Output the tweet text ready to copy-paste.

Example:
```
🏛️ RUBICON SCORE: 58/100 🟡

93% of US manufacturers reshoring — strongest sovereignty signal in years.

Meanwhile NATO allies arguing over who pays for lunch.

"Rebuild our capacity to defend our people." — Rubio

#Rubicon #WesternSovereignty #Reshoring
```

## 💬 Rubio Quote (trigger: "Rubicon quote" or "Rubio quote")

Quick-fire — no scan needed:
1. Read references/quotes.md.
2. Pick a quote matching the conversation context (or random if no context).
3. Reply with just the formatted quote:
```
🏛️ > "[Quote]"
   > — Secretary Marco Rubio
```

## 🚨 Rubicon Alert (trigger: "Rubicon alert" or "is sovereignty under threat?")

Fast threat check — lightweight version of Quick Scan:
1. Single `web_search`: `"Western sovereignty threat crisis [current month year]"`
2. Quick read of results — is there an active crisis?
3. Reply with a one-line verdict:

```
🚨 RUBICON ALERT: [🟢 ALL CLEAR / 🟡 WATCH / 🔴 THREAT DETECTED]
[One sentence summary]
```

---

## Error Handling
- If `web_search` fails: note "source unavailable", score that dimension conservatively (10/25).
- If score is exactly 50: classify as 🟡 Watch.
- Always produce output even with partial data — state confidence level.
- If image generation is unavailable for memes: fall back to text-only meme format.

## References
- **references/scoring.md** — 4-dimension scoring criteria and weighting
- **references/queries.md** — Query templates for daily and deep scans
- **references/quotes.md** — Curated Rubio quotes by theme (sovereignty, alliances, security, civilization)
