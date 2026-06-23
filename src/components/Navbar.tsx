'use client';

import { useAppDispatch, useAppSelector } from '@/redux/store';
import { toggleSidebar, setSearchQuery, openAuthModal, openDepositModal } from '@/redux/features/uiSlice';
import { logout } from '@/redux/features/authSlice';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const searchQuery = useAppSelector((state) => state.ui.searchQuery);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleLoginClick = () => {
    if (window.innerWidth < 768) { router.push('/auth/login'); return; }
    dispatch(openAuthModal('login'));
  };

  const handleJoinClick = () => {
    if (window.innerWidth < 768) { router.push('/auth/register'); return; }
    dispatch(openAuthModal('join'));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] w-full h-[50px] md:h-[60px] bg-[#0C1F56] border-b border-white/5 select-none isolate shrink-0">

      {/* =========================================================================
          1. DESKTOP HEADER LAYOUT (md and up) - UNCHANGED
         ========================================================================= */}
      <div className="hidden md:flex w-full max-w-[1440px] mx-auto h-full flex-row justify-between items-center px-[24px] gap-4 relative">
        {/* Glow wrapper to prevent leaking below/above the navbar */}
        <div className="absolute inset-y-0 left-0 right-0 overflow-hidden pointer-events-none z-0">
          {/* Ellipse 6: Glow behind the logo */}
          <div className="absolute w-[143px] h-[143px] left-[114px] top-[37px] -translate-y-1/2 bg-[#1463FF] rounded-full blur-[25px] pointer-events-none" />
        </div>

        {/* Left Section: Menu, Logo, Search */}
        <div className="flex flex-row items-center gap-2 sm:gap-4 md:gap-[51px] h-[40px] z-10 order-1 relative">
          {/* Menu Toggler */}
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="flex w-[24px] h-[24px] items-center justify-center hover:opacity-80 transition-opacity cursor-pointer focus:outline-none shrink-0"
            aria-label="Toggle Navigation Sidebar"
          >
            <img src="/images/Vector.png" className="w-[20.57px] h-[13.71px] object-contain" alt="Toggle Sidebar" />
          </button>

          {/* Horizontal logo */}
          <div className="flex flex-row items-center gap-[10px] cursor-pointer w-auto md:w-[190px] h-[30px] md:h-[34.66px] shrink-0 relative">
            <img src="/images/logo.svg" className="w-[34px] h-[25px] object-contain shrink-0 relative z-10" alt="Mighty Luck" />
            <span className="hidden sm:inline font-jost font-black text-white tracking-[0.02em] text-[19px] leading-[26px] z-10 relative">
              MIGHTY <span className="text-[#FFC83D]">LUCK</span>
            </span>
          </div>

          {/* Search Frame */}
          <div className="hidden sm:flex flex-row items-center gap-[10px] w-full max-w-[280px] h-[40px] bg-[#112F82] px-[20px] py-[10px] rounded-lg border border-white/5 focus-within:border-brand-accent/40 focus-within:bg-[#153896] transition-all duration-200 shrink-0">
            <svg width="16" height="15.99" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#BBCAF3] shrink-0">
              <path
                d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
                stroke="currentColor"
                strokeWidth="1.71429"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 14L11.1 11.1"
                stroke="currentColor"
                strokeWidth="1.71429"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="What are you looking for?"
              className="w-full h-[19px] bg-transparent border-none outline-none text-white text-[14px] leading-[19px] font-semibold font-manrope placeholder-[#BBCAF3] focus:ring-0 p-0"
            />
          </div>
        </div>

        {/* Right Section: Auth Action Buttons or Logged-in UI */}
        <div className="flex flex-row items-center gap-[10px] w-auto h-[30px] md:h-[40px] z-10 order-2 relative shrink-0">
          {isAuthenticated && user ? (
            <div className="flex flex-row justify-end items-center p-0 gap-[4px] md:gap-[16px] h-[30px] md:h-[40px] z-10">
              <div className="flex flex-row items-center p-0 gap-[4px] h-[30px] md:h-[40px]">
                <div className="flex flex-row justify-center items-center px-[8px] py-[6px] md:px-[12px] md:py-[10px] lg:px-[30px] lg:py-[10px] gap-[10px] w-auto lg:w-[116px] h-[30px] md:h-[40px] bg-[#112F82] rounded-[6px] md:rounded-[8px] box-border">
                  <span className="font-manrope font-bold text-[12px] md:text-[14px] leading-[16px] md:leading-[19px] tracking-[0.02em] text-white whitespace-nowrap">
                    ${user.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <button
                  onClick={() => dispatch(openDepositModal())}
                  className="flex flex-row justify-center items-center p-0 w-[30px] h-[30px] md:w-auto md:px-[12px] md:py-[10px] lg:w-[110px] lg:h-[40px] lg:px-[16px] lg:py-[10px] gap-[8px] bg-[#FFC83D] rounded-[6px] md:rounded-[8px] border-none cursor-pointer box-border hover:bg-[#ffd362] active:scale-95 transition-all duration-200 shrink-0"
                >
                  <div className="w-[16px] h-[16px] flex shrink-0 items-center justify-center relative">
                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute w-[16px] h-[14.37px]">
                      <path d="M14 3.5H2C1.45 3.5 1 3.95 1 4.5V12.5C1 13.05 1.45 13.5 2 13.5H14C14.55 13.5 15 13.05 15 12.5V4.5C15 3.95 14.55 3.5 14 3.5Z" stroke="#1A1404" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M12 1.5H3C2.45 1.5 2 1.95 2 2.5H14C14 1.95 13.55 1.5 12 1.5Z" stroke="#1A1404" strokeWidth="1.5" strokeLinejoin="round" />
                      <circle cx="12" cy="8.5" r="1.5" fill="#1A1404" />
                    </svg>
                  </div>
                  <span className="hidden md:inline font-manrope font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-[#1A1404]">
                    Deposit
                  </span>
                </button>
              </div>

              <div className="flex flex-row items-center p-0 gap-[4px] md:gap-[8px] h-[30px] md:h-[40px]">
                <button className="flex flex-row justify-center items-center w-[30px] h-[30px] md:w-[40px] md:h-[40px] p-0 bg-[#173EAD] rounded-[6px] border-none relative cursor-pointer box-border hover:bg-[#2051db] transition-colors shrink-0">
                  <div className="w-[16px] h-[16px] relative flex items-center justify-center">
                    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[13.74px] h-[16px]">
                      <path d="M7 16C7.9 16 8.62 15.28 8.62 14.38H5.38C5.38 15.28 6.1 16 7 16ZM12.27 11.12V7C12.27 4.87 11.13 3.09 9.14 2.62V2.12C9.14 1.5 8.64 1 8.02 1H5.98C5.36 1 4.86 1.5 4.86 2.12V2.62C2.86 3.09 1.73 4.86 1.73 7V11.12L0.1 12.75C-0.23 13.08 0 13.62 0.47 13.62H13.53C14 13.62 14.23 13.08 13.9 12.75L12.27 11.12Z" fill="#D2DCF7" />
                    </svg>
                  </div>
                  <div className="absolute w-[6px] h-[6px] md:w-[8px] md:h-[8px] left-[22px] md:left-[32px] top-0 bg-[#FF0E0E] rounded-full" />
                </button>

                <button className="flex flex-row justify-center items-center w-[30px] h-[30px] md:w-[40px] md:h-[40px] p-0 bg-[#173EAD] rounded-[6px] border-none relative cursor-pointer box-border hover:bg-[#2051db] transition-colors shrink-0">
                  <div className="w-[16px] h-[16px] relative flex items-center justify-center">
                    <img src="/images/bonus-icon.svg" className="w-[16px] h-[16px] object-contain" alt="Gift" />
                  </div>
                  <div className="absolute w-[6px] h-[6px] md:w-[8px] md:h-[8px] left-[22px] md:left-[32px] top-0 bg-[#FF0E0E] rounded-full" />
                </button>
              </div>

              <div className="relative w-[30px] h-[30px] md:w-[40px] md:h-[40px] shrink-0">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full border-none cursor-pointer p-0 bg-none overflow-hidden flex items-center justify-center"
                >
                  <img
                    src="/image.png"
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </button>

                {profileDropdownOpen && (
                  <>
                    <div onClick={() => setProfileDropdownOpen(false)} className="fixed inset-0 z-40 bg-transparent cursor-default" />
                    <div className="absolute right-0 mt-2 w-[180px] bg-[#0E1B3D] border border-white/5 rounded-xl shadow-2xl p-2 z-50">
                      <div className="px-3 py-2 border-b border-white/5">
                        <p className="text-xs text-[#D2DCF7] font-semibold truncate">{user.username || 'User'}</p>
                      </div>
                      <button
                        onClick={() => {
                          router.push('/referrals');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-[#FFC83D] hover:bg-white/5 transition-colors font-semibold cursor-pointer mt-1 flex items-center gap-2"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        Refer a Friend
                      </button>
                      <button
                        onClick={async () => {
                          try {
                            await fetch('/api/auth/logout', { method: 'POST' });
                          } catch (err) {
                            console.error('Logout error:', err);
                          }
                          dispatch(logout());
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-white/5 transition-colors font-semibold cursor-pointer mt-1"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-row items-center gap-[10px] h-[30px] md:h-[40px]">
              <button
                onClick={handleLoginClick}
                className="w-[74px] h-[30px] md:w-[99px] md:h-[40px] bg-[#1463FF] rounded-[6px] md:rounded-[8px] flex items-center justify-center font-manrope font-bold text-[10.5px] md:text-[14px] leading-[14px] md:leading-[19px] text-white tracking-[0.02em] cursor-pointer hover:bg-[#2e74ff] active:scale-95 transition-all duration-200 shrink-0"
              >
                Login
              </button>
              <button
                onClick={handleJoinClick}
                className="w-[67px] h-[30px] md:w-[90px] md:h-[40px] bg-[#FFC83D] rounded-[6px] md:rounded-[8px] flex items-center justify-center font-manrope font-bold text-[10.5px] md:text-[14px] leading-[14px] md:leading-[19px] text-[#1A1404] tracking-[0.02em] cursor-pointer hover:bg-[#ffd362] active:scale-95 transition-all duration-200 shrink-0"
              >
                Join
              </button>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          2. MOBILE HEADER LAYOUT (md:hidden) - FIGMA SPECIFICATIONS
         ========================================================================= */}
      <div className="md:hidden w-full h-[50px] bg-[#0C1F56] px-[20px] flex items-center justify-between relative overflow-visible box-border">

        {/* Glow wrapper to prevent leaking below/above the navbar */}
        <div className="absolute inset-y-0 left-0 right-0 overflow-hidden pointer-events-none z-0">
          {/* Ellipse 6: Glow behind the logo */}
          <div 
            style={{
              position: 'absolute',
              width: '71.5px',
              height: '71.5px',
              left: '6px',
              top: '32px',
              transform: 'translateY(-50%)',
              background: '#1463FF',
              filter: 'blur(12.5px)',
              borderRadius: '50%',
            }} 
          />
        </div>

        {/* Inner Wrapper Frame 7: 374px x 30px */}
        <div className="w-[374px] max-w-full h-[30px] flex flex-row justify-between items-center gap-[2px] z-10 box-border">

          {/* Logo Frame: 44px x 30px */}
          <div className="flex flex-row items-center gap-[8px] w-[44px] h-[30px] shrink-0 box-border">
            <img src="/images/logo.svg" className="w-[44px] h-[30px] object-contain shrink-0" alt="Mighty Luck" />
          </div>

          {/* Right Section Wrapper */}
          {isAuthenticated && user ? (
            /* Logged-in mobile UI: width 238px x 30px */
            <div className="flex flex-row justify-end items-center gap-[16px] w-[238px] h-[30px] shrink-0 box-border">

              {/* Balance & Deposit Frame: 116px x 30px */}
              <div className="flex flex-row items-center gap-[4px] w-[116px] h-[30px] shrink-0 box-border">

                {/* Balance container: 82px x 30px */}
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '8px 20px', gap: '7.5px', width: '82px', height: '30px', background: '#112F82', borderRadius: '6px', boxSizing: 'border-box' }}>
                  <span className="font-manrope font-bold text-[10.5px] leading-[14px] tracking-[0.02em] text-white whitespace-nowrap">
                    ${user.balance.toLocaleString('en-US', { minimumFractionDigits: 2 }).replace('.', ',')}
                  </span>
                </div>

                {/* Deposit button: 30px x 30px */}
                <button
                  onClick={() => dispatch(openDepositModal())}
                  style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '8px', width: '30px', height: '30px', background: '#FFC83D', borderRadius: '6px', border: 'none', cursor: 'pointer', boxSizing: 'border-box' }}
                >
                  <img src="/mobile/navbar/wallet.svg" className="w-[12px] h-[12px] object-contain shrink-0" alt="Deposit" />
                </button>
              </div>

              {/* Action buttons (Notification, Gift, Avatar) Frame: 106px x 30px */}
              <div className="flex flex-row items-center gap-[8px] w-[106px] h-[30px] shrink-0 box-border">

                {/* Notification: 30px x 30px */}
                <button className="flex flex-row justify-center items-center w-[30px] h-[30px] p-[7.5px_9px] bg-[#173EAD] rounded-[6px] border-none relative cursor-pointer hover:bg-[#2051db] transition-colors shrink-0">
                  <img src="/mobile/navbar/bell.png" className="w-[12px] h-[12px] object-contain shrink-0" alt="Notifications" />
                  {/* Red dot badge */}
                  <div className="absolute w-[8px] h-[8px] left-[22px] top-0 bg-[#FF0E0E] rounded-[50px]" />
                </button>

                {/* Gift: 30px x 30px */}
                <button className="flex flex-row justify-center items-center w-[30px] h-[30px] p-[7.5px_9px] bg-[#173EAD] rounded-[6px] border-none relative cursor-pointer hover:bg-[#2051db] transition-colors shrink-0">
                  <img src="/mobile/navbar/gift.png" className="w-[12px] h-[12px] object-contain shrink-0" alt="Gift" />
                  {/* Red dot badge */}
                  <div className="absolute w-[8px] h-[8px] left-[22px] top-0 bg-[#FF0E0E] rounded-[50px]" />
                </button>

                {/* Avatar: 30px x 30px */}
                <div className="relative w-[30px] h-[30px] shrink-0">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="w-[30px] h-[30px] rounded-full border-none cursor-pointer p-0 bg-none overflow-hidden flex items-center justify-center"
                  >
                    <img
                      src="/image.png"
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  </button>

                  {profileDropdownOpen && (
                    <>
                      <div onClick={() => setProfileDropdownOpen(false)} className="fixed inset-0 z-[70] bg-transparent" />
                      <div className="absolute right-0 mt-2 w-[180px] bg-[#0E1B3D] border border-white/5 rounded-xl shadow-2xl p-2 z-[80] animate-in fade-in duration-150">
                        <div className="px-3 py-2 border-b border-white/5">
                          <p className="text-xs text-[#D2DCF7] font-semibold truncate">{user.username || 'User'}</p>
                        </div>
                        <button
                          onClick={() => {
                            router.push('/referrals');
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-[#FFC83D] hover:bg-white/5 transition-colors font-semibold cursor-pointer mt-1 flex items-center gap-2"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                          Refer a Friend
                        </button>
                        <button
                          onClick={async () => {
                            try {
                              await fetch('/api/auth/logout', { method: 'POST' });
                            } catch (err) {
                              console.error(err);
                            }
                            dispatch(logout());
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-white/5 transition-colors font-semibold cursor-pointer mt-1"
                        >
                          Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

            </div>
          ) : (
            /* Logged-out mobile UI */
            <div className="flex flex-row items-center gap-[10px] h-[30px]">
              <button
                onClick={handleLoginClick}
                className="w-[74px] h-[30px] bg-[#1463FF] rounded-[6px] flex items-center justify-center font-sans font-bold text-[10.5px] text-white tracking-[0.02em] cursor-pointer hover:bg-[#2e74ff] active:scale-95 transition-all"
              >
                Login
              </button>
              <button
                onClick={handleJoinClick}
                className="w-[67px] h-[30px] bg-[#FFC83D] rounded-[6px] flex items-center justify-center font-sans font-bold text-[10.5px] text-[#1A1404] tracking-[0.02em] cursor-pointer hover:bg-[#ffd362] active:scale-95 transition-all"
              >
                Join
              </button>
            </div>
          )}

        </div>
      </div>

    </header>
  );
}
