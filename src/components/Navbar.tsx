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
    dispatch(openAuthModal('login'));
  };

  const handleJoinClick = () => {
    dispatch(openAuthModal('join'));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] w-full h-[50px] md:h-[60px] bg-[#0C1F56] border-b border-white/5 select-none isolate shrink-0">
      {/* Ellipse 6: Glow behind the crown logo */}
      <div className="absolute w-[71.5px] h-[71.5px] left-[6px] top-[10px] bg-[#1463FF]/70 rounded-full filter blur-[12.5px] pointer-events-none z-0" />
      <div className="w-full max-w-[1440px] mx-auto h-full flex flex-row justify-between items-center px-[20px] md:px-[24px] gap-2 md:gap-[50px]">

        {/* Left Section: Menu, Logo, Search */}
        <div className="flex flex-row items-center gap-2 sm:gap-4 lg:gap-[51px] flex-1 h-[40px] z-10 order-1 relative">

          {/* Menu Toggler - Hidden on mobile responsive per user request */}
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="hidden md:flex w-[24px] h-[24px] items-center justify-center hover:opacity-80 transition-opacity cursor-pointer focus:outline-none shrink-0"
            aria-label="Toggle Navigation Sidebar"
          >
            <img src="/images/Vector.png" className="w-[20.57px] h-[13.71px] object-contain" alt="Toggle Sidebar" />
          </button>

          {/* Horizontal logo */}
          <div className="flex flex-row items-center gap-[10px] cursor-pointer w-auto h-[30px] md:h-[34.66px] shrink-0 relative">
            {/* Custom SVG Crown with Lightning Cutout (34px x 25px) */}
            <svg width="34" height="25" viewBox="0 0 34 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <defs>
                <linearGradient id="crown-gradient" x1="4.07382" y1="12.3753" x2="29.4186" y2="12.3753" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFD85A" />
                  <stop offset="1" stopColor="#FFB800" />
                </linearGradient>
              </defs>
              <path
                d="M33.1198 7.41853L24.191 11.0541C23.9175 11.1662 23.6056 11.0595 23.4552 10.8051L17.478 0.292432C17.2455 -0.104222 16.6655 -0.0960149 16.4467 0.308846L10.1796 10.8325C10.0346 11.1006 9.70631 11.2155 9.42455 11.0951L0.826733 7.41853C0.36169 7.21883 -0.122501 7.65925 0.027954 8.14071L5.1106 24.3269C5.18719 24.5731 5.41698 24.7427 5.67685 24.7427L27.4354 24.7482C27.6843 24.7482 27.9059 24.5923 27.9934 24.3598L33.9022 8.1708C34.0773 7.68661 33.5986 7.2243 33.1226 7.41853H33.1198ZM20.602 15.2668L16.351 22.7896C16.2908 22.8962 16.1321 22.8552 16.1266 22.7348L15.9543 18.1802H14.4689V18.1637C14.4306 18.1692 14.3923 18.1802 14.3513 18.1802H11.2683C11.178 18.1802 11.1206 18.0817 11.1616 18.0023L15.7437 9.51395C15.9051 9.23493 16.2005 9.06532 16.5206 9.06532H19.6035C19.6938 9.06532 19.7512 9.1638 19.7102 9.24313L16.5534 15.089H20.4953C20.5883 15.089 20.6458 15.1875 20.5993 15.2695L20.602 15.2668Z"
                fill="url(#crown-gradient)"
              />
            </svg>
            {/* Logo Text - Hidden on mobile per user request */}
            <span className="hidden sm:inline font-sans font-black text-white tracking-[0.02em] text-[20px] leading-[26px]">
              MIGHTY <span className="text-[#FFC83D]">LUCK</span>
            </span>
          </div>

          {/* Figma: Search Frame (Forms background #112F82, width 280px, height 40px) */}
          <div className="hidden sm:flex flex-row items-center gap-[10px] w-full max-w-[280px] h-[40px] bg-[#112F82] px-[20px] py-[10px] rounded-lg border border-white/5 focus-within:border-brand-accent/40 focus-within:bg-[#153896] transition-all duration-200 shrink-0">
            {/* Search Icon */}
            <svg width="16" height="15.99" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white shrink-0">
              <path
                d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
                stroke="#BBCAF3"
                strokeWidth="1.71429"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 14L11.1 11.1"
                stroke="#BBCAF3"
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
            <div className="flex flex-row justify-end items-center p-0 gap-[4px] md:gap-[8px] w-auto h-[30px] md:h-[40px] z-10">
              {/* Dollar Container & Deposit Container Wrapper */}
              <div className="flex flex-row items-center p-0 gap-[4px] w-auto h-[30px] md:h-[40px]">
                {/* Dollar Container - always visible */}
                <div className="flex flex-row justify-center items-center px-[8px] py-[6px] md:px-[12px] md:py-[10px] gap-[10px] w-auto h-[30px] md:h-[40px] bg-[#112F82] rounded-[6px] md:rounded-[8px] box-border">
                  <span className="font-manrope font-bold text-[12px] md:text-[14px] leading-[16px] md:leading-[19px] tracking-[0.02em] text-white whitespace-nowrap">
                    ${user.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                {/* Deposit Button - icon only on mobile, icon+text on sm+ */}
                <button
                  onClick={() => dispatch(openDepositModal())}
                  className="flex flex-row justify-center items-center p-0 w-[30px] h-[30px] md:w-auto md:px-[12px] md:py-[10px] gap-[8px] h-[30px] md:h-[40px] bg-[#FFC83D] rounded-[6px] md:rounded-[8px] border-none cursor-pointer box-border hover:bg-[#ffd362] active:scale-95 transition-all duration-200"
                >
                  <div className="w-[16px] h-[15px] flex shrink-0 items-center justify-center">
                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              <div className="flex flex-row items-center p-0 gap-[4px] md:gap-[8px] w-auto h-[30px] md:h-[40px]">
                {/* Notification Button */}
                <button className="flex flex-row justify-center items-center w-[30px] h-[30px] md:w-[40px] md:h-[40px] p-0 bg-[#173EAD] rounded-[6px] border-none relative cursor-pointer box-border hover:bg-[#2051db] transition-colors">
                  <div className="w-[16px] h-[16px] relative flex items-center justify-center">
                    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 16C7.9 16 8.62 15.28 8.62 14.38H5.38C5.38 15.28 6.1 16 7 16ZM12.27 11.12V7C12.27 4.87 11.13 3.09 9.14 2.62V2.12C9.14 1.5 8.64 1 8.02 1H5.98C5.36 1 4.86 1.5 4.86 2.12V2.62C2.86 3.09 1.73 4.86 1.73 7V11.12L0.1 12.75C-0.23 13.08 0 13.62 0.47 13.62H13.53C14 13.62 14.23 13.08 13.9 12.75L12.27 11.12Z" fill="#D2DCF7" />
                    </svg>
                  </div>
                  {/* Red dot */}
                  <div className="absolute w-[6px] h-[6px] md:w-[8px] md:h-[8px] left-[22px] md:left-[32px] top-0 bg-[#FF0E0E] rounded-full" />
                </button>

                {/* Gift Button */}
                <button className="flex flex-row justify-center items-center w-[30px] h-[30px] md:w-[40px] md:h-[40px] p-0 bg-[#173EAD] rounded-[6px] border-none relative cursor-pointer box-border hover:bg-[#2051db] transition-colors">
                  <div className="w-[16px] h-[16px] relative flex items-center justify-center">
                    <img src="/images/bonus-icon.svg" className="w-[16px] h-[16px] object-contain" alt="Gift" />
                  </div>
                  {/* Red dot */}
                  <div className="absolute w-[6px] h-[6px] md:w-[8px] md:h-[8px] left-[22px] md:left-[32px] top-0 bg-[#FF0E0E] rounded-full" />
                </button>
              </div>

              {/* Profile Avatar Dropdown */}
              <div className="relative w-[30px] h-[30px] md:w-[40px] md:h-[40px]">
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
