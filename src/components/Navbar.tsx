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
    <header className="relative z-[60] w-full h-[60px] bg-[#0C1F56] border-b border-white/5 select-none isolate shrink-0">
      <div className="w-full max-w-[1440px] mx-auto h-full flex flex-row justify-between items-center px-3 sm:px-[24px] gap-2 sm:gap-[50px]">

        {/* Left Section: Menu, Logo, Search */}
        <div className="flex flex-row items-center gap-2 sm:gap-4 lg:gap-[51px] flex-1 h-[40px] z-10 order-1 relative">

          {/* Menu Toggler */}
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="w-[24px] h-[24px] flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer focus:outline-none shrink-0"
            aria-label="Toggle Navigation Sidebar"
          >
            <img src="/images/Vector.png" className="w-[20.57px] h-[13.71px] object-contain" alt="Toggle Sidebar" />
          </button>

          {/* Horizontal logo (190px x 34.66px) */}
          <div className="flex flex-row items-center gap-[10px] cursor-pointer w-auto h-[34.66px] shrink-0 relative">
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
            {/* Logo Text */}
            <span className="font-sans font-black text-white tracking-[0.02em] text-[20px] leading-[26px]">
              MIGHTY <span className="text-[#FFC83D]">LUCK</span>
            </span>
          </div>

          {/* Figma: Search Frame (Forms background #112F82, width 280px, height 40px) */}
          <div className="hidden sm:flex flex-row items-center gap-[10px] w-full max-w-[280px] h-[40px] bg-[#112F82] px-[20px] py-[10px] rounded-lg border border-white/5 focus-within:border-brand-accent/40 focus-within:bg-[#153896] transition-all duration-200 shrink-0">
            {/* Search Icon (image 23 Traced 16px x 15.99px) */}
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
        <div className="flex flex-row items-center gap-[10px] w-auto h-[40px] z-10 order-2 relative shrink-0">

          {isAuthenticated && user ? (
            /* Logged-in UI */
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              padding: '0px',
              gap: '8px',
              width: 'auto',
              height: '40px',
              zIndex: 2,
            }}>
              {/* Dollar Container & Deposit Container Wrapper */}
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '0px',
                gap: '4px',
                width: 'auto',
                height: '40px',
              }}>
                {/* Dollar Container - hidden on xs, shown on sm+ */}
                <div className="hidden sm:flex" style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '10px 16px',
                  gap: '10px',
                  width: 'auto',
                  height: '40px',
                  background: '#112F82',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                }}>
                  <span style={{
                    width: '56px',
                    height: '19px',
                    fontFamily: "'Manrope', sans-serif",
                    fontStyle: 'normal',
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: '19px',
                    letterSpacing: '0.02em',
                    color: '#FFFFFF',
                    textAlign: 'center',
                  }}>
                    ${user.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                {/* Deposit Button */}
                <button
                  onClick={() => dispatch(openDepositModal())}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px 16px',
                    gap: '8px',
                    width: '110px',
                    height: '40px',
                    background: '#FFC83D',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                  }}
                >
                  {/* Wallet Icon */}
                  <div style={{ width: '16px', height: '16px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 3.5H2C1.45 3.5 1 3.95 1 4.5V12.5C1 13.05 1.45 13.5 2 13.5H14C14.55 13.5 15 13.05 15 12.5V4.5C15 3.95 14.55 3.5 14 3.5Z" stroke="#1A1404" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M12 1.5H3C2.45 1.5 2 1.95 2 2.5H14C14 1.95 13.55 1.5 12 1.5Z" stroke="#1A1404" strokeWidth="1.5" strokeLinejoin="round" />
                      <circle cx="12" cy="8.5" r="1.5" fill="#1A1404" />
                    </svg>
                  </div>
                  <span style={{
                    width: '54px',
                    height: '19px',
                    fontFamily: "'Manrope', sans-serif",
                    fontStyle: 'normal',
                    fontWeight: 600,
                    fontSize: '14px',
                    lineHeight: '19px',
                    letterSpacing: '0.02em',
                    color: '#1A1404',
                  }}>
                    Deposit
                  </span>
                </button>
              </div>

              <div className="hidden xs:flex sm:flex" style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: '0px',
                gap: '8px',
                width: 'auto',
                height: '40px',
              }}>
                {/* Notification Button */}
                <button style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '10px 12px',
                  gap: '10px',
                  isolation: 'isolate',
                  width: '40px',
                  height: '40px',
                  background: '#173EAD',
                  borderRadius: '6px',
                  border: 'none',
                  position: 'relative',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                }}>
                  <div style={{ width: '16px', height: '16px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 16C7.9 16 8.62 15.28 8.62 14.38H5.38C5.38 15.28 6.1 16 7 16ZM12.27 11.12V7C12.27 4.87 11.13 3.09 9.14 2.62V2.12C9.14 1.5 8.64 1 8.02 1H5.98C5.36 1 4.86 1.5 4.86 2.12V2.62C2.86 3.09 1.73 4.86 1.73 7V11.12L0.1 12.75C-0.23 13.08 0 13.62 0.47 13.62H13.53C14 13.62 14.23 13.08 13.9 12.75L12.27 11.12Z" fill="#D2DCF7" />
                    </svg>
                  </div>
                  {/* Red dot */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '3.07692px',
                    gap: '3.08px',
                    position: 'absolute',
                    width: '8px',
                    height: '8px',
                    left: '32px',
                    top: '0px',
                    background: '#FF0E0E',
                    borderRadius: '66.6667px',
                  }} />
                </button>

                {/* Gift Button */}
                <button style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '10px 12px',
                  gap: '10px',
                  isolation: 'isolate',
                  width: '40px',
                  height: '40px',
                  background: '#173EAD',
                  borderRadius: '6px',
                  border: 'none',
                  position: 'relative',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                }}>
                  <div style={{ width: '16px', height: '16px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src="/images/bonus-icon.svg" style={{ width: '16px', height: '16px', objectFit: 'contain' }} alt="Gift" />
                  </div>
                  {/* Red dot */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '3.07692px',
                    gap: '3.08px',
                    position: 'absolute',
                    width: '8px',
                    height: '8px',
                    left: '32px',
                    top: '0px',
                    background: '#FF0E0E',
                    borderRadius: '66.6667px',
                  }} />
                </button>
              </div>

              {/* Profile Avatar Dropdown */}
              <div className="relative" style={{ width: '40px', height: '40px' }}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0px',
                    background: 'none',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src="/image.png"
                    alt="User Avatar"
                    style={{
                      width: '40px',
                      height: '40px',
                      objectFit: 'cover',
                    }}
                  />
                </button>

                {profileDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-20" onClick={() => setProfileDropdownOpen(false)} />
                    <div className="absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-[#0C1F56] p-2 shadow-2xl z-30">
                      <div className="px-3 py-2 border-b border-white/5 text-xs text-brand-text-muted">
                        Logged in as <strong className="text-white block truncate">{user.username}</strong>
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
            <>
              {/* Figma Frame: Login Button (Accent bg #1463FF, width 99px, height 40px) */}
              <button
                onClick={handleLoginClick}
                className="w-[99px] h-[40px] bg-[#1463FF] rounded-[8px] flex items-center justify-center font-sans font-bold text-[14px] leading-[19px] text-white tracking-[0.02em] cursor-pointer hover:bg-[#2e74ff] active:scale-95 transition-all duration-200 shrink-0"
              >
                Login
              </button>

              {/* Figma Frame: Join Button (bg #FFC83D, width 90px, height 40px) */}
              <button
                onClick={handleJoinClick}
                className="w-[90px] h-[40px] bg-[#FFC83D] rounded-[8px] flex items-center justify-center font-sans font-bold text-[14px] leading-[19px] text-[#1A1404] tracking-[0.02em] cursor-pointer hover:bg-[#ffd362] active:scale-95 transition-all duration-200 shrink-0"
              >
                Join
              </button>
            </>
          )}

        </div>
      </div>
    </header>
  );
}
