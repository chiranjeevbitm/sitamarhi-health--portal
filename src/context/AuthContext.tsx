import { createContext, useContext, useState, type ReactNode } from 'react';

export type UserRole = 'medical-supervisor' | 'anm' | 'asha';

export interface User {
  username: string;
  role: UserRole;
  name: string;
  facility: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string, role: UserRole) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string, role: UserRole): boolean => {
    if (username === 'root' && password === 'root') {
      const userData: Record<UserRole, Omit<User, 'role'>> = {
        'medical-supervisor': { username: 'root', name: 'Dr. Deepak Kumar', facility: 'CHC Nanpur, Sitamarhi' },
        'anm': { username: 'root', name: 'ANM Suman', facility: 'Nanpur North Subcenter' },
        'asha': { username: 'root', name: 'ASHA Kavita', facility: 'Bauram Village' },
      };
      setUser({ ...userData[role], role });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}