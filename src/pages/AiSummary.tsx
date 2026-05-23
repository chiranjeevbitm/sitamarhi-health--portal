import { useState } from 'react';
import Layout from '../components/Layout';
import { aiSummaryData } from '../data/mockData';

export default function AiSummary() {
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [copied, setCopied] = useState(false);
  const data = lang === 'en' ? aiSummaryData.english : aiSummaryData.hindi;
  const metrics = aiSummaryData.metrics;

  const handleCopy = () => {
    navigator.clipboard.writeText(data.narrative);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary font-[Public_Sans]">AI Review Summary</h1>
          <p className="text-sm text-on-surface-variant mt-1">Auto-generated monthly review for {aiSummaryData.month}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-surface-container-high rounded-full p-0.5 h-9">
            <button
              onClick={() => setLang('en')}
              className={`px-4 rounded-full text-xs font-bold transition-all ${lang === 'en' ? 'bg-primary text-white' : 'text-on-surface-variant hover:bg-surface-container-highest'}`}
            >
              English
            </button>
            <button
              onClick={() => setLang('hi')}
              className={`px-4 rounded-full text-xs font-bold transition-all ${lang === 'hi' ? 'bg-primary text-white' : 'text-on-surface-variant hover:bg-surface-container-highest'}`}
            >
              हिंदी
            </button>
          </div>
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-surface-container-high hover:bg-surface-container-highest rounded-lg text-sm flex items-center gap-2 transition-all"
          >
            <span className="material-symbols-outlined text-sm">{copied ? 'check' : 'content_copy'}</span>
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm flex items-center gap-2 transition-all hover:opacity-90">
            <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
            Export PDF
          </button>
        </div>
      </div>

      {/* Narrative Summary */}
      <section className="soft-ui-card bg-gradient-to-br from-[#e0f2f1] to-[#e8f5fe] p-8 rounded-3xl border-2 border-primary/10">
        <div className="flex items-center gap-3 mb-5">
          <span className="material-symbols-outlined text-primary text-2xl">auto_awesome</span>
          <div>
            <h3 className="text-lg font-semibold text-primary font-[Public_Sans]">
              {lang === 'en' ? 'Monthly Review Narrative' : 'मासिक समीक्षा सारांश'}
            </h3>
            <p className="text-xs text-on-surface-variant">{aiSummaryData.month} · CHC Nanpur</p>
          </div>
        </div>
        <p className="text-base leading-relaxed text-on-surface whitespace-pre-line">{data.narrative}</p>
      </section>

      {/* Metrics comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {Object.entries(metrics).map(([key, val]) => {
          const labels: Record<string, string> = {
            ancRegistration: 'ANC Registration',
            firstTrimester: '1st Trimester',
            fourPlusAnc: '4+ ANC',
            severeAnaemia: 'Severe Anaemia',
            institutionalDelivery: 'Inst. Delivery',
          };
          const improved = val.current >= val.previous;
          return (
            <div key={key} className="soft-ui-card bg-white p-5 rounded-2xl text-center">
              <p className="text-xs text-on-surface-variant font-medium mb-2">{labels[key] || key}</p>
              <p className={`text-2xl font-bold ${key === 'severeAnaemia' ? (val.current > 5 ? 'text-status-critical' : 'text-status-warning-high') : improved ? 'text-status-success' : 'text-status-critical'}`}>
                {val.current}{key === 'severeAnaemia' ? '%' : '%'}
              </p>
              <p className={`text-xs mt-1 flex items-center justify-center gap-1 ${improved ? 'text-status-success' : 'text-status-critical'}`}>
                <span className="material-symbols-outlined text-sm">{improved ? 'arrow_upward' : 'arrow_downward'}</span>
                Prev: {val.previous}%
              </p>
            </div>
          );
        })}
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <section className="soft-ui-card bg-white p-6 rounded-3xl border-l-4 border-status-success">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-status-success">check_circle</span>
            <h3 className="text-base font-bold text-status-success">
              {lang === 'en' ? 'Top Strengths' : 'मुख्य उपलब्धियाँ'}
            </h3>
          </div>
          <ul className="space-y-3">
            {data.strengths.map((s, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-status-success/10 flex items-center justify-center text-status-success text-xs font-bold mt-0.5">{i + 1}</span>
                <span className="text-sm text-on-surface">{s}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Weaknesses */}
        <section className="soft-ui-card bg-white p-6 rounded-3xl border-l-4 border-status-critical">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-status-critical">warning</span>
            <h3 className="text-base font-bold text-status-critical">
              {lang === 'en' ? 'Areas Requiring Attention' : 'ध्यान देने योग्य क्षेत्र'}
            </h3>
          </div>
          <ul className="space-y-3">
            {data.weaknesses.map((w, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-status-critical/10 flex items-center justify-center text-status-critical text-xs font-bold mt-0.5">{i + 1}</span>
                <span className="text-sm text-on-surface">{w}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Recommended Actions */}
      <section className="soft-ui-card bg-primary/5 p-6 md:p-8 rounded-3xl border border-primary/20">
        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-outlined text-primary">assignment</span>
          <h3 className="text-lg font-semibold text-primary font-[Public_Sans]">
            {lang === 'en' ? 'Recommended Action Items' : 'अनुशंसित कार्रवाई'}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.actions.map((action, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-outline-variant hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">{i + 1}</span>
                <span className="px-2 py-0.5 bg-primary/5 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider">
                  {lang === 'en' ? 'Action' : 'कार्रवाई'}
                </span>
              </div>
              <p className="text-sm text-on-surface">{action}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}