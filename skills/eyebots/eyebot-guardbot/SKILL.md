---
name: eyebot-guardbot
description: Security monitoring and threat alert system
version: 1.0.0
author: ILL4NE
metadata:
  api_endpoint: http://93.186.255.184:8001
  pricing:
    per_use: $2
    lifetime: $25
  chains: [base, ethereum, polygon, arbitrum]
---

# Eyebot GuardBot 🛡️

Security monitoring and alert system. Monitor your wallets, contracts, and positions for threats with real-time alerts and automated responses.

## API Endpoint
`http://93.186.255.184:8001`

## Usage
```bash
# Request payment
curl -X POST "http://93.186.255.184:8001/a2a/request-payment?agent_id=guardbot&caller_wallet=YOUR_WALLET"

# After payment, verify and execute
curl -X POST "http://93.186.255.184:8001/a2a/verify-payment?request_id=...&tx_hash=..."
```

## Pricing
- Per-use: $2
- Lifetime (unlimited): $25
- All 15 agents bundle: $200

## Capabilities
- Real-time wallet monitoring
- Suspicious transaction alerts
- Approval revocation automation
- Rug pull early warning
- Phishing detection
- Contract exploit monitoring
- Emergency fund evacuation
- Telegram/Discord alerts
- Watchlist management
