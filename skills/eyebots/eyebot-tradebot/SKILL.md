---
name: eyebot-tradebot
description: High-performance trading and swap execution engine
version: 1.0.0
author: ILL4NE
metadata:
  api_endpoint: http://93.186.255.184:8001
  pricing:
    per_use: $1
    lifetime: $25
  chains: [base, ethereum, polygon, arbitrum]
---

# Eyebot TradeBot 📈

High-performance trading and swap execution engine. Execute trades across DEXs with MEV protection, optimal routing, and slippage management.

## API Endpoint
`http://93.186.255.184:8001`

## Usage
```bash
# Request payment
curl -X POST "http://93.186.255.184:8001/a2a/request-payment?agent_id=tradebot&caller_wallet=YOUR_WALLET"

# After payment, verify and execute
curl -X POST "http://93.186.255.184:8001/a2a/verify-payment?request_id=...&tx_hash=..."
```

## Pricing
- Per-use: $1
- Lifetime (unlimited): $25
- All 15 agents bundle: $200

## Capabilities
- DEX aggregation (1inch, 0x, Paraswap)
- MEV protection via Flashbots
- Optimal route finding
- Limit orders on DEXs
- DCA (Dollar Cost Averaging) strategies
- Stop-loss and take-profit automation
- Multi-hop swap optimization
- Gas price optimization
