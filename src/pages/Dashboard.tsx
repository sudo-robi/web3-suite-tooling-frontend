import { Card, StatCard } from '../components/Card.js';
import { LoadingSpinner } from '../components/LoadingSpinner.js';
import { useOracle } from '../hooks/useOracle.js';

export function Dashboard() {
  const { feeds, prices, loading } = useOracle();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Overview of Web3 Suite Tooling services on Stellar/Soroban
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Active Feeds" value={feeds.length} />
        <StatCard label="Price Updates" value={prices.size} change="Live" positive />
        <StatCard label="Network" value="Testnet" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Latest Prices">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="space-y-3">
              {feeds.map(feedId => {
                const price = prices.get(feedId);
                return (
                  <div key={feedId} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="font-medium text-gray-900">{feedId}</span>
                    <span className="text-gray-600">
                      {price ? `$${(parseFloat(price.price) / 1e8).toFixed(4)}` : 'Loading...'}
                    </span>
                  </div>
                );
              })}
              {feeds.length === 0 && (
                <p className="text-gray-500 text-center py-4">No feeds registered</p>
              )}
            </div>
          )}
        </Card>

        <Card title="Quick Actions">
          <div className="space-y-3">
            <a
              href="/oracle"
              className="block p-4 bg-stellar-50 rounded-lg hover:bg-stellar-100 transition-colors"
            >
              <h4 className="font-medium text-stellar-700">Oracle Explorer</h4>
              <p className="text-sm text-stellar-600">View and manage price feeds</p>
            </a>
            <a
              href="/analytics"
              className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <h4 className="font-medium text-blue-700">Analytics Dashboard</h4>
              <p className="text-sm text-blue-600">Track contract metrics</p>
            </a>
            <a
              href="/governance"
              className="block p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <h4 className="font-medium text-purple-700">Governance Portal</h4>
              <p className="text-sm text-purple-600">Vote on proposals</p>
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
