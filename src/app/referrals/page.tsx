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
      <div className="flex flex-row items-start w-full max-w-[1330px] mx-auto px-4 lg:px-6 pt-0 pb-16 gap-3 lg:gap-6 relative">

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
              backgroundImage: `url(/games/refrels/refer.png)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className="hidden lg:flex flex-col w-full max-w-[1056px] h-[550px] rounded-[20px] border border-white/5 relative overflow-hidden shrink-0 select-none"
          >
            {/* Top Row: Title Text (Left) & Calculator Card (Right) */}
            <div className="flex flex-row items-center justify-between px-[40px] pt-[40px] h-[430px] shrink-0">
              
              {/* Title Text Frame */}
              <div className="flex flex-col gap-3 max-w-[380px] text-left">
                <span className="font-sans font-bold text-[14px] text-white tracking-[0.05em] uppercase">
                  Get <span className="text-[#FFC83D]">PAID</span> every time
                </span>
                <h1 className="font-jost font-black text-[44px] leading-[110%] text-white tracking-wide uppercase">
                  YOUR FRIEND<br />PLAYS!
                </h1>
              </div>

              {/* Calculator Card Box */}
              <div
                style={{
                  background: '#091741',
                  borderRadius: '16px',
                  padding: '24px 20px 32px',
                  width: '428px',
                  height: '370px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                  boxSizing: 'border-box',
                  border: '1px solid rgba(255,255,255,0.05)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                }}
                className="relative"
              >
                {/* Blue Glow Blur Orb */}
                <div className="absolute w-[173px] h-[173px] left-[50%] -translate-x-[50%] -top-[126px] rounded-full bg-[#1463FF] filter blur-[40px] opacity-40 pointer-events-none" />

                {/* Title */}
                <h3 className="font-jost font-bold text-[16px] text-center text-white tracking-[0.01em] uppercase z-10">
                  How much can you earn with Mighty Luck?
                </h3>

                {/* Slider Container */}
                <div className="flex flex-col gap-2 w-full mt-1 z-10">
                  <div className="flex justify-between items-center text-left">
                    <span className="font-manrope font-semibold text-[12px] text-[#BBCAF3] tracking-[0.02em]">
                      Invited Friends
                    </span>
                  </div>

                  {/* Range Input slider */}
                  <div className="relative w-full h-[36px] flex items-center">
                    <input 
                      type="range"
                      min="1"
                      max="50"
                      value={invitedFriends}
                      onChange={(e) => setInvitedFriends(parseInt(e.target.value))}
                      className="ref-slider absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer"
                    />

                    {/* Track Background */}
                    <div className="absolute left-0 right-0 top-[15px] h-[6px] bg-[#112F82] rounded-[100px] pointer-events-none" />
                    
                    {/* Active Track Color */}
                    <div 
                      style={{
                        width: `calc(${(invitedFriends - 1) / 49} * (100% - 50px) + 25px)`
                      }}
                      className="absolute left-0 top-[15px] h-[6px] bg-[#1463FF] rounded-[100px] pointer-events-none"
                    />
                    
                    {/* Draggable Number Badge Handle */}
                    <div 
                      style={{
                        left: `calc(${(invitedFriends - 1) / 49} * (100% - 50px))`
                      }}
                      className="absolute top-[3px] w-[50px] h-[30px] bg-[#1463FF] rounded-[100px] flex items-center justify-center gap-1 shadow-lg transition-all duration-75 pointer-events-none"
                    >
                      <span className="text-[12px]">👥</span>
                      <span className="font-manrope font-bold text-[14px] text-white">
                        {invitedFriends}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Result Pill */}
                <div className="w-full bg-[#112F82] rounded-[8px] py-[10px_16px] h-[40px] flex items-center justify-center border border-white/5 z-10">
                  <span className="font-manrope font-bold text-[14px] text-[#BBCAF3]">
                    Your monthly earnings:{' '}
                    <span className="text-white text-[16px] ml-1.5">${monthlyEarnings.toLocaleString()}</span>
                  </span>
                </div>

                {/* Disclaimer */}
                <p className="font-manrope font-semibold text-[10px] leading-[14px] text-[#7795E8] tracking-[0.02em] text-center max-w-[340px] mx-auto z-10">
                  * Calculations are based on average player activity and may vary in individual cases
                </p>

                {/* Email Invite Box (Flex Row next to each other) */}
                <form onSubmit={handleSendInvite} className="w-full flex flex-row gap-2 mt-1 z-10">
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
                      width: '268px',
                      height: '40px',
                      fontFamily: 'Manrope',
                      fontWeight: 600,
                      fontSize: '14px',
                      color: '#FFFFFF',
                      border: 'none',
                    }}
                    className="placeholder-[#BBCAF3] focus:outline-none focus:ring-1 focus:ring-[#1463FF]"
                  />
                  
                  <button
                    type="submit"
                    disabled={inviteStatus === 'sending'}
                    style={{
                      background: '#FFBF1F',
                      borderRadius: '8px',
                      width: '108px',
                      height: '40px',
                      fontFamily: 'Manrope',
                      fontWeight: 800,
                      fontSize: '14px',
                      color: '#1A1404',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    className="hover:bg-[#ffd362] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center transition-all uppercase"
                  >
                    {inviteStatus === 'sending' ? 'Sending' : 'Send Invite'}
                  </button>
                </form>
                {inviteStatus === 'success' && (
                  <span className="text-xs text-green-400 font-semibold text-center mt-1 animate-pulse z-10">
                    Invite sent successfully!
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Row: Horizontal Stats Bar */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 40px',
                width: '100%',
                height: '120px',
                background: 'rgba(9, 23, 65, 0.85)',
                backdropFilter: 'blur(10px)',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                boxSizing: 'border-box',
              }}
              className="shrink-0"
            >
              {/* Stat 1: Total Referrals */}
              <div className="flex flex-col gap-1 text-left">
                <span className="font-manrope font-semibold text-[12px] text-[#BBCAF3] tracking-[0.02em]">
                  Total Referrals
                </span>
                <div style={{ background: '#112F82', borderRadius: '8px', padding: '10px 16px', height: '40px', display: 'flex', alignItems: 'center' }}>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px]">👥</span>
                    <span className="font-manrope font-bold text-[16px] text-white">12</span>
                  </div>
                </div>
              </div>

              {/* Stat 2: Total Deposits */}
              <div className="flex flex-col gap-1 text-left">
                <span className="font-manrope font-semibold text-[12px] text-[#BBCAF3] tracking-[0.02em]">
                  Total Deposits
                </span>
                <div style={{ background: '#112F82', borderRadius: '8px', padding: '10px 16px', height: '40px', display: 'flex', alignItems: 'center' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-[18px] h-[18px] rounded-full bg-[#FFC83D] flex items-center justify-center text-[#1A1404] font-bold text-[10px]">
                      $
                    </div>
                    <span className="font-manrope font-bold text-[16px] text-white">$5000.00</span>
                  </div>
                </div>
              </div>

              {/* Stat 3: Total Earnings */}
              <div className="flex flex-col gap-1 text-left">
                <span className="font-manrope font-semibold text-[12px] text-[#BBCAF3] tracking-[0.02em]">
                  Total Earnings
                </span>
                <div style={{ background: '#112F82', borderRadius: '8px', padding: '10px 16px', height: '40px', display: 'flex', alignItems: 'center' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-[18px] h-[18px] rounded-full bg-[#FFC83D] flex items-center justify-center text-[#1A1404] font-bold text-[10px]">
                      $
                    </div>
                    <span className="font-manrope font-bold text-[16px] text-white">$500.00</span>
                  </div>
                </div>
              </div>

              {/* Stat 4: Pending Income */}
              <div className="flex flex-col gap-1 text-left">
                <span className="font-manrope font-semibold text-[12px] text-[#BBCAF3] tracking-[0.02em]">
                  Pending Income
                </span>
                <div style={{ background: '#112F82', borderRadius: '8px', padding: '10px 16px', height: '40px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-[18px] h-[18px] rounded-full bg-[#FFC83D] flex items-center justify-center text-[#1A1404] font-bold text-[10px]">
                      $
                    </div>
                    <span className="font-manrope font-bold text-[16px] text-white">
                      {claimStatus ? '$0.00' : '$150.00'}
                    </span>
                  </div>
                  <button
                    onClick={handleClaim}
                    disabled={claimStatus}
                    className="h-[28px] bg-[#1463FF] hover:bg-[#2e74ff] disabled:opacity-40 text-white font-manrope font-bold text-[11px] px-4 rounded-[6px] transition-colors border-none cursor-pointer flex items-center justify-center"
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
                <span className="font-sans font-bold text-[12px] text-[#A5B8EF] tracking-[0.05em] uppercase">
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
                        width: `calc(${(invitedFriends - 1) / 49} * (100% - 50px) + 25px)`
                      }}
                      className="absolute left-0 top-[15px] h-[6px] bg-[#1463FF] rounded-[100px] pointer-events-none"
                    />
                    <div 
                      style={{
                        left: `calc(${(invitedFriends - 1) / 49} * (100% - 50px))`
                      }}
                      className="absolute top-[3px] w-[50px] h-[30px] bg-[#1463FF] rounded-[100px] flex items-center justify-center gap-1 shadow-lg transition-all duration-75 pointer-events-none"
                    >
                      <span className="text-[12px]">👥</span>
                      <span className="font-manrope font-bold text-[14px] text-white">
                        {invitedFriends}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full bg-[#112F82] rounded-[8px] py-4 px-4 flex items-center justify-center border border-white/5">
                  <span className="font-manrope font-bold text-[15px] text-[#BBCAF3]">
                    Your monthly earnings:{' '}
                    <span className="text-white text-[20px] ml-1.5">${monthlyEarnings.toLocaleString()}</span>
                  </span>
                </div>

                <p className="font-manrope font-semibold text-[10px] leading-[14px] text-[#7795E8] tracking-[0.02em] text-center max-w-[340px] mx-auto">
                  * Calculations are based on average player activity and may vary in individual cases
                </p>

                <form onSubmit={handleSendInvite} className="w-full flex flex-col gap-2 mt-2">
                  <input 
                    type="email"
                    required
                    placeholder="Enter email address"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className="w-full h-[46px] bg-[#112F82] rounded-[8px] px-4 border border-white/5 text-white font-manrope font-semibold text-[14px] placeholder-[#BBCAF3] focus:outline-none focus:ring-1 focus:ring-[#1463FF]"
                  />
                  <button
                    type="submit"
                    disabled={inviteStatus === 'sending'}
                    className="w-full h-[46px] bg-[#FFC83D] hover:bg-[#ffd362] active:scale-[0.98] disabled:opacity-50 text-[#1A1404] font-manrope font-extrabold text-[15px] uppercase tracking-[0.04em] rounded-[8px] flex items-center justify-center transition-all cursor-pointer border-none"
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
                <div className="w-full h-12 bg-[#112F82] rounded-[8px] p-[10px_16px] flex items-center border border-white/5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[14px]">👥</span>
                    <span className="font-manrope font-bold text-[16px] text-white">12</span>
                  </div>
                </div>
              </div>

              {/* Total Deposits */}
              <div className="flex flex-col gap-1.5 text-left w-full">
                <span className="font-manrope font-semibold text-[12px] text-[#BBCAF3] tracking-[0.02em]">
                  Total Deposits
                </span>
                <div className="w-full h-12 bg-[#112F82] rounded-[8px] p-[10px_16px] flex items-center border border-white/5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-[20px] h-[20px] rounded-full bg-[#FFC83D] flex items-center justify-center text-[#1A1404] font-bold text-[12px]">
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
                <div className="w-full h-12 bg-[#112F82] rounded-[8px] p-[10px_16px] flex items-center border border-white/5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-[20px] h-[20px] rounded-full bg-[#FFC83D] flex items-center justify-center text-[#1A1404] font-bold text-[12px]">
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
                <div className="w-full h-12 bg-[#112F82] rounded-[8px] pl-4 pr-1.5 flex items-center justify-between border border-white/5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-[20px] h-[20px] rounded-full bg-[#FFC83D] flex items-center justify-center text-[#1A1404] font-bold text-[12px]">
                      $
                    </div>
                    <span className="font-manrope font-bold text-[16px] text-white">
                      {claimStatus ? '$0.00' : '$150.00'}
                    </span>
                  </div>
                  <button
                    onClick={handleClaim}
                    disabled={claimStatus}
                    className="h-[36px] bg-[#1463FF] hover:bg-[#2e74ff] disabled:opacity-40 text-white font-manrope font-bold text-[12px] px-5 rounded-[6px] transition-colors border-none cursor-pointer flex items-center justify-center"
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
          <div className="flex flex-col md:flex-row gap-[16px] w-full max-w-[1056px] mx-auto select-none">
            {/* Card 1: $2.5 K */}
            <div className="flex-1 min-w-0 bg-[#0C1F56] border border-white/5 rounded-[12px] p-[24px_16px] text-center flex flex-col justify-center items-center gap-2 shadow-lg">
              <span style={{ fontFamily: 'Jost', fontWeight: 800, fontSize: '32px', lineHeight: '40px', color: '#FFFFFF' }}>
                $2.5 K
              </span>
              <span className="font-manrope font-semibold text-[12px] leading-[16px] text-[#A5B8EF]">
                Claimed by the Most Active Referrer
              </span>
            </div>

            {/* Card 2: 500+ */}
            <div className="flex-1 min-w-0 bg-[#0C1F56] border border-white/5 rounded-[12px] p-[24px_16px] text-center flex flex-col justify-center items-center gap-2 shadow-lg">
              <span style={{ fontFamily: 'Jost', fontWeight: 800, fontSize: '32px', lineHeight: '40px', color: '#FFFFFF' }}>
                500+
              </span>
              <span className="font-manrope font-semibold text-[12px] leading-[16px] text-[#A5B8EF]">
                Players are already winning with us
              </span>
            </div>

            {/* Card 3: 19,000 */}
            <div className="flex-1 min-w-0 bg-[#0C1F56] border border-white/5 rounded-[12px] p-[24px_16px] text-center flex flex-col justify-center items-center gap-2 shadow-lg">
              <span style={{ fontFamily: 'Jost', fontWeight: 800, fontSize: '32px', lineHeight: '40px', color: '#FFFFFF' }}>
                19,000
              </span>
              <span className="font-manrope font-semibold text-[12px] leading-[16px] text-[#A5B8EF]">
                Free Spins received by friends
              </span>
            </div>
          </div>

          {/* =========================================================================
              3. BENEFITS SECTIONS (WHAT YOU GET & WHAT YOUR FRIEND GETS)
             ========================================================================= */}
          <div className="flex flex-col lg:flex-row gap-5 w-full max-w-[1056px] mx-auto select-none">
            
            {/* WHAT YOU GET */}
            <div 
              style={{
                background: 'radial-gradient(circle at 0% 0%, rgba(87, 255, 61, 0.12) 0%, rgba(9, 23, 65, 0) 60%), #091741',
              }}
              className="flex-1 border border-white/10 rounded-[16px] p-6 flex flex-col gap-6 shadow-xl text-left"
            >
              <div className="flex flex-row items-center gap-2">
                {/* Custom icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#57FF3D" strokeWidth="2.5" className="shrink-0">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <h3 className="font-jost font-black text-[18px] text-white tracking-wider uppercase">
                  WHAT YOU GET
                </h3>
              </div>

              <div className="flex flex-col gap-5">
                {/* Point 1 */}
                <div className="flex gap-4 items-start">
                  <div className="w-[36px] h-[36px] rounded-lg bg-[#57FF3D]/10 flex items-center justify-center text-[#57FF3D] shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="8" cy="8" r="6" />
                      <circle cx="18" cy="18" r="4" />
                      <path d="M12 18a6 6 0 0 0-6-6" />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="font-manrope font-bold text-[14px] text-white leading-snug">
                      Lifetime earnings from each deposit
                    </span>
                    <span className="font-manrope font-semibold text-[12px] text-[#A5B8EF] mt-0.5">
                      You get a percentage of every deposit your friends complete.
                    </span>
                  </div>
                </div>

                {/* Point 2 */}
                <div className="flex gap-4 items-start">
                  <div className="w-[36px] h-[36px] rounded-lg bg-[#57FF3D]/10 flex items-center justify-center text-[#57FF3D] shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="font-manrope font-bold text-[14px] text-white leading-snug">
                      Instant crediting
                    </span>
                    <span className="font-manrope font-semibold text-[12px] text-[#A5B8EF] mt-0.5">
                      Your income is credited a few minutes after your friend’s deposit is completed.
                    </span>
                  </div>
                </div>

                {/* Point 3 */}
                <div className="flex gap-4 items-start">
                  <div className="w-[36px] h-[36px] rounded-lg bg-[#57FF3D]/10 flex items-center justify-center text-[#57FF3D] shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4z" />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="font-manrope font-bold text-[14px] text-white leading-snug">
                      No limits for earnings
                    </span>
                    <span className="font-manrope font-semibold text-[12px] text-[#A5B8EF] mt-0.5">
                      Your earnings are not capped. Sky (and your friend’s wallet) is the limit!
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* WHAT YOUR FRIEND GETS */}
            <div 
              style={{
                background: 'radial-gradient(circle at 0% 0%, rgba(20, 99, 255, 0.12) 0%, rgba(9, 23, 65, 0) 60%), #091741',
              }}
              className="flex-1 border border-white/10 rounded-[16px] p-6 flex flex-col gap-6 shadow-xl text-left"
            >
              <div className="flex flex-row items-center gap-2">
                {/* Custom icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1463FF" strokeWidth="2.5" className="shrink-0">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <h3 className="font-jost font-black text-[18px] text-white tracking-wider uppercase">
                  WHAT YOUR FRIEND GETS
                </h3>
              </div>

              <div className="flex flex-col gap-5">
                {/* Point 1 */}
                <div className="flex gap-4 items-start">
                  <div className="w-[36px] h-[36px] rounded-lg bg-[#1463FF]/15 flex items-center justify-center text-[#1463FF] shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="8" cy="8" r="6" />
                      <circle cx="18" cy="18" r="4" />
                      <path d="M12 18a6 6 0 0 0-6-6" />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="font-manrope font-bold text-[14px] text-white leading-snug">
                      Lifetime earnings from each deposit
                    </span>
                    <span className="font-manrope font-semibold text-[12px] text-[#A5B8EF] mt-0.5">
                      You get a percentage of every deposit your friends complete.
                    </span>
                  </div>
                </div>

                {/* Point 2 */}
                <div className="flex gap-4 items-start">
                  <div className="w-[36px] h-[36px] rounded-lg bg-[#1463FF]/15 flex items-center justify-center text-[#1463FF] shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="font-manrope font-bold text-[14px] text-white leading-snug">
                      Instant crediting
                    </span>
                    <span className="font-manrope font-semibold text-[12px] text-[#A5B8EF] mt-0.5">
                      Your income is credited a few minutes after your friend’s deposit is completed.
                    </span>
                  </div>
                </div>

                {/* Point 3 */}
                <div className="flex gap-4 items-start">
                  <div className="w-[36px] h-[36px] rounded-lg bg-[#1463FF]/15 flex items-center justify-center text-[#1463FF] shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4z" />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="font-manrope font-bold text-[14px] text-white leading-snug">
                      No limits for earnings
                    </span>
                    <span className="font-manrope font-semibold text-[12px] text-[#A5B8EF] mt-0.5">
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
          <div className="flex flex-col gap-4 w-full max-w-[1056px] mx-auto text-left select-none">
            
            {/* Header Title */}
            <div className="flex flex-row items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFBF1F" strokeWidth="2.5">
                <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/>
                <path d="M5 20h14a2 2 0 0 0 2-2H3a2 2 0 0 0 2 2z"/>
              </svg>
              <h2 className="font-jost font-black text-[16px] text-white tracking-wide uppercase">
                HOW REFERRAL PROGRAM WORKS
              </h2>
            </div>

            {/* Steps list (row on desktop, stacked on mobile) */}
            <div className="flex flex-col md:flex-row gap-4 w-full">
              
              {/* Step 1 */}
              <div 
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(6, 16, 43, 0) 30%, rgba(6, 16, 43, 0.95) 90%), url(/games/refrels/r1.png)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                className="flex-1 h-[180px] rounded-2xl border border-white/5 p-5 flex flex-col justify-between items-start text-left relative overflow-hidden group shadow-xl"
              >
                <div className="w-[30px] h-[30px] bg-[#1463FF] rounded-[6px] flex items-center justify-center font-jost font-black text-[14px] text-white">
                  1
                </div>
                <span className="font-jost font-black text-[12px] leading-tight text-white uppercase max-w-[280px] z-10">
                  SHARE INVITATION LINK WITH YOUR FRIEND
                </span>
              </div>

              {/* Step 2 */}
              <div 
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(6, 16, 43, 0) 30%, rgba(6, 16, 43, 0.95) 90%), url(/games/refrels/r2.png)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                className="flex-1 h-[180px] rounded-2xl border border-white/5 p-5 flex flex-col justify-between items-start text-left relative overflow-hidden group shadow-xl"
              >
                <div className="w-[30px] h-[30px] bg-[#1463FF] rounded-[6px] flex items-center justify-center font-jost font-black text-[14px] text-white">
                  2
                </div>
                <span className="font-jost font-black text-[12px] leading-tight text-white uppercase max-w-[280px] z-10">
                  YOUR FRIEND JOINS & RECEIVES <span className="text-[#FFC83D]">50 FREE SPINS</span> TO GET STARTED
                </span>
              </div>

              {/* Step 3 */}
              <div 
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(6, 16, 43, 0) 30%, rgba(6, 16, 43, 0.95) 90%), url(/games/refrels/r3.png)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                className="flex-1 h-[180px] rounded-2xl border border-white/5 p-5 flex flex-col justify-between items-start text-left relative overflow-hidden group shadow-xl"
              >
                <div className="w-[30px] h-[30px] bg-[#1463FF] rounded-[6px] flex items-center justify-center font-jost font-black text-[14px] text-white">
                  3
                </div>
                <span className="font-jost font-black text-[12px] leading-tight text-white uppercase max-w-[280px] z-10">
                  NOW, YOU’LL GET PAID <span className="text-[#FFC83D]">EVERY TIME</span> YOUR FRIEND DEPOSITS & PLAY
                </span>
              </div>

            </div>
          </div>

          {/* =========================================================================
              5. FAQS
             ========================================================================= */}
          <div className="flex flex-col gap-4 w-full max-w-[1056px] mx-auto text-left">
            <h2 className="font-jost font-black text-[16px] text-white tracking-wide uppercase select-none">
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
          <img src="/mobile/sidebar/gift.png" alt="Offers" className="w-5 h-5 object-contain" />
          <span className="text-[10px] font-semibold font-sans">Offers</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#D2DCF7] hover:text-white cursor-pointer bg-transparent border-0 flex-1">
          <img src="/mobile/sidebar/vip.png" alt="VIP" className="w-5 h-5 object-contain" />
          <span className="text-[10px] font-semibold font-sans">VIP</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#D2DCF7] hover:text-white cursor-pointer bg-transparent border-0 flex-1">
          <img src="/mobile/sidebar/trophy.png" alt="Challenges" className="w-5 h-5 object-contain" />
          <span className="text-[10px] font-semibold font-sans">Challenges</span>
        </button>
      </nav>

    </div>
  );
}
