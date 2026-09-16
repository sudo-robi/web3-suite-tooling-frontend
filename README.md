# Web3 Suite Tooling — Frontend Dashboard

> React-based frontend dashboard for oracle price feeds, on-chain analytics, and governance participation on the Stellar/Soroban network.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.x-61DAFB.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF.svg)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4.svg)](https://tailwindcss.com)
[![Stellar](https://img.shields.io/badge/Stellar-Soroban-6B3FA0.svg)](https://stellar.org)
[![Issues](https://img.shields.io/github/issues/sudo-robi/web3-suite-tooling-frontend)](https://github.com/sudo-robi/web3-suite-tooling-frontend/issues)
[![Stars](https://img.shields.io/github/stars/sudo-robi/web3-suite-tooling-frontend)](https://github.com/sudo-robi/web3-suite-tooling-frontend/stargazers)

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running](#running)
- [Environment Variables](#environment-variables)
- [Wallet Integration](#wallet-integration)
- [Routing](#routing)
- [Component API](#component-api)
- [Testing](#testing)
- [Building](#building)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

### Problem

The Stellar/Soroban ecosystem has powerful on-chain smart contracts, but no standardized frontend for interacting with them. Developers building dApps must create custom dashboards, handle wallet connections, format on-chain data, and manage API communication from scratch for every project. This fragments the user experience and duplicates effort across the ecosystem.

### Solution

This frontend provides a production-ready React dashboard that connects to the backend API and Stellar network to deliver:

| Page | Purpose |
|------|---------|
| **Dashboard** | Overview of all services with live price summaries |
| **Oracle Explorer** | Browse and refresh price feeds with real-time data |
| **Analytics Dashboard** | Track on-chain contract metrics and statistics |
| **Governance Portal** | View proposals, cast votes, and participate in governance |

The dashboard handles wallet integration (Freighter), API communication, data formatting, and responsive UI — developers only need to configure environment variables.

### Audience

- **DeFi users** monitoring real-time price feeds on Stellar
- **DAO members** participating in governance proposals
- **Protocol operators** tracking on-chain analytics
- **Developers** building on Stellar/Soroban needing a reference dashboard

---

## Architecture

```
┌──────────────────────────────────────────────────────────────────────────┐
│                       Browser (React SPA)                                │
│                                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                 │
│  │    Pages     │  │  Components  │  │    Hooks     │                 │
│  │              │  │              │  │              │                 │
│  │  Dashboard   │  │  Header      │  │  useWallet   │                 │
│  │  Oracle      │  │  Card        │  │  useOracle   │                 │
│  │  Analytics   │  │  StatCard    │  │              │                 │
│  │  Governance  │  │  Spinner     │  │              │                 │
│  └──────┬───────┘  └──────────────┘  └──────┬───────┘                 │
│         │                                     │                         │
│  ┌──────┴─────────────────────────────────────┴──────────────────┐    │
│  │                     Services Layer                              │    │
│  │                                                                 │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐                    │    │
│  │  │  API     │  │  Stellar │  │  Config  │                    │    │
│  │  │  Client  │  │  Service │  │          │                    │    │
│  │  └────┬─────┘  └────┬─────┘  └──────────┘                    │    │
│  └───────┼──────────────┼────────────────────────────────────────┘    │
└──────────┼──────────────┼──────────────────────────────────────────────┘
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

### Data Flow

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  React   │────►│  API     │────►│  Backend │────►│  Stellar │
│  Pages   │◄────│  Client  │◄────│  REST    │◄────│  RPC     │
└──────────┘     └──────────┘     └──────────┘     └──────────┘
     │
     │  Freighter
     ▼
┌──────────┐
│  Wallet  │
│  (Browser│
│  Ext)    │
└──────────┘
```

### Component Tree

```
App (BrowserRouter)
├── Header
│   ├── Logo + Brand
│   ├── Navigation Links (Dashboard, Oracle, Analytics, Governance)
│   └── Wallet Connect/Disconnect Button
│
├── Routes
│   ├── / → Dashboard
│   │   ├── StatCard × 3 (Feeds, Updates, Network)
│   │   ├── Card (Latest Prices)
│   │   └── Card (Quick Actions)
│   │
│   ├── /oracle → Oracle
│   │   ├── Error Banner (if any)
│   │   ├── Card (Price Feeds Table)
│   │   └── Card (Feed Statistics)
│   │
│   ├── /analytics → Analytics
│   │   ├── StatCard × 3 (Metrics, Contracts, Network)
│   │   ├── Card (Tracked Contracts)
│   │   ├── Card (Metrics Overview)
│   │   └── Card (About Analytics)
│   │
│   └── /governance → Governance
│       ├── Create Proposal Button
│       ├── ProposalCard × N
│       └── Card (How Governance Works)
│
└── Footer
```

---

## Features

### Dashboard
| Feature | Description |
|---------|-------------|
| **Service overview** | At-a-glance stats for all tooling services |
| **Live price summaries** | Real-time price display for all registered feeds |
| **Quick navigation** | Direct links to Oracle, Analytics, and Governance pages |
| **Wallet status** | Shows connected wallet address in header |
| **Network indicator** | Displays current Stellar network (testnet/mainnet) |

### Oracle Explorer
| Feature | Description |
|---------|-------------|
| **Feed listing** | Browse all registered price feeds in a sortable table |
| **Price display** | Real-time prices with 8-decimal formatting |
| **Round tracking** | See which round each price update belongs to |
| **Manual refresh** | Per-feed refresh button for on-demand updates |
| **Feed statistics** | Count, active prices, update interval, decimals |
| **Error handling** | Graceful error display for stale/missing prices |

### Analytics Dashboard
| Feature | Description |
|---------|-------------|
| **Metric count** | Total recorded metrics across all contracts |
| **Tracked contracts** | List of monitored contract addresses |
| **Contract status** | Active/inactive status indicators |
| **Metrics overview** | Placeholder for future charting |
| **About section** | Explains analytics capabilities |
| **Loading states** | Skeleton spinners during data fetch |

### Governance Portal
| Feature | Description |
|---------|-------------|
| **Proposal listing** | Browse all proposals with pagination |
| **Status indicators** | Active, Closed, Executed, Canceled badges |
| **Vote breakdown** | Visual For/Against/Abstain progress bars |
| **Proposal details** | Proposer, end date, total votes |
| **Create proposal** | Button to initiate new proposals (wallet required) |
| **How it works** | Explains governance lifecycle |

### Shared
| Feature | Description |
|---------|-------------|
| **Responsive design** | Mobile-first layout with Tailwind breakpoints |
| **Dark header** | Stellar-branded navigation with wallet integration |
| **Consistent cards** | Reusable Card and StatCard components |
| **Loading spinners** | Animated loading indicators |
| **Type safety** | Full TypeScript with strict mode |

---

## Screenshots

```
┌─────────────────────────────────────────────────────────────────────────┐
│  [W3 Suite Tooling]  Dashboard | Oracle | Analytics | Governance  [🔗]│
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                 │
│  │ Active Feeds │  │ Price Updates│  │   Network    │                 │
│  │      3       │  │    3 Live    │  │   Testnet    │                 │
│  └──────────────┘  └──────────────┘  └──────────────┘                 │
│                                                                         │
│  ┌───────────────────────────┐  ┌───────────────────────────┐         │
│  │     Latest Prices         │  │      Quick Actions         │         │
│  │                           │  │                            │         │
│  │  XLM_USD    $0.1250      │  │  → Oracle Explorer         │         │
│  │  AQUA_USD   $0.0045      │  │  → Analytics Dashboard     │         │
│  │  BTC_USD    $42500.00    │  │  → Governance Portal       │         │
│  │                           │  │                            │         │
│  └───────────────────────────┘  └───────────────────────────┘         │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│              Web3 Suite Tooling — Built on Stellar/Soroban             │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.x | UI framework with hooks and functional components |
| **TypeScript** | 5.x | Type safety and developer experience |
| **Vite** | 5.x | Lightning-fast build tool and dev server |
| **Tailwind CSS** | 3.x | Utility-first styling with custom Stellar theme |
| **React Router** | 6.x | Client-side routing with nested routes |
| **@stellar/stellar-sdk** | 11.1.0 | Stellar/Soroban wallet integration |
| **Lucide React** | 0.303 | Beautiful, consistent icon library |
| **PostCSS** | 8.x | CSS processing for Tailwind |
| **Autoprefixer** | 10.x | Vendor prefix automation |
| **Vitest** | 1.2 | Unit testing framework |

### Stellar Theme

Custom Tailwind color palette for Stellar branding:

| Color | Hex | Usage |
|-------|-----|-------|
| `stellar-50` | `#f5f3ff` | Light backgrounds |
| `stellar-100` | `#ede9fe` | Hover states |
| `stellar-200` | `#ddd6fe` | Borders |
| `stellar-300` | `#c4b5fd` | Disabled text |
| `stellar-400` | `#a78bfa` | Hover buttons |
| `stellar-500` | `#6B3FA0` | Primary actions |
| `stellar-600` | `#5b21b6` | Active states |
| `stellar-700` | `#4c1d95` | Dark text |
| `stellar-800` | `#3b0764` | Header background |
| `stellar-900` | `#2e1065` | Darkest shade |

---

## Project Structure

```
frontend/
├── index.html                   # HTML entry point
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript config (strict, bundler, paths)
├── tsconfig.node.json           # Node TypeScript config (Vite)
├── vite.config.ts               # Vite build config + API proxy
├── tailwind.config.js           # Tailwind CSS with Stellar theme
├── postcss.config.js            # PostCSS config
├── .gitignore                   # Git ignore rules
├── LICENSE                      # MIT License
├── README.md                    # This file
│
└── src/
    ├── main.tsx                 # App entry point (ReactDOM.createRoot) — 10 lines
    ├── App.tsx                  # Root component with React Router — 31 lines
    ├── index.css                # Tailwind imports + global styles — 9 lines
    │
    ├── config/
    │   └── index.ts             # Environment configuration — 7 lines
    │
    ├── components/
    │   ├── Header.tsx           # Navigation header with wallet connect — 72 lines
    │   ├── Card.tsx             # Reusable Card + StatCard components — 39 lines
    │   ├── StatCard.tsx         # Stats display card with icon support — 30 lines
    │   └── LoadingSpinner.tsx   # Animated loading indicator — 7 lines
    │
    ├── hooks/
    │   ├── useWallet.ts         # Freighter wallet connection hook — 40 lines
    │   └── useOracle.ts         # Oracle data fetching hook — 39 lines
    │
    ├── pages/
    │   ├── Dashboard.tsx        # Main dashboard overview — 75 lines
    │   ├── Oracle.tsx           # Oracle explorer with price table — 115 lines
    │   ├── Analytics.tsx        # Analytics dashboard with metrics — 101 lines
    │   └── Governance.tsx       # Governance portal with proposals — 145 lines
    │
    ├── services/
    │   ├── api.ts               # Backend REST API client — 47 lines
    │   └── stellar.ts           # Stellar SDK utilities + wallet — 41 lines
    │
    └── types/
        └── index.ts             # TypeScript type definitions — 61 lines
```

### File Descriptions

| File | Lines | Purpose |
|------|-------|---------|
| `src/main.tsx` | 10 | ReactDOM entry point with StrictMode |
| `src/App.tsx` | 31 | BrowserRouter, Routes, Header, Footer |
| `src/index.css` | 9 | Tailwind directives and body font |
| `src/config/index.ts` | 7 | Vite env vars for API URL, network, RPC |
| `src/components/Header.tsx` | 72 | Nav links, wallet connect/disconnect, branding |
| `src/components/Card.tsx` | 39 | Reusable Card wrapper with title |
| `src/components/StatCard.tsx` | 30 | Stats display with label, value, change, icon |
| `src/components/LoadingSpinner.tsx` | 7 | Animated CSS spinner |
| `src/hooks/useWallet.ts` | 40 | Freighter wallet state management |
| `src/hooks/useOracle.ts` | 39 | Oracle feeds and prices data fetching |
| `src/pages/Dashboard.tsx` | 75 | Overview with stats, prices, quick actions |
| `src/pages/Oracle.tsx` | 115 | Price feed table with refresh buttons |
| `src/pages/Analytics.tsx` | 101 | Metrics count, tracked contracts, about |
| `src/pages/Governance.tsx` | 145 | Proposal cards with vote breakdown |
| `src/services/api.ts` | 47 | Typed fetch wrapper for all API endpoints |
| `src/services/stellar.ts` | 41 | Freighter wallet connection, address formatting |
| `src/types/index.ts` | 61 | PriceFeed, Proposal, Vote, ApiResponse types |

---

## Getting Started

### Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | >= 18.0.0 | Runtime |
| npm or yarn | Latest | Package manager |
| Backend API | Running | See [backend](../backend/) |
| Freighter | Latest | Stellar browser wallet extension |

### Installation

```bash
# Clone the repository
git clone https://github.com/sudo-robi/web3-suite-tooling-frontend.git
cd web3-suite-tooling-frontend

# Install dependencies
npm install
```

### Configuration

Create a `.env` file in the project root:

```env
# Backend API URL (proxied in dev via Vite)
VITE_API_URL=/api

# Stellar network
VITE_STELLAR_NETWORK=testnet
VITE_STELLAR_RPC_URL=https://soroban-testnet.stellar.org
```

### Running

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

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `/api` | Backend API base URL |
| `VITE_STELLAR_NETWORK` | `testnet` | Stellar network to connect to |
| `VITE_STELLAR_RPC_URL` | `https://soroban-testnet.stellar.org` | Soroban RPC endpoint |

### Vite Proxy Configuration

In development, Vite proxies API requests to avoid CORS issues:

```typescript
// vite.config.ts
server: {
  port: 5173,
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true,
    },
  },
},
```

---

## Wallet Integration

The frontend integrates with [Freighter](https://freighter.app/) for Stellar wallet connectivity.

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
```

| Property | Type | Description |
|----------|------|-------------|
| `wallet.address` | `string` | Connected address (or `''`) |
| `wallet.network` | `string` | Network name (e.g., `'testnet'`) |
| `wallet.isConnected` | `boolean` | Connection state |
| `connect` | `() => Promise<void>` | Trigger Freighter connection |
| `disconnect` | `() => void` | Clear wallet state |
| `isConnecting` | `boolean` | True while connection is pending |

### Stellar Service

```typescript
import { connectWallet, formatStellarAddress, formatPrice } from '../services/stellar';

// Connect to Freighter
const address = await connectWallet();

// Format address: "GABC12...XYZ9"
const short = formatStellarAddress(longAddress);

// Format price: "12500000000" → "125.00"
const formatted = formatPrice("12500000000", 8);
```

---

## Routing

| Path | Page | Component | Description |
|------|------|-----------|-------------|
| `/` | Dashboard | `<Dashboard />` | Overview of all services |
| `/oracle` | Oracle Explorer | `<Oracle />` | Price feed management |
| `/analytics` | Analytics Dashboard | `<Analytics />` | Contract metric tracking |
| `/governance` | Governance Portal | `<Governance />` | Proposal voting |

### Route Configuration

```typescript
// App.tsx
<Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/oracle" element={<Oracle />} />
  <Route path="/analytics" element={<Analytics />} />
  <Route path="/governance" element={<Governance />} />
</Routes>
```

---

## Component API

### `<Card>`

Reusable card wrapper with title header.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | Yes | Card header title |
| `children` | `ReactNode` | Yes | Card content |
| `className` | `string` | No | Additional CSS classes |

```tsx
<Card title="My Section">
  <p>Card content here</p>
</Card>
```

### `<StatCard>`

Stats display card with label, value, and optional change indicator.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `label` | `string` | Yes | Card label text |
| `value` | `string \| number` | Yes | Main stat value |
| `change` | `string` | No | Change indicator text |
| `positive` | `boolean` | No | Green if true, red if false |
| `icon` | `ReactNode` | No | Optional icon element |

```tsx
<StatCard label="Total Volume" value="$1.2M" change="+12%" positive />
<StatCard label="Users" value={1420} icon={<UsersIcon />} />
```

### `<LoadingSpinner>`

Animated loading indicator.

```tsx
<LoadingSpinner />
```

### `<Header>`

Navigation header with wallet integration.

```tsx
<Header />
```

Renders:
- Stellar-branded logo and title
- Navigation links (Dashboard, Oracle, Analytics, Governance)
- Wallet connect/disconnect button
- Active route highlighting

### `<ProposalCard>` (Governance page)

Individual proposal display with vote breakdown.

| Prop | Type | Description |
|------|------|-------------|
| `proposal` | `Proposal` | Full proposal data object |

Renders:
- Title and description
- Status badge (Active/Closed/Executed/Canceled)
- Proposer address (truncated)
- For/Against vote progress bar
- End date and total vote count

---

## API Client

### Services

```typescript
// services/api.ts

// Oracle
getOracleFeeds()           // GET /oracle/feeds → string[]
getOraclePrice(feedId)     // GET /oracle/price/:feedId → PriceFeed

// Analytics
getAnalyticsCount()        // GET /analytics/metrics/count → number
getMetricSummary(name)     // GET /analytics/summary/:name → MetricSummary
getTrackedContracts()      // GET /analytics/tracked → string[]

// Governance
getProposals(page, limit)  // GET /governance/proposals?page=&limit= → Proposal[]
getProposal(id)            // GET /governance/proposals/:id → Proposal
getProposalCount()         // GET /governance/proposals/count → number
```

### Response Type

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: number;
}
```

---

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

---

## Building

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

The build output goes to `dist/` and can be deployed to any static hosting service (Vercel, Netlify, Cloudflare Pages, etc.).

---

## Contributing

### Branch Naming

| Prefix | Purpose | Example |
|--------|---------|---------|
| `feat/` | New feature | `feat/governance-charts` |
| `fix/` | Bug fix | `fix/wallet-reconnect` |
| `docs/` | Documentation | `docs/component-api` |
| `style/` | UI/styling | `style/dark-mode` |
| `refactor/` | Code restructuring | `refactor/api-client` |

### Commit Convention

| Prefix | Purpose | Example |
|--------|---------|---------|
| `feat:` | New feature | `feat: add proposal creation form` |
| `fix:` | Bug fix | `fix: wallet disconnect on network change` |
| `docs:` | Documentation | `docs: update component API reference` |
| `style:` | UI/styling | `style: improve mobile responsive layout` |
| `refactor:` | Code restructuring | `refactor: extract API client hooks` |
| `chore:` | Maintenance | `chore: update react to 18.3` |

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

### PR Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/my-feature`)
3. Commit changes following the convention above
4. Push to branch (`git push origin feat/my-feature`)
5. Open a Pull Request with:
   - Description of changes
   - Screenshots (if UI changes)
   - Test results

---

## License

[MIT](LICENSE)

Copyright (c) 2024 Web3 Suite contributors
