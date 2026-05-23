import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardKpis, alerts, zeroBoardItems, deliveryKpis, anaemiaKpis, ancKpis, benchmarkData, rankItems } from '../data/mockData';

interface Message {
  role: 'user' | 'bot';
  text: string;
  actions?: { label: string; path: string }[];
}

// Build plain-English context from all dashboard data for the bot
function buildContext(): string {
  const lines: string[] = [];
  lines.push('CHC Nanpur Health Portal Data:');
  lines.push('');
  
  dashboardKpis.forEach(k => lines.push(`- ${k.label}: ${k.value} (${k.subLabel})`));
  
  // Alerts
  const critical = alerts.filter(a => a.severity === 'critical');
  const warning = alerts.filter(a => a.severity !== 'critical');
  lines.push(`\nTotal alerts: ${alerts.length} (${critical.length} critical, ${warning.length} warning)`);
  critical.forEach(a => lines.push(`  CRITICAL ${a.hsc}: ${a.condition}`));
  warning.forEach(a => lines.push(`  WARNING ${a.hsc}: ${a.condition}`));
  
  // Zero Board
  zeroBoardItems.forEach(z => lines.push(`- ZeroBoard ${z.sector}: ${z.issue} (${z.severity}, action: ${z.actionRequired})`));
  
  // Delivery
  deliveryKpis.forEach(d => lines.push(`- Delivery ${d.label}: ${d.value}`));

  // Anaemia
  anaemiaKpis.forEach(a => lines.push(`- Anaemia ${a.label}: ${a.value}`));

  // ANC
  ancKpis.forEach(a => lines.push(`- ANC ${a.label}: ${a.value}`));
  
  // Rankings
  rankItems.forEach(r => lines.push(`- Rank #${r.rank} ${r.name}: ${r.metric} ${r.value}%`));

  return lines.join('\n');
}

// Simple local keyword-based answer engine (always works, no API needed)
function getLocalReply(question: string): { reply: string; actions: { label: string; path: string }[] } {
  const q = question.toLowerCase();
  const actions: { label: string; path: string }[] = [];
  let reply = '';

  // Critical alerts count
  if (q.includes('critical') || q.includes('alert') || q.includes('issue') || q.includes('problem')) {
    const critical = alerts.filter(a => a.severity === 'critical');
    const warning = alerts.filter(a => a.severity !== 'critical');
    reply = `🔴 We have ${critical.length} critical and ${warning.length} warning alerts:\n\n`;
    critical.forEach(a => { reply += `🔴 ${a.hsc}: ${a.condition} (${a.ageing})\n`; });
    warning.forEach(a => { reply += `🟡 ${a.hsc}: ${a.condition}\n`; });
    reply += `\n📌 Navigate to Dashboard to see the full alerts table.`;
    actions.push({ label: 'Go to Dashboard (Alerts)', path: '/dashboard' });
    actions.push({ label: 'Go to Zero Board', path: '/zero-board' });
    return { reply, actions };
  }

  // Delivery
  if (q.includes('delivery') || q.includes('birth') || q.includes('institutional')) {
    const d = deliveryKpis;
    reply = `📋 Delivery Data (March 2026):\n`;
    d.forEach(k => reply += `- ${k.label}: ${k.value}\n`);
    reply += `\n📌 Visit the Delivery page for charts and trends.`;
    actions.push({ label: 'Go to Delivery Page', path: '/delivery' });
    return { reply, actions };
  }

  // Zero Board
  if (q.includes('zero') || q.includes('board') || q.includes('overdue') || q.includes('pending')) {
    const red = zeroBoardItems.filter(z => z.severity === 'red');
    reply = `⚠️ Zero Board has ${red.length} red items:\n\n`;
    red.forEach(z => reply += `🔴 ${z.sector}: ${z.issue} (${z.daysOverdue > 0 ? z.daysOverdue + 'd overdue' : 'current'})\n`);
    reply += `\n📌 Full details on the Zero Board page.`;
    actions.push({ label: 'Go to Zero Board', path: '/zero-board' });
    return { reply, actions };
  }

  // ANC
  if (q.includes('anc') || q.includes('registration') || q.includes('pregnant') || q.includes('maternal')) {
    reply = `📊 ANC Data (March 2026):\n`;
    ancKpis.forEach(a => reply += `- ${a.label}: ${a.value} (${a.subLabel})\n`);
    reply += `\n📌 Check ANC Monitoring page for sector-wise breakdown.`;
    actions.push({ label: 'Go to ANC Monitoring', path: '/anc' });
    return { reply, actions };
  }

  // Anaemia
  if (q.includes('anaemia') || q.includes('hb') || q.includes('haemoglobin') || q.includes('hemoglobin') || q.includes('fcm') || q.includes('iron')) {
    reply = `🩸 Anaemia Data (March 2026):\n`;
    anaemiaKpis.forEach(a => reply += `- ${a.label}: ${a.value}\n`);
    reply += `\n📌 View all high-risk cases on Anaemia Tracker page.`;
    actions.push({ label: 'Go to Anaemia Tracker', path: '/anaemia' });
    return { reply, actions };
  }

  // Benchmarks
  if (q.includes('benchmark') || q.includes('district') || q.includes('compare') || q.includes('vs')) {
    reply = `📈 CHC Nanpur vs District Benchmarks:\n\n`;
    benchmarkData.forEach(b => reply += `- ${b.label}: Nanpur=${b.nanpurValue}%, District=${b.districtValue}% (${b.status})\n`);
    actions.push({ label: 'Go to Dashboard', path: '/dashboard' });
    return { reply, actions };
  }

  // Summary / everything
  if (q.includes('summary') || q.includes('overview') || q.includes('all') || q.includes('health')) {
    reply = `📋 CHC Nanpur Block Summary (March 2026):\n\n`;
    dashboardKpis.forEach(k => reply += `- ${k.label}: ${k.value}\n`);
    reply += `\n${alerts.length} active alerts (${alerts.filter(a => a.severity === 'critical').length} critical)\n`;
    reply += `\nUse specific keywords like "delivery", "anaemia", "anc", "alerts", "benchmarks" for detailed info.`;
    actions.push({ label: 'Go to Dashboard', path: '/dashboard' });
    actions.push({ label: 'Go to AI Summary', path: '/ai-summary' });
    return { reply, actions };
  }

  // Default
  reply = `🤖 I can help with: alerts, delivery, ANC, anaemia, benchmarks, zero board, and summaries.\n\nTry asking:\n- "How many critical issues do we have?"\n- "What is the delivery status?"\n- "Show me ANC registration data"\n- "Anaemia details"\n- "Give me a summary"`;
  return { reply, actions: [] };
}

export default function ArogyaBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: '👋 Namaste! I am **ArogyaBot** — your CHC Nanpur health assistant. Ask me about alerts, deliveries, ANC, anaemia, or any dashboard metric!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    // Always use the local engine - instant, reliable, no API key issues
    const { reply, actions } = getLocalReply(userMsg);
    
    // Simulate a small delay for natural feel
    await new Promise(r => setTimeout(r, 400));
    
    setMessages(prev => [...prev, { role: 'bot', text: reply, actions }]);
    setLoading(false);
  };

  const handleActionClick = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* Chat FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center z-50 transition-all duration-300 ${
          isOpen ? 'bg-status-critical scale-90 rotate-90' : 'bg-primary hover:scale-110'
        }`}
      >
        <span className="material-symbols-outlined text-white text-3xl">
          {isOpen ? 'close' : 'chat'}
        </span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 md:right-8 w-[calc(100vw-2rem)] md:w-[420px] h-[560px] bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border border-outline-variant">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 p-4 text-white flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">smart_toy</span>
            </div>
            <div>
              <h3 className="font-bold text-sm">ArogyaBot 🤖</h3>
              <p className="text-[10px] text-white/80">CHC Nanpur · Ask me anything</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="ml-auto text-white/80 hover:text-white">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-surface-container-low/30">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-primary text-white rounded-br-md'
                    : 'bg-white border border-outline-variant shadow-sm rounded-bl-md'
                }`}>
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {msg.actions.map((action, j) => (
                        <button
                          key={j}
                          onClick={() => handleActionClick(action.path)}
                          className="block w-full text-left px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-semibold hover:bg-primary/20 transition-colors"
                        >
                          → {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-outline-variant shadow-sm p-3 rounded-2xl rounded-bl-md text-sm">
                  <span className="inline-flex gap-1">
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-outline-variant bg-white flex-shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about data, alerts, deliveries..."
                className="flex-1 px-4 py-2.5 bg-surface-container-low rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/30 border border-outline-variant"
                disabled={loading}
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:opacity-90 disabled:opacity-50 transition-all flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </div>
            <p className="text-[10px] text-on-surface-variant mt-1.5 text-center">
              Powered by CHC Nanpur health data
            </p>
          </div>
        </div>
      )}
    </>
  );
}