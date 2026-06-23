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
    <div className="w-full min-h-screen bg-[#091741] text-white relative flex flex-col select-none overflow-x-hidden">
      
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

      {/* Page Content Layout (Sidebar + Content Panel) */}
      <div className="flex flex-row items-start w-full max-w-[1440px] mx-auto px-4 lg:px-6 pt-0 pb-16 gap-3 lg:gap-6 relative">

        {/* Left Sidebar */}
        <div className="hidden lg:block shrink-0"><Sidebar /></div>
        <div className="lg:hidden"><Sidebar /></div>

        {/* Right Main Content Column */}
        <div className="w-full min-w-0 flex-1 flex flex-col gap-6 lg:gap-[40px]">

          {/* =========================================================================
              1. HERO BANNER - DESKTOP VIEW (lg and up)
             ========================================================================= */}
          <div 
            style={{
              background: 'linear-gradient(95.59deg, #06102B 13.87%, rgba(6, 16, 43, 0) 35.34%), url(/games/refrels/refer.png), #2A0B3E',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className="hidden lg:flex flex-col w-full max-w-[1136px] h-[533px] rounded-[16px] border border-white/5 relative overflow-hidden shrink-0 select-none p-[32px_40px] gap-[20px]"
          >
            {/* Top Row: Title Text (Left) & Calculator Card (Right) */}
            <div className="flex flex-row items-center justify-between h-[345px] w-full shrink-0">
              
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
                }}
                className="relative shrink-0"
              >
                {/* Blue Glow Blur Orb */}
                <div className="absolute w-[173px] h-[173px] left-[50%] -translate-x-[50%] -top-[118px] rounded-full bg-[#1463FF] filter blur-[40px] opacity-40 pointer-events-none z-0" />

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
              className="shrink-0"
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
              style={{
                backgroundImage: `linear-gradient(90deg, #091741 0%, rgba(9, 23, 65, 0.45) 100%), url(/games/refrels/refer.png)`,
                backgroundSize: 'cover',
                backgroundPosition: 'right center',
              }}
              className="w-full min-h-[160px] rounded-[16px] border border-white/5 p-6 flex flex-col justify-center relative overflow-hidden"
            >
              <div className="flex flex-col gap-1 max-w-[320px] z-10 text-left">
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
              <div className="absolute w-[180px] h-[180px] left-[50%] -translate-x-[50%] -top-[120px] rounded-full bg-[#1463FF] filter blur-[50px] opacity-40 pointer-events-none" />

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

                <p className="font-manrope font-semibold text-[10px] leading-[14px] text-[#7795E8] tracking-[0.02em] text-center max-w-[340px] mx-auto">
                  * Calculations are based on average player activity and may vary in individual cases
                </p>

                <form onSubmit={handleSendInvite} className="w-full flex flex-row gap-2 mt-2">
                  <input 
                    type="email"
                    required
                    placeholder="Enter email address"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className="flex-1 h-[40px] bg-[#112F82] rounded-[8px] px-4 border border-white/5 text-white font-manrope font-semibold text-[14px] placeholder-[#BBCAF3] focus:outline-none focus:ring-1 focus:ring-[#1463FF]"
                  />
                  <button
                    type="submit"
                    disabled={inviteStatus === 'sending'}
                    className="w-[122px] h-[40px] shrink-0 bg-[#FFC83D] hover:bg-[#ffd362] active:scale-[0.98] disabled:opacity-50 text-[#1A1404] font-manrope font-bold text-[14px] rounded-[8px] flex items-center justify-center transition-all cursor-pointer border-none"
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
                <div className="w-full h-[40px] bg-[#112F82] rounded-[8px] p-[10px_16px] flex items-center border border-white/5">
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
                <div className="w-full h-[40px] bg-[#112F82] rounded-[8px] p-[10px_16px] flex items-center border border-white/5">
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
                <div className="w-full h-[40px] bg-[#112F82] rounded-[8px] p-[10px_16px] flex items-center border border-white/5">
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
                <div className="w-full h-[40px] bg-[#112F82] rounded-[8px] pl-4 pr-1.5 flex items-center justify-between border border-white/5">
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
          <div className="flex flex-col md:flex-row gap-[16px] w-full max-w-[1136px] mx-auto select-none">
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
          <div className="flex flex-col lg:flex-row gap-5 w-full max-w-[1136px] mx-auto select-none">
            
            {/* WHAT YOU GET */}
            <div 
              style={{
                background: 'radial-gradient(circle at 50% 0%, rgba(87, 255, 61, 0.15) 0%, rgba(12, 31, 86, 0) 70%), #0C1F56',
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
                background: 'radial-gradient(circle at 50% 0%, rgba(20, 99, 255, 0.15) 0%, rgba(12, 31, 86, 0) 70%), #0C1F56',
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
          <div className="flex flex-col gap-4 w-full max-w-[1136px] mx-auto text-left select-none">
            
            {/* Header Title */}
            <div className="flex flex-row items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFBF1F" strokeWidth="2.5">
                <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/>
                <path d="M5 20h14a2 2 0 0 0 2-2H3a2 2 0 0 0 2 2z"/>
              </svg>
              <h2 className="font-jost font-extrabold text-[20px] leading-[29px] text-white tracking-[0.01em]">
                HOW REFERRAL PROGRAM WORKS
              </h2>
            </div>

            {/* Steps list (row on desktop, stacked on mobile) */}
            <div className="flex flex-col md:flex-row gap-4 w-full">
              
              {/* Step 1 */}
              <div 
                style={{
                  backgroundImage: `linear-gradient(357.52deg, #06102B 0.07%, rgba(6, 16, 43, 0) 34.29%), linear-gradient(90.32deg, #001958 8.61%, rgba(0, 25, 88, 0) 58.87%), url(/games/refrels/r1.png)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                className="flex-grow flex-shrink-0 md:w-[370px] h-[220px] rounded-2xl border border-white/5 p-6 flex flex-col justify-between items-start text-left relative overflow-hidden group shadow-xl"
              >
                <div className="w-[40px] h-[40px] bg-[#1463FF] rounded-[8px] flex items-center justify-center font-jost font-extrabold text-[20px] leading-[120%] text-white">
                  1
                </div>
                <span className="font-jost font-extrabold text-[16px] leading-[120%] text-white uppercase max-w-[220px] z-10">
                  SHARE INVITATION LINK WITH YOUR FRIEND
                </span>
              </div>

              {/* Step 2 */}
              <div 
                style={{
                  backgroundImage: `linear-gradient(359.97deg, #06102B 0.03%, rgba(6, 16, 43, 0) 39.1%), linear-gradient(90.32deg, #001958 8.61%, rgba(0, 25, 88, 0) 58.87%), url(/games/refrels/r2.png)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                className="flex-grow flex-shrink-0 md:w-[370px] h-[220px] rounded-2xl border border-white/5 p-6 flex flex-col justify-between items-start text-left relative overflow-hidden group shadow-xl"
              >
                <div className="w-[40px] h-[40px] bg-[#1463FF] rounded-[8px] flex items-center justify-center font-jost font-extrabold text-[20px] leading-[120%] text-white">
                  2
                </div>
                <span className="font-jost font-extrabold text-[16px] leading-[120%] text-white uppercase max-w-[220px] z-10">
                  YOUR FRIEND JOINS & RECEIVES <span className="text-[#FFC83D]">50 FREE SPINS</span> TO GET STARTED
                </span>
              </div>

              {/* Step 3 */}
              <div 
                style={{
                  backgroundImage: `linear-gradient(358.76deg, #06102B 1.27%, rgba(6, 16, 43, 0) 36.65%), linear-gradient(90.32deg, #001958 8.61%, rgba(0, 25, 88, 0) 58.87%), url(/games/refrels/r3.png)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                className="flex-grow flex-shrink-0 md:w-[370px] h-[220px] rounded-2xl border border-white/5 p-6 flex flex-col justify-between items-start text-left relative overflow-hidden group shadow-xl"
              >
                <div className="w-[40px] h-[40px] bg-[#1463FF] rounded-[8px] flex items-center justify-center font-jost font-extrabold text-[20px] leading-[120%] text-white">
                  3
                </div>
                <span className="font-jost font-extrabold text-[16px] leading-[120%] text-white uppercase max-w-[220px] z-10">
                  NOW, YOU’LL GET PAID <span className="text-[#FFC83D]">EVERY TIME</span> YOUR FRIEND DEPOSITS & PLAY
                </span>
              </div>

            </div>
          </div>

          {/* =========================================================================
              5. FAQS
             ========================================================================= */}
          <div className="flex flex-col gap-4 w-full max-w-[1136px] mx-auto text-left">
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
