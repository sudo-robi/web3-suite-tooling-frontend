import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet.js';
import { formatStellarAddress } from '../services/stellar.js';

const navLinks = [
  { path: '/', label: 'Dashboard' },
  { path: '/oracle', label: 'Oracle' },
  { path: '/analytics', label: 'Analytics' },
  { path: '/governance', label: 'Governance' },
];

export function Header() {
  const { wallet, connect, disconnect, isConnecting } = useWallet();
  const location = useLocation();

  return (
    <header className="bg-stellar-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-stellar-500 rounded-lg flex items-center justify-center">
                <span className="font-bold text-lg">W3</span>
              </div>
              <span className="font-semibold text-xl">Suite Tooling</span>
            </Link>

            <nav className="hidden md:flex space-x-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'bg-stellar-600 text-white'
                      : 'text-stellar-200 hover:bg-stellar-700 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {wallet.isConnected ? (
              <div className="flex items-center space-x-3">
                <div className="text-sm text-stellar-200">
                  {formatStellarAddress(wallet.address)}
                </div>
                <button
                  onClick={disconnect}
                  className="px-3 py-1.5 bg-stellar-600 hover:bg-stellar-500 rounded-md text-sm font-medium transition-colors"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connect}
                disabled={isConnecting}
                className="px-4 py-1.5 bg-stellar-500 hover:bg-stellar-400 disabled:opacity-50 rounded-md text-sm font-medium transition-colors"
              >
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
