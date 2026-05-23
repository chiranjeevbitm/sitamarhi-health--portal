import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function DoctorProfile() {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary font-[Public_Sans]">Dr. Deepak Kumar — Profile</h1>
          <p className="text-sm text-on-surface-variant mt-1">MOIC · CHC Nanpur, Sitamarhi · Integrated Doctor Profile</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://doctors-profile-chi.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-all"
          >
            <span className="material-symbols-outlined text-sm">open_in_new</span>
            Open in New Tab
          </a>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-surface-container-high text-on-surface rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-surface-container-highest transition-all"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Embed Doctor Profile */}
      <div className="soft-ui-card bg-white rounded-3xl overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant bg-primary-container/5 flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">person</span>
          <h3 className="text-base font-semibold text-primary font-[Public_Sans]">
            Dr. Deepak Kumar — MOIC, CHC Nanpur
          </h3>
          <span className="ml-auto px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold">
            EMBEDDED PROFILE
          </span>
        </div>
        <div className="relative w-full" style={{ height: '85vh', minHeight: '600px' }}>
          <iframe
            src="https://doctors-profile-chi.vercel.app/"
            title="Dr. Deepak Kumar Profile"
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            loading="lazy"
          />
        </div>
      </div>

      {/* Quick Info Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="soft-ui-card bg-white p-4 rounded-2xl">
          <p className="text-xs text-on-surface-variant font-medium">Designation</p>
          <p className="text-sm font-bold text-primary mt-1">MOIC</p>
        </div>
        <div className="soft-ui-card bg-white p-4 rounded-2xl">
          <p className="text-xs text-on-surface-variant font-medium">Facility</p>
          <p className="text-sm font-bold text-primary mt-1">CHC Nanpur</p>
        </div>
        <div className="soft-ui-card bg-white p-4 rounded-2xl">
          <p className="text-xs text-on-surface-variant font-medium">Type</p>
          <p className="text-sm font-bold text-primary mt-1">Regular</p>
        </div>
        <div className="soft-ui-card bg-white p-4 rounded-2xl">
          <p className="text-xs text-on-surface-variant font-medium">Phone</p>
          <p className="text-sm font-bold text-primary mt-1">8877556142</p>
        </div>
      </div>
    </Layout>
  );
}