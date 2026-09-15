import type { ReactNode } from 'react';

interface CardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function Card({ title, children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${className}`}>
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="px-6 py-4">{children}</div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  positive?: boolean;
}

export function StatCard({ label, value, change, positive }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {change && (
        <p className={`text-sm mt-1 ${positive ? 'text-green-600' : 'text-red-600'}`}>
          {positive ? '+' : ''}{change}
        </p>
      )}
    </div>
  );
}
