import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import KpiCard from '../components/KpiCard';
import { dashboardKpis, benchmarkData, alerts, rankItems } from '../data/mockData';

function SeverityBadge({ severity }: { severity: 'critical' | 'warning' | 'info' }) {
  const map = {
    critical: 'bg-status-critical/10 text-status-critical border-status-critical/20',
    warning: 'bg-status-warning-high/10 text-status-warning-high border-status-warning-high/20',
    info: 'bg-primary/10 text-primary border-primary/20',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${map[severity]}`}>
      {severity === 'critical' ? 'CRITICAL' : severity === 'warning' ? 'WARNING' : 'INFO'}
    </span>
  );
}

function RankBadge({ rank, status }: { rank: number; status: string }) {
  const bgMap: Record<string, string> = {
    critical: 'bg-status-critical/10 text-status-critical',
    warning: 'bg-status-warning-high/10 text-status-warning-high',
    success: 'bg-status-success/10 text-status-success',
  };
  return (
    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${bgMap[status] || bgMap.critical}`}>
      #{rank}
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <Layout>
      {/* KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {dashboardKpis.map((kpi, i) => (
          <div key={i} className="relative">
            <KpiCard data={kpi} />
          </div>
        ))}
      </section>

      {/* District Benchmarks */}
      <section className="soft-ui-card bg-white p-6 md:p-8 rounded-3xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h4 className="text-lg font-semibold text-primary font-[Public_Sans]">CHC Nanpur vs Sitamarhi District Benchmarks</h4>
            <p className="text-sm text-on-surface-variant">Block achievement compared to district average and targets</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-secondary"></span>
              <span className="text-xs font-medium">CHC Nanpur</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-[4px] h-3 bg-primary"></span>
              <span className="text-xs font-medium">District Average</span>
            </div>
            <button className="p-2 bg-surface-container-low rounded-lg hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-sm">download</span>
            </button>
          </div>
        </div>
        <div className="space-y-6">
          {benchmarkData.map((item, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between text-sm text-on-surface">
                <span>{item.label}</span>
                <div className="flex gap-4">
                  <span className={`font-bold ${item.status === 'critical' ? 'text-status-critical' : ''}`}>
                    Nanpur: {item.nanpurValue}%
                  </span>
                  <span className="text-on-surface-variant">District: {item.districtValue}%</span>
                </div>
              </div>
              <div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden flex relative">
                <div
                  className={`h-full rounded-full ${item.status === 'critical' ? 'bg-status-critical' : item.status === 'warning' ? 'bg-status-warning-high' : 'bg-secondary'}`}
                  style={{ width: `${item.nanpurValue}%` }}
                />
                <div
                  className="absolute top-0 h-full w-[3px] bg-primary z-10 rounded-full"
                  style={{ left: `${item.districtValue}%` }}
                  title="District Average"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Critical Alerts */}
        <section className="soft-ui-card bg-white rounded-3xl overflow-hidden flex flex-col">
          <div className="p-6 border-b border-outline-variant bg-error-container/10 flex justify-between items-center">
            <div className="flex items-center gap-3 text-status-critical">
              <span className="material-symbols-outlined">report</span>
              <h4 className="text-base font-semibold">Nanpur HSC-wise Alerts</h4>
            </div>
            <span className="px-3 py-1 bg-status-critical text-white text-[10px] font-bold rounded-full">FACILITY ACTION</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low text-on-surface-variant text-[10px] font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">HSC Sector</th>
                  <th className="px-6 py-4">Alert Condition</th>
                  <th className="px-6 py-4">Open Cases</th>
                  <th className="px-6 py-4 text-right">Ageing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {alerts.map((alert, i) => (
                  <tr key={i} className={`hover:bg-${alert.severity === 'critical' ? 'error' : 'warning'}-container/5 transition-colors cursor-pointer`}>
                    <td className="px-6 py-4 font-medium text-sm">{alert.hsc}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold ${alert.severity === 'critical' ? 'text-status-critical' : 'text-status-warning-high'}`}>
                        {alert.condition}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-sm">{alert.cases}</td>
                    <td className="px-6 py-4 text-right text-sm text-on-surface-variant">{alert.ageing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Lowest Performing HSC Units */}
        <section className="soft-ui-card bg-white rounded-3xl overflow-hidden flex flex-col">
          <div className="p-6 border-b border-outline-variant flex justify-between items-center">
            <div className="flex items-center gap-3 text-primary">
              <span className="material-symbols-outlined">trending_down</span>
              <h4 className="text-base font-semibold">Lowest Performing HSC Units</h4>
            </div>
            <button className="text-primary text-sm font-semibold hover:underline">Full Block Ranking</button>
          </div>
          <div className="p-4 space-y-4">
            {rankItems.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low border border-transparent hover:border-outline-variant transition-all cursor-pointer">
                <RankBadge rank={item.rank} status={item.status} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h5 className="text-sm font-semibold">{item.name}</h5>
                    <span className={`text-sm font-bold ${item.status === 'critical' ? 'text-status-critical' : 'text-status-warning-high'}`}>
                      {item.value}%
                    </span>
                  </div>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">{item.metric}</p>
                  <div className="mt-2 w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.status === 'critical' ? 'bg-status-critical' : 'bg-status-warning-high'}`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Doctor Profile Quick Access */}
      <section className="soft-ui-card bg-gradient-to-br from-primary/5 to-secondary-container/30 p-6 md:p-8 rounded-3xl border-2 border-primary/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white shadow-lg">
              <span className="material-symbols-outlined text-3xl">person</span>
            </div>
            <div>
              <h4 className="text-lg font-bold text-primary font-[Public_Sans]">Dr. Deepak Kumar — MOIC</h4>
              <p className="text-sm text-on-surface-variant">CHC Nanpur, Sitamarhi · View full professional profile</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/doctor-profile')}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-sm font-bold hover:opacity-90 transition-all shadow-md whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-sm">open_in_new</span>
            View Doctor Profile
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/60 p-3 rounded-xl text-center">
            <p className="text-xs text-on-surface-variant">Designation</p>
            <p className="text-sm font-bold text-primary">MOIC</p>
          </div>
          <div className="bg-white/60 p-3 rounded-xl text-center">
            <p className="text-xs text-on-surface-variant">Contact</p>
            <p className="text-sm font-bold text-primary">8877556142</p>
          </div>
          <div className="bg-white/60 p-3 rounded-xl text-center">
            <p className="text-xs text-on-surface-variant">Facility</p>
            <p className="text-sm font-bold text-primary">CHC Nanpur</p>
          </div>
          <div className="bg-white/60 p-3 rounded-xl text-center">
            <p className="text-xs text-on-surface-variant">Block</p>
            <p className="text-sm font-bold text-primary">Nanpur, Sitamarhi</p>
          </div>
        </div>
      </section>

      {/* AI Block Review */}
      <section className="soft-ui-card bg-[#e0f2f1] p-6 md:p-8 rounded-3xl border-2 border-primary/10">
        <div className="flex items-center gap-3 mb-4">
          <span className="material-symbols-outlined text-primary">smart_toy</span>
          <h4 className="text-lg font-semibold text-primary font-[Public_Sans]">Block Strategy & AI Insights</h4>
        </div>
        <div className="space-y-4">
          <p className="text-base text-on-surface leading-relaxed">
            CHC Nanpur's overall block performance is high for ANC (102%), significantly outperforming Sitamarhi district benchmarks. However, the <strong>Institutional Delivery gap (45% vs 57% dist. avg)</strong> remains the primary blocker for health outcomes. Facility-level data from Apr 2026 BHAVYA shows 7 APHCs with ZERO OPD registrations.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="flex gap-2 items-start text-sm">
              <span className="material-symbols-outlined text-status-success text-lg">verified</span>
              <span>Block leads District in 1st Trimester registration at 99% vs district avg 87%.</span>
            </li>
            <li className="flex gap-2 items-start text-sm">
              <span className="material-symbols-outlined text-status-critical text-lg">warning</span>
              <span>Critical: Severe Anaemia at 7% (40 cases) up from 4% (25 cases). FCM 110 vials indented for March. Sex ratio crisis at 677 in Feb 2026 - lowest in district.</span>
            </li>
          </ul>
        </div>
      </section>

    </Layout>
  );
}