'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import DepositModal from '@/components/DepositModal';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { openDepositModal, closeDepositModal, toggleSidebar, openAuthModal } from '@/redux/features/uiSlice';

export default function ReferralsPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  // Auth protection check
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const depositModalOpen = useAppSelector((state) => state.ui.depositModalOpen);

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
  const [pendingIncomeClaimed, setPendingIncomeClaimed] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0); // First FAQ open by default
  const [copiedLink, setCopiedLink] = useState(false);

  // Constants / Calculations
  const earningsPerFriend = 50; // average earnings per friend
  const monthlyEarnings = invitedFriends * earningsPerFriend;

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailAddress) return;
    setInviteStatus('sending');
    setTimeout(() => {
      setInviteStatus('success');
      setEmailAddress('');
      setTimeout(() => setInviteStatus('idle'), 3000);
    }, 1000);
  };

  const handleClaimPending = () => {
    if (pendingIncomeClaimed) return;
    setPendingIncomeClaimed(true);
    alert('Claimed $150.00 successfully! It has been added to your balance.');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://mightyluck.com/register?ref=user123');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const faqs = [
    {
      question: 'How do I invite a friend?',
      answer: 'In order to participate in the Refer A Friend campaign, as a referrer you need to have an active account at Mighty Luck and have at least $50 (or currency equivalent) deposited. Multiple deposits can be summed up in order to meet the minimum deposit requirement.'
    },
    {
      question: 'Who counts as a referred friend?',
      answer: 'Any friend who registers using your unique referral link, verifies their email address, and makes their first deposit. They will also receive 50 Free Spins as a welcome bonus!'
    },
    {
      question: 'How do I claim my referral earnings?',
      answer: 'Referral earnings are updated in real-time and can be claimed directly to your balance from the Referrals dashboard. Simply click the "Claim" button next to your pending income.'
    }
  ];

  // Return early if not authenticated to prevent flash of content
  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen bg-[#091741] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#1463FF]"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1440px] min-h-screen mx-auto bg-[#091741] text-white relative flex flex-col select-none overflow-x-hidden">
      
      {/* 1. Header (Navbar) */}
      <Navbar />

      {/* 2. Page Content Layout (Sidebar + Content Panel) */}
      <div className="flex flex-row items-start w-full px-3 sm:px-4 lg:px-6 pt-4 lg:pt-6 pb-16 gap-3 lg:gap-6 relative">

        {/* Left Sidebar */}
        <div className="hidden lg:block shrink-0"><Sidebar /></div>
        <div className="lg:hidden"><Sidebar /></div>

        {/* Right Main Content Column */}
        <div className="w-full min-w-0 flex-1 flex flex-col gap-12 lg:gap-[100px]">

          {/* MAIN HERO BANNER & STATS */}
          <div className="flex flex-col gap-6 w-full">
            
            {/* Hero Container */}
            <div 
              style={{
                background: `linear-gradient(95.59deg, #06102B 13.87%, rgba(6, 16, 43, 0) 35.34%), url(/games/refrels/refer.png), #2A0B3E`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '16px',
              }}
              className="w-full min-h-[533px] flex flex-col lg:flex-row items-center justify-between p-6 sm:p-10 gap-8 lg:gap-6 relative overflow-hidden border border-white/5"
            >
              
              {/* Left Column: Heading */}
              <div className="flex flex-col gap-4 max-w-[457px] w-full text-left z-10 lg:ml-4">
                <span className="font-jost font-medium text-[20px] sm:text-[28px] leading-tight text-white">
                  Get <span className="text-[#FFC83D] font-extrabold">PAID</span> every time
                </span>
                <span className="font-jost font-black text-[36px] sm:text-[48px] leading-[100%] text-white tracking-wide uppercase">
                  YOUR FRIEND<br />PLAYS!
                </span>

                {/* Referral Link Copy Box (Convenience bonus) */}
                <div className="mt-4 flex flex-col gap-2 bg-[#091741]/85 p-3 rounded-xl border border-white/10 max-w-[380px]">
                  <span className="text-xs text-[#BBCAF3] font-semibold">Your Referral Link:</span>
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      readOnly 
                      value="mightyluck.com/ref?u=123" 
                      className="bg-[#112F82] border-0 text-white text-xs font-sans font-bold px-3 py-2 rounded-md flex-1 outline-none focus:ring-0"
                    />
                    <button 
                      onClick={handleCopyLink}
                      className="bg-[#1463FF] hover:bg-[#2e74ff] text-white text-xs font-bold px-3 py-2 rounded-md transition-colors whitespace-nowrap cursor-pointer"
                    >
                      {copiedLink ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Earnings Estimator Box */}
              <div className="relative w-full max-w-[430px] bg-[#091741] rounded-[16px] p-5 sm:p-6 flex flex-col items-center gap-6 border border-white/10 z-10 shadow-2xl overflow-visible">
                
                {/* Accent glow on top */}
                <div className="absolute w-[173px] h-[173px] left-[calc(50%-173px/2)] top-[-60px] rounded-full bg-[#1463FF] filter blur-[40px] opacity-60 pointer-events-none -z-10" />

                {/* Box Title */}
                <h3 className="font-jost font-extrabold text-[20px] leading-[29px] text-center text-white max-w-[300px]">
                  How much can you earn with Mighty Luck?
                </h3>

                <div className="w-full flex flex-col gap-6">
                  {/* Slider Component */}
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex justify-between items-center text-xs font-semibold text-[#BBCAF3] tracking-wider font-manrope">
                      <span>Invited Friends</span>
                      <span className="text-[#FFC83D] font-bold">{invitedFriends} Friends</span>
                    </div>

                    {/* Progress slider bar wrapper */}
                    <div className="relative w-full h-10 flex items-center mt-1">
                      {/* Custom Range Slider */}
                      <input 
                        type="range"
                        min="1"
                        max="50"
                        value={invitedFriends}
                        onChange={(e) => setInvitedFriends(parseInt(e.target.value))}
                        className="w-full h-[6px] bg-[#112F82] rounded-lg appearance-none cursor-pointer accent-[#1463FF] outline-none"
                        style={{
                          background: `linear-gradient(to right, #1463FF 0%, #1463FF ${(invitedFriends / 50) * 100}%, #112F82 ${(invitedFriends / 50) * 100}%, #112F82 100%)`
                        }}
                      />
                      
                      {/* Draggable indicator pill (Figma style overlaying the progress) */}
                      <div 
                        style={{
                          left: `calc(${(invitedFriends / 50) * 100}% - 27px)`,
                          pointerEvents: 'none',
                        }}
                        className="absolute top-[5px] w-[54px] h-[30px] bg-[#1463FF] rounded-full flex items-center justify-center shadow-lg transition-all duration-75"
                      >
                        <span className="font-sans font-bold text-sm text-white">{invitedFriends}</span>
                      </div>
                    </div>
                  </div>

                  {/* Monthly Earnings Card */}
                  <div className="w-full bg-[#112F82] rounded-lg p-4 flex flex-row items-center justify-between min-h-[60px]">
                    <span className="font-sans font-bold text-sm text-white">
                      Your monthly earnings:
                    </span>
                    <span className="font-sans font-black text-2xl text-[#FFC83D] tracking-wide">
                      ${monthlyEarnings.toLocaleString()}
                    </span>
                  </div>

                  <p className="font-sans font-medium text-[10px] leading-[14px] text-[#7795E8] text-center max-w-[390px] mx-auto select-none">
                    * Calculations are based on average player activity and may vary in individual cases
                  </p>

                  {/* Email Invite Box */}
                  <form onSubmit={handleSendInvite} className="w-full flex items-center gap-2 mt-2">
                    <input 
                      type="email"
                      required
                      placeholder="Enter email address"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className="flex-1 h-10 bg-[#112F82] text-white placeholder-[#7795E8] border border-white/5 rounded-lg px-4 text-sm font-sans font-semibold outline-none focus:border-[#1463FF]/50 transition-all focus:ring-0"
                    />
                    <button 
                      type="submit"
                      disabled={inviteStatus === 'sending'}
                      className="w-[122px] h-10 bg-[#FFC83D] hover:bg-[#ffd362] active:scale-95 disabled:opacity-50 text-[#1A1404] font-sans font-bold text-sm rounded-lg flex items-center justify-center transition-all cursor-pointer shrink-0"
                    >
                      {inviteStatus === 'sending' ? 'Sending...' : 'Send Invite'}
                    </button>
                  </form>
                  {inviteStatus === 'success' && (
                    <span className="text-xs text-green-400 font-semibold text-center -mt-2 animate-pulse">
                      Invite sent successfully!
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Ribbon Below Hero */}
            <div className="w-full bg-[#091741] rounded-[16px] p-5 lg:p-6 border border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
              
              {/* Card 1: Total Referrals */}
              <div className="flex-1 w-full flex flex-col gap-2 text-left">
                <span className="font-sans font-semibold text-xs text-[#BBCAF3] uppercase tracking-wider">Total Referrals</span>
                <div className="h-10 bg-[#112F82] rounded-lg px-4 flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFC83D" strokeWidth="2" strokeLinecap="round" className="shrink-0">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                  </svg>
                  <span className="font-sans font-extrabold text-base text-white">12</span>
                </div>
              </div>

              {/* Card 2: Total Deposits */}
              <div className="flex-1 w-full flex flex-col gap-2 text-left">
                <span className="font-sans font-semibold text-xs text-[#BBCAF3] uppercase tracking-wider">Total Deposits</span>
                <div className="h-10 bg-[#112F82] rounded-lg px-4 flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFC83D" strokeWidth="2" className="shrink-0">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                  <span className="font-sans font-extrabold text-base text-white">$5,000.00</span>
                </div>
              </div>

              {/* Card 3: Total Earnings */}
              <div className="flex-1 w-full flex flex-col gap-2 text-left">
                <span className="font-sans font-semibold text-xs text-[#BBCAF3] uppercase tracking-wider">Total Earnings</span>
                <div className="h-10 bg-[#112F82] rounded-lg px-4 flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFC83D" strokeWidth="2" className="shrink-0">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v8" />
                    <path d="M8 12h8" />
                  </svg>
                  <span className="font-sans font-extrabold text-base text-white">$500.00</span>
                </div>
              </div>

              {/* Card 4: Pending Income */}
              <div className="flex-1 w-full flex flex-col gap-2 text-left">
                <span className="font-sans font-semibold text-xs text-[#BBCAF3] uppercase tracking-wider">Pending Income</span>
                <div className="h-10 bg-[#112F82] rounded-lg px-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFC83D" strokeWidth="2" className="shrink-0">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span className="font-sans font-extrabold text-base text-white">
                      {pendingIncomeClaimed ? '$0.00' : '$150.00'}
                    </span>
                  </div>
                  <button 
                    onClick={handleClaimPending}
                    disabled={pendingIncomeClaimed}
                    className="h-6 px-3 bg-[#1463FF] hover:bg-[#2e74ff] disabled:opacity-40 disabled:hover:bg-[#1463FF] rounded-[6px] flex items-center justify-center font-sans font-bold text-xs text-white transition-colors cursor-pointer select-none border-none outline-none"
                  >
                    {pendingIncomeClaimed ? 'Claimed' : 'Claim'}
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* THREE HIGHLIGHT INFO CARDS ROW */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6 w-full">
            
            {/* Card 1 */}
            <div className="bg-[#0C1F56] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 min-h-[136px] hover:bg-[#112a75] transition-all">
              <span className="font-jost font-black text-[36px] sm:text-[40px] leading-tight text-white">$2.5 K</span>
              <span className="font-manrope font-semibold text-sm sm:text-[16px] text-[#A5B8EF] text-center">
                Claim By the Most Active Referrer
              </span>
            </div>

            {/* Card 2 */}
            <div className="bg-[#0C1F56] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 min-h-[136px] hover:bg-[#112a75] transition-all">
              <span className="font-jost font-black text-[36px] sm:text-[40px] leading-tight text-white">500+</span>
              <span className="font-manrope font-semibold text-sm sm:text-[16px] text-[#A5B8EF] text-center">
                Players are already earning with us
              </span>
            </div>

            {/* Card 3 */}
            <div className="bg-[#0C1F56] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 min-h-[136px] hover:bg-[#112a75] transition-all">
              <span className="font-jost font-black text-[36px] sm:text-[40px] leading-tight text-white">19,000</span>
              <span className="font-manrope font-semibold text-sm sm:text-[16px] text-[#A5B8EF] text-center">
                Free Spins received by friends
              </span>
            </div>

          </div>

          {/* WHAT YOU GET VS WHAT YOUR FRIEND GETS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            
            {/* Column 1: What you get */}
            <div className="bg-[#0C1F56] border border-white/5 rounded-2xl p-6 sm:p-[40px] relative overflow-hidden flex flex-col gap-6">
              {/* Green blur glow background */}
              <div className="absolute w-[182px] h-[182px] left-[-30px] top-[-30px] rounded-full bg-[#57FF3D] filter blur-[60px] opacity-20 pointer-events-none" />

              <h3 className="font-jost font-black text-[20px] text-white tracking-wider uppercase z-10 text-left">
                WHAT YOU GET
              </h3>

              <div className="flex flex-col gap-6 z-10">
                
                {/* List Item 1 */}
                <div className="flex gap-4 items-start">
                  <div className="w-5 h-5 mt-1 bg-[#57FF3D] rounded-full flex items-center justify-center shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="4">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-sans font-bold text-sm sm:text-base text-white">Lifetime earnings from each deposit</span>
                    <span className="font-sans font-medium text-sm text-[#A5B8EF] mt-1">
                      You get a percentage of every deposit your friends complete.
                    </span>
                  </div>
                </div>

                {/* List Item 2 */}
                <div className="flex gap-4 items-start">
                  <div className="w-5 h-5 mt-1 bg-[#57FF3D] rounded-full flex items-center justify-center shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="4">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-sans font-bold text-sm sm:text-base text-white">Instant crediting</span>
                    <span className="font-sans font-medium text-sm text-[#A5B8EF] mt-1">
                      Your income is credited a few minutes after your friend’s deposit is completed.
                    </span>
                  </div>
                </div>

                {/* List Item 3 */}
                <div className="flex gap-4 items-start">
                  <div className="w-5 h-5 mt-1 bg-[#57FF3D] rounded-full flex items-center justify-center shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="4">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-sans font-bold text-sm sm:text-base text-white">No limits for earnings</span>
                    <span className="font-sans font-medium text-sm text-[#A5B8EF] mt-1">
                      Your earnings are not capped. Sky (and your friend’s wallet) is the limit!
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Column 2: What your friend gets */}
            <div className="bg-[#0C1F56] border border-white/5 rounded-2xl p-6 sm:p-[40px] relative overflow-hidden flex flex-col gap-6">
              {/* Blue blur glow background */}
              <div className="absolute w-[182px] h-[182px] right-[-30px] top-[-30px] rounded-full bg-[#1463FF] filter blur-[60px] opacity-20 pointer-events-none" />

              <h3 className="font-jost font-black text-[20px] text-white tracking-wider uppercase z-10 text-left">
                WHAT YOUR FRIEND GETS
              </h3>

              <div className="flex flex-col gap-6 z-10">
                
                {/* List Item 1 */}
                <div className="flex gap-4 items-start">
                  <div className="w-5 h-5 mt-1 bg-[#1463FF] rounded-full flex items-center justify-center shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-sans font-bold text-sm sm:text-base text-white">Welcome pack up to $1,000 + 100 Free Spins</span>
                    <span className="font-sans font-medium text-sm text-[#A5B8EF] mt-1">
                      Your friend gets access to the most generous bonuses.
                    </span>
                  </div>
                </div>

                {/* List Item 2 */}
                <div className="flex gap-4 items-start">
                  <div className="w-5 h-5 mt-1 bg-[#1463FF] rounded-full flex items-center justify-center shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-sans font-bold text-sm sm:text-base text-white">Provably fair games</span>
                    <span className="font-sans font-medium text-sm text-[#A5B8EF] mt-1">
                      Complete transparency and safety for every game play.
                    </span>
                  </div>
                </div>

                {/* List Item 3 */}
                <div className="flex gap-4 items-start">
                  <div className="w-5 h-5 mt-1 bg-[#1463FF] rounded-full flex items-center justify-center shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-sans font-bold text-sm sm:text-base text-white">24/7 VIP Support</span>
                    <span className="font-sans font-medium text-sm text-[#A5B8EF] mt-1">
                      Instant help and assistance whenever they need it.
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* HOW REFERRAL PROGRAM WORKS (STEPS) */}
          <div className="flex flex-col gap-6 w-full">
            
            {/* Header */}
            <div className="flex flex-row items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFC83D" strokeWidth="2.5" className="shrink-0">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <h2 className="font-jost font-black text-xl text-white tracking-wide uppercase select-none">
                HOW REFERRAL PROGRAM WORKS
              </h2>
            </div>

            {/* Grid of Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              
              {/* Step 1 */}
              <div 
                style={{
                  background: `linear-gradient(357.52deg, #06102B 0.07%, rgba(6, 16, 43, 0) 34.29%), linear-gradient(90.32deg, #001958 8.61%, rgba(0, 25, 88, 0) 58.87%), url(/games/refrels/r1.png)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                className="h-[220px] rounded-2xl border border-white/5 p-6 flex flex-col justify-between items-start text-left relative overflow-hidden group hover:scale-[1.02] transition-all duration-300"
              >
                {/* Number Badge */}
                <div className="w-10 h-10 bg-[#1463FF] rounded-lg flex items-center justify-center font-jost font-black text-xl text-white select-none">
                  1
                </div>
                {/* Title */}
                <span className="font-jost font-black text-base leading-tight text-white uppercase max-w-[220px] z-10">
                  Share invitation link with your friend
                </span>
              </div>

              {/* Step 2 */}
              <div 
                style={{
                  background: `linear-gradient(359.97deg, #06102B 0.03%, rgba(6, 16, 43, 0) 39.1%), linear-gradient(90.32deg, #001958 8.61%, rgba(0, 25, 88, 0) 58.87%), url(/games/refrels/r2.png)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                className="h-[220px] rounded-2xl border border-white/5 p-6 flex flex-col justify-between items-start text-left relative overflow-hidden group hover:scale-[1.02] transition-all duration-300"
              >
                {/* Number Badge */}
                <div className="w-10 h-10 bg-[#1463FF] rounded-lg flex items-center justify-center font-jost font-black text-xl text-white select-none">
                  2
                </div>
                {/* Title */}
                <span className="font-jost font-black text-base leading-tight text-white uppercase max-w-[220px] z-10">
                  Your friend joins & receives 50 Free Spins to get started
                </span>
              </div>

              {/* Step 3 */}
              <div 
                style={{
                  background: `linear-gradient(358.76deg, #06102B 1.27%, rgba(6, 16, 43, 0) 36.65%), linear-gradient(90.32deg, #001958 8.61%, rgba(0, 25, 88, 0) 58.87%), url(/games/refrels/r3.png)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                className="h-[220px] rounded-2xl border border-white/5 p-6 flex flex-col justify-between items-start text-left relative overflow-hidden group hover:scale-[1.02] transition-all duration-300"
              >
                {/* Number Badge */}
                <div className="w-10 h-10 bg-[#1463FF] rounded-lg flex items-center justify-center font-jost font-black text-xl text-white select-none">
                  3
                </div>
                {/* Title */}
                <span className="font-jost font-black text-base leading-tight text-white uppercase max-w-[220px] z-10">
                  Now, you’ll get paid every time your friend deposits & play
                </span>
              </div>

            </div>
          </div>

         
          {/* FAQS SECTION */}
          <div className="flex flex-col gap-6 w-full">
            <h2 className="font-jost font-black text-xl text-white tracking-wide uppercase text-left select-none">
              FAQs
            </h2>

            <div className="flex flex-col gap-4 w-full">
              {faqs.map((faq, idx) => {
                const isOpen = expandedFaq === idx;
                return (
                  <div 
                    key={idx} 
                    className="w-full bg-[#0C1F56] border border-white/5 rounded-lg overflow-hidden transition-all duration-300"
                  >
                    <button 
                      onClick={() => setExpandedFaq(isOpen ? null : idx)}
                      className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left font-jost font-extrabold text-lg text-white hover:bg-[#112a75] transition-colors cursor-pointer border-none outline-none"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="shrink-0 text-white"
                        >
                          <path
                            d="M2 8H14"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="shrink-0 text-white"
                        >
                          <path
                            d="M8 2V14M2 8H14"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 pt-1 text-left font-manrope font-medium text-sm text-[#A5B8EF] leading-relaxed border-t border-white/5">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* SEO/ABOUT CASINO TEXT AREA */}
          <div className="w-full border-t border-[#112F82] pt-[40px] flex flex-col items-center gap-[32px]">
            <div className="flex flex-col gap-6 max-w-[800px] w-full text-center">
              
              <div className="flex flex-col gap-6 text-left">
                <h1 className="font-jost font-bold text-2xl sm:text-[32px] leading-tight text-white tracking-tight">
                  Play the Best Crypto Casino Games Online at Mighty Luck — Fast, Fair and Secure
                </h1>
                
                <p className="font-manrope font-semibold text-sm sm:text-base text-[#D2DCF7] leading-relaxed">
                  Step into a next-generation gaming experience where every spin, bet, and hand is powered by blockchain technology. At Mighty Luck Casino, you can explore more than 9,000 crypto casino games across slots, table games, live dealer games, and crash-style favorites. As one of the top crypto casinos online, Mighty Luck gives players instant withdrawals, enhanced privacy, and a secure gambling environment without the friction of traditional payment methods. Whether you're here to play table games, explore Bitcoin casino games, or try the latest provably fair slots, Mighty Luck delivers one of the most complete online casino experiences available today. Ready to play games and win real crypto? Start playing crypto casino games at Mighty Luck Casino.
                </p>
              </div>

              <div className="flex flex-col gap-4 text-left">
                <h2 className="font-jost font-bold text-xl sm:text-2xl text-white">
                  Why Mighty Luck Is the Ultimate Place to Play Crypto Casino Games
                </h2>
                <p className="font-manrope font-semibold text-sm sm:text-base text-[#D2DCF7] leading-relaxed">
                  Mighty Luck Casino offers the perfect blend of crypto gambling convenience, online casino entertainment, and world-class security. Compared to traditional online casinos, Mighty Luck delivers significantly faster payouts, more generous bonuses, and an unmatched selection of various games.
                </p>
              </div>

              <div className="flex flex-col gap-4 text-left">
                <h2 className="font-jost font-bold text-xl sm:text-2xl text-white">
                  Massive Game Variety
                </h2>
                <p className="font-manrope font-semibold text-sm sm:text-base text-[#D2DCF7] leading-relaxed font-semibold">
                  With more than 9,000 casino games, Mighty Luck outshines many crypto casinos and traditional casinos alike. You'll find slots, card games, custom crash formats, and high-stakes tables to suit any gaming budget.
                </p>
              </div>

            </div>
          </div>

          {/* FOOTER */}
          <footer className="w-full flex flex-col gap-12 border-t border-[#112F82] pt-[48px] pb-8">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
              
              {/* Left Logo Column */}
              <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-2">
                  <svg width="34" height="25" viewBox="0 0 34 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M33.1198 7.41853L24.191 11.0541C23.9175 11.1662 23.6056 11.0595 23.4552 10.8051L17.478 0.292432C17.2455 -0.104222 16.6655 -0.0960149 16.4467 0.308846L10.1796 10.8325C10.0346 11.1006 9.70631 11.2155 9.42455 11.0951L0.826733 7.41853C0.36169 7.21883 -0.122501 7.65925 0.027954 8.14071L5.1106 24.3269C5.18719 24.5731 5.41698 24.7427 5.67685 24.7427L27.4354 24.7482C27.6843 24.7482 27.9059 24.5923 27.9934 24.3598L33.9022 8.1708C34.0773 7.68661 33.5986 7.2243 33.1226 7.41853H33.1198ZM20.602 15.2668L16.351 22.7896C16.2908 22.8962 16.1321 22.8552 16.1266 22.7348L15.9543 18.1802H14.4689V18.1637C14.4306 18.1692 14.3923 18.1802 14.3513 18.1802H11.2683C11.178 18.1802 11.1206 18.0817 11.1616 18.0023L15.7437 9.51395C15.9051 9.23493 16.2005 9.06532 16.5206 9.06532H19.6035C19.6938 9.06532 19.7512 9.1638 19.7102 9.24313L16.5534 15.089H20.4953C20.5883 15.089 20.6458 15.1875 20.5993 15.2695L20.602 15.2668Z"
                      fill="url(#crown-gradient)"
                    />
                  </svg>
                  <span className="font-sans font-black text-white tracking-[0.02em] text-[20px] leading-[26px]">
                    MIGHTY <span className="text-[#FFC83D]">LUCK</span>
                  </span>
                </div>
                <p className="font-sans font-semibold text-xs text-[#D2DCF7] mt-1 select-none">
                  © 2026 Mighty Luck. All rights reserved.
                </p>
              </div>

              {/* Footer Links Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-16 w-full lg:w-auto">
                {/* Menu Col 1 */}
                <div className="flex flex-col gap-3 text-left">
                  <h4 className="font-jost font-bold text-xs uppercase tracking-wider text-white">Casino</h4>
                  <div className="flex flex-col gap-2">
                    {['Lobby', 'Slots', 'Originals', 'Crash Games'].map((item) => (
                      <span key={item} className="font-sans font-semibold text-[11px] text-[#D2DCF7] cursor-pointer hover:text-white transition-colors">{item}</span>
                    ))}
                  </div>
                </div>

                {/* Menu Col 2 */}
                <div className="flex flex-col gap-3 text-left">
                  <h4 className="font-jost font-bold text-xs uppercase tracking-wider text-white">Promo</h4>
                  <div className="flex flex-col gap-2">
                    {['Promotions', 'VIP Club', 'Tournaments', 'Refer A Friend'].map((item) => (
                      <span key={item} className="font-sans font-semibold text-[11px] text-[#D2DCF7] cursor-pointer hover:text-white transition-colors">{item}</span>
                    ))}
                  </div>
                </div>

                {/* Menu Col 3 */}
                <div className="flex flex-col gap-3 text-left">
                  <h4 className="font-jost font-bold text-xs uppercase tracking-wider text-white">About</h4>
                  <div className="flex flex-col gap-2">
                    {['About Us', 'Support', 'Blog', 'FAQs'].map((item) => (
                      <span key={item} className="font-sans font-semibold text-[11px] text-[#D2DCF7] cursor-pointer hover:text-white transition-colors">{item}</span>
                    ))}
                  </div>
                </div>

                {/* Menu Col 4 */}
                <div className="flex flex-col gap-3 text-left">
                  <h4 className="font-jost font-bold text-xs uppercase tracking-wider text-white">Legal</h4>
                  <div className="flex flex-col gap-2">
                    {['Privacy Policy', 'Terms & Conditions', 'Bonus Terms', 'Responsible Gambling'].map((item) => (
                      <span key={item} className="font-sans font-semibold text-[11px] text-[#D2DCF7] cursor-pointer hover:text-white transition-colors">{item}</span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* License details */}
            <div className="w-full border-t border-[#112F82] pt-[48px] flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
              <p className="font-sans font-semibold text-[10px] leading-[14px] text-justify tracking-[0.01em] text-[#D2DCF7] w-full md:w-[445px]">
                MightyLuck.com is owned and operated by Company Name B.V. a company that is incorporated under the laws of Curacao with company registration number XXXXXX, having its registered address at Street 3XX9, City, Curaçao. MightyLuck.com is licensed and holds a valid Certificate of Operation (ABC/XXXX/XXX/XXXX).
              </p>

              <div className="flex flex-row items-center justify-center md:justify-end gap-[32px] w-full md:w-[288.5px] h-[38px] shrink-0">
                <img src="/games/footer/18.svg" className="w-[38px] h-[38px] object-contain cursor-pointer opacity-80 hover:opacity-100 transition-opacity" alt="18+" />
                <img src="/games/footer/gamble-aware.svg" className="w-[120px] h-[24px] object-contain cursor-pointer opacity-80 hover:opacity-100 transition-opacity" alt="Gamble Aware" />
                <img src="/games/footer/gaming-license.svg" className="w-[66.5px] h-[38px] object-contain cursor-pointer opacity-80 hover:opacity-100 transition-opacity" alt="GCB License Curacao" />
              </div>
            </div>
          </footer>

        </div>
      </div>

      <DepositModal
        isOpen={depositModalOpen}
        onClose={() => dispatch(closeDepositModal())}
      />

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden flex-row items-center justify-around bg-[#0C1F56] border-t border-white/5 h-14 px-2">
        <button onClick={() => dispatch(openDepositModal())} className="flex flex-col items-center gap-0.5 text-[#D2DCF7] hover:text-white cursor-pointer bg-transparent border-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2" /><line x1="12" y1="4" x2="12" y2="20" /><line x1="2" y1="12" x2="22" y2="12" /></svg>
          <span className="text-[9px] font-semibold font-sans">Wallet</span>
        </button>
        <button onClick={() => router.push('/')} className="flex flex-col items-center gap-0.5 text-[#D2DCF7] hover:text-white cursor-pointer bg-transparent border-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
          <span className="text-[9px] font-semibold font-sans">Home</span>
        </button>
        <button onClick={() => dispatch(toggleSidebar())} className="flex flex-col items-center gap-0.5 text-[#D2DCF7] hover:text-white cursor-pointer bg-transparent border-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          <span className="text-[9px] font-semibold font-sans">Menu</span>
        </button>
      </nav>

      {/* SVG Linear Gradient Definition */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="crown-gradient" x1="4.07382" y1="12.3753" x2="29.4186" y2="12.3753" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFD85A" />
            <stop offset="1" stopColor="#FFB800" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
