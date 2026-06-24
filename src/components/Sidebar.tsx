'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { toggleSidebar, openAllGamesModal } from '@/redux/features/uiSlice';

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [casinoExpanded, setCasinoExpanded] = useState(false);
  const [liveCasinoExpanded, setLiveCasinoExpanded] = useState(false);

  // Lock body scroll when sidebar is open on mobile
  useEffect(() => {
    // Only apply overflow lock if the screen is mobile size (lg is 1024px)
    const handleResize = () => {
      if (window.innerWidth < 1024 && sidebarOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed top-[50px] md:top-[60px] left-0 right-0 bottom-0 bg-black/60 z-40 lg:hidden"
          onClick={() => dispatch(toggleSidebar())}
        />
      )}

      <div className={`
        shrink-0 select-none text-white font-sans flex flex-col
        transition-all duration-300 ease-in-out
        fixed top-[50px] md:top-[60px] left-0 h-[calc(100vh-50px)] md:h-[calc(100vh-60px)] z-45
        bg-[#091741] border-r border-white/5 lg:border-none
        overflow-y-auto scrollbar-none p-0
        lg:static lg:top-auto lg:h-auto lg:z-auto lg:bg-transparent lg:border-none lg:overflow-visible
        ${sidebarOpen
          ? 'translate-x-0 w-full lg:w-[232px] opacity-100'
          : '-translate-x-full lg:translate-x-0 w-full lg:w-[80px] opacity-100 pointer-events-none lg:pointer-events-auto'
        }
      `}>

        {/* =========================================================================
            DESKTOP VIEW (hidden lg:flex)
           ========================================================================= */}
        <div className={`hidden lg:flex flex-col gap-[10px] transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-[232px]' : 'w-[80px] items-center'}`}>
          {/* 1. TOP PROMO CARDS */}
          {sidebarOpen && (
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
          )}

          {/* 2. NAV LIST */}
          <div className={`transition-all duration-300 bg-[#0C1F56] rounded-[16px] p-[16px] flex flex-col gap-[16px] shrink-0 ${sidebarOpen ? 'w-[232px] h-fit' : 'w-[80px] h-auto py-[20px] items-center'}`}>
            {/* Promotions */}
            <button className={`flex items-center ${sidebarOpen ? 'justify-between w-[200px]' : 'justify-center w-[48px]'} h-[44px] bg-[#112F82] hover:bg-[#153896] px-[10px] rounded-[8px] transition-all duration-300 cursor-pointer text-left focus:outline-none shrink-0 group`}>
              <div className={`flex items-center ${sidebarOpen ? 'gap-[12px] w-[160px]' : 'justify-center'} h-[20px]`}>
                <img src="/games/side-icon/pro.svg" className="w-[20px] h-[20px] object-contain opacity-90 group-hover:opacity-100" alt="Promotions" />
                {sidebarOpen && (
                  <span className="font-sans font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-[#D2DCF7] group-hover:text-white transition-colors">Promotions</span>
                )}
              </div>
            </button>

            {/* VIP Program */}
            <button className={`flex items-center ${sidebarOpen ? 'justify-between w-[200px]' : 'justify-center w-[48px]'} h-[44px] bg-[#112F82] hover:bg-[#153896] px-[10px] rounded-[8px] transition-all duration-300 cursor-pointer text-left focus:outline-none shrink-0 group`}>
              <div className={`flex items-center ${sidebarOpen ? 'gap-[12px] w-[160px]' : 'justify-center'} h-[20px]`}>
                <img src="/games/side-icon/vip.svg" className="w-[20px] h-[20px] object-contain opacity-90 group-hover:opacity-100" alt="VIP Program" />
                {sidebarOpen && (
                  <span className="font-sans font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-[#D2DCF7] group-hover:text-white transition-colors">VIP Program</span>
                )}
              </div>
            </button>

            {/* Tournaments */}
            <button className={`flex items-center ${sidebarOpen ? 'justify-between w-[200px]' : 'justify-center w-[48px]'} h-[44px] bg-[#112F82] hover:bg-[#153896] px-[10px] rounded-[8px] transition-all duration-300 cursor-pointer text-left focus:outline-none shrink-0 group`}>
              <div className={`flex items-center ${sidebarOpen ? 'gap-[12px] w-[160px]' : 'justify-center'} h-[20px]`}>
                <img src="/games/side-icon/tour.svg" className="w-[20px] h-[20px] object-contain opacity-90 group-hover:opacity-100" alt="Tournaments" />
                {sidebarOpen && (
                  <span className="font-sans font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-[#D2DCF7] group-hover:text-white transition-colors">Tournaments</span>
                )}
              </div>
            </button>

            {isAuthenticated && (
              <>
                {/* Recently Played */}
                <button className={`flex items-center ${sidebarOpen ? 'justify-between w-[200px]' : 'justify-center w-[48px]'} h-[44px] bg-[#112F82] hover:bg-[#153896] px-[10px] rounded-[8px] transition-all duration-300 cursor-pointer text-left focus:outline-none shrink-0 group`}>
                  <div className={`flex items-center ${sidebarOpen ? 'gap-[12px] w-[160px]' : 'justify-center'} h-[20px]`}>
                    <img src="/games/side-icon/recent.svg" className="w-[20px] h-[20px] object-contain opacity-90 group-hover:opacity-100" alt="Recently Played" />
                    {sidebarOpen && (
                      <span className="font-sans font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-[#D2DCF7] group-hover:text-white transition-colors">Recently Played</span>
                    )}
                  </div>
                </button>

                {/* Favorite Games */}
                <button className={`flex items-center ${sidebarOpen ? 'justify-between w-[200px]' : 'justify-center w-[48px]'} h-[44px] bg-[#112F82] hover:bg-[#153896] px-[10px] rounded-[8px] transition-all duration-300 cursor-pointer text-left focus:outline-none shrink-0 group`}>
                  <div className={`flex items-center ${sidebarOpen ? 'gap-[12px] w-[160px]' : 'justify-center'} h-[20px]`}>
                    <img src="/games/side-icon/like.svg" className="w-[20px] h-[20px] object-contain opacity-90 group-hover:opacity-100" alt="Favorite Games" />
                    {sidebarOpen && (
                      <span className="font-sans font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-[#D2DCF7] group-hover:text-white transition-colors">Favorite Games</span>
                    )}
                  </div>
                </button>
              </>
            )}

            {/* Casino Accordion */}
            <div
              className="transition-all duration-300 overflow-hidden flex flex-col shrink-0 rounded-[8px]"
              style={{
                width: sidebarOpen ? 200 : 48,
                height: (sidebarOpen && casinoExpanded) ? 264 : 44,
                background: '#112F82'
              }}
            >
              <button
                onClick={() => setCasinoExpanded(!casinoExpanded)}
                className={`flex items-center ${sidebarOpen ? 'justify-between w-[200px]' : 'justify-center w-[48px]'} h-[44px] ${casinoExpanded ? 'bg-[#1463FF] hover:bg-[#2e74ff]' : 'bg-[#112F82] hover:bg-[#153896]'} px-[10px] rounded-[8px] transition-colors cursor-pointer focus:outline-none shrink-0`}
              >
                <div className={`flex items-center ${sidebarOpen ? 'gap-[12px] w-[160px]' : 'justify-center'} h-[20px]`}>
                  <img src="/games/side-icon/casino.svg" className="w-[20px] h-[20px] object-contain" alt="Casino" />
                  {sidebarOpen && (
                    <span className="font-sans font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white">Casino</span>
                  )}
                </div>
                {sidebarOpen && (
                  <svg width="7" height="4" viewBox="0 0 7 4" fill="none" className={`transition-transform duration-200 ${casinoExpanded ? 'rotate-180' : ''}`}>
                    <path d="M1 1L3.5 3L6 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              {sidebarOpen && casinoExpanded && (
                <div className="flex flex-col gap-[20px] p-[20px_16px] w-[200px] h-[220px]">
                  {[
                    { icon: '/games/side-icon/all.svg', label: 'All Games', onClick: () => dispatch(openAllGamesModal()) },
                    { icon: '/games/side-icon/new.svg', label: 'New Games', onClick: () => { } },
                    { icon: '/games/side-icon/popular.svg', label: 'Popular Games', onClick: () => { } },
                    { icon: '/games/side-icon/original.svg', label: 'Original Games', onClick: () => { } },
                    { icon: '/games/side-icon/crash.svg', label: 'Crash Games', onClick: () => { } },
                  ].map((item) => (
                    <div key={item.label} onClick={item.onClick} className="flex items-center gap-[12px] w-[160px] h-[20px] text-[#D2DCF7] hover:text-white transition-colors cursor-pointer">
                      <img src={item.icon} className="w-[20px] h-[20px] object-contain shrink-0" alt={item.label} />
                      <span className="font-sans font-semibold text-[14px] leading-[19px] tracking-[0.02em]">{item.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Live Casino Accordion */}
            <div
              className="transition-all duration-300 overflow-hidden flex flex-col shrink-0 rounded-[8px]"
              style={{
                width: sidebarOpen ? 200 : 48,
                height: (sidebarOpen && liveCasinoExpanded) ? 184 : 44,
                background: '#112F82'
              }}
            >
              <button
                onClick={() => setLiveCasinoExpanded(!liveCasinoExpanded)}
                className={`flex items-center ${sidebarOpen ? 'justify-between w-[200px]' : 'justify-center w-[48px]'} h-[44px] ${liveCasinoExpanded ? 'bg-[#1463FF] hover:bg-[#2e74ff]' : 'bg-[#112F82] hover:bg-[#153896]'} px-[10px] rounded-[8px] transition-colors cursor-pointer focus:outline-none shrink-0`}
              >
                <div className={`flex items-center ${sidebarOpen ? 'gap-[12px] w-[160px]' : 'justify-center'} h-[20px]`}>
                  <img src="/games/side-icon/live.svg" className="w-[20px] h-[20px] object-contain" alt="Live Casino" />
                  {sidebarOpen && (
                    <span className="font-sans font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white">Live Casino</span>
                  )}
                </div>
                {sidebarOpen && (
                  <svg width="7" height="4" viewBox="0 0 7 4" fill="none" className={`transition-transform duration-200 ${liveCasinoExpanded ? 'rotate-180' : ''}`}>
                    <path d="M1 1L3.5 3L6 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              {sidebarOpen && liveCasinoExpanded && (
                <div className="flex flex-col gap-[20px] p-[20px_16px] w-[200px] h-[140px]">
                  {[
                    { icon: '/games/side-icon/roulette.svg', label: 'Roulette', onClick: () => { } },
                    { icon: '/games/side-icon/blackjack.svg', label: 'Blackjack', onClick: () => { } },
                    { icon: '/games/side-icon/baccrarat.svg', label: 'Baccarat', onClick: () => { } },
                  ].map((item) => (
                    <div key={item.label} onClick={item.onClick} className="flex items-center gap-[12px] w-[160px] h-[20px] text-[#D2DCF7] hover:text-white transition-colors cursor-pointer">
                      <img src={item.icon} className="w-[20px] h-[20px] object-contain shrink-0" alt={item.label} />
                      <span className="font-sans font-semibold text-[14px] leading-[19px] tracking-[0.02em]">{item.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Live Support */}
            <button className={`flex items-center ${sidebarOpen ? 'justify-between w-[200px]' : 'justify-center w-[48px]'} h-[44px] bg-[#112F82] hover:bg-[#153896] px-[10px] rounded-[8px] transition-all duration-300 cursor-pointer text-left focus:outline-none shrink-0 group`}>
              <div className={`flex items-center ${sidebarOpen ? 'gap-[12px] w-[160px]' : 'justify-center'} h-[20px]`}>
                <img src="/games/side-icon/live-support.svg" className="w-[20px] h-[20px] object-contain opacity-90 group-hover:opacity-100" alt="Live Support" />
                {sidebarOpen && (
                  <span className="font-sans font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-[#D2DCF7] group-hover:text-white transition-colors">Live Support</span>
                )}
              </div>
            </button>
          </div>
        </div>


        {/* =========================================================================
            MOBILE VIEW (flex lg:hidden)
           ========================================================================= */}
        <div className="flex lg:hidden flex-col w-full pt-[30px] pb-[80px] px-[20px] items-center justify-start">
          {/* Main Menu List Container */}
          <div className="w-full max-w-[374px] flex flex-col gap-[16px]">

            {/* Promo banners */}
            <div className="flex flex-row gap-[10px] w-full">
              <img
                src="/games/side-btn/1.png"
                alt="Refer a Friend"
                onClick={() => {
                  router.push('/referrals');
                  dispatch(toggleSidebar());
                }}
                className="flex-1 cursor-pointer hover:brightness-110 active:scale-95 transition-all duration-200 select-none object-cover rounded-[12px]"
              />
              <img
                src="/games/side-btn/2.png"
                alt="VIP Transfer"
                className="flex-1 cursor-pointer hover:brightness-110 active:scale-95 transition-all duration-200 select-none object-cover rounded-[12px]"
              />
            </div>
            <img
              src="/games/side-btn/3.png"
              alt="Winter Rush"
              className="w-full cursor-pointer hover:brightness-110 active:scale-95 transition-all duration-200 select-none object-cover rounded-[12px]"
            />

            {/* Promotions */}
            <button onClick={() => { dispatch(toggleSidebar()); }} className="flex items-center justify-between w-full h-[50px] bg-[#112F82] hover:bg-[#153896] px-[10px] rounded-[8px] transition-colors cursor-pointer text-left focus:outline-none shrink-0 group">
              <div className="flex items-center gap-[12px] w-[160px] h-[22px]">
                <img src="/games/side-icon/pro.svg" className="w-[20px] h-[20px] object-contain opacity-90 group-hover:opacity-100" alt="Promotions" />
                <span className="font-manrope font-semibold text-[16px] leading-[22px] tracking-[0.02em] text-[#D2DCF7] group-hover:text-white transition-colors">Promotions</span>
              </div>
            </button>

            {/* VIP Program */}
            <button onClick={() => { dispatch(toggleSidebar()); }} className="flex items-center justify-between w-full h-[50px] bg-[#112F82] hover:bg-[#153896] px-[10px] rounded-[8px] transition-colors cursor-pointer text-left focus:outline-none shrink-0 group">
              <div className="flex items-center gap-[12px] w-[160px] h-[22px]">
                <img src="/games/side-icon/vip.svg" className="w-[20px] h-[20px] object-contain opacity-90 group-hover:opacity-100" alt="VIP Program" />
                <span className="font-manrope font-semibold text-[16px] leading-[22px] tracking-[0.02em] text-[#D2DCF7] group-hover:text-white transition-colors">VIP Program</span>
              </div>
            </button>

            {/* Tournaments */}
            <button onClick={() => { dispatch(toggleSidebar()); }} className="flex items-center justify-between w-full h-[50px] bg-[#112F82] hover:bg-[#153896] px-[10px] rounded-[8px] transition-colors cursor-pointer text-left focus:outline-none shrink-0 group">
              <div className="flex items-center gap-[12px] w-[160px] h-[22px]">
                <img src="/games/side-icon/tour.svg" className="w-[20px] h-[20px] object-contain opacity-90 group-hover:opacity-100" alt="Tournaments" />
                <span className="font-manrope font-semibold text-[16px] leading-[22px] tracking-[0.02em] text-[#D2DCF7] group-hover:text-white transition-colors">Tournaments</span>
              </div>
            </button>

            {isAuthenticated && (
              <>
                {/* Recently Played */}
                <button onClick={() => { dispatch(toggleSidebar()); }} className="flex items-center justify-between w-full h-[50px] bg-[#112F82] hover:bg-[#153896] px-[10px] rounded-[8px] transition-colors cursor-pointer text-left focus:outline-none shrink-0 group">
                  <div className="flex items-center gap-[12px] w-[160px] h-[22px]">
                    <img src="/games/side-icon/recent.svg" className="w-[20px] h-[20px] object-contain opacity-90 group-hover:opacity-100" alt="Recently Played" />
                    <span className="font-manrope font-semibold text-[16px] leading-[22px] tracking-[0.02em] text-[#D2DCF7] group-hover:text-white transition-colors">Recently Played</span>
                  </div>
                </button>

                {/* Favorite Games */}
                <button onClick={() => { dispatch(toggleSidebar()); }} className="flex items-center justify-between w-full h-[50px] bg-[#112F82] hover:bg-[#153896] px-[10px] rounded-[8px] transition-colors cursor-pointer text-left focus:outline-none shrink-0 group">
                  <div className="flex items-center gap-[12px] w-[160px] h-[22px]">
                    <img src="/games/side-icon/like.svg" className="w-[20px] h-[20px] object-contain opacity-90 group-hover:opacity-100" alt="Favorite Games" />
                    <span className="font-manrope font-semibold text-[16px] leading-[22px] tracking-[0.02em] text-[#D2DCF7] group-hover:text-white transition-colors">Favorite Games</span>
                  </div>
                </button>
              </>
            )}

            {/* Casino Accordion Container */}
            <div
              className="transition-all duration-300 overflow-hidden flex flex-col shrink-0 rounded-[8px] w-full"
              style={{
                height: casinoExpanded ? 280 : 50,
                background: '#112F82'
              }}
            >
              <button
                onClick={() => setCasinoExpanded(!casinoExpanded)}
                className={`flex items-center justify-between w-full h-[50px] ${casinoExpanded ? 'bg-[#1463FF] hover:bg-[#2e74ff]' : 'bg-[#112F82] hover:bg-[#153896]'} px-[10px] rounded-[8px] transition-colors cursor-pointer focus:outline-none shrink-0`}
              >
                <div className="flex items-center gap-[12px] w-[160px] h-[22px]">
                  <img src="/games/side-icon/casino.svg" className="w-[20px] h-[20px] object-contain" alt="Casino" />
                  <span className="font-manrope font-bold text-[16px] leading-[22px] tracking-[0.02em] text-white">Casino</span>
                </div>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className={`transition-transform duration-200 ${casinoExpanded ? 'rotate-180' : ''}`}>
                  <path d="M1 1L5 5L9 1" stroke="white" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {casinoExpanded && (
                <div className="flex flex-col justify-center items-start p-[20px_16px] gap-[20px] w-full h-[230px] border-b border-[#112F82] rounded-b-[8px]">
                  {[
                    { icon: '/games/side-icon/all.svg', label: 'All Games', onClick: () => { dispatch(openAllGamesModal()); dispatch(toggleSidebar()); } },
                    { icon: '/games/side-icon/new.svg', label: 'New Games', onClick: () => { dispatch(toggleSidebar()); } },
                    { icon: '/games/side-icon/popular.svg', label: 'Popular Games', onClick: () => { dispatch(toggleSidebar()); } },
                    { icon: '/games/side-icon/original.svg', label: 'Original Games', onClick: () => { dispatch(toggleSidebar()); } },
                    { icon: '/games/side-icon/crash.svg', label: 'Crash Games', onClick: () => { dispatch(toggleSidebar()); } },
                  ].map((item) => (
                    <div key={item.label} onClick={item.onClick} className="flex items-center gap-[12px] w-[160px] h-[22px] text-[#D2DCF7] hover:text-white transition-colors cursor-pointer group">
                      <img src={item.icon} className="w-[20px] h-[20px] object-contain shrink-0" alt={item.label} />
                      <span className="font-manrope font-semibold text-[16px] leading-[22px] tracking-[0.02em]">{item.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Live Casino Accordion Container */}
            <div
              className="transition-all duration-300 overflow-hidden flex flex-col shrink-0 rounded-[8px] w-full"
              style={{
                height: liveCasinoExpanded ? 200 : 50,
                background: '#112F82'
              }}
            >
              <button
                onClick={() => setLiveCasinoExpanded(!liveCasinoExpanded)}
                className={`flex items-center justify-between w-full h-[50px] ${liveCasinoExpanded ? 'bg-[#1463FF] hover:bg-[#2e74ff]' : 'bg-[#112F82] hover:bg-[#153896]'} px-[10px] rounded-[8px] transition-colors cursor-pointer focus:outline-none shrink-0`}
              >
                <div className="flex items-center gap-[12px] w-[160px] h-[22px]">
                  <img src="/games/side-icon/live.svg" className="w-[20px] h-[20px] object-contain" alt="Live Casino" />
                  <span className="font-manrope font-bold text-[16px] leading-[22px] tracking-[0.02em] text-white">Live Casino</span>
                </div>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className={`transition-transform duration-200 ${liveCasinoExpanded ? 'rotate-180' : ''}`}>
                  <path d="M1 1L5 5L9 1" stroke="white" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {liveCasinoExpanded && (
                <div className="flex flex-col justify-center items-start p-[20px_16px] gap-[20px] w-full h-[150px] border-b border-[#112F82] rounded-b-[8px]">
                  {[
                    { icon: '/games/side-icon/roulette.svg', label: 'Roulette', onClick: () => { dispatch(toggleSidebar()); } },
                    { icon: '/games/side-icon/blackjack.svg', label: 'Blackjack', onClick: () => { dispatch(toggleSidebar()); } },
                    { icon: '/games/side-icon/baccrarat.svg', label: 'Baccarat', onClick: () => { dispatch(toggleSidebar()); } },
                  ].map((item) => (
                    <div key={item.label} onClick={item.onClick} className="flex items-center gap-[12px] w-[160px] h-[22px] text-[#D2DCF7] hover:text-white transition-colors cursor-pointer group">
                      <img src={item.icon} className="w-[20px] h-[20px] object-contain shrink-0" alt={item.label} />
                      <span className="font-manrope font-semibold text-[16px] leading-[22px] tracking-[0.02em]">{item.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Live Support */}
            <button onClick={() => { dispatch(toggleSidebar()); }} className="flex items-center justify-between w-full h-[50px] bg-[#112F82] hover:bg-[#153896] px-[10px] rounded-[8px] transition-colors cursor-pointer text-left focus:outline-none shrink-0 group">
              <div className="flex items-center gap-[12px] w-[160px] h-[22px]">
                <img src="/games/side-icon/live-support.svg" className="w-[20px] h-[20px] object-contain opacity-90 group-hover:opacity-100" alt="Live Support" />
                <span className="font-manrope font-semibold text-[16px] leading-[22px] tracking-[0.02em] text-[#D2DCF7] group-hover:text-white transition-colors">Live Support</span>
              </div>
            </button>

          </div>
        </div>

      </div>

    </>
  );
}
