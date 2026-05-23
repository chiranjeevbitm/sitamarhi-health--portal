import Layout from '../components/Layout';
import { zeroBoardItems } from '../data/mockData';

function SeverityLabel({ severity }: { severity: 'red' | 'yellow' | 'green' }) {
  const map = {
    red: { bg: 'bg-status-critical/10 text-status-critical border-status-critical/20', label: '🔴 Critical' },
    yellow: { bg: 'bg-status-warning-high/10 text-status-warning-high border-status-warning-high/20', label: '🟡 Warning' },
    green: { bg: 'bg-status-success/10 text-status-success border-status-success/20', label: '🟢 Good' },
  };
  const s = map[severity];
  return <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${s.bg}`}>{s.label}</span>;
}

export default function ZeroBoard() {
  const redItems = zeroBoardItems.filter(i => i.severity === 'red');
  const yellowItems = zeroBoardItems.filter(i => i.severity === 'yellow');
  const greenItems = zeroBoardItems.filter(i => i.severity === 'green');

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary font-[Public_Sans]">Zero Board & Accountability</h1>
          <p className="text-sm text-on-surface-variant mt-1">Missing data detection · Low performance identification · Action tracking</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-status-critical/10 text-status-critical rounded-full text-xs font-bold">{redItems.length} Critical</span>
          <span className="px-3 py-1 bg-status-warning-high/10 text-status-warning-high rounded-full text-xs font-bold">{yellowItems.length} Warning</span>
          <span className="px-3 py-1 bg-status-success/10 text-status-success rounded-full text-xs font-bold">{greenItems.length} Good</span>
        </div>
      </div>

      {/* Red Zone */}
      <section className="soft-ui-card rounded-3xl overflow-hidden border-l-4 border-status-critical">
        <div className="px-6 py-4 bg-status-critical/5 border-b border-status-critical/20 flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-status-critical animate-pulse" />
          <h3 className="text-base font-bold text-status-critical">🔴 Red Zone — Critical Issues</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low text-on-surface-variant text-[10px] font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Sector / ANM</th>
                <th className="px-4 py-4">Issue</th>
                <th className="px-4 py-4">Severity</th>
                <th className="px-4 py-4">Days Overdue</th>
                <th className="px-4 py-4">Action Required</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {redItems.map((item, i) => (
                <tr key={i} className="hover:bg-status-critical/5 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold">{item.sector}</td>
                  <td className="px-4 py-4 text-sm text-status-critical font-medium">{item.issue}</td>
                  <td className="px-4 py-4"><SeverityLabel severity="red" /></td>
                  <td className="px-4 py-4">
                    <span className="text-sm font-bold text-status-critical">{item.daysOverdue > 0 ? `${item.daysOverdue}d` : 'Today'}</span>
                  </td>
                  <td className="px-4 py-4 text-sm">{item.actionRequired}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="px-3 py-1.5 bg-status-critical text-white text-[10px] font-bold rounded-lg hover:opacity-90 transition-opacity">
                      Take Action
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Yellow Zone */}
      <section className="soft-ui-card rounded-3xl overflow-hidden border-l-4 border-status-warning-high">
        <div className="px-6 py-4 bg-status-warning-high/5 border-b border-status-warning-high/20 flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-status-warning-high" />
          <h3 className="text-base font-bold text-status-warning-high">🟡 Yellow Zone — Moderate Risk</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low text-on-surface-variant text-[10px] font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Sector / ANM</th>
                <th className="px-4 py-4">Issue</th>
                <th className="px-4 py-4">Severity</th>
                <th className="px-4 py-4">Days Overdue</th>
                <th className="px-4 py-4">Action Required</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {yellowItems.map((item, i) => (
                <tr key={i} className="hover:bg-status-warning-high/5 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold">{item.sector}</td>
                  <td className="px-4 py-4 text-sm text-status-warning-high font-medium">{item.issue}</td>
                  <td className="px-4 py-4"><SeverityLabel severity="yellow" /></td>
                  <td className="px-4 py-4">
                    <span className="text-sm">{item.daysOverdue > 0 ? `${item.daysOverdue}d` : 'Current'}</span>
                  </td>
                  <td className="px-4 py-4 text-sm">{item.actionRequired}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="px-3 py-1.5 bg-status-warning-high text-white text-[10px] font-bold rounded-lg hover:opacity-90 transition-opacity">
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Green Zone */}
      <section className="soft-ui-card rounded-3xl overflow-hidden border-l-4 border-status-success">
        <div className="px-6 py-4 bg-status-success/5 border-b border-status-success/20 flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-status-success" />
          <h3 className="text-base font-bold text-status-success">🟢 Green Zone — Good Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low text-on-surface-variant text-[10px] font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Sector / ANM</th>
                <th className="px-4 py-4">Issue</th>
                <th className="px-4 py-4">Severity</th>
                <th className="px-4 py-4">Days Overdue</th>
                <th className="px-4 py-4">Action Required</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {greenItems.map((item, i) => (
                <tr key={i} className="hover:bg-status-success/5 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold">{item.sector}</td>
                  <td className="px-4 py-4 text-sm text-status-success">{item.issue}</td>
                  <td className="px-4 py-4"><SeverityLabel severity="green" /></td>
                  <td className="px-4 py-4 text-sm">--</td>
                  <td className="px-4 py-4 text-sm">{item.actionRequired}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="px-3 py-1 bg-status-success/10 text-status-success rounded-full text-[10px] font-bold">On Track</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  );
}