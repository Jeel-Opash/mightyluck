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
        overflow-y-auto scrollbar-none p-[16px]
        lg:static lg:top-auto lg:h-auto lg:z-auto lg:bg-transparent lg:border-none lg:overflow-visible lg:p-0
        ${sidebarOpen
          ? 'translate-x-0 w-[248px] opacity-100'
          : '-translate-x-full w-[248px] opacity-100 pointer-events-none lg:translate-x-0 lg:w-[248px] lg:pointer-events-auto'
        }
      `}>

        {/* 1. TOP PROMO CARDS */}
        <div className="w-[216px] bg-[#0C1F56] rounded-[16px] p-[16px] flex flex-col gap-[8px] shrink-0">

          {/* Row 1: Refer a Friend + VIP Transfer */}
          <div className="flex flex-row gap-[4px]">

            {/* Refer a Friend */}
            <div
              onClick={() => router.push('/referrals')}
              className="relative overflow-hidden cursor-pointer group hover:brightness-110 transition-all duration-200 flex flex-row items-center justify-end p-[6px_8px] gap-[2px]"
              style={{ width: 106, height: 44, background: '#3B005F', borderRadius: 8, isolation: 'isolate' }}
            >
              <div style={{ position: 'absolute', width: 97, height: 97, left: -43, top: -15, background: '#A92BF5', filter: 'blur(25px)', borderRadius: '50%', zIndex: 0 }} />
              <img
                src="/images/promo-megaphone.png"
                style={{ position: 'absolute', width: 105, height: 106, left: -45, top: -22, zIndex: 3, objectFit: 'contain' }}
                className="pointer-events-none select-none group-hover:scale-105 transition-transform duration-200"
                alt="Megaphone"
              />
              <span style={{ position: 'relative', width: 52, height: 22, fontFamily: "'Jost',sans-serif", fontWeight: 700, fontSize: 11, lineHeight: '100%', color: '#fff', zIndex: 2 }} className="select-none">
                REFER A FRIEND
              </span>
            </div>

            {/* VIP Transfer */}
            <div
              className="relative overflow-hidden cursor-pointer group hover:brightness-110 transition-all duration-200 flex flex-row items-center justify-end p-[6px_8px] gap-[2px]"
              style={{ width: 106, height: 44, background: '#500039', borderRadius: 8, isolation: 'isolate' }}
            >
              <div style={{ position: 'absolute', width: 97, height: 97, left: -43, top: -15, background: '#FF3981', filter: 'blur(25px)', borderRadius: '50%', zIndex: 0 }} />
              <img
                src="/images/promo-crown.png"
                style={{ position: 'absolute', width: 105, height: 106, left: -45, top: -22, zIndex: 3, objectFit: 'contain' }}
                className="pointer-events-none select-none group-hover:scale-105 transition-transform duration-200"
                alt="Crown"
              />
              <span style={{ position: 'relative', width: 57, height: 22, fontFamily: "'Jost',sans-serif", fontWeight: 700, fontSize: 11, lineHeight: '100%', color: '#fff', zIndex: 2 }} className="select-none">
                VIP TRANSFER
              </span>
            </div>

          </div>

          {/* Row 2: Winter Rush */}
          <div
            className="relative overflow-hidden cursor-pointer group hover:brightness-110 transition-all duration-200 flex flex-row items-center justify-end p-[6px_10px] gap-[10px]"
            style={{ width: 216, height: 50, background: '#091741', borderRadius: 8, isolation: 'isolate' }}
          >
            <div style={{ position: 'absolute', width: 110, height: 110, left: -53, top: -22, background: '#1463FF', filter: 'blur(25px)', borderRadius: '50%', zIndex: 0 }} />
            <img
              src="/images/promo-snowflake.png"
              style={{ position: 'absolute', width: 165, height: 165, left: -60, top: -53, zIndex: 3, transform: 'matrix(-1,0,0,1,0,0)', objectFit: 'contain' }}
              className="pointer-events-none select-none group-hover:scale-105 transition-transform duration-200"
              alt="Snowflake"
            />
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2, width: 138, height: 30, zIndex: 2 }} className="select-none">
              <span style={{ fontFamily: "'Jost',sans-serif", fontWeight: 900, fontStyle: 'italic', fontSize: 18, lineHeight: '14px', color: '#fff', whiteSpace: 'nowrap' }}>
                WINTER RUSH
              </span>
              <span style={{ fontFamily: "'Jost',sans-serif", fontWeight: 700, fontStyle: 'italic', fontSize: 12, lineHeight: '14px', color: '#fff', whiteSpace: 'nowrap' }}>
                $2,000,000 IN PRIZES
              </span>
            </div>
          </div>

        </div>

        {/* 2. NAV LIST */}
        <div className="w-[216px] bg-[#0C1F56] rounded-2xl p-4 flex flex-col gap-3 shrink-0">

          {/* Promotions */}
          <button className="flex items-center gap-3 w-full h-[44px] bg-[#112F82] hover:bg-[#153896] px-2.5 rounded-lg transition-colors cursor-pointer text-left focus:outline-none shrink-0 group">
            <img src="/games/side-icon/pro.svg" className="w-5 h-5 object-contain opacity-90 group-hover:opacity-100" alt="Promotions" />
            <span className="font-sans font-semibold text-[14px] leading-[19px] text-[#D2DCF7] group-hover:text-white transition-colors">Promotions</span>
          </button>

          {/* VIP Program */}
          <button className="flex items-center gap-3 w-full h-[44px] bg-[#112F82] hover:bg-[#153896] px-2.5 rounded-lg transition-colors cursor-pointer text-left focus:outline-none shrink-0 group">
            <img src="/games/side-icon/vip.svg" className="w-5 h-5 object-contain opacity-90 group-hover:opacity-100" alt="VIP Program" />
            <span className="font-sans font-semibold text-[14px] leading-[19px] text-[#D2DCF7] group-hover:text-white transition-colors">VIP Program</span>
          </button>

          {/* Tournaments */}
          <button className="flex items-center gap-3 w-full h-[44px] bg-[#112F82] hover:bg-[#153896] px-2.5 rounded-lg transition-colors cursor-pointer text-left focus:outline-none shrink-0 group">
            <img src="/games/side-icon/tour.svg" className="w-5 h-5 object-contain opacity-90 group-hover:opacity-100" alt="Tournaments" />
            <span className="font-sans font-semibold text-[14px] leading-[19px] text-[#D2DCF7] group-hover:text-white transition-colors">Tournaments</span>
          </button>

          {/* Casino Accordion */}
          <div className={`w-full rounded-lg transition-all overflow-hidden flex flex-col shrink-0 ${casinoExpanded ? 'bg-[#112F82]' : ''}`}>
            <button
              onClick={() => setCasinoExpanded(!casinoExpanded)}
              className="flex items-center justify-between w-full h-[44px] bg-[#1463FF] hover:bg-[#2e74ff] px-2.5 rounded-lg transition-colors cursor-pointer focus:outline-none shrink-0"
            >
              <div className="flex items-center gap-3">
                <img src="/games/side-icon/casino.svg" className="w-5 h-5 object-contain" alt="Casino" />
                <span className="font-sans font-bold text-[14px] text-white">Casino</span>
              </div>
              <svg width="7" height="4" viewBox="0 0 7 4" fill="none" className={`transition-transform duration-200 ${casinoExpanded ? 'rotate-180' : ''}`}>
                <path d="M1 1L3.5 3L6 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {casinoExpanded && (
              <div className="flex flex-col gap-4 p-4 border-t border-white/5">
                {[
                  { icon: '/games/side-icon/all.svg', label: 'All Games', onClick: () => setShowAllGames(true) },
                  { icon: '/games/side-icon/new.svg', label: 'New Games', onClick: () => {} },
                  { icon: '/games/side-icon/popular.svg', label: 'Popular Games', onClick: () => {} },
                  { icon: '/games/side-icon/original.svg', label: 'Original Games', onClick: () => {} },
                  { icon: '/games/side-icon/crash.svg', label: 'Crash Games', onClick: () => {} },
                ].map((item) => (
                  <div key={item.label} onClick={item.onClick} className="flex items-center gap-3 text-[#D2DCF7] hover:text-white transition-colors cursor-pointer">
                    <img src={item.icon} className="w-5 h-5 object-contain shrink-0" alt={item.label} />
                    <span className="font-sans font-semibold text-[14px]">{item.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Live Casino */}
          <button className="flex items-center justify-between w-full h-[44px] bg-[#1463FF] hover:bg-[#2e74ff] px-2.5 rounded-lg transition-colors cursor-pointer focus:outline-none shrink-0">
            <div className="flex items-center gap-3">
              <img src="/games/side-icon/live.svg" className="w-5 h-5 object-contain" alt="Live Casino" />
              <span className="font-sans font-bold text-[14px] text-white">Live Casino</span>
            </div>
            <svg width="7" height="4" viewBox="0 0 7 4" fill="none">
              <path d="M1 1L3.5 3L6 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Live Support */}
          <button className="flex items-center gap-3 w-full h-[44px] bg-[#112F82] hover:bg-[#153896] px-2.5 rounded-lg transition-colors cursor-pointer text-left focus:outline-none shrink-0 group">
            <img src="/games/side-icon/live-support.svg" className="w-5 h-5 object-contain opacity-90 group-hover:opacity-100" alt="Live Support" />
            <span className="font-sans font-semibold text-[14px] text-[#D2DCF7] group-hover:text-white transition-colors">Live Support</span>
          </button>

        </div>

      </div>

      {/* All Games Modal */}
      <AllGamesModal isOpen={showAllGames} onClose={() => setShowAllGames(false)} />
    </>
  );
}
