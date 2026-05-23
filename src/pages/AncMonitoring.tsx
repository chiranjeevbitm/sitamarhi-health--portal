import Layout from '../components/Layout';
import KpiCard from '../components/KpiCard';
import { ancKpis, ancMonthlyTrend, sectorPerformance, blockComparison } from '../data/mockData';

export default function AncMonitoring() {
  const maxBlockValue = Math.max(...blockComparison.map(b => b.value));
  const chartWidth = 800;
  const chartHeight = 256;
  const points = ancMonthlyTrend.map((d, i) => ({
    x: (i / (ancMonthlyTrend.length - 1)) * chartWidth,
    y: chartHeight - (d.value / 100) * chartHeight,
  }));
  const benchmarkY = ancMonthlyTrend[0]?.benchmark
    ? chartHeight - (ancMonthlyTrend[0].benchmark / 100) * chartHeight
    : chartHeight / 2;
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ');
  const areaD = `${pathD} L ${points[points.length - 1].x},${chartHeight} L 0,${chartHeight} Z`;

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        <div>
          <h1 className="text-2xl font-bold text-primary font-[Public_Sans]">Nanpur Block: ANC Monitoring</h1>
          <p className="text-base text-on-surface-variant mt-1">Aggregated maternal health performance for Nanpur block, Sitamarhi.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          <div className="relative min-w-[160px]">
            <select className="w-full pl-9 pr-4 py-2 bg-white border border-outline-variant rounded-lg text-sm appearance-none focus:ring-2 focus:ring-primary focus:border-primary">
              <option>Sitamarhi District</option>
            </select>
            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">location_city</span>
          </div>
          <div className="relative min-w-[140px]">
            <select className="w-full pl-9 pr-4 py-2 bg-white border border-outline-variant rounded-lg text-sm appearance-none focus:ring-2 focus:ring-primary focus:border-primary">
              <option>March 2026</option>
              <option>February 2026</option>
            </select>
            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">calendar_today</span>
          </div>
          <button className="bg-surface-container-high text-on-surface p-2.5 rounded-lg hover:bg-surface-container-highest">
            <span className="material-symbols-outlined text-sm">filter_list</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {ancKpis.map((kpi, i) => (
          <KpiCard key={i} data={kpi} />
        ))}
        {/* AI Clinical Insight Card */}
        <div className="bg-[#e0f2f1] p-6 rounded-2xl shadow-sm relative overflow-hidden group col-span-1">
          <div className="absolute top-0 right-0 p-4 opacity-10 scale-150 transform group-hover:scale-125 transition-transform duration-700">
            <span className="material-symbols-outlined text-6xl text-on-secondary-container">auto_awesome</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-on-secondary-container text-sm">auto_awesome</span>
            <p className="text-xs font-semibold text-on-secondary-container uppercase tracking-wider">Clinical Insight</p>
          </div>
          <p className="text-sm leading-relaxed text-on-secondary-container">
            Registration growth is strong in Nanpur Block overall, but 1st-trimester detection is lagging behind the <span className="font-bold">District Benchmark (71%)</span>. High priority for early detection outreach.
          </p>
        </div>
      </div>

      {/* Analytics Zone */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Trend Chart */}
        <div className="xl:col-span-8 soft-ui-card bg-white p-6 md:p-8 rounded-3xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-on-surface font-[Public_Sans]">ANC Registration Growth</h3>
              <p className="text-sm text-on-surface-variant">Monthly trend: Nanpur Block vs District Benchmark</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                <span className="text-xs font-medium">Nanpur Block</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 border-t-2 border-dashed border-status-warning-high"></span>
                <span className="text-xs font-medium">District Benchmark</span>
              </div>
            </div>
          </div>
          <div className="relative h-64 w-full trend-chart-bg border-l border-b border-outline-variant">
            <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
              <line x1="0" y1={benchmarkY} x2={chartWidth} y2={benchmarkY} stroke="#EF6C00" strokeDasharray="8,4" strokeWidth="2" />
              <path d={areaD} fill="url(#chartGradient)" />
              <path d={pathD} fill="none" stroke="#00355f" strokeLinecap="round" strokeWidth="3" />
              {points.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} fill="#00355f" r="5" />
              ))}
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#00355f" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#00355f" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute bottom-[-32px] w-full flex justify-between px-2 text-xs text-on-surface-variant">
              {ancMonthlyTrend.map((d, i) => (
                <span key={i}>{d.month}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Block Benchmarking */}
        <div className="xl:col-span-4 soft-ui-card bg-white p-6 md:p-8 rounded-3xl flex flex-col">
          <h3 className="text-lg font-semibold text-on-surface mb-2 font-[Public_Sans]">Block Benchmarking</h3>
          <p className="text-sm text-on-surface-variant mb-6">Sitamarhi District Peer Comparison</p>
          <div className="space-y-5 flex-1">
            {blockComparison.map((block, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className={block.name === 'Nanpur Block' ? 'font-bold' : ''}>{block.name}</span>
                  <span className={block.name === 'Nanpur Block' ? 'font-bold text-primary' : ''}>{block.value}%</span>
                </div>
                <div className="h-2.5 bg-surface-container-high rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(block.value / maxBlockValue) * 100}%`,
                      backgroundColor: block.name === 'Nanpur Block' ? '#00355f' : undefined,
                    }}
                  >
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-surface-container-low rounded-xl mt-6 border border-outline-variant/50">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">info</span>
              <p className="text-xs leading-snug">Nanpur is performing <span className="font-bold">4% above</span> District Mean Registration.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sector-wise Table */}
      <div className="soft-ui-card bg-white rounded-3xl overflow-hidden">
        <div className="px-6 md:px-8 py-6 border-b border-outline-variant flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h3 className="text-lg font-semibold text-on-surface font-[Public_Sans]">Sector-wise ANC Performance (Nanpur Block)</h3>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-high hover:bg-surface-container-highest rounded-lg text-sm transition-all">
              <span className="material-symbols-outlined text-sm">download</span> Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm transition-all">
              <span className="material-symbols-outlined text-sm">assignment</span> Sector Report
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="px-6 md:px-8 py-4 text-xs font-semibold text-on-surface-variant">Sector</th>
                <th className="px-4 py-4 text-xs font-semibold text-on-surface-variant">Reg. Achievement</th>
                <th className="px-4 py-4 text-xs font-semibold text-on-surface-variant">Target %</th>
                <th className="px-4 py-4 text-xs font-semibold text-on-surface-variant">1st Trimester %</th>
                <th className="px-6 md:px-8 py-4 text-xs font-semibold text-on-surface-variant text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {sectorPerformance.map((sector, i) => (
                <tr key={i} className="hover:bg-surface-container-lowest transition-colors">
                  <td className="px-6 md:px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-container/10 text-primary rounded-full flex items-center justify-center font-bold text-sm">{sector.id}</div>
                      <div>
                        <p className="text-sm font-semibold text-on-surface">ANM - {sector.sector}</p>
                        <p className="text-xs text-on-surface-variant">{sector.subcenter}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm font-bold">{sector.target}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold">{sector.achievement}%</span>
                      <div className="flex-1 min-w-[60px] h-2 bg-surface-container-high rounded-full overflow-hidden max-w-[100px]">
                        <div
                          className={`h-full rounded-full ${sector.achievement >= 80 ? 'bg-status-success' : sector.achievement >= 65 ? 'bg-status-warning-high' : 'bg-status-critical'}`}
                          style={{ width: `${sector.achievement}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      sector.firstTrimester >= 75
                        ? 'bg-green-50 text-status-success'
                        : 'bg-error-container text-on-error-container'
                    }`}>
                      {sector.firstTrimester}% Early
                    </span>
                  </td>
                  <td className="px-6 md:px-8 py-4 text-right">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      sector.status === 'Optimized' || sector.status === 'High Perf.' ? 'bg-status-success/10 text-status-success' : 'bg-status-critical/10 text-status-critical'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${sector.status === 'At Risk' ? 'bg-status-critical animate-pulse' : 'bg-status-success'}`}></span>
                      {sector.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 md:px-8 py-5 border-t border-outline-variant flex justify-between items-center">
          <p className="text-sm text-on-surface-variant">Aggregated data for 12 Subcenters in Nanpur Block</p>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-surface-container-high rounded-lg disabled:opacity-50" disabled>
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-lg text-sm font-semibold">1</button>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-surface-container-high rounded-lg text-sm">2</button>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-surface-container-high rounded-lg text-sm">3</button>
            <button className="p-2 bg-surface-container-high rounded-lg">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

    </Layout>
  );
}