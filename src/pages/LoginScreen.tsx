import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, type UserRole } from '../context/AuthContext';

const roles: { value: UserRole; label: string; description: string }[] = [
  { value: 'medical-supervisor', label: 'Medical Supervisor', description: 'Full CHC Nanpur dashboard access' },
  { value: 'anm', label: 'ANM', description: 'Own subcenter & village data' },
  { value: 'asha', label: 'ASHA Worker', description: 'Beneficiary tracking & referrals' },
];

export default function LoginScreen() {
  const [username, setUsername] = useState('root');
  const [password, setPassword] = useState('root');
  const [role, setRole] = useState<UserRole>('medical-supervisor');
  const [error, setError] = useState('');
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      setError(lang === 'EN' ? 'Please enter credentials' : 'कृपया क्रेडेंशियल दर्ज करें');
      return;
    }
    const success = login(username, password, role);
    if (success) {
      navigate('/dashboard');
    } else {
      setError(lang === 'EN' ? 'Invalid credentials. Use root/root' : 'गलत उपयोगकर्ता नाम या पासवर्ड');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/95 via-primary to-[#002244] flex items-center justify-center p-4">
      <div className="w-full max-w-[420px]">
        {/* Logo & Brand */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center mx-auto mb-5 border border-white/20">
            <span className="material-symbols-outlined text-5xl text-white">medical_services</span>
          </div>
          <h1 className="text-3xl font-bold text-white font-[Public_Sans] mb-2">Bihar Health Monitoring</h1>
          <p className="text-white/70">CHC Nanpur · Sitamarhi District</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          {/* Lang toggle */}
          <div className="flex justify-end mb-6">
            <div className="flex bg-white/5 rounded-full p-0.5 border border-white/10">
              <button onClick={() => setLang('EN')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${lang === 'EN' ? 'bg-white text-primary' : 'text-white/70 hover:text-white'}`}>EN</button>
              <button onClick={() => setLang('HI')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${lang === 'HI' ? 'bg-white text-primary' : 'text-white/70 hover:text-white'}`}>HI</button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-white/80 text-sm font-medium mb-1.5 block">
                {lang === 'EN' ? 'Username' : 'उपयोगकर्ता नाम'}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                placeholder={lang === 'EN' ? 'Enter username' : 'उपयोगकर्ता नाम दर्ज करें'}
              />
            </div>
            <div>
              <label className="text-white/80 text-sm font-medium mb-1.5 block">
                {lang === 'EN' ? 'Password' : 'पासवर्ड'}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                placeholder={lang === 'EN' ? 'Enter password' : 'पासवर्ड दर्ज करें'}
              />
            </div>
            <div>
              <label className="text-white/80 text-sm font-medium mb-1.5 block">
                {lang === 'EN' ? 'Select Role' : 'भूमिका चुनें'}
              </label>
              <div className="space-y-2">
                {roles.map((r) => (
                  <button
                    type="button"
                    key={r.value}
                    onClick={() => setRole(r.value)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      role === r.value
                        ? 'bg-white/20 border-white/40 text-white'
                        : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <p className="font-semibold text-sm">{r.label}</p>
                    <p className="text-xs opacity-70 mt-0.5">{r.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-white text-primary font-bold rounded-xl hover:bg-white/90 transition-all shadow-lg active:scale-[0.98]"
            >
              {lang === 'EN' ? 'Sign In' : 'साइन इन'}
            </button>
          </form>

          <p className="text-center text-white/40 text-xs mt-6">
            {lang === 'EN' ? 'Demo: Use root / root' : 'डेमो: root / root उपयोग करें'}
          </p>
        </div>
      </div>
    </div>
  );
}