import Layout from '../components/Layout';
import KpiCard from '../components/KpiCard';
import { deliveryKpis, deliveryTrend, anmDeliveryData } from '../data/mockData';

export default function DeliveryMonitoring() {
  const chartWidth = 800;
  const chartHeight = 256;
  const maxVal = Math.max(...deliveryTrend.map(d => d.target || 100));
  const points = deliveryTrend.map((d, i) => ({
    x: (i / (deliveryTrend.length - 1)) * chartWidth,
    y: chartHeight - (d.value / maxVal) * chartHeight,
  }));
  const targetY = chartHeight - (90 / maxVal) * chartHeight;
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ');
  const areaD = `${pathD} L ${points[points.length - 1].x},${chartHeight} L 0,${chartHeight} Z`;

  const maxAnm = Math.max(...anmDeliveryData.map(d => d.value));

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary font-[Public_Sans]">Institutional Delivery Monitoring</h1>
          <p className="text-sm text-on-surface-variant mt-1">CHC Nanpur · Target 90%+ · Current: 45% (Mar 2026)</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-status-critical/10 text-status-critical rounded-full text-xs font-bold animate-pulse">⚠ Below Target</span>
          <span className="px-3 py-1 bg-surface-container-high rounded-full text-xs">Gap: 34% vs District</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {deliveryKpis.map((kpi, i) => (
          <KpiCard key={i} data={kpi} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Trend Chart */}
        <div className="xl:col-span-8 soft-ui-card bg-white p-6 md:p-8 rounded-3xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-on-surface font-[Public_Sans]">Institutional Delivery Rate Trend</h3>
              <p className="text-sm text-on-surface-variant">Monthly performance vs 90% target</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-status-critical"></span>
                <span className="text-xs font-medium">CHC Nanpur</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 border-t-2 border-dashed border-status-success"></span>
                <span className="text-xs font-medium">90% Target</span>
              </div>
            </div>
          </div>
          <div className="relative h-64 w-full trend-chart-bg border-l border-b border-outline-variant">
            <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
              <line x1="0" y1={targetY} x2={chartWidth} y2={targetY} stroke="#2E7D32" strokeDasharray="8,4" strokeWidth="2" />
              <path d={areaD} fill="url(#delGradient)" />
              <path d={pathD} fill="none" stroke="#D32F2F" strokeLinecap="round" strokeWidth="3" />
              {points.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} fill="#D32F2F" r="5" />
              ))}
              <defs>
                <linearGradient id="delGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#D32F2F" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#D32F2F" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute bottom-[-32px] w-full flex justify-between px-2 text-xs text-on-surface-variant">
              {deliveryTrend.map((d, i) => (
                <span key={i}>{d.month}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ANM Delivery Performance */}
        <div className="xl:col-span-4 soft-ui-card bg-white p-6 md:p-8 rounded-3xl">
          <h3 className="text-lg font-semibold text-on-surface mb-2 font-[Public_Sans]">ANM-wise Delivery Rate</h3>
          <p className="text-sm text-on-surface-variant mb-6">Comparison across sectors</p>
          <div className="space-y-4">
            {anmDeliveryData.map((anm, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{anm.name}</span>
                  <span className={`font-bold ${anm.value < 50 ? 'text-status-critical' : anm.value < 70 ? 'text-status-warning-high' : 'text-status-success'}`}>
                    {anm.value}%
                  </span>
                </div>
                <div className="h-3 bg-surface-container-high rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${anm.value < 50 ? 'bg-status-critical' : anm.value < 70 ? 'bg-status-warning-high' : 'bg-status-success'}`}
                    style={{ width: `${(anm.value / maxAnm) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-status-critical/5 rounded-xl border border-status-critical/20">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-status-critical text-sm">warning</span>
              <p className="text-xs text-status-critical font-semibold">4 out of 6 sectors below 60% target</p>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Summary Table */}
      <div className="soft-ui-card bg-white rounded-3xl overflow-hidden">
        <div className="px-6 py-5 border-b border-outline-variant flex justify-between items-center">
          <h3 className="text-base font-semibold">Monthly Delivery Summary</h3>
          <button className="px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-semibold">View Full Report</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low text-on-surface-variant text-[10px] font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Month</th>
                <th className="px-4 py-4">Target (ELA)</th>
                <th className="px-4 py-4">Total</th>
                <th className="px-4 py-4">Institutional</th>
                <th className="px-4 py-4">Home</th>
                <th className="px-4 py-4">Achievement %</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {[
                { month: 'Dec 2025', target: 490, total: 325, inst: 270, home: 4, pct: 55 },
                { month: 'Jan 2026', target: 527, total: 270, inst: 270, home: 0, pct: 51 },
                { month: 'Feb 2026', target: 490, total: 283, inst: 251, home: 6, pct: 51 },
                { month: 'Mar 2026', target: 524, total: 276, inst: 238, home: 8, pct: 45 },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold">{row.month}</td>
                  <td className="px-4 py-4 text-sm">{row.target}</td>
                  <td className="px-4 py-4 text-sm">{row.total}</td>
                  <td className="px-4 py-4 text-sm font-medium text-status-success">{row.inst}</td>
                  <td className="px-4 py-4 text-sm text-status-critical">{row.home}</td>
                  <td className="px-4 py-4">
                    <span className={`text-sm font-bold ${row.pct < 60 ? 'text-status-critical' : row.pct < 75 ? 'text-status-warning-high' : 'text-status-success'}`}>
                      {row.pct}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                      row.pct < 60 ? 'bg-status-critical/10 text-status-critical' : 'bg-status-warning-high/10 text-status-warning-high'
                    }`}>
                      {row.pct < 60 ? '⚠ Critical' : '⚠ Below Target'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </Layout>
  );
}