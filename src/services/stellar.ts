import * as StellarSdk from '@stellar/stellar-sdk';
import { config } from '../config/index.js';

const server = new StellarSdk.rpc.Server(config.rpcUrl);

export function getServer() {
  return server;
}

export async function connectWallet(): Promise<string | null> {
  try {
    if (typeof window !== 'undefined' && (window as Record<string, unknown>).freighter) {
      const freighter = (window as Record<string, unknown>).freighter as {
        isConnected: () => Promise<boolean>;
        getPublicKey: () => Promise<string>;
        getNetwork: () => Promise<string>;
      };

      const isConnected = await freighter.isConnected();
      if (isConnected) {
        return await freighter.getPublicKey();
      }
    }

    return null;
  } catch (error) {
    console.error('Failed to connect wallet:', error);
    return null;
  }
}

export function formatStellarAddress(address: string): string {
  if (address.length <= 12) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatPrice(price: string, decimals: number = 8): string {
  const num = parseFloat(price);
  const divisor = Math.pow(10, decimals);
  return (num / divisor).toFixed(2);
}
