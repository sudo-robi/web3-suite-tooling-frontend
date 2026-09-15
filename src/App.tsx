import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header.js';
import { Dashboard } from './pages/Dashboard.js';
import { Oracle } from './pages/Oracle.js';
import { Analytics } from './pages/Analytics.js';
import { Governance } from './pages/Governance.js';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/oracle" element={<Oracle />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/governance" element={<Governance />} />
          </Routes>
        </main>
        <footer className="border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-sm text-gray-500">
              Web3 Suite Tooling — Built on Stellar/Soroban
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
