'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
  const [isSeoExpanded, setIsSeoExpanded] = useState(false);

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
      answer: 'In order to participate in the Refer A Friend campaign, as a referrer you need to have an active account at Wild.io and have at least $50 (or currency equivalent) deposited. Multiple deposits can be summed up in order to meet the minimum deposit requirement.'
    },
    {
      question: 'How do I invite a friend?',
      answer: 'In order to participate in the Refer A Friend campaign, as a referrer you need to have an active account at Wild.io and have at least $50 (or currency equivalent) deposited. Multiple deposits can be summed up in order to meet the minimum deposit requirement.'
    },
    {
      question: 'How do I invite a friend?',
      answer: 'In order to participate in the Refer A Friend campaign, as a referrer you need to have an active account at Wild.io and have at least $50 (or currency equivalent) deposited. Multiple deposits can be summed up in order to meet the minimum deposit requirement.'
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
    <div className="w-full min-h-screen bg-[#091741] text-white relative flex flex-col select-none overflow-x-hidden">

      {/* Page Content Layout (Sidebar + Content Panel) */}
      <div className="flex flex-row items-start w-full max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-6 pt-0 pb-16 gap-3 lg:gap-6 relative">

        {/* Left Sidebar */}
        <div className="hidden lg:block shrink-0"><Sidebar /></div>
        <div className="lg:hidden"><Sidebar /></div>

        {/* Right Main Content Column */}
        <div className="w-full min-w-0 flex-1 flex flex-col gap-12 lg:gap-[100px]">

          {/* MAIN HERO BANNER & STATS */}
          <div className="flex flex-col gap-5 w-full max-w-[1136px] mx-auto select-none">
            
            {/* Hero Container */}
            <div 
              style={{
                background: `linear-gradient(95.59deg, #06102B 13.87%, rgba(6, 16, 43, 0) 35.34%), url(/games/refrels/refer.png), #2A0B3E`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              className="w-full min-h-[533px] lg:h-[533px] flex flex-col justify-between p-6 sm:p-8 lg:p-[32px_40px] gap-5 relative overflow-hidden border border-white/5 rounded-[16px]"
            >
              {/* Inner row: Text + Calculator */}
              <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-[24px]">
                
                {/* Left Column: Heading */}
                <div className="flex flex-col gap-6 max-w-[457px] w-full text-left z-10">
                  <div className="flex flex-col gap-1 w-full">
                    <span className="font-jost font-medium text-[28px] leading-[40px] text-white">
                      Get <span className="text-[#FFC83D] font-extrabold">PAID</span> every time
                    </span>
                    <h2 className="font-jost font-black text-[48px] leading-[100%] text-white tracking-wide uppercase">
                      YOUR FRIEND<br />PLAYS!
                    </h2>
                  </div>
                </div>

                {/* Right Column: Earnings Estimator Box */}
                <div className="relative w-full max-w-[430px] h-auto lg:h-[345px] bg-[#091741] rounded-[16px] p-5 lg:p-[20px] flex flex-col items-center gap-6 border border-white/10 z-10 shadow-2xl overflow-visible isolation-isolate">
                  
                  {/* Accent glow on top */}
                  <div className="absolute w-[173px] h-[173px] left-[calc(50%-173px/2-0.5px)] top-[-118px] rounded-full bg-[#1463FF] filter blur-[40px] opacity-60 pointer-events-none z-0" />

                  {/* Inner Frame */}
                  <div className="w-full flex flex-col gap-3 z-10">
                    
                    {/* Box Title */}
                    <div className="w-full flex justify-center items-start h-[58px] mb-1">
                      <h3 className="font-jost font-extrabold text-[20px] leading-[29px] text-center text-white max-w-[300px] tracking-[0.01em]">
                        How much can you earn with Mighty Luck?
                      </h3>
                    </div>

                    <div className="w-full flex flex-col gap-4">
                      {/* Slider Component */}
                      <div className="flex flex-col gap-2 w-full h-[64px]">
                        <div className="flex justify-between items-center h-4">
                          <span className="font-manrope font-semibold text-[12px] leading-4 text-[#BBCAF3] tracking-[0.02em]">Invited Friends</span>
                        </div>

                        {/* Progress slider bar wrapper */}
                        <div className="relative w-full h-10 flex items-center">
                          {/* Invisible HTML range input spanning the whole container width to catch drag events */}
                          <input 
                            type="range"
                            min="1"
                            max="50"
                            value={invitedFriends}
                            onChange={(e) => setInvitedFriends(parseInt(e.target.value))}
                            className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer"
                          />

                          {/* Custom Range Slider Track underneath */}
                          <div className="absolute left-0 right-0 top-[17px] h-[6px] bg-[#112F82] rounded-[100px] pointer-events-none" />
                          
                          {/* Active filled track */}
                          <div 
                            style={{
                              width: `calc(${(invitedFriends - 1) / 49} * (100% - 54px) + 27px)`
                            }}
                            className="absolute left-0 top-[17px] h-[6px] bg-[#1463FF] rounded-[100px_0_0_100px] pointer-events-none"
                          />
                          
                          {/* Draggable indicator pill */}
                          <div 
                            style={{
                              left: `calc(${(invitedFriends - 1) / 49} * (100% - 54px))`
                            }}
                            className="absolute top-[5px] w-[54px] h-[30px] bg-[#1463FF] rounded-[100px] flex items-center justify-center gap-1 shadow-lg transition-all duration-75 pointer-events-none"
                          >
                            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="text-white shrink-0">
                              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.04-.32.07-.64.07-.97 0-2.94-1.87-5.46-4.5-6.4a5.964 5.964 0 015.5 6.4c0 .33.03.65.07.97h3.93zM9 11a6 6 0 00-6 6h12a6 6 0 00-6-6z" />
                            </svg>
                            <span className="font-manrope font-bold text-[16px] leading-[22px] tracking-[0.02em] text-white">
                              {invitedFriends}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Monthly Earnings Frame */}
                      <div className="w-full flex flex-col gap-3 h-[99px]">
                        <div className="w-full bg-[#112F82] rounded-[8px] p-[10px_16px] flex items-center justify-center h-[60px]">
                          <div className="w-full max-w-[358px] flex items-center justify-between h-[33px]">
                            <span className="font-manrope font-bold text-[14px] leading-[19px] text-white tracking-[0.02em]">
                              Your monthly earnings:
                            </span>
                            <span className="font-manrope font-bold text-[24px] leading-[33px] text-white tracking-[0.02em]">
                              ${monthlyEarnings.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <p className="font-manrope font-medium text-[10px] leading-[14px] text-[#7795E8] tracking-[0.02em] select-none h-7">
                          * Calculations are based on average player activity and may vary in individual cases
                        </p>
                      </div>

                      {/* Email Invite Box */}
                      <form onSubmit={handleSendInvite} className="w-full flex items-center gap-2 h-10 mt-1">
                        <div className="flex-1 max-w-[260px] h-10 bg-[#112F82] rounded-[8px] p-[10px_16px] flex items-center gap-3">
                          <input 
                            type="email"
                            required
                            placeholder="Enter email address"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                            className="w-full bg-transparent border-0 outline-none text-white font-manrope font-semibold text-[14px] leading-[19px] placeholder-[#7795E8] focus:ring-0 p-0"
                          />
                        </div>
                        <button 
                          type="submit"
                          disabled={inviteStatus === 'sending'}
                          className="w-[122px] h-10 bg-[#FFC83D] hover:bg-[#ffd362] active:scale-95 disabled:opacity-50 text-[#1A1404] font-manrope font-bold text-[14px] leading-[19px] tracking-[0.02em] rounded-[8px] flex items-center justify-center transition-all cursor-pointer shrink-0"
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

              </div>

              {/* Bottom Stats Container */}
              <div className="w-full max-w-[1056px] h-auto lg:h-[104px] bg-[#091741] rounded-[16px] p-[20px_24px] flex flex-col justify-center border border-white/10 mt-auto">
                <div className="w-full max-w-[1008px] h-auto lg:h-[64px] flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row items-center gap-[8px]">
                  
                  {/* Card 1: Total Referrals */}
                  <div className="w-full lg:w-[246px] h-[64px] flex flex-col gap-2 text-left">
                    <div className="w-full h-4 flex items-center">
                      <span className="font-manrope font-semibold text-[12px] leading-[16px] text-[#BBCAF3] tracking-[0.02em]">
                        Total Referrals
                      </span>
                    </div>
                    <div className="w-full h-10 bg-[#112F82] rounded-[8px] p-[10px_16px] flex items-center">
                      <div className="w-full max-w-[214px] h-[22px] flex items-center gap-2">
                        {/* Coin Icon */}
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
                          <circle cx="10" cy="10" r="10" fill="#FFC83D" />
                          <path d="M10 5.5v9M8 7.5h3.5a1.5 1.5 0 0 1 0 3H8.5a1.5 1.5 0 0 0 0 3H12" stroke="#1A1404" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="font-manrope font-bold text-[16px] leading-[22px] text-white tracking-[0.02em]">
                          12
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Total Deposits */}
                  <div className="w-full lg:w-[246px] h-[64px] flex flex-col gap-2 text-left">
                    <div className="w-full h-4 flex items-center">
                      <span className="font-manrope font-semibold text-[12px] leading-[16px] text-[#BBCAF3] tracking-[0.02em]">
                        Total Deposits
                      </span>
                    </div>
                    <div className="w-full h-10 bg-[#112F82] rounded-[8px] p-[10px_16px] flex items-center">
                      <div className="w-full max-w-[214px] h-[22px] flex items-center gap-2">
                        {/* Coin Icon */}
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
                          <circle cx="10" cy="10" r="10" fill="#FFC83D" />
                          <path d="M10 5.5v9M8 7.5h3.5a1.5 1.5 0 0 1 0 3H8.5a1.5 1.5 0 0 0 0 3H12" stroke="#1A1404" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="font-manrope font-bold text-[16px] leading-[22px] text-white tracking-[0.02em]">
                          $5,000.00
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Total Earnings */}
                  <div className="w-full lg:w-[246px] h-[64px] flex flex-col gap-2 text-left">
                    <div className="w-full h-4 flex items-center">
                      <span className="font-manrope font-semibold text-[12px] leading-[16px] text-[#BBCAF3] tracking-[0.02em]">
                        Total Earnings
                      </span>
                    </div>
                    <div className="w-full h-10 bg-[#112F82] rounded-[8px] p-[10px_16px] flex items-center">
                      <div className="w-full max-w-[214px] h-[22px] flex items-center gap-2">
                        {/* Coin Icon */}
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
                          <circle cx="10" cy="10" r="10" fill="#FFC83D" />
                          <path d="M10 5.5v9M8 7.5h3.5a1.5 1.5 0 0 1 0 3H8.5a1.5 1.5 0 0 0 0 3H12" stroke="#1A1404" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="font-manrope font-bold text-[16px] leading-[22px] text-white tracking-[0.02em]">
                          $500.00
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card 4: Pending Income */}
                  <div className="w-full lg:w-[246px] h-[64px] flex flex-col gap-2 text-left">
                    <div className="w-full h-4 flex items-center">
                      <span className="font-manrope font-semibold text-[12px] leading-[16px] text-[#BBCAF3] tracking-[0.02em]">
                        Pending Income
                      </span>
                    </div>
                    <div className="w-full h-10 bg-[#112F82] rounded-[8px] p-[10px_16px] flex items-center justify-between">
                      <div className="w-full max-w-[136px] h-[22px] flex items-center gap-2">
                        {/* Coin Icon */}
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
                          <circle cx="10" cy="10" r="10" fill="#FFC83D" />
                          <path d="M10 5.5v9M8 7.5h3.5a1.5 1.5 0 0 1 0 3H8.5a1.5 1.5 0 0 0 0 3H12" stroke="#1A1404" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="font-manrope font-bold text-[16px] leading-[22px] text-white tracking-[0.02em]">
                          {pendingIncomeClaimed ? '$0.00' : '$150.00'}
                        </span>
                      </div>
                      
                      {/* Claim Button */}
                      <button 
                        onClick={handleClaimPending}
                        disabled={pendingIncomeClaimed}
                        className="w-[66px] h-[24px] bg-[#1463FF] hover:bg-[#2e74ff] active:scale-95 disabled:opacity-40 disabled:hover:bg-[#1463FF] rounded-[6px] flex items-center justify-center font-manrope font-semibold text-[12px] leading-[16px] text-white tracking-[0.02em] transition-all cursor-pointer border-none outline-none shrink-0"
                      >
                        {pendingIncomeClaimed ? 'Claimed' : 'Claim'}
                      </button>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* COPY REFERRAL LINK BOX */}
            <div className="w-full bg-[#0C1F56] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4 mt-2">
              <div className="flex flex-col text-left">
                <span className="font-jost font-black text-lg text-white uppercase tracking-wider">Your Referral Link</span>
                <span className="font-manrope font-semibold text-sm text-[#A5B8EF] mt-1">
                  Share this link with your friends and start earning together!
                </span>
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto max-w-[450px]">
                <input 
                  type="text" 
                  readOnly 
                  value="https://mightyluck.com/register?ref=user123" 
                  className="bg-[#112F82] border border-white/5 text-white text-sm font-manrope font-bold px-4 py-2.5 rounded-lg flex-1 outline-none focus:ring-0 min-w-[250px]"
                />
                <button 
                  onClick={handleCopyLink}
                  className="bg-[#1463FF] hover:bg-[#2e74ff] text-white text-sm font-manrope font-bold px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  {copiedLink ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>

          {/* THREE HIGHLIGHT INFO CARDS ROW */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full">
            
            {/* Card 1 */}
            <div className="bg-[#091741] border border-white/10 rounded-[16px] p-6 flex flex-col items-center justify-center gap-3 min-h-[148px] hover:bg-[#112F82]/50 transition-all duration-300 shadow-xl">
              <span className="font-jost font-black text-[48px] sm:text-[54px] leading-none text-white tracking-tight">$2.5 K</span>
              <span className="font-manrope font-semibold text-[14px] sm:text-[16px] text-[#A5B8EF] text-center leading-snug">
                Claim By the Most Active Referrer
              </span>
            </div>

            {/* Card 2 */}
            <div className="bg-[#091741] border border-white/10 rounded-[16px] p-6 flex flex-col items-center justify-center gap-3 min-h-[148px] hover:bg-[#112F82]/50 transition-all duration-300 shadow-xl">
              <span className="font-jost font-black text-[48px] sm:text-[54px] leading-none text-white tracking-tight">500+</span>
              <span className="font-manrope font-semibold text-[14px] sm:text-[16px] text-[#A5B8EF] text-center leading-snug">
                Players are already earning with us
              </span>
            </div>

            {/* Card 3 */}
            <div className="bg-[#091741] border border-white/10 rounded-[16px] p-6 flex flex-col items-center justify-center gap-3 min-h-[148px] hover:bg-[#112F82]/50 transition-all duration-300 shadow-xl">
              <span className="font-jost font-black text-[48px] sm:text-[54px] leading-none text-white tracking-tight">19,000</span>
              <span className="font-manrope font-semibold text-[14px] sm:text-[16px] text-[#A5B8EF] text-center leading-snug">
                Free Spins received by friends
              </span>
            </div>

          </div>

          {/* WHAT YOU GET VS WHAT YOUR FRIEND GETS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            
            {/* Column 1: What you get */}
            <div 
              style={{
                background: 'radial-gradient(circle at 0% 0%, rgba(87, 255, 61, 0.12) 0%, rgba(9, 23, 65, 0) 50%), #091741',
              }}
              className="border border-white/10 rounded-[16px] p-6 sm:p-[40px] relative overflow-hidden flex flex-col gap-6 shadow-xl"
            >
              <h3 className="font-jost font-black text-[20px] text-white tracking-wider uppercase z-10 text-left">
                WHAT YOU GET
              </h3>

              <div className="flex flex-col gap-6 z-10">
                
                {/* List Item 1 */}
                <div className="flex gap-4 items-start">
                  <div className="w-[40px] h-[40px] rounded-xl bg-[#57FF3D]/10 flex items-center justify-center text-[#57FF3D] shrink-0">
                    {/* Coin Stack Icon */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2C6.5 2 2 3.8 2 6s4.5 4 10 4 10-1.8 10-4-4.5-4-10-4z" />
                      <path d="M2 11.7c0 2.2 4.5 4 10 4s10-1.8 10-4" />
                      <path d="M2 17.3c0 2.2 4.5 4 10 4s10-1.8 10-4" />
                      <path d="M2 6v11.3" />
                      <path d="M22 6v11.3" />
                    </svg>
                  </div>
                  <div className="flex flex-col text-left justify-center min-h-[40px]">
                    <span className="font-manrope font-bold text-base text-white">Lifetime earnings from each deposit</span>
                    <span className="font-manrope font-medium text-sm text-[#A5B8EF] mt-1">
                      You get a percentage of every deposit your friends complete.
                    </span>
                  </div>
                </div>

                {/* List Item 2 */}
                <div className="flex gap-4 items-start">
                  <div className="w-[40px] h-[40px] rounded-xl bg-[#57FF3D]/10 flex items-center justify-center text-[#57FF3D] shrink-0">
                    {/* Lightning Bolt Icon */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </div>
                  <div className="flex flex-col text-left justify-center min-h-[40px]">
                    <span className="font-manrope font-bold text-base text-white">Instant crediting</span>
                    <span className="font-manrope font-medium text-sm text-[#A5B8EF] mt-1">
                      Your income is credited a few minutes after your friend’s deposit is completed.
                    </span>
                  </div>
                </div>

                {/* List Item 3 */}
                <div className="flex gap-4 items-start">
                  <div className="w-[40px] h-[40px] rounded-xl bg-[#57FF3D]/10 flex items-center justify-center text-[#57FF3D] shrink-0">
                    {/* Infinity Icon */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4z" />
                    </svg>
                  </div>
                  <div className="flex flex-col text-left justify-center min-h-[40px]">
                    <span className="font-manrope font-bold text-base text-white">No limits for earnings</span>
                    <span className="font-manrope font-medium text-sm text-[#A5B8EF] mt-1">
                      Your earnings are not capped. Sky (and your friend’s wallet) is the limit!
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Column 2: What your friend gets */}
            <div 
              style={{
                background: 'radial-gradient(circle at 100% 0%, rgba(20, 99, 255, 0.12) 0%, rgba(9, 23, 65, 0) 50%), #091741',
              }}
              className="border border-white/10 rounded-[16px] p-6 sm:p-[40px] relative overflow-hidden flex flex-col gap-6 shadow-xl"
            >
              <h3 className="font-jost font-black text-[20px] text-white tracking-wider uppercase z-10 text-left">
                WHAT YOUR FRIEND GETS
              </h3>

              <div className="flex flex-col gap-6 z-10">
                
                {/* List Item 1 */}
                <div className="flex gap-4 items-start">
                  <div className="w-[40px] h-[40px] rounded-xl bg-[#1463FF]/10 flex items-center justify-center text-[#1463FF] shrink-0">
                    {/* Coin Stack Icon */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2C6.5 2 2 3.8 2 6s4.5 4 10 4 10-1.8 10-4-4.5-4-10-4z" />
                      <path d="M2 11.7c0 2.2 4.5 4 10 4s10-1.8 10-4" />
                      <path d="M2 17.3c0 2.2 4.5 4 10 4s10-1.8 10-4" />
                      <path d="M2 6v11.3" />
                      <path d="M22 6v11.3" />
                    </svg>
                  </div>
                  <div className="flex flex-col text-left justify-center min-h-[40px]">
                    <span className="font-manrope font-bold text-base text-white">Lifetime earnings from each deposit</span>
                    <span className="font-manrope font-medium text-sm text-[#A5B8EF] mt-1">
                      You get a percentage of every deposit your friends complete.
                    </span>
                  </div>
                </div>

                {/* List Item 2 */}
                <div className="flex gap-4 items-start">
                  <div className="w-[40px] h-[40px] rounded-xl bg-[#1463FF]/10 flex items-center justify-center text-[#1463FF] shrink-0">
                    {/* Lightning Bolt Icon */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </div>
                  <div className="flex flex-col text-left justify-center min-h-[40px]">
                    <span className="font-manrope font-bold text-base text-white">Instant crediting</span>
                    <span className="font-manrope font-medium text-sm text-[#A5B8EF] mt-1">
                      Your income is credited a few minutes after your friend’s deposit is completed.
                    </span>
                  </div>
                </div>

                {/* List Item 3 */}
                <div className="flex gap-4 items-start">
                  <div className="w-[40px] h-[40px] rounded-xl bg-[#1463FF]/10 flex items-center justify-center text-[#1463FF] shrink-0">
                    {/* Infinity Icon */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4z" />
                    </svg>
                  </div>
                  <div className="flex flex-col text-left justify-center min-h-[40px]">
                    <span className="font-manrope font-bold text-base text-white">No limits for earnings</span>
                    <span className="font-manrope font-medium text-sm text-[#A5B8EF] mt-1">
                      Your earnings are not capped. Sky (and your friend’s wallet) is the limit!
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
              {/* Crown Icon */}
              <svg width="28" height="20" viewBox="0 0 34 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <path
                  d="M33.1198 7.41853L24.191 11.0541C23.9175 11.1662 23.6056 11.0595 23.4552 10.8051L17.478 0.292432C17.2455 -0.104222 16.6655 -0.0960149 16.4467 0.308846L10.1796 10.8325C10.0346 11.1006 9.70631 11.2155 9.42455 11.0951L0.826733 7.41853C0.36169 7.21883 -0.122501 7.65925 0.027954 8.14071L5.1106 24.3269C5.18719 24.5731 5.41698 24.7427 5.67685 24.7427L27.4354 24.7482C27.6843 24.7482 27.9059 24.5923 27.9934 24.3598L33.9022 8.1708C34.0773 7.68661 33.5986 7.2243 33.1226 7.41853H33.1198ZM20.602 15.2668L16.351 22.7896C16.2908 22.8962 16.1321 22.8552 16.1266 22.7348L15.9543 18.1802H14.4689V18.1637C14.4306 18.1692 14.3923 18.1802 14.3513 18.1802H11.2683C11.178 18.1802 11.1206 18.0817 11.1616 18.0023L15.7437 9.51395C15.9051 9.23493 16.2005 9.06532 16.5206 9.06532H19.6035C19.6938 9.06532 19.7512 9.1638 19.7102 9.24313L16.5534 15.089H20.4953C20.5883 15.089 20.6458 15.1875 20.5993 15.2695L20.602 15.2668Z"
                  fill="url(#crown-gradient)"
                />
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
                  background: `linear-gradient(180deg, rgba(6, 16, 43, 0) 40%, rgba(6, 16, 43, 0.95) 90%), url(/games/refrels/r1.png)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                className="h-[280px] rounded-2xl border border-white/5 p-6 flex flex-col justify-between items-start text-left relative overflow-hidden group hover:scale-[1.02] transition-all duration-300 shadow-xl"
              >
                {/* Number Badge */}
                <div className="w-9 h-9 bg-[#1463FF] rounded-[8px] flex items-center justify-center font-jost font-black text-[16px] text-white select-none">
                  1
                </div>
                {/* Title */}
                <span className="font-jost font-black text-base leading-tight text-white uppercase max-w-[220px] z-10">
                  SHARE INVITATION LINK WITH YOUR FRIEND
                </span>
              </div>

              {/* Step 2 */}
              <div 
                style={{
                  background: `linear-gradient(180deg, rgba(6, 16, 43, 0) 40%, rgba(6, 16, 43, 0.95) 90%), url(/games/refrels/r2.png)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                className="h-[280px] rounded-2xl border border-white/5 p-6 flex flex-col justify-between items-start text-left relative overflow-hidden group hover:scale-[1.02] transition-all duration-300 shadow-xl"
              >
                {/* Number Badge */}
                <div className="w-9 h-9 bg-[#1463FF] rounded-[8px] flex items-center justify-center font-jost font-black text-[16px] text-white select-none">
                  2
                </div>
                {/* Title */}
                <span className="font-jost font-black text-base leading-tight text-white uppercase max-w-[220px] z-10">
                  YOUR FRIEND JOINS & RECEIVES <span className="text-[#FFC83D]">50 FREE SPINS</span> TO GET STARTED
                </span>
              </div>

              {/* Step 3 */}
              <div 
                style={{
                  background: `linear-gradient(180deg, rgba(6, 16, 43, 0) 40%, rgba(6, 16, 43, 0.95) 90%), url(/games/refrels/r3.png)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                className="h-[280px] rounded-2xl border border-white/5 p-6 flex flex-col justify-between items-start text-left relative overflow-hidden group hover:scale-[1.02] transition-all duration-300 shadow-xl"
              >
                {/* Number Badge */}
                <div className="w-9 h-9 bg-[#1463FF] rounded-lg flex items-center justify-center font-jost font-black text-[16px] text-white select-none">
                  3
                </div>
                {/* Title */}
                <span className="font-jost font-black text-base leading-tight text-white uppercase max-w-[220px] z-10">
                  NOW, YOU’LL GET PAID <span className="text-[#FFC83D]">EVERY TIME</span> YOUR FRIEND DEPOSITS & PLAY
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
                    {/* Child 2: SEO Text Area */}
          <div className="flex flex-col items-start p-0 gap-[40px] w-full max-w-[1136px] mx-auto select-none">
            <div className="flex flex-col items-center p-0 gap-[32px] w-full max-w-[1136px] isolate relative">
              <div className={`w-full max-w-[800px] flex flex-col gap-[32px] overflow-hidden transition-all duration-500 ease-in-out ${isSeoExpanded ? 'max-h-[1500px]' : 'max-h-[580px]'}`}>

                {/* Frame 3 */}
                <div className="flex flex-col items-start p-0 gap-[24px] w-full max-w-[800px]">
                  <h1 className="w-full font-jost font-bold text-[32px] leading-[120%] tracking-[-0.02em] text-white">
                    Play the Best Crypto Casino Games Online at Mighty Luck — Fast, Fair and Secure
                  </h1>
                  <div className="flex flex-col gap-[16px] w-full font-sans font-medium text-[16px] leading-[160%] text-[#D2DCF7]">
                    <p>
                      Step into a next-generation gaming experience where every spin, bet, and hand is powered by blockchain technology. At Mighty Luck Casino, you can explore more than 9,000 crypto casino games across slots, table games, live dealer games, and crash-style favorites. As one of the top crypto casinos online, Mighty Luck gives players instant withdrawals, enhanced privacy, and a secure gambling environment without the friction of traditional payment methods.
                    </p>
                    <p>
                      Whether you're here to play table games, explore Bitcoin casino games, or try the latest provably fair slots, Mighty Luck delivers one of the most complete online casino experiences available today.
                    </p>
                    <p>
                      Ready to play games and win real crypto?
                    </p>
                    <p>
                      Start playing crypto casino games at Mighty Luck Casino.
                    </p>
                  </div>
                </div>

                {/* Frame 4 */}
                <div className="flex flex-col items-start p-0 gap-[16px] w-full max-w-[800px]">
                  <h2 className="w-full font-jost font-bold text-[24px] leading-[35px] text-white">
                    Why Mighty Luck Is the Ultimate Place to Play Crypto Casino Games
                  </h2>
                  <p className="w-full font-sans font-medium text-[16px] leading-[160%] text-[#D2DCF7]">
                    Mighty Luck Casino offers the perfect blend of crypto gambling convenience, online casino entertainment, and world-class security. Compared to traditional online casinos, Mighty Luck delivers significantly faster payouts, more generous bonuses, and an unmatched selection of various games.
                  </p>
                </div>

                {/* Frame 5 */}
                <div className="flex flex-col items-start p-0 gap-[16px] w-full max-w-[800px]">
                  <h2 className="w-full font-jost font-bold text-[24px] leading-[35px] text-white">
                    Massive Game Variety
                  </h2>
                  <p className="w-full font-sans font-medium text-[16px] leading-[160%] text-[#D2DCF7]">
                    With more than 9,000 casino games, Mighty Luck outshines many crypto casinos and traditional casinos alike. You'll find slots, card games, custom crash formats, and high-stakes tables to suit any gaming budget.
                  </p>
                </div>

              </div>

              {!isSeoExpanded && (
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[200px] flex flex-col justify-end items-center p-[24px_10px] gap-[10px] z-10 pointer-events-none"
                  style={{ background: 'linear-gradient(0deg, #091741 0%, rgba(9, 23, 65, 0) 100%)' }}
                >
                  <button
                    onClick={() => setIsSeoExpanded(true)}
                    className="flex flex-row items-center p-0 gap-[4px] w-[93px] h-[19px] bg-transparent border-none outline-none cursor-pointer group pointer-events-auto select-none"
                  >
                    <span className="w-[73px] h-[19px] font-sans font-semibold text-[14px] leading-[19px] tracking-[0.01em] text-[#FFBF1F] group-hover:text-white transition-colors">
                      Read more
                    </span>
                    <div className="w-[16px] h-[16px] flex items-center justify-center relative">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform duration-300 group-hover:scale-110">
                        <line x1="8" y1="3" x2="8" y2="13" stroke="#FFBF1F" strokeWidth="2" strokeLinecap="round" />
                        <path d="M4 9L8 13L12 9" stroke="#FFBF1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </button>
                </div>
              )}

              {isSeoExpanded && (
                <div className="flex justify-center w-full z-10 mt-[8px]">
                  <button
                    onClick={() => setIsSeoExpanded(false)}
                    className="flex flex-row items-center p-0 gap-[4px] w-[93px] h-[19px] bg-transparent border-none outline-none cursor-pointer group select-none"
                  >
                    <span className="w-[73px] h-[19px] font-sans font-semibold text-[14px] leading-[19px] tracking-[0.01em] text-[#FFBF1F] group-hover:text-white transition-colors">
                      Read less
                    </span>
                    <div className="w-[16px] h-[16px] flex items-center justify-center relative">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 rotate-180 transition-transform duration-300 group-hover:scale-110">
                        <line x1="8" y1="3" x2="8" y2="13" stroke="#FFBF1F" strokeWidth="2" strokeLinecap="round" />
                        <path d="M4 9L8 13L12 9" stroke="#FFBF1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Child 3: CRYPTO PAYMENT METHOD FOOTER ICONS */}
          <section className="w-full h-auto py-6 md:h-[100px] flex flex-col md:flex-row justify-between items-center px-[20px] md:px-[40px] border-b border-[#112F82] relative overflow-hidden shrink-0 select-none">
            <div className="absolute w-[390px] h-[390px] left-[calc(50%-195px)] top-[77px] bg-[#1463FF] rounded-full filter blur-[50px] opacity-80 pointer-events-none z-0" />
            <div className="flex flex-row flex-wrap justify-center items-center gap-[16px] md:gap-[28px] mx-auto z-10">
              {Array.from({ length: 11 }, (_, i) => (
                <img
                  key={i}
                  src={`/games/deposite-icon/d${i + 1}.svg`}
                  alt={`Crypto Method ${i + 1}`}
                  className="h-[19.05px] w-auto object-contain filter brightness-0 invert hover:scale-110 transition-all duration-300 cursor-pointer" style={{ color: '#FFFFFF' }}
                />
              ))}
            </div>
          </section>

          {/* Child 4: MAIN WEBSITE FOOTER */}
          <footer className="w-full flex flex-col gap-[48px] select-none text-white pb-[40px]">

            {/* Top Row: logo + menus */}
            <div className="w-full flex flex-col md:flex-row justify-between items-start gap-[49px]">

              {/* Logo + copyright */}
              <div className="flex flex-col items-start gap-[16px] w-[213px] shrink-0">
                {/* Inline Logo: crown icon (logo.svg path) + MIGHTY + LUCK text */}
                <div className="w-[132px] h-[50px] relative">
                  <svg width="132" height="50" viewBox="0 0 132 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="gLogoU" x1="0" y1="0" x2="132" y2="0" gradientUnits="userSpaceOnUse">
                        <stop offset="12%" stopColor="#FFD85A" />
                        <stop offset="86.68%" stopColor="#FFB800" />
                      </linearGradient>
                      <linearGradient id="gCrownU" x1="4.07" y1="12.38" x2="29.42" y2="12.38" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFD85A" />
                        <stop offset="1" stopColor="#FFB800" />
                      </linearGradient>
                    </defs>
                    {/* Crown icon — exact path from logo.svg, scaled to fit top 26px */}
                    <g transform="translate(49, 0) scale(1.09)">
                      <path d="M33.1198 7.41853L24.191 11.0541C23.9175 11.1662 23.6056 11.0595 23.4552 10.8051L17.478 0.292432C17.2455 -0.104222 16.6655 -0.0960149 16.4467 0.308846L10.1796 10.8325C10.0346 11.1006 9.70631 11.2155 9.42455 11.0951L0.826733 7.41853C0.36169 7.21883 -0.122501 7.65925 0.027954 8.14071L5.1106 24.3269C5.18719 24.5731 5.41698 24.7427 5.67685 24.7427L27.4354 24.7482C27.6843 24.7482 27.9059 24.5923 27.9934 24.3598L33.9022 8.1708C34.0773 7.68661 33.5986 7.2243 33.1226 7.41853H33.1198ZM20.602 15.2668L16.351 22.7896C16.2908 22.8962 16.1321 22.8552 16.1266 22.7348L15.9543 18.1802H14.4689V18.1637C14.4306 18.1692 14.3923 18.1802H11.2683C11.178 18.1802 11.1206 18.0817 11.1616 18.0023L15.7437 9.51395C15.9051 9.23493 16.2005 9.06532 16.5206 9.06532H19.6035C19.6938 9.06532 19.7512 9.1638 19.7102 9.24313L16.5534 15.089H20.4953C20.5883 15.089 20.6458 15.1875 20.5993 15.2695L20.602 15.2668Z" fill="url(#gCrownU)" />
                    </g>
                    {/* MIGHTY — white, Jost 800 */}
                    <text x="18" y="47" fontFamily="Jost, sans-serif" fontWeight="800" fontSize="12" letterSpacing="1.2" fill="#FFFFFF">MIGHTY</text>
                    {/* LUCK — gold gradient, Jost 800 */}
                    <text x="78" y="47" fontFamily="Jost, sans-serif" fontWeight="800" fontSize="12" letterSpacing="1.2" fill="url(#gLogoU)">LUCK</text>
                  </svg>
                </div>
                <span className="font-sans font-semibold text-[11px] leading-[15px] tracking-[0.01em] text-[#D2DCF7] w-[213px]">
                  © 2026 Mighty Luck. All rights reserved.
                </span>
              </div>

              {/* Menu columns wrapper — 728px, 5 cols × 120px, gap 32px */}
              <div className="flex flex-row flex-wrap md:flex-nowrap items-start gap-[32px] w-full md:w-[728px]">

                {/* Column 1: Slot Games */}
                <div className="flex flex-col gap-[12px] w-[120px] shrink-0">
                  <h3 className="w-[120px] font-jost font-bold text-[12px] leading-[17px] tracking-[0.02em] uppercase text-white">
                    Slot Games
                  </h3>
                  <div className="flex flex-col gap-[8px]">
                    {['Slots', 'Skill Games', 'Jackpot', 'Bonus Buy', 'Crash Games'].map((item) => (
                      <span key={item} className="w-[120px] font-sans font-semibold text-[11px] leading-[15px] tracking-[0.01em] text-[#D2DCF7] cursor-pointer hover:text-white transition-colors">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Column 2: Live Casino */}
                <div className="flex flex-col gap-[12px] w-[120px] shrink-0">
                  <h3 className="w-[120px] font-jost font-bold text-[12px] leading-[17px] tracking-[0.02em] uppercase text-white">
                    Live Casino
                  </h3>
                  <div className="flex flex-col gap-[8px]">
                    {['Roulette', 'Blackjack', 'Live Casino', 'Table Games', 'Video Poker'].map((item) => (
                      <span key={item} className="w-[120px] font-sans font-semibold text-[11px] leading-[15px] tracking-[0.01em] text-[#D2DCF7] cursor-pointer hover:text-white transition-colors">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Column 3: Casino */}
                <div className="flex flex-col gap-[12px] w-[120px] shrink-0">
                  <h3 className="w-[120px] font-jost font-bold text-[12px] leading-[17px] tracking-[0.02em] uppercase text-white">
                    Casino
                  </h3>
                  <div className="flex flex-col gap-[8px]">
                    {['About Us', 'Promotions', 'Tournaments', 'Affiliate Program', 'VIP Club', 'Refer a Friend', 'Blog', 'Bonus Shop'].map((item) => (
                      <span key={item} className="w-[120px] font-sans font-semibold text-[11px] leading-[15px] tracking-[0.01em] text-[#D2DCF7] cursor-pointer hover:text-white transition-colors">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Column 4: Legal */}
                <div className="flex flex-col gap-[12px] w-[120px] shrink-0">
                  <h3 className="w-[120px] font-jost font-bold text-[12px] leading-[17px] tracking-[0.02em] uppercase text-white">
                    Legal
                  </h3>
                  <div className="flex flex-col gap-[8px]">
                    {['Privacy Policy', 'Terms & Conditions', 'Bonus Terms', 'Responsible Gambling', 'Payment Methods', 'Sportsbook Rules'].map((item) => (
                      <span key={item} className="w-[120px] font-sans font-semibold text-[11px] leading-[15px] tracking-[0.01em] text-[#D2DCF7] cursor-pointer hover:text-white transition-colors">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Column 5: Support */}
                <div className="flex flex-col gap-[12px] w-[120px] shrink-0">
                  <h3 className="w-[120px] font-jost font-bold text-[12px] leading-[17px] tracking-[0.02em] uppercase text-white">
                    Support
                  </h3>
                  <div className="flex flex-col gap-[8px]">
                    <span className="w-[120px] font-sans font-semibold text-[11px] leading-[15px] tracking-[0.01em] text-[#D2DCF7] cursor-pointer hover:text-white transition-colors">
                      Live Support
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom strip - border-top, legal + badges */}
            <div className="w-full border-t border-[#112F82] pt-[48px] flex flex-col md:flex-row justify-between items-start gap-6">
              <p className="font-sans font-semibold text-[10px] leading-[14px] text-justify tracking-[0.01em] text-[#D2DCF7] w-full md:w-[445px]">
                MightyLuck.com is owned and operated by Company Name B.V. a company that is incorporated under the laws of Curacao with company registration number XXXXXX, having its registered address at Street 3XX9, City, Curaçao. MightyLuck.com is licensed and holds a valid Certificate of Operation (ABC/XXXX/XXX/XXXX).
              </p>
              <div className="flex flex-row items-center justify-end gap-[32px] w-full md:w-[288.5px] h-[38px] shrink-0">
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
