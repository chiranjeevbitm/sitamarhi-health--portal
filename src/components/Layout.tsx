import type { ReactNode } from 'react';
import TopBar from './TopBar';
import ArogyaBot from './ArogyaBot';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="lg:ml-72 pt-16 min-h-screen">
        <div className="px-4 md:px-6 pb-12 max-w-[1440px] mx-auto space-y-6 pt-6">
          {children}
        </div>
      </main>
      <ArogyaBot />
    </div>
  );
}
