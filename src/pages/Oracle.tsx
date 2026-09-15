import { Card } from '../components/Card.js';
import { LoadingSpinner } from '../components/LoadingSpinner.js';
import { useOracle } from '../hooks/useOracle.js';

export function Oracle() {
  const { feeds, prices, loading, error, refreshFeed } = useOracle();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Oracle Explorer</h1>
        <p className="text-gray-600 mt-1">
          Real-time price feeds from the Soroban Oracle contract
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      <Card title="Price Feeds">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Feed ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Round
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {feeds.map(feedId => {
                  const price = prices.get(feedId);
                  return (
                    <tr key={feedId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        {feedId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {price
                          ? `$${(parseFloat(price.price) / 1e8).toFixed(4)}`
                          : '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {price?.roundId ?? '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {price
                          ? new Date(price.timestamp * 1000).toLocaleString()
                          : '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => refreshFeed(feedId)}
                          className="text-stellar-600 hover:text-stellar-800 text-sm font-medium"
                        >
                          Refresh
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {feeds.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      No price feeds registered in the oracle contract.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card title="Feed Statistics">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-stellar-600">{feeds.length}</p>
            <p className="text-sm text-gray-500">Registered Feeds</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{prices.size}</p>
            <p className="text-sm text-gray-500">Active Prices</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">5m</p>
            <p className="text-sm text-gray-500">Update Interval</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">8</p>
            <p className="text-sm text-gray-500">Decimals</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
