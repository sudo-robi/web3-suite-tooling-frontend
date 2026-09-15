# Web3 Suite Tooling Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.x-61DAFB.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF.svg)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4.svg)](https://tailwindcss.com)
[![Stellar](https://img.shields.io/badge/Stellar-Soroban-6B3FA0.svg)](https://stellar.org)

React-based frontend dashboard for the **Web3 Suite Tooling** platform. Provides interactive interfaces for oracle price feeds, on-chain analytics, and governance participation on the Stellar/Soroban network.

---

## Screenshots

<!-- Add screenshots here -->
```
┌─────────────────────────────────────────────────────────────────┐
│  [Header: Dashboard | Oracle | Analytics | Governance]  [Wallet]│
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                     │
│  │  Active  │  │  Price   │  │ Network  │                     │
│  │  Feeds   │  │ Updates  │  │ Testnet  │                     │
│  └──────────┘  └──────────┘  └──────────┘                     │
│                                                                 │
│  ┌─────────────────────┐  ┌─────────────────────┐             │
│  │   Latest Prices     │  │   Quick Actions     │             │
│  │                     │  │                     │             │
│  │  XLM/USD  $0.1250  │  │  → Oracle Explorer  │             │
│  │  AQUA/USD $0.0045  │  │  → Analytics Dash   │             │
│  │  ...               │  │  → Governance Portal│             │
│  └─────────────────────┘  └─────────────────────┘             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Features

### Dashboard
- Overview of all tooling services at a glance
- Real-time price feed summaries
- Quick navigation to service-specific pages
- Wallet connection status

### Oracle Explorer
- Browse all registered price feeds
- View latest prices with round tracking
- Manual feed refresh capability
- Feed statistics (count, update interval, decimals)

### Analytics Dashboard
- Track on-chain contract metrics
- View registered contracts and their status
- Statistical summaries across metric types
- Foundation for future charting and visualization

### Governance Portal
- Browse active and past proposals
- Vote breakdown visualization (For/Against/Abstain)
- Proposal status indicators (Active, Closed, Executed, Canceled)
- Create new proposals (wallet required)

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework |
| **TypeScript 5** | Type safety |
| **Vite 5** | Build tool & dev server |
| **Tailwind CSS 3** | Utility-first styling |
| **React Router 6** | Client-side routing |
| **@stellar/stellar-sdk** | Stellar/Soroban wallet integration |
| **Lucide React** | Icon library |

---

## Project Structure

```
web3-suite-tooling-frontend/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
├── LICENSE
├── README.md
└── src/
    ├── main.tsx              # App entry point
    ├── App.tsx               # Root component with routing
    ├── index.css             # Tailwind imports + global styles
    ├── config/
    │   └── index.ts          # Environment configuration
    ├── components/
    │   ├── Header.tsx        # Navigation header with wallet
    │   ├── Card.tsx          # Reusable card & stat components
    │   └── LoadingSpinner.tsx # Loading indicator
    ├── hooks/
    │   ├── useWallet.ts      # Wallet connection hook
    │   └── useOracle.ts      # Oracle data hook
    ├── pages/
    │   ├── Dashboard.tsx     # Main dashboard overview
    │   ├── Oracle.tsx        # Oracle explorer page
    │   ├── Analytics.tsx     # Analytics dashboard page
    │   └── Governance.tsx    # Governance portal page
    ├── services/
    │   ├── api.ts            # Backend API client
    │   └── stellar.ts        # Stellar SDK utilities
    ├── types/
    │   └── index.ts          # TypeScript type definitions
    └── assets/
        └── (static assets)
```

---

## Setup

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- Running backend API (see [backend repo](../web3-suite-tooling-backend))

### Installation

```bash
# Clone the repository
git clone https://github.com/sudo-robi/web3-suite-tooling-frontend.git
cd web3-suite-tooling-frontend

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
# Backend API URL (proxied in dev via Vite)
VITE_API_URL=/api

# Stellar network
VITE_STELLAR_NETWORK=testnet
VITE_STELLAR_RPC_URL=https://soroban-testnet.stellar.org
```

### Development

```bash
# Start development server
npm run dev

# Run type checking
npm run typecheck

# Run linter
npm run lint
```

The dev server runs at `http://localhost:5173` and proxies API requests to the backend at `http://localhost:3001`.

### Build & Preview

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Wallet Integration

The frontend integrates with [Freighter](https://freighter.app/) for Stellar wallet connectivity:

1. Install the Freighter browser extension
2. Click "Connect Wallet" in the header
3. Approve the connection in Freighter
4. Your address will be displayed in the navigation bar

### Supported Operations

- View wallet address and balance
- Sign transactions for governance voting
- Submit oracle price updates (admin)

---

## Routing

| Path | Page | Description |
|------|------|-------------|
| `/` | Dashboard | Overview of all services |
| `/oracle` | Oracle Explorer | Price feed management |
| `/analytics` | Analytics Dashboard | Contract metric tracking |
| `/governance` | Governance Portal | Proposal voting |

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/my-feature`)
3. Commit changes (`git commit -m 'feat: add my feature'`)
4. Push to branch (`git push origin feat/my-feature`)
5. Open a Pull Request

### Development Guidelines

- Use TypeScript strict mode
- Follow React best practices (hooks, functional components)
- Run `npm run typecheck` before committing
- Run `npm run lint:fix` to auto-fix linting issues
- Use Tailwind CSS for all styling (no CSS-in-JS)
- Components go in `src/components/`
- Pages go in `src/pages/`
- Custom hooks go in `src/hooks/`

---

## License

[MIT](LICENSE)
