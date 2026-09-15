import { useState, useEffect } from 'react';
import { Card, StatCard } from '../components/Card.js';
import { LoadingSpinner } from '../components/LoadingSpinner.js';
import { getAnalyticsCount, getTrackedContracts } from '../services/api.js';

export function Analytics() {
  const [metricCount, setMetricCount] = useState(0);
  const [trackedContracts, setTrackedContracts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [countResp, contractsResp] = await Promise.all([
        getAnalyticsCount(),
        getTrackedContracts(),
      ]);

      if (countResp.success && countResp.data !== undefined) {
        setMetricCount(countResp.data);
      }
      if (contractsResp.success && contractsResp.data) {
        setTrackedContracts(contractsResp.data);
      }
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics Explorer</h1>
        <p className="text-gray-600 mt-1">
          On-chain metrics and contract analytics
        </p>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard label="Total Metrics" value={metricCount} />
            <StatCard label="Tracked Contracts" value={trackedContracts.length} />
            <StatCard label="Network" value="Testnet" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Tracked Contracts">
              {trackedContracts.length > 0 ? (
                <div className="space-y-3">
                  {trackedContracts.map((addr, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <span className="font-mono text-sm text-gray-700">
                        {addr.slice(0, 8)}...{addr.slice(-4)}
                      </span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        Active
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No contracts being tracked. Deploy contracts and register them for analytics.
                </p>
              )}
            </Card>

            <Card title="Metrics Overview">
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-stellar-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <p className="text-gray-600">
                  Detailed metric charts will appear here once data is flowing through the analytics contract.
                </p>
              </div>
            </Card>
          </div>

          <Card title="About Analytics">
            <div className="prose prose-sm max-w-none text-gray-600">
              <p>
                The Analytics contract tracks on-chain metrics for monitored smart contracts.
                Each tracked contract can have arbitrary key-value metrics recorded, with
                statistical summaries computed across all data points.
              </p>
              <ul className="mt-2 space-y-1">
                <li><strong>Contract Tracking:</strong> Register contracts to collect metrics from</li>
                <li><strong>Metric Recording:</strong> Record arbitrary numeric values with labels</li>
                <li><strong>Aggregations:</strong> Automatic min/max/avg computation per metric name</li>
                <li><strong>Snapshots:</strong> Point-in-time state captures for dashboards</li>
              </ul>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
