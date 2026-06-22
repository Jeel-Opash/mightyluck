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
      {/* Ellipse 6: Glow behind the logo */}
      <div className="absolute w-[143px] h-[143px] left-[114px] top-[37px] -translate-y-1/2 bg-[#1463FF]/35 rounded-full blur-[25px] pointer-events-none z-0 hidden md:block" />

      <div className="w-full max-w-[1440px] mx-auto h-full flex flex-row justify-between items-center px-[20px] md:px-[24px] gap-4">

        {/* Left Section: Menu, Logo, Search */}
        <div className="flex flex-row items-center gap-2 sm:gap-4 md:gap-[51px] h-[40px] z-10 order-1 relative">

          {/* Menu Toggler - Hidden on mobile responsive per user request */}
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="hidden md:flex w-[24px] h-[24px] items-center justify-center hover:opacity-80 transition-opacity cursor-pointer focus:outline-none shrink-0"
            aria-label="Toggle Navigation Sidebar"
          >
            <img src="/images/Vector.png" className="w-[20.57px] h-[13.71px] object-contain" alt="Toggle Sidebar" />
          </button>

          {/* Horizontal logo */}
          <div className="flex flex-row items-center gap-[10px] cursor-pointer w-auto md:w-[190px] h-[30px] md:h-[34.66px] shrink-0 relative">
            {/* Dedicated crown glow for mobile when the main desktop Ellipse 6 is hidden */}
            <div className="absolute w-[45px] h-[45px] left-[17px] top-[12.5px] -translate-x-1/2 -translate-y-1/2 bg-[#1463FF]/55 rounded-full blur-[10px] pointer-events-none z-0 md:hidden" />

            {/* Logo Crown image from public/images/logo.svg */}
            <img src="/images/logo.svg" className="w-[34px] h-[25px] object-contain shrink-0 relative z-10" alt="Mighty Luck" />

            {/* Logo Text - Hidden on mobile per user request */}
            <span className="hidden sm:inline font-jost font-black text-white tracking-[0.02em] text-[19px] leading-[26px] z-10 relative">
              MIGHTY <span className="text-[#FFC83D]">LUCK</span>
            </span>
          </div>

          {/* Figma: Search Frame (Forms background #112F82, width 280px, height 40px) */}
          <div className="hidden sm:flex flex-row items-center gap-[10px] w-full max-w-[280px] h-[40px] bg-[#112F82] px-[20px] py-[10px] rounded-lg border border-white/5 focus-within:border-brand-accent/40 focus-within:bg-[#153896] transition-all duration-200 shrink-0">
            {/* Search Icon */}
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

            {/* Search Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="What are you looking for?"
              className="w-full h-[19px] bg-transparent border-none outline-none text-white text-[14px] leading-[19px] font-semibold font-sans placeholder-[#BBCAF3] focus:ring-0 p-0"
            />
          </div>

        </div>

        {/* Right Section: Auth Action Buttons or Logged-in UI */}
        <div className="flex flex-row items-center gap-[10px] w-auto h-[30px] md:h-[40px] z-10 order-2 relative shrink-0">

          {isAuthenticated && user ? (
            /* Logged-in UI */
            <div className="flex flex-row justify-end items-center p-0 gap-[4px] md:gap-[16px] h-[30px] md:h-[40px] z-10">
              {/* Dollar Container & Deposit Container Wrapper */}
              <div className="flex flex-row items-center p-0 gap-[4px] h-[30px] md:h-[40px]">
                {/* Dollar Container - always visible */}
                <div className="flex flex-row justify-center items-center px-[8px] py-[6px] md:px-[12px] md:py-[10px] lg:px-[30px] lg:py-[10px] gap-[10px] w-auto lg:w-[116px] h-[30px] md:h-[40px] bg-[#112F82] rounded-[6px] md:rounded-[8px] box-border">
                  <span className="font-manrope font-bold text-[12px] md:text-[14px] leading-[16px] md:leading-[19px] tracking-[0.02em] text-white whitespace-nowrap">
                    ${user.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                {/* Deposit Button - icon only on mobile, icon+text on md+ */}
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

              {/* Notification & Gift Buttons wrapper */}
              <div className="flex flex-row items-center p-0 gap-[4px] md:gap-[8px] h-[30px] md:h-[40px]">
                {/* Notification Button */}
                <button className="flex flex-row justify-center items-center w-[30px] h-[30px] md:w-[40px] md:h-[40px] p-0 bg-[#173EAD] rounded-[6px] border-none relative cursor-pointer box-border hover:bg-[#2051db] transition-colors shrink-0">
                  <div className="w-[16px] h-[16px] relative flex items-center justify-center">
                    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[13.74px] h-[16px]">
                      <path d="M7 16C7.9 16 8.62 15.28 8.62 14.38H5.38C5.38 15.28 6.1 16 7 16ZM12.27 11.12V7C12.27 4.87 11.13 3.09 9.14 2.62V2.12C9.14 1.5 8.64 1 8.02 1H5.98C5.36 1 4.86 1.5 4.86 2.12V2.62C2.86 3.09 1.73 4.86 1.73 7V11.12L0.1 12.75C-0.23 13.08 0 13.62 0.47 13.62H13.53C14 13.62 14.23 13.08 13.9 12.75L12.27 11.12Z" fill="#D2DCF7" />
                    </svg>
                  </div>
                  {/* Red dot */}
                  <div className="absolute w-[6px] h-[6px] md:w-[8px] md:h-[8px] left-[22px] md:left-[32px] top-0 bg-[#FF0E0E] rounded-full" />
                </button>

                {/* Gift Button */}
                <button className="flex flex-row justify-center items-center w-[30px] h-[30px] md:w-[40px] md:h-[40px] p-0 bg-[#173EAD] rounded-[6px] border-none relative cursor-pointer box-border hover:bg-[#2051db] transition-colors shrink-0">
                  <div className="w-[16px] h-[16px] relative flex items-center justify-center">
                    <img src="/images/bonus-icon.svg" className="w-[16px] h-[16px] object-contain" alt="Gift" />
                  </div>
                  {/* Red dot */}
                  <div className="absolute w-[6px] h-[6px] md:w-[8px] md:h-[8px] left-[22px] md:left-[32px] top-0 bg-[#FF0E0E] rounded-full" />
                </button>
              </div>

              {/* Profile Avatar Dropdown */}
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
                    {/* Overlay to close dropdown */}
                    <div
                      onClick={() => setProfileDropdownOpen(false)}
                      className="fixed inset-0 z-40 bg-transparent cursor-default"
                    />

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-2 w-[180px] bg-[#0E1B3D] border border-white/5 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-3 py-2 border-b border-white/5">
                        <p className="text-xs text-[#D2DCF7] font-semibold truncate">
                          {user.username || 'User'}
                        </p>
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
            /* Logged-out Buttons */
            <div className="flex flex-row items-center gap-[10px] h-[30px] md:h-[40px]">
              {/* Figma Frame: Login Button (Accent bg #1463FF) */}
              <button
                onClick={handleLoginClick}
                className="w-[74px] h-[30px] md:w-[99px] md:h-[40px] bg-[#1463FF] rounded-[6px] md:rounded-[8px] flex items-center justify-center font-sans font-bold text-[10.5px] md:text-[14px] leading-[14px] md:leading-[19px] text-white tracking-[0.02em] cursor-pointer hover:bg-[#2e74ff] active:scale-95 transition-all duration-200 shrink-0"
              >
                Login
              </button>

              {/* Figma Frame: Join Button (bg #FFC83D) */}
              <button
                onClick={handleJoinClick}
                className="w-[67px] h-[30px] md:w-[90px] md:h-[40px] bg-[#FFC83D] rounded-[6px] md:rounded-[8px] flex items-center justify-center font-sans font-bold text-[10.5px] md:text-[14px] leading-[14px] md:leading-[19px] text-[#1A1404] tracking-[0.02em] cursor-pointer hover:bg-[#ffd362] active:scale-95 transition-all duration-200 shrink-0"
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
