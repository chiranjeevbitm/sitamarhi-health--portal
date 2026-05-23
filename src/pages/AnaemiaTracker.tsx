import Layout from '../components/Layout';
import KpiCard from '../components/KpiCard';
import { anaemiaKpis, anaemiaCases } from '../data/mockData';

function RiskBadge({ level }: { level: string }) {
  const map: Record<string, string> = {
    critical: 'bg-status-critical/10 text-status-critical',
    orange: 'bg-status-warning-high/10 text-status-warning-high',
    yellow: 'bg-status-warning-low/20 text-status-warning-high',
  };
  const labels: Record<string, string> = {
    critical: '🔴 Critical (Hb<7)',
    orange: '🟠 Orange (Hb 7-9)',
    yellow: '🟡 Yellow (Hb 9-11)',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold ${map[level] || map.yellow}`}>
      {labels[level] || level}
    </span>
  );
}

function TreatmentBadge({ status }: { status: string }) {
  const map: Record<string, { class: string; label: string }> = {
    pending: { class: 'bg-status-critical/10 text-status-critical', label: 'Pending' },
    'fcm-given': { class: 'bg-status-success/10 text-status-success', label: 'FCM Given' },
    referred: { class: 'bg-status-warning-high/10 text-status-warning-high', label: 'Referred' },
    'follow-up': { class: 'bg-primary/10 text-primary', label: 'Follow-up' },
  };
  const s = map[status] || map.pending;
  return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.class}`}>{s.label}</span>;
}

export default function AnaemiaTracker() {
  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary font-[Public_Sans]">Severe Anaemia & High-Risk Register</h1>
          <p className="text-sm text-on-surface-variant mt-1">CHC Nanpur · Hb {'<'} 7 gm/dl critical case management</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-status-critical/10 text-status-critical rounded-full text-xs font-bold">🔴 3 Critical</span>
          <span className="px-3 py-1 bg-status-warning-high/10 text-status-warning-high rounded-full text-xs font-bold">🟠 3 Orange</span>
          <span className="px-3 py-1 bg-status-warning-low/20 text-status-warning-high rounded-full text-xs font-bold">🟡 1 Yellow</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {anaemiaKpis.map((kpi, i) => (
          <KpiCard key={i} data={kpi} />
        ))}
      </div>

      {/* Alert Logic Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-status-critical/5 border border-status-critical/20 rounded-2xl p-4 flex items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-status-critical/10 flex items-center justify-center text-status-critical font-bold text-xl">🔴</span>
          <div>
                <p className="text-xs font-bold text-status-critical">Hb {'<'} 7 gm/dl</p>
            <p className="text-[10px] text-on-surface-variant">Red Alert - Immediate Action</p>
          </div>
        </div>
        <div className="bg-status-warning-high/5 border border-status-warning-high/20 rounded-2xl p-4 flex items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-status-warning-high/10 flex items-center justify-center text-status-warning-high font-bold text-xl">🟠</span>
          <div>
            <p className="text-xs font-bold text-status-warning-high">Hb 7-9 gm/dl</p>
            <p className="text-[10px] text-on-surface-variant">Orange Alert - Monitor</p>
          </div>
        </div>
        <div className="bg-status-warning-low/10 border border-status-warning-low/30 rounded-2xl p-4 flex items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-status-warning-low/20 flex items-center justify-center text-status-warning-high font-bold text-xl">🟡</span>
          <div>
            <p className="text-xs font-bold text-status-warning-high">Hb 9-11 gm/dl</p>
            <p className="text-[10px] text-on-surface-variant">Yellow - Watch & Supplement</p>
          </div>
        </div>
        <div className="bg-error-container/20 border border-status-critical/20 rounded-2xl p-4 flex items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-status-critical/10 flex items-center justify-center text-status-critical font-bold text-xl">⏰</span>
          <div>
                <p className="text-xs font-bold text-status-critical">Missed Follow-up {'>'} 7d</p>
            <p className="text-[10px] text-on-surface-variant">Escalation Required</p>
          </div>
        </div>
      </div>

      {/* FCM Stock & Cases Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* FCM Stock Widget */}
        <div className="lg:col-span-3 soft-ui-card bg-white p-6 rounded-3xl">
          <h3 className="text-sm font-semibold mb-1">FCM Stock Status</h3>
          <p className="text-xs text-on-surface-variant mb-4">Ferric Carboxymaltose · CHC Nanpur</p>
          <div className="text-center">
            <div className="text-4xl font-bold text-status-warning-high">46</div>
            <p className="text-xs text-on-surface-variant mt-1">Vials Available</p>
            <div className="w-full bg-surface-container-high h-3 rounded-full mt-4 overflow-hidden">
              <div className="bg-status-warning-high h-full rounded-full" style={{ width: '42%' }} />
            </div>
            <p className="text-xs text-on-surface-variant mt-2">42% of indented stock (110 vials)</p>
            <div className="mt-4 p-3 bg-status-warning-high/5 rounded-xl border border-status-warning-high/20">
              <p className="text-xs font-bold text-status-warning-high">⚠️ Reorder recommended</p>
              <p className="text-[10px] text-on-surface-variant">Stock below 50% threshold</p>
            </div>
          </div>
        </div>

        {/* Cases Table */}
        <div className="lg:col-span-9 soft-ui-card bg-white rounded-3xl overflow-hidden">
          <div className="px-6 py-5 border-b border-outline-variant flex justify-between items-center">
            <h3 className="text-base font-semibold">High-Risk Anaemia Cases · March 2026</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-surface-container-high hover:bg-surface-container-highest rounded-lg text-xs transition-all">
                <span className="material-symbols-outlined text-sm align-middle">download</span> Export
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low text-on-surface-variant text-[10px] font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Patient</th>
                  <th className="px-4 py-4">Hb Level</th>
                  <th className="px-4 py-4">Risk Level</th>
                  <th className="px-4 py-4">Treatment</th>
                  <th className="px-4 py-4">ANM</th>
                  <th className="px-4 py-4">Last Follow-up</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {anaemiaCases.map((caseItem, i) => (
                  <tr key={i} className="hover:bg-surface-container-low transition-colors cursor-pointer">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-semibold">{caseItem.patientName}</p>
                        <p className="text-xs text-on-surface-variant">{caseItem.village} · Age {caseItem.age}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-lg font-bold ${caseItem.hb < 7 ? 'text-status-critical' : caseItem.hb < 9 ? 'text-status-warning-high' : 'text-status-warning-low'}`}>
                        {caseItem.hb}
                      </span>
                      <span className="text-xs text-on-surface-variant ml-1">gm/dl</span>
                    </td>
                    <td className="px-4 py-4"><RiskBadge level={caseItem.riskLevel} /></td>
                    <td className="px-4 py-4"><TreatmentBadge status={caseItem.treatmentStatus} /></td>
                    <td className="px-4 py-4 text-sm">{caseItem.anm}</td>
                    <td className="px-4 py-4">
                      <span className="text-sm">{caseItem.lastFollowUp}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-primary text-xs font-semibold hover:underline">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </Layout>
  );
}