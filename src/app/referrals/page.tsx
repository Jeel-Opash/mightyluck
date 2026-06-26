'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { openDepositModal, toggleSidebar, openAuthModal, openAllGamesModal } from '@/redux/features/uiSlice';

export default function ReferralsPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Auth protection check
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
      dispatch(openAuthModal('join'));
    }
  }, [isAuthenticated, router, dispatch]);

  // States
  const [invitedFriends, setInvitedFriends] = useState(5);
  const [emailAddress, setEmailAddress] = useState('');
  const [inviteStatus, setInviteStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [claimStatus, setClaimStatus] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0); // First FAQ open by default

  const monthlyEarnings = invitedFriends * 50; // 5 friends = $250

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailAddress) return;
    setInviteStatus('sending');
    setTimeout(() => {
      setInviteStatus('success');
      setEmailAddress('');
      setTimeout(() => setInviteStatus('idle'), 2000);
    }, 1000);
  };

  const handleClaim = () => {
    if (claimStatus) return;
    setClaimStatus(true);
    alert('Claimed $150.00 successfully!');
  };

  const faqs = [
    {
      question: 'How do I invite a friend?',
      answer: 'In order to participate in the Refer A Friend campaign, as a referrer you need to have an active account at Wild and have at least $50 (or currency equivalent) deposited. Multiple deposits can be summed up in order to meet the minimum deposit requirement.'
    },
    {
      question: 'How do I invite a friend?',
      answer: 'In order to participate in the Refer A Friend campaign, as a referrer you need to have an active account at Wild and have at least $50 (or currency equivalent) deposited. Multiple deposits can be summed up in order to meet the minimum deposit requirement.'
    },
    {
      question: 'How do I invite a friend?',
      answer: 'In order to participate in the Refer A Friend campaign, as a referrer you need to have an active account at Wild and have at least $50 (or currency equivalent) deposited. Multiple deposits can be summed up in order to meet the minimum deposit requirement.'
    }
  ];

  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen bg-[#091741] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#1463FF]"></div>
      </div>
    );
  }

  return (
    <div className="w-full relative flex flex-col select-none">

      {/* Custom Styles for Input Range Slider */}
      <style>{`
        .ref-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 0;
          height: 0;
          border: none;
          background: transparent;
        }
        .ref-slider::-moz-range-thumb {
          width: 0;
          height: 0;
          border: none;
          background: transparent;
        }
      `}</style>

      {/* Mobile Sidebar - fixed layout, rendered outside the flex layout to prevent gap offset on mobile */}
      <div className="lg:hidden">
        <Sidebar />
      </div>

      {/* Page Content Layout (Sidebar + Content Panel) */}
      <div className="flex flex-row items-start w-full gap-6 relative">

        {/* Left Sidebar */}
        <div className={`hidden lg:block shrink-0 transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-[232px]' : 'w-[80px]'}`}>
          <Sidebar />
        </div>

        {/* Right Main Content Column */}
        <div className="min-w-0 flex-1 flex flex-col gap-6 lg:gap-[40px]">

          {/* =========================================================================
              1. HERO BANNER - DESKTOP VIEW (lg and up)
             ========================================================================= */}
           <div
             className="hidden lg:flex flex-col w-full h-[533px] rounded-[16px] border border-white/5 relative overflow-hidden shrink-0 select-none p-[32px_40px] gap-[20px] bg-[#2A0B3E]"
           >
             <img
               src="/games/refrels/refer.png"
               alt="Refer Banner"
               className="absolute inset-0 w-full h-full object-cover scale-[1.02] pointer-events-none z-0"
             />
             <div
               className="absolute inset-0 pointer-events-none z-10"
               style={{
                 background: 'linear-gradient(95.59deg, #06102B 13.87%, rgba(6, 16, 43, 0) 35.34%)',
               }}
             />

             {/* Top Row: Title Text (Left) & Calculator Card (Right) */}
             <div className="flex flex-row items-center justify-between h-[345px] w-full shrink-0 z-20 relative">

              {/* Title Text Frame */}
              <div className="flex flex-col gap-1 w-[457px] h-[140px] text-left justify-center">
                <span className="font-jost font-medium text-[28px] leading-[40px] text-white">
                  Get <span className="text-[#FFC83D]">PAID</span> every time
                </span>
                <h1 className="font-jost font-black text-[48px] leading-[100%] text-white uppercase">
                  YOUR FRIEND<br />PLAYS!
                </h1>
              </div>

              {/* Calculator Card Box */}
              <div
                style={{
                  background: '#091741',
                  borderRadius: '16px',
                  padding: '20px',
                  width: '430px',
                  height: '345px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                  boxSizing: 'border-box',
                  border: '1px solid rgba(255,255,255,0.05)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  overflow: 'hidden',
                }}
                className="relative shrink-0 overflow-hidden"
              >
                {/* Blue Glow Blur Orb */}
                <div className="absolute w-[173px] h-[173px] left-[50%] -translate-x-[50%] -top-[118px] rounded-full bg-[#1463FF] filter blur-[30px] opacity-100 pointer-events-none z-0" />

                {/* Content wrapper */}
                <div className="flex flex-col gap-3 w-[390px] h-[305px] z-10 relative">

                  {/* Title */}
                  <div className="flex flex-row justify-center items-start w-full h-[58px] shrink-0">
                    <h3 className="font-jost font-extrabold text-[20px] leading-[29px] text-center text-white tracking-[0.01em] w-[300px]">
                      How much can you earn with Mighty Luck?
                    </h3>
                  </div>

                  {/* Slider Container */}
                  <div className="flex flex-col gap-2 w-full h-[64px] shrink-0">
                    <span className="font-manrope font-semibold text-[12px] leading-[16px] text-[#BBCAF3] tracking-[0.02em] w-[88px] text-left">
                      Invited Friends
                    </span>

                    {/* Range Input slider */}
                    <div className="relative w-full h-[30px] flex items-center">
                      <input
                        type="range"
                        min="1"
                        max="50"
                        value={invitedFriends}
                        onChange={(e) => setInvitedFriends(parseInt(e.target.value))}
                        className="ref-slider absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer"
                      />

                      {/* Track Background */}
                      <div className="absolute left-0 right-0 top-[12px] h-[6px] bg-[#112F82] rounded-[100px] pointer-events-none" />

                      {/* Active Track Color */}
                      <div
                        style={{
                          width: `calc(${(invitedFriends - 1) / 49} * (100% - 54px) + 27px)`
                        }}
                        className="absolute left-0 top-[12px] h-[6px] bg-[#1463FF] rounded-[100px] pointer-events-none"
                      />

                      {/* Draggable Number Badge Handle */}
                      <div
                        style={{
                          left: `calc(${(invitedFriends - 1) / 49} * (100% - 54px))`
                        }}
                        className="absolute top-0 w-[54px] h-[30px] bg-[#1463FF] rounded-[100px] flex items-center justify-center gap-1 shadow-lg transition-all duration-75 pointer-events-none"
                      >
                        <img
                          src="/images/friend.png"
                          alt="Friend"
                          className="w-[16px] h-[14px] object-contain shrink-0"
                        />
                        <span className="font-manrope font-bold text-[16px] leading-[22px] text-white">
                          {invitedFriends}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Result Pill */}
                  <div className="w-full bg-[#112F82] rounded-[8px] p-[10px_16px] h-[60px] flex items-center justify-center gap-4 border border-white/5 shrink-0 box-border">
                    <span className="font-manrope font-bold text-[14px] leading-[19px] text-[#BBCAF3]">
                      Your monthly earnings:
                    </span>
                    <span className="font-manrope font-bold text-[24px] leading-[33px] text-white">
                      ${monthlyEarnings.toLocaleString()}
                    </span>
                  </div>

                  {/* Disclaimer */}
                  <p className="font-manrope font-medium text-[10px] leading-[14px] text-[#7795E8] tracking-[0.02em] text-center w-full shrink-0">
                    * Calculations are based on average player activity and may vary in individual cases
                  </p>

                  {/* Email Invite Box */}
                  <form onSubmit={handleSendInvite} className="w-full flex flex-row gap-2 h-[40px] shrink-0">
                    <input
                      type="email"
                      required
                      placeholder="Enter email address"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      style={{
                        background: '#112F82',
                        borderRadius: '8px',
                        padding: '10px 16px',
                        width: '260px',
                        height: '40px',
                        fontFamily: 'Manrope',
                        fontWeight: 600,
                        fontSize: '14px',
                        color: '#FFFFFF',
                        border: 'none',
                      }}
                      className="placeholder-[#7795E8] focus:outline-none focus:ring-1 focus:ring-[#1463FF]"
                    />

                    <button
                      type="submit"
                      disabled={inviteStatus === 'sending'}
                      style={{
                        background: '#FFC83D',
                        borderRadius: '8px',
                        width: '122px',
                        height: '40px',
                        fontFamily: 'Manrope',
                        fontWeight: 700,
                        fontSize: '14px',
                        color: '#1A1404',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                      className="hover:bg-[#ffd362] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center transition-all"
                    >
                      {inviteStatus === 'sending' ? 'Sending' : 'Send Invite'}
                    </button>
                  </form>
                  {inviteStatus === 'success' && (
                    <span className="text-xs text-green-400 font-semibold text-center mt-1 animate-pulse absolute -bottom-5 left-0 right-0">
                      Invite sent successfully!
                    </span>
                  )}

                </div>
              </div>
            </div>

            {/* Bottom Row: Horizontal Stats Bar */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 24px',
                width: '100%',
                height: '104px',
                background: '#091741',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.05)',
                boxSizing: 'border-box',
                gap: '10px',
              }}
              className="shrink-0 z-20 relative"
            >
              {/* Stat 1: Total Referrals */}
              <div className="flex flex-col gap-2 text-left flex-1 h-[64px]">
                <span className="font-manrope font-semibold text-[12px] leading-[16px] text-[#BBCAF3] tracking-[0.02em]">
                  Total Referrals
                </span>
                <div style={{ background: '#112F82', borderRadius: '8px', padding: '10px 16px', height: '40px', display: 'flex', alignItems: 'center', width: '100%', boxSizing: 'border-box' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-[20px] h-[20px] rounded-full bg-[#FFC83D] flex items-center justify-center text-[#1A1404] font-bold text-[11px] shrink-0 select-none">
                      $
                    </div>
                    <span className="font-manrope font-bold text-[16px] leading-[22px] text-white">12</span>
                  </div>
                </div>
              </div>

              {/* Stat 2: Total Deposits */}
              <div className="flex flex-col gap-2 text-left flex-1 h-[64px]">
                <span className="font-manrope font-semibold text-[12px] leading-[16px] text-[#BBCAF3] tracking-[0.02em]">
                  Total Deposits
                </span>
                <div style={{ background: '#112F82', borderRadius: '8px', padding: '10px 16px', height: '40px', display: 'flex', alignItems: 'center', width: '100%', boxSizing: 'border-box' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-[20px] h-[20px] rounded-full bg-[#FFC83D] flex items-center justify-center text-[#1A1404] font-bold text-[11px] shrink-0 select-none">
                      $
                    </div>
                    <span className="font-manrope font-bold text-[16px] leading-[22px] text-white">$5000.00</span>
                  </div>
                </div>
              </div>

              {/* Stat 3: Total Earnings */}
              <div className="flex flex-col gap-2 text-left flex-1 h-[64px]">
                <span className="font-manrope font-semibold text-[12px] leading-[16px] text-[#BBCAF3] tracking-[0.02em]">
                  Total Earnings
                </span>
                <div style={{ background: '#112F82', borderRadius: '8px', padding: '10px 16px', height: '40px', display: 'flex', alignItems: 'center', width: '100%', boxSizing: 'border-box' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-[20px] h-[20px] rounded-full bg-[#FFC83D] flex items-center justify-center text-[#1A1404] font-bold text-[11px] shrink-0 select-none">
                      $
                    </div>
                    <span className="font-manrope font-bold text-[16px] leading-[22px] text-white">$500.00</span>
                  </div>
                </div>
              </div>

              {/* Stat 4: Pending Income */}
              <div className="flex flex-col gap-2 text-left flex-1 h-[64px]">
                <span className="font-manrope font-semibold text-[12px] leading-[16px] text-[#BBCAF3] tracking-[0.02em]">
                  Pending Income
                </span>
                <div style={{ background: '#112F82', borderRadius: '8px', padding: '10px 16px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', width: '100%', boxSizing: 'border-box' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-[20px] h-[20px] rounded-full bg-[#FFC83D] flex items-center justify-center text-[#1A1404] font-bold text-[11px] shrink-0 select-none">
                      $
                    </div>
                    <span className="font-manrope font-bold text-[16px] leading-[22px] text-white">
                      {claimStatus ? '$0.00' : '$150.00'}
                    </span>
                  </div>
                  <button
                    onClick={handleClaim}
                    disabled={claimStatus}
                    className="h-[24px] w-[66px] bg-[#1463FF] hover:bg-[#2e74ff] disabled:opacity-40 text-white font-manrope font-semibold text-[12px] leading-[16px] rounded-[6px] transition-colors border-none cursor-pointer flex items-center justify-center shrink-0"
                  >
                    {claimStatus ? 'Claimed' : 'Claim'}
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* =========================================================================
              1. HERO BANNER - MOBILE / TABLET VIEW (stacked components)
             ========================================================================= */}
          <div className="flex lg:hidden flex-col gap-4 w-full">
            {/* Banner card */}
            <div
              className="w-full min-h-[160px] rounded-[16px] border border-white/5 p-6 flex flex-col justify-center relative overflow-hidden bg-[#2A0B3E]"
            >
              <img
                src="/games/refrels/refer.png"
                alt="Refer Banner"
                className="absolute inset-0 w-full h-full object-cover scale-[1.02] pointer-events-none z-0"
              />
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background: 'linear-gradient(95.59deg, #06102B 13.87%, rgba(6, 16, 43, 0) 35.34%)',
                }}
              />
              <div className="flex flex-col gap-1 max-w-[320px] z-20 relative text-left">
                <span className="font-sans font-bold text-[12px] text-[#A5B8EF] tracking-[0.05em]">
                  Get <span className="text-[#FFC83D]">PAID</span> every time
                </span>
                <h1 className="font-jost font-black text-[24px] leading-[110%] text-white tracking-wide uppercase">
                  YOUR FRIEND<br />PLAYS!
                </h1>
              </div>
            </div>

            {/* Mobile Calculator Card */}
            <div className="w-full bg-[#091741] rounded-[16px] p-5 flex flex-col border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute w-[180px] h-[180px] left-[50%] -translate-x-[50%] -top-[120px] rounded-full bg-[#1463FF] filter blur-[40px] opacity-160 pointer-events-none" />

              <div className="w-full flex flex-col gap-4 z-10">
                <h3 className="font-jost font-bold text-[18px] text-center text-white tracking-[0.01em]">
                  How much can you earn with Mighty Luck?
                </h3>

                <div className="flex flex-col gap-2 w-full mt-2">
                  <div className="flex justify-between items-center text-left">
                    <span className="font-manrope font-semibold text-[12px] text-[#BBCAF3] tracking-[0.02em]">
                      Invited Friends
                    </span>
                  </div>

                  <div className="relative w-full h-[36px] flex items-center">
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={invitedFriends}
                      onChange={(e) => setInvitedFriends(parseInt(e.target.value))}
                      className="ref-slider absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer"
                    />
                    <div className="absolute left-0 right-0 top-[15px] h-[6px] bg-[#112F82] rounded-[100px] pointer-events-none" />
                    <div
                      style={{
                        width: `calc(${(invitedFriends - 1) / 49} * (100% - 54px) + 27px)`
                      }}
                      className="absolute left-0 top-[15px] h-[6px] bg-[#1463FF] rounded-[100px] pointer-events-none"
                    />
                    <div
                      style={{
                        left: `calc(${(invitedFriends - 1) / 49} * (100% - 54px))`
                      }}
                      className="absolute top-[3px] w-[54px] h-[30px] bg-[#1463FF] rounded-[100px] flex items-center justify-center gap-1 shadow-lg transition-all duration-75 pointer-events-none"
                    >
                      <img
                        src="/images/friend.png"
                        alt="Friend"
                        className="w-[16px] h-[14px] object-contain shrink-0"
                      />
                      <span className="font-manrope font-bold text-[16px] text-white">
                        {invitedFriends}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full bg-[#112F82] rounded-[8px] py-[10px_16px] h-[60px] flex items-center justify-center gap-4 border border-white/5">
                  <span className="font-manrope font-bold text-[14px] text-[#BBCAF3]">
                    Your monthly earnings:
                  </span>
                  <span className="font-manrope font-bold text-[24px] text-white">
                    ${monthlyEarnings.toLocaleString()}
                  </span>
                </div>

                <p className="font-manrope font-semibold text-[10px] leading-[14px] text-[#7795E8] tracking-[0.02em]  max-w-[340px] mx-auto">
                  * Calculations are based on average player activity and may vary in individual cases
                </p>

                <form onSubmit={handleSendInvite} className="w-full  flex flex-col gap-2 mt-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter email address"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className="w-full h-[50px]  bg-[#112F82] rounded-[8px] px-4 border border-white/5 text-white font-manrope font-semibold text-[14px] placeholder-[#BBCAF3] focus:outline-none focus:ring-1 focus:ring-[#1463FF]"
                  />
                  <button
                    type="submit"
                    disabled={inviteStatus === 'sending'}
                    className="w-full h-[50px] shrink-0 bg-[#FFC83D] hover:bg-[#ffd362] active:scale-[0.98] disabled:opacity-50 text-[#1A1404] font-manrope font-bold text-[16px] rounded-[8px] flex items-center justify-center transition-all cursor-pointer border-none"
                  >
                    {inviteStatus === 'sending' ? 'Sending...' : 'Send Invite'}
                  </button>
                </form>
                {inviteStatus === 'success' && (
                  <span className="text-xs text-green-400 font-semibold text-center mt-1 animate-pulse">
                    Invite sent successfully!
                  </span>
                )}
              </div>
            </div>

            {/* Mobile Stats Box */}
            <div className="w-full bg-[#091741] rounded-[16px] p-5 flex flex-col gap-4 border border-white/10 shadow-2xl">
              {/* Total Referrals */}
              <div className="flex flex-col gap-1.5 text-left w-full">
                <span className="font-manrope font-semibold text-[12px] text-[#BBCAF3] tracking-[0.02em]">
                  Total Referrals
                </span>
                <div className="w-full h-[50px] bg-[#112F82] rounded-[8px] p-[10px_16px] flex items-center border border-white/5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-[20px] h-[20px] rounded-full bg-[#FFC83D] flex items-center justify-center text-[#1A1404] font-bold text-[11px]">
                      $
                    </div>
                    <span className="font-manrope font-bold text-[16px] text-white">12</span>
                  </div>
                </div>
              </div>

              {/* Total Deposits */}
              <div className="flex flex-col gap-1.5 text-left w-full">
                <span className="font-manrope font-semibold text-[12px] text-[#BBCAF3] tracking-[0.02em]">
                  Total Deposits
                </span>
                <div className="w-full h-[50px] bg-[#112F82] rounded-[8px] p-[10px_16px] flex items-center border border-white/5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-[20px] h-[20px] rounded-full bg-[#FFC83D] flex items-center justify-center text-[#1A1404] font-bold text-[11px]">
                      $
                    </div>
                    <span className="font-manrope font-bold text-[16px] text-white">$5000.00</span>
                  </div>
                </div>
              </div>

              {/* Total Earnings */}
              <div className="flex flex-col gap-1.5 text-left w-full">
                <span className="font-manrope font-semibold text-[12px] text-[#BBCAF3] tracking-[0.02em]">
                  Total Earnings
                </span>
                <div className="w-full h-[50px] bg-[#112F82] rounded-[8px] p-[10px_16px] flex items-center border border-white/5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-[20px] h-[20px] rounded-full bg-[#FFC83D] flex items-center justify-center text-[#1A1404] font-bold text-[11px]">
                      $
                    </div>
                    <span className="font-manrope font-bold text-[16px] text-white">$500.00</span>
                  </div>
                </div>
              </div>

              {/* Pending Income */}
              <div className="flex flex-col gap-1.5 text-left w-full">
                <span className="font-manrope font-semibold text-[12px] text-[#BBCAF3] tracking-[0.02em]">
                  Pending Income
                </span>
                <div className="w-full h-[50px] bg-[#112F82] rounded-[8px] pl-4 pr-1.5 flex items-center justify-between border border-white/5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-[20px] h-[20px] rounded-full bg-[#FFC83D] flex items-center justify-center text-[#1A1404] font-bold text-[11px]">
                      $
                    </div>
                    <span className="font-manrope font-bold text-[16px] text-white">
                      {claimStatus ? '$0.00' : '$150.00'}
                    </span>
                  </div>
                  <button
                    onClick={handleClaim}
                    disabled={claimStatus}
                    className="h-[24px] w-[66px] bg-[#1463FF] hover:bg-[#2e74ff] disabled:opacity-40 text-white font-manrope font-semibold text-[12px] leading-[16px] rounded-[6px] transition-colors border-none cursor-pointer flex items-center justify-center"
                  >
                    {claimStatus ? 'Claimed' : 'Claim'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              2. STATS SUMMARY CARD DECK (3 Cards row on desktop, stacked on mobile)
             ========================================================================= */}
          <div className="flex flex-col md:flex-row gap-[16px] w-full select-none">
            {/* Card 1: $2.5 K */}
            <div className="flex-1 min-w-0 bg-[#0C1F56] border border-white/5 rounded-[16px] p-6 text-center flex flex-col justify-center items-center gap-[8px] h-[136px] shadow-lg">
              <span className="font-jost font-extrabold text-[40px] leading-[58px] text-white">
                $2.5 K
              </span>
              <span className="font-manrope font-semibold text-[16px] leading-[140%] text-[#A5B8EF]">
                Claim By the Most Active Referrer
              </span>
            </div>

            {/* Card 2: 500+ */}
            <div className="flex-1 min-w-0 bg-[#0C1F56] border border-white/5 rounded-[16px] p-6 text-center flex flex-col justify-center items-center gap-[8px] h-[136px] shadow-lg">
              <span className="font-jost font-extrabold text-[40px] leading-[58px] text-white">
                500+
              </span>
              <span className="font-manrope font-semibold text-[16px] leading-[140%] text-[#A5B8EF]">
                Players are already earning with us
              </span>
            </div>

            {/* Card 3: 19,000 */}
            <div className="flex-1 min-w-0 bg-[#0C1F56] border border-white/5 rounded-[16px] p-6 text-center flex flex-col justify-center items-center gap-[8px] h-[136px] shadow-lg">
              <span className="font-jost font-extrabold text-[40px] leading-[58px] text-white">
                19,000
              </span>
              <span className="font-manrope font-semibold text-[16px] leading-[140%] text-[#A5B8EF]">
                Free Spins received by friends
              </span>
            </div>
          </div>

          {/* =========================================================================
              3. BENEFITS SECTIONS (WHAT YOU GET & WHAT YOUR FRIEND GETS)
             ========================================================================= */}
          <div className="flex flex-col lg:flex-row gap-5 w-full select-none">

             {/* WHAT YOU GET */}
             <div
               style={{
                 background: 'radial-gradient(circle at 0% 0%, rgba(87, 255, 61, 1) 0%, rgba(87, 255, 61, 0.1) 23%, rgba(12, 31, 86, 0) 70%), #0C1F56',
                 backgroundRepeat: 'no-repeat',
               }}
               className="flex-1 border border-white/10 rounded-[16px] p-[32px_40px] lg:h-[391px] flex flex-col gap-6 shadow-xl text-left"
            >
              <div className="flex flex-row items-center gap-2">

                <h3 className="font-jost font-extrabold text-[20px] leading-[29px] text-white tracking-[0.01em]">
                  WHAT YOU GET
                </h3>
              </div>

              <div className="flex flex-col gap-[20px]">
                {/* Point 1 */}
                <div className="flex gap-4 items-start">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#57FF3D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
                  </svg>
                  <div className="flex flex-col gap-1">
                    <span className="font-manrope font-bold text-[16px] leading-[22px] text-white">
                      Lifetime earnings from each deposit
                    </span>
                    <span className="font-manrope font-medium text-[16px] leading-[160%] text-[#A5B8EF]">
                      You get a percentage of every deposit your friends complete.
                    </span>
                  </div>
                </div>

                {/* Point 2 */}
                <div className="flex gap-4 items-start">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="#57FF3D" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5 text-[#57FF3D]">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  <div className="flex flex-col gap-1">
                    <span className="font-manrope font-bold text-[16px] leading-[22px] text-white">
                      Instant crediting
                    </span>
                    <span className="font-manrope font-medium text-[16px] leading-[160%] text-[#A5B8EF]">
                      Your income is credited a few minutes after your friend’s deposit is completed.
                    </span>
                  </div>
                </div>

                {/* Point 3 */}
                <div className="flex gap-4 items-start">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#57FF3D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                    <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4z" />
                  </svg>
                  <div className="flex flex-col gap-1">
                    <span className="font-manrope font-bold text-[16px] leading-[22px] text-white">
                      No limits for earnings
                    </span>
                    <span className="font-manrope font-medium text-[16px] leading-[160%] text-[#A5B8EF]">
                      Your earnings are not capped. Sky (and your friend’s wallet) is the limit!
                    </span>
                  </div>
                </div>
              </div>
            </div>

             {/* WHAT YOUR FRIEND GETS */}
             <div
               style={{
                 background: 'radial-gradient(circle at 0% 0%, rgba(20, 99, 255, 1) 0%, rgba(20, 99, 255, 0.1) 23%, rgba(12, 31, 86, 0) 70%), #0C1F56',
                 backgroundRepeat: 'no-repeat',
               }}
               className="flex-1 border border-white/10 rounded-[16px] p-[32px_40px] lg:h-[391px] flex flex-col gap-6 shadow-xl text-left"
            >
              <div className="flex flex-row items-center gap-2">

                <h3 className="font-jost font-extrabold text-[20px] leading-[29px] text-white tracking-[0.01em]">
                  WHAT YOUR FRIEND GETS
                </h3>
              </div>

              <div className="flex flex-col gap-[20px]">
                {/* Point 1 */}
                <div className="flex gap-4 items-start">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1463FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
                  </svg>
                  <div className="flex flex-col gap-1">
                    <span className="font-manrope font-bold text-[16px] leading-[22px] text-white">
                      Lifetime earnings from each deposit
                    </span>
                    <span className="font-manrope font-medium text-[16px] leading-[160%] text-[#A5B8EF]">
                      You get a percentage of every deposit your friends complete.
                    </span>
                  </div>
                </div>

                {/* Point 2 */}
                <div className="flex gap-4 items-start">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="#1463FF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5 text-[#1463FF]">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  <div className="flex flex-col gap-1">
                    <span className="font-manrope font-bold text-[16px] leading-[22px] text-white">
                      Instant crediting
                    </span>
                    <span className="font-manrope font-medium text-[16px] leading-[160%] text-[#A5B8EF]">
                      Your income is credited a few minutes after your friend’s deposit is completed.
                    </span>
                  </div>
                </div>

                {/* Point 3 */}
                <div className="flex gap-4 items-start">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1463FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                    <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4z" />
                  </svg>
                  <div className="flex flex-col gap-1">
                    <span className="font-manrope font-bold text-[16px] leading-[22px] text-white">
                      No limits for earnings
                    </span>
                    <span className="font-manrope font-medium text-[16px] leading-[160%] text-[#A5B8EF]">
                      Your earnings are not capped. Sky (and your friend’s wallet) is the limit!
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* =========================================================================
              4. HOW REFERRAL PROGRAM WORKS (3 Cards in a row on desktop)
             ========================================================================= */}
          <div className="flex flex-col gap-4 w-full text-left select-none">

            {/* Header Title */}
            <div className="flex flex-row items-center gap-2">
              <div style={{ width: '30px', height: '30px', position: 'relative', flex: 'none', order: 0, flexGrow: 0 }}>
                <svg
                  style={{
                    position: 'absolute',
                    width: '22.5px',
                    height: '22.5px',
                    left: 'calc(50% - 22.5px/2)',
                    top: 'calc(50% - 22.5px/2)',
                  }}
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fillRule="evenodd" clipRule="evenodd" d="M14.9912 3.75046C15.1582 3.74607 15.2637 3.77244 15.3823 3.84714C15.4746 3.90427 15.5977 4.01853 15.6592 4.10203C15.7603 4.23826 15.769 4.29099 15.7778 4.80955C15.791 5.35447 15.7954 5.37205 15.8877 5.38962C15.9448 5.40281 16.1074 5.42478 16.2524 5.43796C16.3975 5.45554 16.7051 5.50388 16.9336 5.55222C17.1621 5.60056 17.5796 5.70603 17.8564 5.79392C18.1333 5.88181 18.5684 6.04002 18.8232 6.14988C19.0781 6.25974 19.4121 6.41794 19.5703 6.50584C19.7285 6.58933 20.0449 6.78269 20.2734 6.9365C20.502 7.08591 20.8052 7.29685 20.9414 7.41111C21.082 7.52097 21.2095 7.61326 21.2271 7.61326C21.249 7.61326 21.4116 7.46384 21.5918 7.27927C21.772 7.0991 21.9741 6.91892 22.04 6.88377C22.1104 6.84861 22.2598 6.82224 22.3828 6.82224C22.5015 6.82224 22.6553 6.84861 22.7212 6.88377C22.7915 6.91892 22.897 7.00242 22.9585 7.07273C23.0244 7.13865 23.0991 7.23972 23.1255 7.29246C23.1519 7.34959 23.1738 7.48142 23.1738 7.59128C23.1738 7.70115 23.1475 7.85496 23.1123 7.92966C23.0771 8.00877 22.9014 8.2241 22.7168 8.40427C22.5322 8.58445 22.3828 8.74705 22.3828 8.76462C22.3828 8.7866 22.5234 8.98435 22.6948 9.20408C22.8662 9.4282 23.1035 9.77097 23.2178 9.96433C23.3364 10.1577 23.5518 10.562 23.6968 10.8652C23.8418 11.1684 24.0483 11.6826 24.1582 12.0078C24.2637 12.333 24.3911 12.8076 24.4438 13.0625C24.4922 13.3174 24.5449 13.6338 24.5581 13.7656C24.5757 13.8974 24.5933 14.0512 24.6064 14.104C24.624 14.2007 24.6416 14.2051 25.1865 14.2138C25.7271 14.227 25.7578 14.2314 25.9116 14.3457C25.9995 14.416 26.1138 14.5478 26.1621 14.6445C26.2104 14.7412 26.25 14.895 26.25 14.9829C26.25 15.0752 26.2148 15.229 26.1709 15.3257C26.127 15.4223 26.0127 15.563 25.9204 15.6333C25.7534 15.7607 25.7402 15.7651 25.1865 15.7739C24.6416 15.7871 24.624 15.7915 24.6064 15.8838C24.5933 15.9409 24.5757 16.0947 24.5581 16.2265C24.5449 16.3584 24.4922 16.6748 24.4438 16.9297C24.3911 17.1845 24.2637 17.6592 24.1582 17.9844C24.0527 18.3095 23.8374 18.8413 23.6792 19.1577C23.521 19.4785 23.3936 19.7597 23.3936 19.7861C23.3936 19.8125 23.8242 19.8344 25.7534 19.852L25.9116 19.9707C25.9995 20.041 26.1138 20.1728 26.1621 20.2695C26.2456 20.4409 26.25 20.5332 26.25 25.6089L26.1489 25.8022C26.0918 25.9209 25.9775 26.0483 25.6787 26.2461H4.32129L4.13232 26.123C4.02246 26.0483 3.9082 25.9209 3.75 25.6089V23.0381C3.75 20.665 3.75879 20.4541 3.8291 20.2915C3.87305 20.1948 3.9873 20.0542 4.24658 19.852L5.42871 19.8388C6.17578 19.8344 6.60645 19.8125 6.60645 19.7861C6.60645 19.7597 6.479 19.4785 6.3208 19.1577C6.1626 18.8413 5.94727 18.3095 5.8418 17.9844C5.73633 17.6592 5.60889 17.1845 5.55615 16.9297C5.50781 16.6748 5.45508 16.3584 5.44189 16.2265C5.42432 16.0947 5.40674 15.9409 5.39355 15.8838C5.37598 15.7915 5.3584 15.7871 4.81348 15.7739C4.27295 15.7651 4.24219 15.7607 4.08838 15.6421C4.00049 15.5761 3.88623 15.4443 3.83789 15.3476C3.78955 15.251 3.75 15.0971 3.75 15.0049C3.75 14.917 3.78516 14.7632 3.8291 14.6665C3.87305 14.5698 3.9873 14.4336 4.07959 14.3589C4.24658 14.2314 4.25977 14.227 4.81348 14.2138C5.3584 14.2051 5.37598 14.2007 5.39355 14.104C5.40674 14.0512 5.42432 13.8974 5.44189 13.7656C5.45508 13.6338 5.50781 13.3174 5.55615 13.0625C5.60889 12.8076 5.73193 12.3462 5.8374 12.0298C5.93848 11.7134 6.10986 11.2695 6.21533 11.041C6.3208 10.8081 6.51855 10.4258 6.65039 10.1885C6.78223 9.95115 7.05469 9.54246 7.25244 9.27878C7.45459 9.01511 7.61719 8.7866 7.61719 8.76462C7.61719 8.74705 7.46777 8.58445 7.2832 8.40427C7.09863 8.2241 6.92285 8.00877 6.8877 7.92966C6.85254 7.85496 6.82617 7.69675 6.82617 7.5781C6.83057 7.44627 6.86572 7.31003 6.92725 7.20017C6.97998 7.10789 7.10303 6.98484 7.19971 6.92771C7.32275 6.853 7.44141 6.82224 7.604 6.82224C7.73145 6.82224 7.88965 6.84861 7.95557 6.88377C8.02588 6.91892 8.22803 7.0991 8.4082 7.27927C8.58838 7.46384 8.75098 7.61326 8.76855 7.61326C8.79053 7.61326 8.96631 7.48582 9.16406 7.33201C9.36621 7.1782 9.6958 6.94968 9.90234 6.82224C10.1089 6.6948 10.4824 6.48386 10.7373 6.36082C10.9922 6.23337 11.3877 6.06199 11.6162 5.9741C11.8447 5.8906 12.2095 5.76755 12.4292 5.71043C12.6445 5.6489 12.9829 5.5698 13.1763 5.53025C13.3696 5.49509 13.6377 5.45115 13.7695 5.43796C13.9014 5.42039 14.0552 5.40281 14.1079 5.38962C14.2046 5.37205 14.209 5.35447 14.2178 4.80955C14.231 4.29539 14.2397 4.23826 14.3408 4.10642C14.3979 4.02732 14.5166 3.91306 14.6045 3.85593C14.7144 3.78123 14.8198 3.75046 14.9868 3.75046H14.9912ZM12.895 7.23972C12.7368 7.27927 12.4204 7.38474 12.1919 7.46824C11.9634 7.55613 11.6206 7.70115 11.4316 7.79343C11.2471 7.89011 10.9614 8.04392 10.7944 8.145C10.6318 8.24607 10.3682 8.42625 10.2012 8.55369L9.90234 8.77781L13.6465 12.5132L14.2134 12.2934C14.2134 7.15183 14.209 6.99802 14.1343 7.00242C14.0947 7.00242 13.8618 7.04197 13.6201 7.08591C13.3784 7.12546 13.0532 7.19578 12.895 7.23972ZM15.7954 12.2934L16.3623 12.5132C19.2275 9.65232 20.0581 8.79978 20.0581 8.77781C20.0581 8.75584 19.9351 8.64158 19.7812 8.53171C19.6318 8.42185 19.3726 8.24168 19.2012 8.1406C19.0298 8.03513 18.6958 7.85496 18.4541 7.7407C18.2124 7.62644 17.8081 7.45945 17.5532 7.37595C17.2983 7.29246 16.894 7.18259 16.6523 7.13425C16.4106 7.09031 16.1206 7.03757 16.0063 7.02L15.7998 6.99363L15.7954 12.2934ZM8.56201 10.1928C8.43896 10.3554 8.25439 10.6279 8.14893 10.7993C8.04346 10.9663 7.86328 11.3047 7.74902 11.5464C7.63477 11.7881 7.46777 12.1924 7.38428 12.4472C7.30078 12.7021 7.19092 13.1064 7.14697 13.3481C7.09863 13.5898 7.0459 13.8799 7.03271 13.9941L7.00635 14.2051L12.3018 14.2007L12.5215 13.6382L8.78613 9.89402L8.56201 10.1928ZM17.4785 13.6557L17.707 14.2051H23.0024C22.9629 13.8799 22.9102 13.5898 22.8618 13.3481C22.8135 13.1064 22.7124 12.7109 22.6333 12.4692C22.5542 12.2275 22.3784 11.8012 22.2466 11.5244C22.1147 11.2475 21.8643 10.8125 21.6929 10.5576C21.5215 10.3027 21.3457 10.0522 21.3018 9.99509L21.2227 9.89841L17.4785 13.6557ZM7.02832 15.9936C7.0459 16.1123 7.09863 16.4023 7.14258 16.644C7.19092 16.8857 7.30078 17.29 7.38428 17.5449C7.46777 17.7998 7.62598 18.1953 7.73584 18.4238C7.8457 18.6523 8.0083 18.9599 8.09619 19.105C8.17969 19.25 8.3291 19.4741 8.42139 19.5971C8.58398 19.8257 8.59277 19.8301 8.81689 19.8301H9.0498L12.5215 16.3496L12.3018 15.7871H7.00195L7.02832 15.9936ZM17.4829 16.3496L20.9546 19.8257C21.416 19.8257 21.4204 19.8257 21.583 19.5971C21.6753 19.4697 21.8247 19.2456 21.9126 19.1006C22.0005 18.9555 22.1587 18.6523 22.2686 18.4194C22.3784 18.1909 22.5366 17.7954 22.6201 17.5405C22.7036 17.29 22.8135 16.8813 22.8618 16.6396C22.9102 16.3979 22.9585 16.1079 22.9717 15.9936L22.998 15.7827H17.7026L17.4829 16.3496ZM11.3833 19.7993C11.4053 19.8169 12.0469 19.8301 12.8159 19.8301H14.209V17.6987C13.8179 17.5449 13.686 17.501 13.6597 17.501C13.6333 17.501 13.106 18.0107 12.4819 18.6303C11.8579 19.2544 11.3657 19.7773 11.3833 19.7993ZM15.769 17.6987L15.791 19.8301C17.9575 19.8301 18.6035 19.8125 18.6211 19.7949C18.6387 19.7773 18.1421 19.2544 17.5181 18.6303C16.894 18.0107 16.3535 17.501 16.3184 17.5053C16.2832 17.5053 16.1426 17.5537 16.0107 17.602L15.769 17.6987Z" fill="#FFC83D" />
                </svg>
              </div>
              <h2 className="font-jost font-extrabold text-[20px] leading-[29px] text-white tracking-[0.01em]">
                HOW REFERRAL PROGRAM WORKS
              </h2>
            </div>

            {/* Steps list (row on desktop, stacked on mobile) */}
            <div className="flex flex-col md:flex-row gap-4 w-full">

              {/* Step 1 */}
              <div className="flex-1 w-full aspect-[370/220] rounded-2xl border border-white/5 relative overflow-hidden group shadow-xl">
                <img
                  src="/games/refrels/r1.png"
                  alt="Step 1"
                  className="absolute inset-0 w-full h-full object-cover scale-[1.02] transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Step 2 */}
              <div className="flex-1 w-full aspect-[370/220] rounded-2xl border border-white/5 relative overflow-hidden group shadow-xl">
                <img
                  src="/games/refrels/r2.png"
                  alt="Step 2"
                  className="absolute inset-0 w-full h-full object-cover scale-[1.02] transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Step 3 */}
              <div className="flex-1 w-full aspect-[370/220] rounded-2xl border border-white/5 relative overflow-hidden group shadow-xl">
                <img
                  src="/games/refrels/r3.png"
                  alt="Step 3"
                  className="absolute inset-0 w-full h-full object-cover scale-[1.02] transition-transform duration-300 group-hover:scale-110"
                />
              </div>

            </div>
          </div>

          {/* =========================================================================
              5. FAQS
             ========================================================================= */}
          <div className="flex flex-col gap-4 w-full text-left">
            <h2 className="font-jost font-extrabold text-[20px] leading-[29px] text-white tracking-[0.01em] select-none">
              FAQs
            </h2>

            <div className="flex flex-col gap-3 w-full">
              {faqs.map((faq, idx) => {
                const isOpen = expandedFaq === idx;
                return (
                  <div
                    key={idx}
                    className="w-full bg-[#0C1F56] border border-white/5 rounded-lg overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => setExpandedFaq(isOpen ? null : idx)}
                      className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left font-jost font-extrabold text-[15px] text-white hover:bg-[#112a75] transition-colors cursor-pointer border-none outline-none"
                    >
                      <span>How do I invite a friend?</span>
                      {isOpen ? (
                        <span className="text-[18px] text-[#A5B8EF] font-bold leading-none shrink-0">&#8722;</span>
                      ) : (
                        <span className="text-[18px] text-[#A5B8EF] font-bold leading-none shrink-0">&#43;</span>
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-4 pt-1 font-manrope font-medium text-[13px] text-[#A5B8EF] leading-relaxed border-t border-white/5">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <Footer />

        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-[55] flex md:hidden flex-row items-center justify-around bg-[#0C1F56] border-t border-white/5 h-[60px] px-2">
        <button onClick={() => dispatch(toggleSidebar())} className="flex flex-col items-center gap-1 text-[#D2DCF7] hover:text-white cursor-pointer bg-transparent border-0 flex-1">
          <img src="/mobile/sidebar/menu.png" alt="Menu" className="w-5 h-5 object-contain" />
          <span className="text-[10px] font-semibold font-sans">Menu</span>
        </button>
        <button onClick={() => dispatch(openAllGamesModal())} className="flex flex-col items-center gap-1 text-[#D2DCF7] hover:text-white cursor-pointer bg-transparent border-0 flex-1">
          <img src="/mobile/sidebar/search.png" alt="Search" className="w-5 h-5 object-contain" />
          <span className="text-[10px] font-semibold font-sans">Search</span>
        </button>
        <button onClick={() => dispatch(openDepositModal())} className="flex flex-col items-center gap-1 text-[#D2DCF7] hover:text-white cursor-pointer bg-transparent border-0 flex-1">
          <img src="/games/side-icon/pro.svg" alt="Offers" className="w-5 h-5 object-contain" />
          <span className="text-[10px] font-semibold font-sans">Offers</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#D2DCF7] hover:text-white cursor-pointer bg-transparent border-0 flex-1">
          <img src="/games/side-icon/vip.svg" alt="VIP" className="w-5 h-5 object-contain" />
          <span className="text-[10px] font-semibold font-sans">VIP</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#D2DCF7] hover:text-white cursor-pointer bg-transparent border-0 flex-1">
          <img src="/games/side-icon/tour.svg" alt="Challenges" className="w-5 h-5 object-contain" />
          <span className="text-[10px] font-semibold font-sans">Challenges</span>
        </button>
      </nav>

    </div>
  );
}
