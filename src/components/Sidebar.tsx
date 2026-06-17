'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { toggleSidebar } from '@/redux/features/uiSlice';
import AllGamesModal from '@/components/AllGamesModal';

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);
  const [casinoExpanded, setCasinoExpanded] = useState(true);
  const [showAllGames, setShowAllGames] = useState(false);

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed top-[60px] left-0 right-0 bottom-0 bg-black/60 z-40 lg:hidden"
          onClick={() => dispatch(toggleSidebar())}
        />
      )}

      <div className={`
        shrink-0 select-none text-white font-sans flex flex-col gap-[10px]
        transition-all duration-300 ease-in-out
        fixed top-[60px] left-0 h-[calc(100vh-60px)] z-50
        bg-[#091741] border-r border-white/5
        overflow-y-auto scrollbar-none p-0
        lg:static lg:top-auto lg:h-auto lg:z-auto lg:bg-transparent lg:border-none lg:overflow-visible lg:w-[232px]
        ${sidebarOpen
          ? 'translate-x-0 w-[232px] opacity-100'
          : '-translate-x-full w-[232px] opacity-100 pointer-events-none lg:translate-x-0 lg:w-[232px] lg:pointer-events-auto'
        }
      `}>

        {/* 1. TOP PROMO CARDS */}
        <div className="w-[232px] h-[134px] bg-[#0C1F56] rounded-[16px] p-[16px] flex flex-col gap-[10px] shrink-0">

          {/* Row 1: Refer a Friend + VIP Transfer */}
          <div className="flex flex-row gap-[4px] w-[200px] h-[44px]">
            <img
              src="/games/side-btn/1.png"
              alt="Refer a Friend"
              onClick={() => router.push('/referrals')}
              className="w-[98px] h-[44px] cursor-pointer hover:brightness-110 active:scale-95 transition-all duration-200 select-none object-contain"
            />
            <img
              src="/games/side-btn/2.png"
              alt="VIP Transfer"
              className="w-[98px] h-[44px] cursor-pointer hover:brightness-110 active:scale-95 transition-all duration-200 select-none object-contain"
            />
          </div>

          {/* Row 2: Winter Rush */}
          <img
            src="/games/side-btn/3.png"
            alt="Winter Rush"
            className="w-[200px] h-[50px] cursor-pointer hover:brightness-110 active:scale-95 transition-all duration-200 select-none object-contain"
          />

        </div>

        {/* 2. NAV LIST */}
        <div className="w-[232px] h-[716px] bg-[#0C1F56] rounded-[16px] p-[16px] flex flex-col gap-[16px] shrink-0">

          {/* Promotions */}
          <button className="flex items-center justify-between w-[200px] h-[44px] bg-[#112F82] hover:bg-[#153896] px-[10px] rounded-[8px] transition-colors cursor-pointer text-left focus:outline-none shrink-0 group">
            <div className="flex items-center gap-[12px] w-[160px] h-[20px]">
              <img src="/games/side-icon/pro.svg" className="w-[20px] h-[20px] object-contain opacity-90 group-hover:opacity-100" alt="Promotions" />
              <span className="font-sans font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-[#D2DCF7] group-hover:text-white transition-colors">Promotions</span>
            </div>
          </button>

          {/* VIP Program */}
          <button className="flex items-center justify-between w-[200px] h-[44px] bg-[#112F82] hover:bg-[#153896] px-[10px] rounded-[8px] transition-colors cursor-pointer text-left focus:outline-none shrink-0 group">
            <div className="flex items-center gap-[12px] w-[160px] h-[20px]">
              <img src="/games/side-icon/vip.svg" className="w-[20px] h-[20px] object-contain opacity-90 group-hover:opacity-100" alt="VIP Program" />
              <span className="font-sans font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-[#D2DCF7] group-hover:text-white transition-colors">VIP Program</span>
            </div>
          </button>

          {/* Tournaments */}
          <button className="flex items-center justify-between w-[200px] h-[44px] bg-[#112F82] hover:bg-[#153896] px-[10px] rounded-[8px] transition-colors cursor-pointer text-left focus:outline-none shrink-0 group">
            <div className="flex items-center gap-[12px] w-[160px] h-[20px]">
              <img src="/games/side-icon/tour.svg" className="w-[20px] h-[20px] object-contain opacity-90 group-hover:opacity-100" alt="Tournaments" />
              <span className="font-sans font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-[#D2DCF7] group-hover:text-white transition-colors">Tournaments</span>
            </div>
          </button>

          {/* Recently Played */}
          <button className="flex items-center justify-between w-[200px] h-[44px] bg-[#112F82] hover:bg-[#153896] px-[10px] rounded-[8px] transition-colors cursor-pointer text-left focus:outline-none shrink-0 group">
            <div className="flex items-center gap-[12px] w-[160px] h-[20px]">
              <img src="/games/side-icon/recent.svg" className="w-[20px] h-[20px] object-contain opacity-90 group-hover:opacity-100" alt="Recently Played" />
              <span className="font-sans font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-[#D2DCF7] group-hover:text-white transition-colors">Recently Played</span>
            </div>
          </button>

          {/* Favorite Games */}
          <button className="flex items-center justify-between w-[200px] h-[44px] bg-[#112F82] hover:bg-[#153896] px-[10px] rounded-[8px] transition-colors cursor-pointer text-left focus:outline-none shrink-0 group">
            <div className="flex items-center gap-[12px] w-[160px] h-[20px]">
              <img src="/games/side-icon/like.svg" className="w-[20px] h-[20px] object-contain opacity-90 group-hover:opacity-100" alt="Favorite Games" />
              <span className="font-sans font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-[#D2DCF7] group-hover:text-white transition-colors">Favorite Games</span>
            </div>
          </button>

          {/* Casino Accordion */}
          <div
            className="transition-all overflow-hidden flex flex-col shrink-0 rounded-[8px]"
            style={{
              width: 200,
              height: casinoExpanded ? 264 : 44,
              background: '#112F82'
            }}
          >
            <button
              onClick={() => setCasinoExpanded(!casinoExpanded)}
              className="flex items-center justify-between w-[200px] h-[44px] bg-[#1463FF] hover:bg-[#2e74ff] px-[10px] rounded-[8px] transition-colors cursor-pointer focus:outline-none shrink-0"
            >
              <div className="flex items-center gap-[12px] w-[160px] h-[20px]">
                <img src="/games/side-icon/casino.svg" className="w-[20px] h-[20px] object-contain" alt="Casino" />
                <span className="font-sans font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white">Casino</span>
              </div>
              <svg width="7" height="4" viewBox="0 0 7 4" fill="none" className={`transition-transform duration-200 ${casinoExpanded ? 'rotate-180' : ''}`}>
                <path d="M1 1L3.5 3L6 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {casinoExpanded && (
              <div className="flex flex-col gap-[20px] p-[20px_16px] w-[200px] h-[220px]">
                {[
                  { icon: '/games/side-icon/all.svg', label: 'All Games', onClick: () => setShowAllGames(true) },
                  { icon: '/games/side-icon/new.svg', label: 'New Games', onClick: () => {} },
                  { icon: '/games/side-icon/popular.svg', label: 'Popular Games', onClick: () => {} },
                  { icon: '/games/side-icon/original.svg', label: 'Original Games', onClick: () => {} },
                  { icon: '/games/side-icon/crash.svg', label: 'Crash Games', onClick: () => {} },
                ].map((item) => (
                  <div key={item.label} onClick={item.onClick} className="flex items-center gap-[12px] w-[160px] h-[20px] text-[#D2DCF7] hover:text-white transition-colors cursor-pointer">
                    <img src={item.icon} className="w-[20px] h-[20px] object-contain shrink-0" alt={item.label} />
                    <span className="font-sans font-semibold text-[14px] leading-[19px] tracking-[0.02em]">{item.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Live Casino */}
          <button className="flex items-center justify-between w-[200px] h-[44px] bg-[#1463FF] hover:bg-[#2e74ff] px-[10px] rounded-[8px] transition-colors cursor-pointer focus:outline-none shrink-0">
            <div className="flex items-center gap-[12px] w-[160px] h-[20px]">
              <img src="/games/side-icon/live.svg" className="w-[20px] h-[20px] object-contain" alt="Live Casino" />
              <span className="font-sans font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white">Live Casino</span>
            </div>
            <svg width="7" height="4" viewBox="0 0 7 4" fill="none">
              <path d="M1 1L3.5 3L6 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Live Support */}
          <button className="flex items-center justify-between w-[200px] h-[44px] bg-[#112F82] hover:bg-[#153896] px-[10px] rounded-[8px] transition-colors cursor-pointer text-left focus:outline-none shrink-0 group">
            <div className="flex items-center gap-[12px] w-[160px] h-[20px]">
              <img src="/games/side-icon/live-support.svg" className="w-[20px] h-[20px] object-contain opacity-90 group-hover:opacity-100" alt="Live Support" />
              <span className="font-sans font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-[#D2DCF7] group-hover:text-white transition-colors">Live Support</span>
            </div>
          </button>

        </div>

      </div>

      {/* All Games Modal */}
      <AllGamesModal isOpen={showAllGames} onClose={() => setShowAllGames(false)} />
    </>
  );
}
