export const config = {
  apiBaseUrl: import.meta.env.VITE_API_URL || '/api',
  stellarNetwork: import.meta.env.VITE_STELLAR_NETWORK || 'testnet',
  rpcUrl: import.meta.env.VITE_STELLAR_RPC_URL || 'https://soroban-testnet.stellar.org',
  appTitle: 'Web3 Suite Tooling',
  appDescription: 'Developer tools for Stellar/Soroban ecosystem',
} as const;
