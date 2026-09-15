import { useState, useEffect } from 'react';
import { getOracleFeeds, getOraclePrice } from '../services/api.js';
import type { PriceFeed, ApiResponse } from '../types/index.js';

export function useOracle() {
  const [feeds, setFeeds] = useState<string[]>([]);
  const [prices, setPrices] = useState<Map<string, PriceFeed>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFeeds() {
      const result = await getOracleFeeds();
      if (result.success && result.data) {
        setFeeds(result.data);

        for (const feedId of result.data) {
          const priceResult = await getOraclePrice(feedId);
          if (priceResult.success && priceResult.data) {
            setPrices(prev => new Map(prev).set(feedId, priceResult.data!));
          }
        }
      } else {
        setError(result.error || 'Failed to load feeds');
      }
      setLoading(false);
    }
    loadFeeds();
  }, []);

  const refreshFeed = async (feedId: string) => {
    const result = await getOraclePrice(feedId);
    if (result.success && result.data) {
      setPrices(prev => new Map(prev).set(feedId, result.data!));
    }
  };

  return { feeds, prices, loading, error, refreshFeed };
}
