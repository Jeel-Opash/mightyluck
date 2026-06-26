'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import DepositModal from '@/components/DepositModal';
import AllGamesModal from '@/components/AllGamesModal';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { closeDepositModal, closeAllGamesModal } from '@/redux/features/uiSlice';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const isAuthPage = pathname.startsWith('/auth/');
  const depositModalOpen = useAppSelector((state) => state.ui.depositModalOpen);
  const allGamesOpen = useAppSelector((state) => state.ui.allGamesOpen);
  const authModalOpen = useAppSelector((state) => state.ui.authModalOpen);

  useEffect(() => {
    if (depositModalOpen || allGamesOpen || authModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [depositModalOpen, allGamesOpen, authModalOpen]);

  if (isAuthPage) return <>{children}</>;

  return (
    <>
      <Navbar />
      <div className="pt-[50px] md:pt-[60px] pb-[60px] md:pb-0 bg-[#091741] min-h-screen text-white select-none">
        <div 
          style={{
            opacity: 1,
            paddingTop: '24px',
            paddingBottom: '40px',
            paddingLeft: '24px',
            paddingRight: '24px'
          }}
          className="w-full max-w-[1440px] mx-auto box-border relative flex flex-col min-h-[calc(100vh-60px)]"
        >
          {children}
        </div>
      </div>
      <DepositModal
        isOpen={depositModalOpen}
        onClose={() => dispatch(closeDepositModal())}
      />
      <AllGamesModal
        isOpen={allGamesOpen}
        onClose={() => dispatch(closeAllGamesModal())}
      />
    </>
  );
}

