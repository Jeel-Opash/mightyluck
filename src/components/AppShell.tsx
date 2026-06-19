'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/auth/');

  if (isAuthPage) return <>{children}</>;

  return (
    <>
      <Navbar />
      <div className="pt-[50px] md:pt-[84px] pb-[60px] md:pb-0 bg-[#091741] min-h-screen">
        {children}
      </div>
    </>
  );
}
