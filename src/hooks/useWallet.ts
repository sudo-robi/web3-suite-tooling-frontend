import { useState, useEffect, useCallback } from 'react';
import { connectWallet } from '../services/stellar.js';
import type { WalletInfo } from '../types/index.js';

export function useWallet() {
  const [wallet, setWallet] = useState<WalletInfo>({
    address: '',
    network: '',
    isConnected: false,
  });
  const [isConnecting, setIsConnecting] = useState(false);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    try {
      const address = await connectWallet();
      if (address) {
        setWallet({
          address,
          network: 'testnet',
          isConnected: true,
        });
      }
    } catch (error) {
      console.error('Wallet connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setWallet({ address: '', network: '', isConnected: false });
  }, []);

  useEffect(() => {
    connect();
  }, [connect]);

  return { wallet, connect, disconnect, isConnecting };
}
