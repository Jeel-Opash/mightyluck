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
    if (window.innerWidth < 1024) { router.push('/auth/login'); return; }
    dispatch(openAuthModal('login'));
  };

  const handleJoinClick = () => {
    if (window.innerWidth < 1024) { router.push('/auth/register'); return; }
    dispatch(openAuthModal('join'));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] w-full h-[50px] md:h-[60px] bg-[#0C1F56] border-b border-white/5 select-none isolate shrink-0">

      {/* =========================================================================
          1. DESKTOP HEADER LAYOUT (md and up) - UNCHANGED
         ========================================================================= */}
      <div className="hidden md:flex w-full max-w-[1440px] mx-auto h-full flex-row justify-between items-center px-[24px] gap-2 lg:gap-4 relative">
        {/* Glow wrapper to prevent leaking below/above the navbar */}
        <div className="absolute inset-y-0 left-0 right-0 overflow-hidden pointer-events-none z-0">
          {/* Ellipse 6 */}
          <div
            style={{
              position: 'absolute',
              width: '143px',
              height: '143px',
              left: '114px',
              top: '37px',
              background: '#1463FF',
              filter: 'blur(25px)',
              zIndex: 0,
            }}
          />
        </div>

        {/* Left Section: Menu, Logo, Search */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '0px',
            gap: '51px',
            height: '40px',
            zIndex: 1,
            minWidth: 0,
            flex: '1 1 auto',
          }}
          className="order-1 relative"
        >
          {/* Menu Toggler */}
          <button
            onClick={() => dispatch(toggleSidebar())}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0px',
              flexShrink: 0,
            }}
            className="hover:opacity-80 transition-opacity focus:outline-none"
            aria-label="Toggle Navigation Sidebar"
          >
            <img src="/images/Vector.png" style={{ width: '20.57px', height: '13.71px', objectFit: 'contain' }} alt="Toggle Sidebar" />
          </button>

          {/* Horizontal logo */}
          <div
            onClick={() => router.push('/')}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '10px',
              width: '190px',
              height: '34.66px',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <img src="/images/logo.svg" style={{ width: '34px', height: '25px', objectFit: 'contain', flexShrink: 0 }} alt="Mighty Luck" />
            <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, color: '#FFFFFF', fontSize: '19px', lineHeight: '26px', letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>
              MIGHTY <span style={{ color: '#FFC83D' }}>LUCK</span>
            </span>
          </div>

          {/* Search Frame */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '10px 20px',
              gap: '10px',
              width: '280px',
              maxWidth: '280px',
              minWidth: '120px',
              height: '40px',
              background: '#112F82',
              borderRadius: '8px',
              flex: '1 1 auto',
            }}
          >
            <svg width="16" height="15.99" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#BBCAF3', flexShrink: 0 }}>
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
              style={{
                width: '100%',
                height: '19px',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 600,
                fontSize: '14px',
                lineHeight: '19px',
                color: '#BBCAF3',
                padding: '0px',
              }}
              className="placeholder-[#BBCAF3] focus:ring-0"
            />
          </div>
        </div>

        {/* Right Section: Auth Action Buttons or Logged-in UI */}
        <div className="flex flex-row items-center gap-[10px] w-auto h-[30px] md:h-[40px] z-10 order-2 relative shrink-0 min-w-0">
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
            /* Guest desktop: Login + Join buttons per Figma spec */
            <div className="flex flex-row items-center gap-[10px] w-[199px] h-[40px]">
              <button
                onClick={handleLoginClick}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '10px 30px',
                  gap: '10px',
                  width: '99px',
                  height: '40px',
                  background: '#1463FF',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 700,
                  fontSize: '14px',
                  lineHeight: '19px',
                  letterSpacing: '0.02em',
                  color: '#FFFFFF',
                  flexShrink: 0,
                  boxSizing: 'border-box',
                }}
                className="hover:bg-[#2e74ff] active:scale-95 transition-all duration-200"
              >
                Login
              </button>
              <button
                onClick={handleJoinClick}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '10px 30px',
                  gap: '10px',
                  width: '90px',
                  height: '40px',
                  background: '#FFC83D',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 700,
                  fontSize: '14px',
                  lineHeight: '19px',
                  letterSpacing: '0.02em',
                  color: '#1A1404',
                  flexShrink: 0,
                  boxSizing: 'border-box',
                }}
                className="hover:bg-[#ffd362] active:scale-95 transition-all duration-200"
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
              background: '#1463FF',
              filter: 'blur(12.5px)',
              zIndex: 0,
            }}
            className="rounded-full pointer-events-none"
          />
        </div>

        {/* Inner Wrapper Frame 7: Responsive width */}
        <div className="w-full h-[30px] flex flex-row justify-between items-center gap-[2px] z-10 box-border">

          {/* Logo Frame */}
          <div
            onClick={() => router.push('/')}
            className="flex flex-row items-center gap-[8px] w-auto h-[30px] shrink-0 box-border cursor-pointer z-10"
          >
            <img
              src="/images/logo.svg"
              style={{
                width: '33.94px',
                height: '24.75px',
              }}
              className="object-contain shrink-0"
              alt="Mighty Luck"
            />
            <span
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: '10.5px',
                lineHeight: '100%',
                letterSpacing: '0.02em',
              }}
              className="hidden min-[768px]:inline text-white whitespace-nowrap"
            >
              MIGHTY <span style={{ color: '#FFC83D' }}>LUCK</span>
            </span>
          </div>

          {/* Right Section Wrapper */}
          {isAuthenticated && user ? (
            /* Logged-in mobile UI: width 238px x 30px */
            <div className="flex flex-row justify-end items-center gap-[16px] w-[238px] h-[30px] shrink-0 box-border">

              {/* Balance & Deposit Frame: 116px x 30px */}
              <div className="flex flex-row items-center gap-[4px] w-[116px] h-[30px] shrink-0 box-border">

                {/* Balance container: 82px x 30px */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '8px 20px',
                    gap: '7.5px',
                    width: '85px',
                    height: '30px',
                    background: '#112F82',
                    borderRadius: '6px',
                    boxSizing: 'border-box',
                  }}
                  className="shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)] border border-white/5"
                >
                  <span className="font-manrope font-bold text-[10.5px] leading-[14px] tracking-[0.02em] text-white whitespace-nowrap">
                    ${user.balance.toLocaleString('en-US', { minimumFractionDigits: 2 }).replace('.', ',')}
                  </span>
                </div>

                {/* Deposit button: 30px x 30px */}
                <button
                  onClick={() => dispatch(openDepositModal())}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '8px',
                    width: '30px',
                    height: '30px',
                    background: '#FFC83D',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                  }}
                  className="hover:bg-[#ffd362] active:scale-95 transition-all shadow-[0_2px_8px_rgba(255,200,61,0.35)] flex items-center justify-center shrink-0"
                >
                  <img
                    src="/mobile/navbar/wallet.svg"
                    className="w-[12px] h-[12px] object-contain shrink-0"
                    style={{
                      filter: 'brightness(0) saturate(100%) invert(8%) sepia(8%) saturate(5436%) hue-rotate(204deg) brightness(91%) contrast(96%)'
                    }}
                    alt="Deposit"
                  />
                </button>
              </div>

              {/* Action buttons (Notification, Gift, Avatar) Frame: 106px x 30px */}
              <div className="flex flex-row items-center gap-[8px] w-[106px] h-[30px] shrink-0 box-border">

                {/* Notification: 30px x 30px */}
                <button
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '7.5px 9px',
                    gap: '7.5px',
                    width: '30px',
                    height: '30px',
                    background: '#173EAD',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    position: 'relative',
                    boxSizing: 'border-box',
                  }}
                  className="hover:bg-[#2051db] active:scale-95 transition-colors shadow-[0_2px_8px_rgba(23,62,173,0.35)] border border-white/5 shrink-0"
                >
                  <img
                    src="/mobile/navbar/bell.png"
                    className="w-[12px] h-[12px] object-contain shrink-0"
                    style={{
                      filter: 'brightness(0) saturate(100%) invert(91%) sepia(5%) saturate(1282%) hue-rotate(188deg) brightness(101%) contrast(94%)'
                    }}
                    alt="Notifications"
                  />
                  {/* Red dot badge */}
                  <div
                    style={{
                      position: 'absolute',
                      width: '8px',
                      height: '8px',
                      left: '22px',
                      top: '0px',
                      background: '#FF0E0E',
                      borderRadius: '50px',
                      zIndex: 1,
                    }}
                  />
                </button>

                {/* Gift: 30px x 30px */}
                <button
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '7.5px 9px',
                    gap: '7.5px',
                    width: '30px',
                    height: '30px',
                    background: '#173EAD',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    position: 'relative',
                    boxSizing: 'border-box',
                  }}
                  className="hover:bg-[#2051db] active:scale-95 transition-colors shadow-[0_2px_8px_rgba(23,62,173,0.35)] border border-white/5 shrink-0"
                >
                  <img
                    src="/mobile/navbar/gift.png"
                    className="w-[12px] h-[12px] object-contain shrink-0"
                    style={{
                      filter: 'brightness(0) saturate(100%) invert(91%) sepia(5%) saturate(1282%) hue-rotate(188deg) brightness(101%) contrast(94%)'
                    }}
                    alt="Gift"
                  />
                  {/* Red dot badge */}
                  <div
                    style={{
                      position: 'absolute',
                      width: '8px',
                      height: '8px',
                      left: '22px',
                      top: '0px',
                      background: '#FF0E0E',
                      borderRadius: '50px',
                      zIndex: 1,
                    }}
                  />
                </button>

                {/* Avatar: 30px x 30px */}
                <div className="relative w-[30px] h-[30px] shrink-0">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      boxSizing: 'border-box',
                    }}
                    className="overflow-hidden flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.35)] border border-white/10 active:scale-95 transition-transform"
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
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 700,
                  fontSize: '10.5px',
                  lineHeight: '100%',
                  letterSpacing: '0.02em',
                }}
                className="w-[74px] h-[30px] bg-[#1463FF] rounded-[6px] flex items-center justify-center text-white cursor-pointer hover:bg-[#2e74ff] active:scale-95 transition-all shadow-[0_2px_8px_rgba(20,99,255,0.35)] border border-white/5"
              >
                Login
              </button>
              <button
                onClick={handleJoinClick}
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 700,
                  fontSize: '10.5px',
                  lineHeight: '100%',
                  letterSpacing: '0.02em',
                }}
                className="w-[67px] h-[30px] bg-[#FFC83D] rounded-[6px] flex items-center justify-center text-[#1A1404] cursor-pointer hover:bg-[#ffd362] active:scale-95 transition-all shadow-[0_2px_8px_rgba(255,200,61,0.35)] border border-white/5"
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
