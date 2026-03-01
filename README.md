# Transaction Risk Engine

A REST API service that evaluates transaction risk based on multiple factors including amount, account age, country mismatch, and transaction velocity.

## Features

- **Risk Calculation**: Evaluates transactions using a weighted scoring system
- **Configurable Thresholds**: Adjust fraud detection sensitivity via environment variables
- **Real-time Analysis**: Provides instant risk assessment for checkout transactions
- **Admin Preview**: Test risk calculations without blocking transactions

## API Endpoints

### POST /checkout/risk

Evaluate a transaction for risk and return approval status.

**Request Body:**

```
json
{
  "amount": 1000,
  "accountAgeDays": 365,
  "countryMismatch": false,
  "transactionsPerHour": 1
}
```

**Response:**

```
json
{
  "status": "allowed",
  "totalScore": 5,
  "breakdown": {
    "amountRisk": 5,
    "ageRisk": 0,
    "countryRisk": 0,
    "velocityRisk": 0
  }
}
```

### POST /admin/risk-preview

Preview risk calculation without blocking (for testing purposes).

**Request Body:** Same as `/checkout/risk`

**Response:** Returns the same structure as `/checkout/risk` but without the `status` field.

## Configuration

Create a `.env` file in the root directory with the following variables:

```
env
PORT=5000
FRAUD_THRESHOLD=60
```

### Configuration Options

| Variable        | Default | Description                                                |
| --------------- | ------- | ---------------------------------------------------------- |
| PORT            | 5000    | Server port number                                         |
| FRAUD_THRESHOLD | 60      | Risk score threshold (transactions above this are blocked) |

### Risk Weights

The following weights can be adjusted in `src/config/config.js`:

- **amount**: Weight for transaction amount risk (default: 1.0)
- **age**: Weight for account age risk (default: 1.0)
- **country**: Weight for country mismatch risk (default: 1.0)
- **velocity**: Weight for transaction velocity risk (default: 1.0)

## Risk Rules

### Amount Risk

- > $20,000: 30 points
- $5,000 - $20,000: 15 points
- < $5,000: 5 points

### Account Age Risk

- < 30 days: 25 points
- 30-180 days: 10 points
- > 180 days: 0 points

### Country Risk

- Country mismatch: 20 points

### Velocity Risk

- > 5 transactions/hour: 25 points
- 3-5 transactions/hour: 10 points
- < 3 transactions/hour: 0 points

## Installation

```
bash
npm install
```

## Running the Server

```
bash
npm start
```

The server will start on port 5000 (or the port specified in your .env file).

## Running Tests

```
bash
npm test
```

## Project Structure

```
transaction-risk-engine/
├── src/
│   ├── app.js              # Express app setup
│   ├── config/
│   │   └── config.js      # Configuration settings
│   ├── routes/
│   │   ├── admin.js       # Admin endpoints
│   │   └── checkout.js    # Checkout risk endpoint
│   └── services/
│       └── riskEngine.js  # Risk calculation logic
├── tests/
│   └── riskEngine.test.js # Unit tests
├── package.json
└── README.md
```

## Trade-offs & Future Improvements

### Current Implementation

- Simple weighted scoring system for risk calculation
- Basic threshold-based blocking mechanism
- In-memory risk evaluation (no persistence)

### Potential Improvements

1. **Machine Learning Model**: Replace rules-based system with ML for better fraud detection
2. **Database Integration**: Store transaction history for pattern analysis
3. **Real-time Updates**: WebSocket support for live risk score updates
4. **Rate Limiting**: Add API rate limiting to prevent abuse
5. **Logging & Monitoring**: Add structured logging and metrics
6. **Authentication**: Add JWT/API key authentication for endpoints
7. **Multiple Thresholds**: Support different thresholds per merchant or transaction type

## Improvement
Refactored risk scoring logic for better clarity.