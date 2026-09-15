interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  positive?: boolean;
  icon?: React.ReactNode;
}

export function StatCard({ label, value, change, positive, icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${positive ? 'text-green-600' : 'text-red-600'}`}>
              {positive ? '+' : ''}{change}
            </p>
          )}
        </div>
        {icon && (
          <div className="w-12 h-12 bg-stellar-50 rounded-lg flex items-center justify-center text-stellar-600">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
