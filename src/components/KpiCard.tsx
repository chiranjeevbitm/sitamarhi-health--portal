import type { KpiMetric } from '../data/mockData';

interface KpiCardProps {
  data: KpiMetric;
  className?: string;
}

export default function KpiCard({ data, className = '' }: KpiCardProps) {
  return (
    <div className={`soft-ui-card bg-white p-5 rounded-2xl border-l-4 ${data.borderColor} ${className}`}>
      {data.alertLevel === 'red' && (
        <div className="absolute top-0 right-0 p-2">
          <span className="animate-ping flex h-3 w-3 absolute rounded-full bg-status-critical opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-status-critical" />
        </div>
      )}
      <div className="flex justify-between items-start mb-4">
        <span className={`material-symbols-outlined ${data.color} p-2 bg-primary/5 rounded-lg`}>{data.icon}</span>
        <div className={`flex items-center gap-1 ${data.trend === 'up' ? 'trend-up' : 'trend-down'}`}>
          <span className="material-symbols-outlined text-sm">{data.trend === 'up' ? 'trending_up' : 'trending_down'}</span>
          <span className="text-xs font-bold">{data.trendValue}</span>
        </div>
      </div>
      <p className="text-on-surface-variant text-xs font-medium mb-1">{data.label}</p>
      <h3 className={`text-[28px] font-bold tracking-tight ${data.color} leading-8`}>{data.value}</h3>
      {data.subLabel && (
        <p className={`text-[10px] mt-1 font-medium ${data.alertLevel === 'red' ? 'text-status-critical' : 'text-on-surface-variant'}`}>
          {data.subLabel}
        </p>
      )}
    </div>
  );
}