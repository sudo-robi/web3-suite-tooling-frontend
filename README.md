# Web3 Suite Tooling — Frontend Dashboard

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.x-61DAFB.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF.svg)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4.svg)](https://tailwindcss.com)
[![Stellar](https://img.shields.io/badge/Stellar-Soroban-6B3FA0.svg)](https://stellar.org)

> React-based frontend dashboard for oracle price feeds, on-chain analytics, and governance participation on the Stellar/Soroban network.

---

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Wallet Integration](#wallet-integration)
- [Routing](#routing)
- [Contributing](#contributing)
- [License](#license)

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

## Screenshots

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

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework with hooks and functional components |
| **TypeScript 5** | Type safety and better developer experience |
| **Vite 5** | Lightning-fast build tool and dev server |
| **Tailwind CSS 3** | Utility-first styling with custom Stellar theme |
| **React Router 6** | Client-side routing with nested routes |
| **@stellar/stellar-sdk** | Stellar/Soroban wallet integration (Freighter) |
| **Lucide React** | Beautiful, consistent icon library |

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    Browser (React SPA)                       │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │   Pages    │  │ Components │  │   Hooks    │           │
│  │            │  │            │  │            │           │
│  │ Dashboard  │  │ Header     │  │ useWallet  │           │
│  │ Oracle     │  │ Card       │  │ useOracle  │           │
│  │ Analytics  │  │ StatCard   │  │            │           │
│  │ Governance │  │ Spinner    │  │            │           │
│  └─────┬──────┘  └────────────┘  └─────┬──────┘           │
│        │                                │                   │
│  ┌─────┴────────────────────────────────┴──────┐           │
│  │              Services Layer                   │           │
│  │  ┌──────────┐  ┌──────────┐                 │           │
│  │  │  API     │  │ Stellar  │                 │           │
│  │  │ Client   │  │ Service  │                 │           │
│  │  └────┬─────┘  └────┬─────┘                 │           │
│  └───────┼──────────────┼──────────────────────┘           │
└──────────┼──────────────┼───────────────────────────────────┘
           │              │
           ▼              ▼
    ┌──────────────┐  ┌──────────────┐
    │  Backend API │  │  Freighter   │
    │  (Express)   │  │  Wallet Ext  │
    └──────┬───────┘  └──────────────┘
           │
           ▼
    ┌──────────────┐
    │   Stellar    │
    │   Network    │
    └──────────────┘
```

---

## Project Structure

```
frontend/
├── index.html                  # HTML entry point
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript config
├── tsconfig.node.json          # Node TypeScript config (Vite)
├── vite.config.ts              # Vite build config + API proxy
├── tailwind.config.js          # Tailwind CSS with Stellar theme
├── postcss.config.js           # PostCSS config
├── .gitignore
├── LICENSE
├── README.md
└── src/
    ├── main.tsx                # App entry point (ReactDOM.createRoot)
    ├── App.tsx                 # Root component with React Router
    ├── index.css               # Tailwind imports + global styles
    ├── config/
    │   └── index.ts            # Environment configuration
    ├── components/
    │   ├── Header.tsx          # Navigation header with wallet connect
    │   ├── Card.tsx            # Reusable Card component
    │   ├── StatCard.tsx        # Stats display card component
    │   └── LoadingSpinner.tsx  # Loading indicator
    ├── hooks/
    │   ├── useWallet.ts        # Freighter wallet connection hook
    │   └── useOracle.ts        # Oracle data fetching hook
    ├── pages/
    │   ├── Dashboard.tsx       # Main dashboard overview
    │   ├── Oracle.tsx          # Oracle explorer with price table
    │   ├── Analytics.tsx       # Analytics dashboard with metrics
    │   └── Governance.tsx      # Governance portal with proposals
    ├── services/
    │   ├── api.ts              # Backend REST API client
    │   └── stellar.ts          # Stellar SDK utilities + wallet
    └── types/
        └── index.ts            # TypeScript type definitions
```

---

## Setup

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- Running backend API (see [backend](../backend/))
- Freighter browser extension (for wallet features)

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

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `/api` | Backend API base URL |
| `VITE_STELLAR_NETWORK` | `testnet` | Stellar network to connect to |
| `VITE_STELLAR_RPC_URL` | `https://soroban-testnet.stellar.org` | Soroban RPC endpoint |

---

## Development

```bash
# Start development server (http://localhost:5173)
npm run dev

# Run type checking
npm run typecheck

# Run linter
npm run lint

# Auto-fix linting issues
npm run lint:fix
```

The dev server proxies `/api` requests to the backend at `http://localhost:3001`.

---

## Build & Preview

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## Wallet Integration

The frontend integrates with [Freighter](https://freighter.app/) for Stellar wallet connectivity:

### Setup

1. Install the [Freighter browser extension](https://freighter.app/)
2. Click **"Connect Wallet"** in the header
3. Approve the connection in Freighter
4. Your address will be displayed in the navigation bar

### Supported Operations

| Operation | Description |
|-----------|-------------|
| View wallet address | Display truncated address in header |
| Check balance | Query XLM and token balances |
| Sign transactions | Sign governance votes and oracle updates |
| Network detection | Auto-detect Stellar network |

### useWallet Hook

```typescript
const { wallet, connect, disconnect, isConnecting } = useWallet();

// wallet.address  — Connected address (or '')
// wallet.network  — Network name (e.g., 'testnet')
// wallet.isConnected — Boolean connection state
// connect()       — Trigger Freighter connection
// disconnect()    — Clear wallet state
// isConnecting    — True while connection is pending
```

---

## Routing

| Path | Page | Description |
|------|------|-------------|
| `/` | Dashboard | Overview of all services |
| `/oracle` | Oracle Explorer | Price feed management |
| `/analytics` | Analytics Dashboard | Contract metric tracking |
| `/governance` | Governance Portal | Proposal voting |

---

## Component API

### `<StatCard>`

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Card label text |
| `value` | `string \| number` | Main stat value |
| `change` | `string?` | Change indicator text |
| `positive` | `boolean?` | Green if true, red if false |
| `icon` | `ReactNode?` | Optional icon element |

### `<Card>`

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Card header title |
| `children` | `ReactNode` | Card content |
| `className` | `string?` | Additional CSS classes |

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
- Services go in `src/services/`

### Commit Convention

| Prefix | Purpose |
|--------|---------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation changes |
| `style:` | UI/styling changes |
| `refactor:` | Code restructuring without behavior change |
| `chore:` | Maintenance tasks |

---

## License

[MIT](LICENSE)

Copyright (c) 2024 Web3 Suite contributors
