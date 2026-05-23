import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { path: '/dashboard', label: 'Block Dashboard', icon: 'dashboard' },
  { path: '/anc', label: 'ANC Monitoring', icon: 'pregnant_woman' },
  { path: '/anaemia', label: 'Anaemia Tracker', icon: 'bloodtype' },
  { path: '/delivery', label: 'Institutional Delivery', icon: 'local_hospital' },
  { path: '/zero-board', label: 'Zero Board', icon: 'error_outline' },
  { path: '/ai-summary', label: 'AI Review Notes', icon: 'smart_toy' },
  { path: '/doctor-profile', label: 'Doctor Profile', icon: 'person' },
];

const navTabs: Record<string, { path: string; label: string }[]> = {
  '/dashboard': [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/anc', label: 'HSC Performance' },
    { path: '/anaemia', label: 'Anaemia Track' },
    { path: '/delivery', label: 'District Benchmarks' },
  ],
};

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleNav = (path: string) => {
    navigate(path);
    if (onNavigate) onNavigate();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-full w-72 bg-surface-container-low transition-all duration-300">
      <div className="p-6">
        <h1 className="text-xl font-bold text-primary mb-6 font-[Public_Sans]">Bihar Health</h1>
        <button
          onClick={() => handleNav('/doctor-profile')}
          className="flex items-center gap-3 p-3 mb-8 w-full bg-surface-container-highest rounded-xl hover:bg-primary-container/20 transition-all group"
        >
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-105 transition-transform">
            DD
          </div>
          <div className="min-w-0 text-left">
            <p className="text-sm font-semibold text-on-surface truncate">Dr. Deepak Kumar</p>
            <p className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold truncate">MOIC · CHC Nanpur</p>
          </div>
        </button>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={`flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg transition-all font-medium ${
                  isActive
                    ? 'bg-secondary-container text-on-secondary-container font-bold scale-95'
                    : 'text-on-surface-variant hover:bg-surface-container-highest'
                }`}
              >
                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto p-6 space-y-4">
        <button className="w-full py-3 px-4 bg-primary text-white text-sm font-semibold rounded-xl shadow-lg hover:opacity-90 transition-opacity">
          Full Block Report
        </button>
        <div className="pt-4 border-t border-outline-variant space-y-1">
          <button className="flex items-center gap-3 px-4 py-2 w-full text-left text-on-surface-variant hover:text-primary transition-colors rounded-lg">
            <span className="material-symbols-outlined text-xl">settings</span>
            <span className="text-sm">Settings</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 w-full text-left text-on-surface-variant hover:text-error transition-colors rounded-lg"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');

  const currentTabs = Object.entries(navTabs).find(([key]) => location.pathname.startsWith(key))?.[1] || [];

  return (
    <>
      {/* Desktop Sidebar - always visible on lg screens */}
      <div className="hidden lg:flex fixed left-0 top-0 h-screen z-50">
        <SidebarContent />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 bg-surface-container-low shadow-2xl" style={{ animation: 'slideIn 0.3s ease-out' }}>
            <div className="flex justify-end p-3 border-b border-outline-variant">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="material-symbols-outlined text-on-surface-variant hover:text-on-surface p-2 rounded-lg hover:bg-surface-container-high"
              >
                close
              </button>
            </div>
            <SidebarContent onNavigate={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 z-40 bg-surface shadow-sm flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3 min-w-0">
          <button
            className="material-symbols-outlined lg:hidden cursor-pointer text-on-surface-variant hover:text-primary p-2 rounded-lg hover:bg-surface-container-high transition-all flex-shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              setMobileMenuOpen(true);
            }}
            aria-label="Open menu"
          >
            menu
          </button>
          <h2 className="text-sm md:text-base lg:text-lg font-semibold text-primary font-[Public_Sans] truncate">
            CHC Nanpur: Block Level Analysis
          </h2>
        </div>
        <div className="flex items-center gap-3 md:gap-6 flex-shrink-0">
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            {currentTabs.map((tab) => (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={`text-xs lg:text-sm font-medium whitespace-nowrap ${
                  location.pathname === tab.path
                    ? 'text-primary font-bold border-b-2 border-primary py-5'
                    : 'text-on-surface-variant hover:text-primary transition-colors'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="flex bg-surface-container-high rounded-full p-0.5 h-8 md:h-9">
              <button
                onClick={() => setLang('EN')}
                className={`px-2 md:px-3 rounded-full text-[10px] md:text-xs font-bold transition-all ${lang === 'EN' ? 'bg-primary text-white' : 'text-on-surface-variant hover:bg-surface-container-highest'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('HI')}
                className={`px-2 md:px-3 rounded-full text-[10px] md:text-xs font-bold transition-all ${lang === 'HI' ? 'bg-primary text-white' : 'text-on-surface-variant hover:bg-surface-container-highest'}`}
              >
                HI
              </button>
            </div>
            <button className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary hidden sm:block text-xl">
              search
            </button>
            <div className="relative">
              <button className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary text-xl">
                notifications
              </button>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full"></span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}