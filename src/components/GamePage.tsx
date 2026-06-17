'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { openAuthModal, openDepositModal, closeDepositModal, toggleSidebar } from '@/redux/features/uiSlice';
import DepositModal from '@/components/DepositModal';

// ─── Game data (same pool as GuestHome) ──────────────────────────────────────
interface GameInfo {
  id: string;
  title: string;
  category: string;
  image: string;
  provider?: string;
}

const ALL_GAMES: GameInfo[] = [
  { id: 's1', title: 'ALLY ALIENS', category: 'Slots', image: '/games/slots/slot-1.png', provider: 'BGaming' },
  { id: 's2', title: "ANUBIS' TRIAL", category: 'Slots', image: '/games/slots/slot-2.png', provider: 'Endorphina' },
  { id: 's3', title: 'CACTUS GOES NUTS', category: 'Slots', image: '/games/slots/slot-3.png', provider: 'BGaming' },
  { id: 's4', title: "PANTHER'S RICHES", category: 'Slots', image: '/games/slots/slot-4.png', provider: 'Hacksaw Gaming' },
  { id: 's5', title: 'HONEY MONEY MULTIPLIER', category: 'Slots', image: '/games/slots/slot-5.png', provider: 'Booming Games' },
  { id: 's6', title: 'POPPING MANIA', category: 'Slots', image: '/games/slots/slot-6.png', provider: 'BGaming' },
  { id: 's7', title: 'DOUBLE WIN COLLECTION', category: 'Slots', image: '/games/slots/slot-7.png', provider: 'Nolimit City' },
  { id: 's8', title: 'ALLY ALIENS II', category: 'Slots', image: '/games/slots/slot-1.png', provider: 'BGaming' },
  { id: 'o1', title: 'MIGHTY MINES', category: 'Originals', image: '/games/original/original-1.png', provider: 'Mighty Luck' },
  { id: 'o2', title: 'WINTER PLINKO', category: 'Originals', image: '/games/original/original-2.png', provider: 'Mighty Luck' },
  { id: 'o3', title: 'LUCKY CRASH', category: 'Originals', image: '/games/original/original-3.png', provider: 'Mighty Luck' },
  { id: 'o4', title: 'DICE DELUXE', category: 'Originals', image: '/games/original/original-4.png', provider: 'Mighty Luck' },
  { id: 'c1', title: 'CRASH', category: 'Crash', image: '/games/crash/crash-1.png', provider: 'BGaming' },
  { id: 'c2', title: 'CRASH TOUCHDOWN', category: 'Crash', image: '/games/crash/crash-2.png', provider: 'BGaming' },
  { id: 'c3', title: 'CRUSADER', category: 'Crash', image: '/games/crash/crash-3.png', provider: 'Nolimit City' },
  { id: 'c4', title: 'CRASH BONUS', category: 'Crash', image: '/games/crash/crash-4.png', provider: 'BGaming' },
  { id: 't1', title: 'BACCARAT', category: 'Table', image: '/games/table/table-1.png', provider: 'Belatra' },
  { id: 't2', title: 'AMERICAN ROULETTE', category: 'Table', image: '/games/table/table-2.png', provider: 'TaDa Gaming' },
  { id: 't3', title: 'DRAGON TIGER', category: 'Table', image: '/games/table/table-4.png', provider: 'Endorphina' },
  { id: 'b1', title: 'ECHNATON GOLD', category: 'Bonus', image: '/games/bonus/bonus-1.png', provider: 'BGaming' },
  { id: 'b2', title: 'MONKEYS GO BANANAS', category: 'Bonus', image: '/games/bonus/bonus-2.png', provider: 'BGaming' },
];

interface Props {
  gameId: string;
}

export default function GamePage({ gameId }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const depositModalOpen = useAppSelector((state) => state.ui.depositModalOpen);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
      dispatch(openAuthModal('join'));
    }
  }, [isAuthenticated, router, dispatch]);

  const [isRealPlay, setIsRealPlay] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Find the current game — fall back gracefully
  const game = ALL_GAMES.find((g) => g.id === gameId) ?? {
    id: gameId,
    title: 'NINJA CRASH SLOT',
    category: 'Crash',
    image: '/game-1.png',
    provider: 'BGaming',
  };

  // All OTHER games (exclude current)
  const otherGames = ALL_GAMES.filter((g) => g.id !== gameId);

  const scrollCarousel = (dir: 'left' | 'right') => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: dir === 'left' ? -500 : 500, behavior: 'smooth' });
    }
  };

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  // Payment icons (same as home page)
  const depositIcons = [
    'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd10', 'd11',
  ];

  const footerMenus = [
    {
      title: 'CASINO',
      items: ['Slots', 'Table Games', 'Live Casino', 'Crash Games', 'Jackpots'],
    },
    {
      title: 'PROMOTIONS',
      items: ['Welcome Bonus', 'Weekly Cashback', 'Referral Program', 'VIP Club', 'Tournaments'],
    },
    {
      title: 'SUPPORT',
      items: ['Help Center', 'Live Chat', 'Contact Us', 'Responsible Gaming', 'FAQ', 'Affiliates', 'Blog', 'News'],
    },
    {
      title: 'LEGAL',
      items: ['Terms & Conditions', 'Privacy Policy', 'Cookie Policy', 'AML Policy', 'Self-Exclusion', 'KYC Policy'],
    },
    {
      title: 'LANGUAGE',
      items: ['English'],
    },
  ];

  return (
    <div className="w-full max-w-[1440px] min-h-screen mx-auto bg-[#091741] text-white relative flex flex-col select-none overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Page layout */}
      <div className="flex flex-row items-start w-full px-3 sm:px-4 lg:px-6 pt-4 lg:pt-6 pb-16 gap-3 lg:gap-6">

        {/* Sidebar */}
        <div className="hidden lg:block shrink-0">
          <Sidebar />
        </div>
        <div className="lg:hidden">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="w-full min-w-0 flex-1 flex flex-col gap-[20px]">

          {/* ── GAME IMAGE ────────────────────────────────── */}
          <div
            className="w-full rounded-[16px] overflow-hidden flex-none"
            style={{ aspectRatio: '1136/657' }}
          >
            <img
              src={game.image === '/game-1.png' ? '/game-1.png' : game.image}
              alt={game.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/game-1.png';
              }}
            />
          </div>

          {/* ── INFO BAR ──────────────────────────────────── */}
          <div className="w-full min-h-[72px] md:h-[100px] bg-[#0C1F56] rounded-[16px] flex flex-col md:flex-row justify-between items-start md:items-center px-[20px] md:px-[30px] py-[16px] md:py-[12px] gap-4 md:gap-[12px] shrink-0">

            {/* Left: provider logo + divider + game title */}
            <div className="flex flex-row items-center gap-3 sm:gap-[32px] h-auto md:h-[40px] w-full md:w-auto">
              {/* Provider logo box */}
              <div className="w-[80px] h-[40px] flex items-center justify-center bg-white/10 rounded-[8px] px-2 shrink-0">
                <span className="font-jost font-bold text-[11px] text-white tracking-wide uppercase leading-tight text-center">
                  {game.provider ?? 'BGaming'}
                </span>
              </div>

              {/* Vertical divider */}
              <div className="w-[1px] h-[33px] bg-white/20 shrink-0" />

              {/* Game title */}
              <span className="font-jost font-bold text-[16px] sm:text-[20px] leading-[22px] sm:leading-[29px] text-white whitespace-nowrap overflow-hidden text-ellipsis">
                {game.title}
              </span>
            </div>

            {/* Right: icons + Fun/Real toggle */}
            <div className="flex flex-row items-center justify-between md:justify-end gap-6 sm:gap-[40px] w-full md:w-auto border-t border-white/5 md:border-t-0 pt-3 md:pt-0">

              {/* Share + Favourite icons */}
              <div className="flex flex-row items-center gap-[24px]">
                {/* Share icon */}
                <button className="w-[20px] h-[20px] text-white hover:text-[#FFC83D] transition-colors cursor-pointer flex items-center justify-center" aria-label="Share">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M15 13.4C14.37 13.4 13.8 13.65 13.37 14.05L7.425 10.7C7.475 10.475 7.5 10.24 7.5 10C7.5 9.76 7.475 9.525 7.425 9.3L13.3 5.985C13.75 6.41 14.345 6.675 15 6.675C16.38 6.675 17.5 5.555 17.5 4.175C17.5 2.795 16.38 1.675 15 1.675C13.62 1.675 12.5 2.795 12.5 4.175C12.5 4.415 12.525 4.65 12.575 4.875L6.7 8.19C6.25 7.765 5.655 7.5 5 7.5C3.62 7.5 2.5 8.62 2.5 10C2.5 11.38 3.62 12.5 5 12.5C5.655 12.5 6.25 12.235 6.7 11.81L12.625 15.175C12.575 15.385 12.545 15.605 12.545 15.825C12.545 17.165 13.64 18.26 14.98 18.26C16.32 18.26 17.415 17.165 17.415 15.825C17.415 14.485 16.345 13.4 15 13.4Z" fill="white" fillOpacity="0.9"/>
                  </svg>
                </button>
                {/* Favourite icon */}
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="w-[20px] h-[20px] transition-colors cursor-pointer flex items-center justify-center"
                  aria-label="Favourite"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={isFavorite ? '#FF4B4B' : 'none'} stroke={isFavorite ? '#FF4B4B' : 'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>

              {/* Fun / Real toggle */}
              <div className="flex flex-row items-center gap-[8px]">
                <span
                  className="font-manrope font-semibold text-[12px] leading-[16px] tracking-[0.02em] cursor-pointer select-none"
                  style={{ color: isRealPlay ? '#A5B8EF' : '#FFFFFF' }}
                  onClick={() => setIsRealPlay(false)}
                >
                  Fun Play
                </span>

                {/* Toggle pill */}
                <button
                  onClick={() => setIsRealPlay(!isRealPlay)}
                  className="relative flex-none w-[42px] h-[24px] rounded-[30px] transition-colors duration-300 cursor-pointer"
                  style={{ background: '#1463FF' }}
                  aria-label="Toggle play mode"
                >
                  <span
                    className="absolute top-[3px] w-[18px] h-[18px] bg-white rounded-full transition-all duration-300"
                    style={{ left: isRealPlay ? 'calc(100% - 21px)' : '3px' }}
                  />
                </button>

                <span
                  className="font-manrope font-bold text-[12px] leading-[16px] tracking-[0.02em] cursor-pointer select-none"
                  style={{ color: isRealPlay ? '#FFFFFF' : '#A5B8EF' }}
                  onClick={() => setIsRealPlay(true)}
                >
                  Real Play
                </span>
              </div>
            </div>
          </div>

          {/* ── OTHER GAMES YOU MIGHT LIKE ────────────────── */}
          <div className="flex flex-col gap-[20px] w-full">

            {/* Section header */}
            <div className="flex flex-row justify-between items-center w-full h-[30px]">
              <div className="flex flex-row items-center gap-[12px] h-[30px]">
                <div className="flex items-center justify-center w-[30px] h-[30px]">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <rect width="30" height="30" rx="6" fill="#FFBF1F" fillOpacity="0.15"/>
                    <path d="M6 9h18M6 15h18M6 21h18" stroke="#FFBF1F" strokeWidth="2.2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h2 className="font-jost font-extrabold text-[20px] leading-[29px] tracking-[0.01em] text-white uppercase">
                  OTHER GAMES YOU MIGHT LIKE
                </h2>
              </div>

              {/* View all + nav buttons */}
              <div className="flex flex-row items-center gap-[12px] h-[30px]">
                <span className="font-manrope font-medium text-[12px] leading-[16px] tracking-[0.02em] text-[#D2DCF7] cursor-pointer hover:text-white transition-colors select-none">
                  View all
                </span>
                <div className="flex flex-row items-center gap-[8px]">
                  <button
                    onClick={() => scrollCarousel('left')}
                    disabled={!canScrollLeft}
                    style={{ background: '#112F82' }}
                    className="w-[30px] h-[30px] rounded-[4px] flex items-center justify-center transition-all cursor-pointer disabled:opacity-40 hover:bg-[#1463FF] text-white"
                  >
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M5 9L1 5L5 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                  <button
                    onClick={() => scrollCarousel('right')}
                    disabled={!canScrollRight}
                    style={{ background: '#112F82' }}
                    className="w-[30px] h-[30px] rounded-[4px] flex items-center justify-center transition-all cursor-pointer disabled:opacity-40 hover:bg-[#1463FF] text-white"
                  >
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Game cards carousel */}
            <div className="relative w-full overflow-hidden">
              <div
                ref={carouselRef}
                onScroll={checkScroll}
                className="flex flex-row items-center gap-[12px] overflow-x-auto scrollbar-none scroll-smooth w-full h-[200px]"
              >
                {otherGames.map((g) => (
                  <div
                    key={g.id}
                    onClick={() => router.push(`/game/${g.id}`)}
                    className="w-[152px] h-[200px] flex-none rounded-[12px] relative overflow-hidden bg-[#CDCDCD] transition-all duration-300 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] group cursor-pointer"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 ease-out group-hover:scale-110"
                      style={{ backgroundImage: `url(${g.image})` }}
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[4px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                      <div className="w-[48px] h-[48px] rounded-full bg-[#FFC83D] flex items-center justify-center shadow-[0_4px_12px_rgba(255,200,61,0.4)] hover:scale-110 transition-transform">
                        <svg width="12" height="14" viewBox="0 0 12 14" fill="none" className="ml-[2px]">
                          <path d="M1.5 1.58579C1.5 0.771239 2.42253 0.29749 3.0827 0.778703L10.5113 6.19291C11.0772 6.60527 11.0772 7.39473 10.5113 7.80709L3.0827 13.2213C2.42253 13.7025 1.5 13.2288 1.5 12.4142V1.58579Z" fill="#0C1F56"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── SEO TEXT SECTION ──────────────────────────── */}
          <div className="relative w-full flex flex-col gap-[24px] overflow-hidden">
            <div className="flex flex-col gap-[24px] max-h-[412px] overflow-hidden">
              <div className="flex flex-col gap-[16px]">
                <h1 className="font-jost font-bold text-[32px] leading-[120%] tracking-[-0.02em] text-white">
                  Play the Best Crypto Casino Games Online at Mighty Luck — Fast, Fair and Secure
                </h1>
                <p className="font-manrope font-medium text-[16px] leading-[160%] text-[#D2DCF7]">
                  Step into a next-generation gaming experience where every spin, bet, and hand is powered by blockchain technology. At Mighty Luck Casino, you can explore more than 9,000 crypto casino games across slots, table games, live dealer games, and crash-style favorites. As one of the top crypto casinos online, Mighty Luck gives players instant withdrawals, enhanced privacy, and a secure gambling environment without the friction of traditional payment methods. Whether you're here to play table games, explore Bitcoin casino games, or try the latest provably fair slots, Mighty Luck delivers one of the most complete online casino experiences available today. Ready to play games and win real crypto? Start playing crypto casino games at Mighty Luck Casino.
                </p>
              </div>

              <div className="flex flex-col gap-[16px]">
                <h2 className="font-jost font-bold text-[24px] leading-[35px] text-white">
                  Why Mighty Luck Is the Ultimate Place to Play Crypto Casino Games
                </h2>
                <p className="font-manrope font-medium text-[16px] leading-[160%] text-[#D2DCF7]">
                  Mighty Luck Casino offers the perfect blend of crypto gambling convenience, online casino entertainment, and world-class security. Compared to traditional online casinos, Mighty Luck delivers significantly faster payouts, more generous bonuses, and an unmatched selection of various games.
                </p>
              </div>

              <div className="flex flex-col gap-[16px]">
                <h2 className="font-jost font-bold text-[24px] leading-[35px] text-white">
                  Massive Game Variety
                </h2>
                <p className="font-manrope font-medium text-[16px] leading-[160%] text-[#D2DCF7]">
                  With more than 9,000 casino games, Mighty Luck outshines many crypto casinos and traditional casinos alike. You'll find slots, crash games, table games, live dealer options, and exclusive originals.
                </p>
              </div>
            </div>

            {/* Fade gradient + Read more */}
            <div className="absolute bottom-0 left-0 right-0 h-[200px] flex flex-col justify-end items-center pb-[24px]"
              style={{ background: 'linear-gradient(0deg, #091741 0%, rgba(9,23,65,0) 100%)' }}>
              <button className="flex flex-row items-center gap-[4px] group cursor-pointer">
                <span className="font-manrope font-semibold text-[14px] leading-[19px] tracking-[0.01em] text-[#FFBF1F] group-hover:underline">
                  Read more
                </span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3v10M8 13l-3-3M8 13l3-3" stroke="#FFBF1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* ── DEPOSIT STRIP ─────────────────────────────── */}
          <div className="relative w-full py-6 md:py-0 min-h-[60px] md:h-[100px] flex flex-row items-center justify-center px-4 md:px-[40px] border-b border-[#112F82] overflow-hidden">
            {/* Glow */}
            <div className="absolute w-[390px] h-[390px] left-1/2 -translate-x-1/2 top-[77px] rounded-full bg-[#1463FF] filter blur-[50px] opacity-30 pointer-events-none z-0" />

            {/* Payment icons */}
            <div className="flex flex-row flex-wrap items-center justify-center gap-4 md:gap-[28px] z-10">
              {depositIcons.map((icon) => (
                <img key={icon} src={`/games/deposite-icon/${icon}.svg`} alt={icon} className="h-[18px] object-contain" />
              ))}
            </div>
          </div>

          {/* ── FOOTER ────────────────────────────────────── */}
          <div className="flex flex-col gap-[48px] w-full">
            {/* Footer menus */}
            <div className="flex flex-row justify-between items-start gap-[49px] w-full flex-wrap">
              {/* Logo + copyright */}
              <div className="flex flex-col gap-[16px] min-w-[132px]">
                <div className="w-[132px] h-[50px] flex items-center">
                  <span className="font-jost font-black text-[18px] leading-tight text-white">
                    Mighty<span className="text-[#FFC83D]">Luck</span>
                  </span>
                </div>
                <span className="font-manrope font-semibold text-[11px] leading-[15px] tracking-[0.01em] text-[#D2DCF7]">
                  © 2026 Mighty Luck. All rights reserved.
                </span>
              </div>

              {/* Menu columns */}
              <div className="flex flex-row flex-wrap gap-[32px]">
                {footerMenus.map((menu) => (
                  <div key={menu.title} className="flex flex-col gap-[12px] min-w-[120px]">
                    <span className="font-jost font-bold text-[12px] leading-[17px] tracking-[0.02em] uppercase text-white">
                      {menu.title}
                    </span>
                    <div className="flex flex-col gap-[8px]">
                      {menu.items.map((item) => (
                        <span key={item} className="font-manrope font-semibold text-[11px] leading-[15px] tracking-[0.01em] text-[#D2DCF7] cursor-pointer hover:text-white transition-colors">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom strip */}
            <div className="flex flex-col md:flex-row justify-between items-center pt-[48px] border-t border-[#112F82] gap-6 text-center md:text-left">
              <p className="font-manrope font-semibold text-[10px] leading-[14px] tracking-[0.01em] text-justify text-[#D2DCF7] max-w-[445px]">
                MightyLuck.com is owned and operated by Company Name B.V. a company that is incorporated under the laws of Curacao with company registration number XXXXXX, having its registered address at Street 3XX9, City, Curaçao. MightyLuck.com is licensed and holds a valid Certificate of Operation (ABC/XXXX/XXX/XXXX).
              </p>
              <div className="flex flex-row flex-wrap items-center justify-center gap-[16px] md:gap-[32px]">
                <div className="w-[38px] h-[38px] rounded-[8px] bg-[#D2DCF7]/20 flex items-center justify-center shrink-0">
                  <span className="font-jost font-black text-[10px] text-[#D2DCF7]">18+</span>
                </div>
                <div className="flex items-center justify-center h-[24px] shrink-0">
                  <span className="font-manrope font-semibold text-[10px] text-[#D2DCF7] tracking-[0.05em] uppercase">Gamble Aware</span>
                </div>
                <div className="flex items-center justify-center h-[38px] shrink-0">
                  <span className="font-manrope font-semibold text-[10px] text-[#D2DCF7] tracking-[0.05em] uppercase">Gaming License</span>
                </div>
              </div>
            </div>
          </div>

        </div>{/* end main content */}
      </div>{/* end page layout */}

      {/* Deposit Modal */}
      <DepositModal isOpen={depositModalOpen} onClose={() => dispatch(closeDepositModal())} />

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden flex-row items-center justify-around bg-[#0C1F56] border-t border-white/5 h-14 px-2">
        <button
          onClick={() => router.push('/')}
          className="flex flex-col items-center justify-center gap-1 text-[#D2DCF7] hover:text-white transition-colors cursor-pointer border-none bg-transparent"
        >
          <img src="/games/side-icon/casino.svg" className="w-5 h-5 object-contain" alt="Home" />
          <span className="font-sans font-semibold text-[10px]">Lobby</span>
        </button>
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="flex flex-col items-center justify-center gap-1 text-[#D2DCF7] hover:text-white transition-colors cursor-pointer border-none bg-transparent"
        >
          <img src="/games/side-icon/all.svg" className="w-5 h-5 object-contain" alt="Menu" />
          <span className="font-sans font-semibold text-[10px]">Menu</span>
        </button>
        <button
          onClick={() => {
            if (isAuthenticated) {
              dispatch(openDepositModal());
            } else {
              dispatch(openAuthModal('join'));
            }
          }}
          className="flex flex-col items-center justify-center gap-1 text-[#FFC83D] hover:text-[#ffd362] transition-colors cursor-pointer border-none bg-transparent"
        >
          <div className="w-8 h-8 rounded-full bg-[#FFC83D]/10 flex items-center justify-center">
            <svg width="16" height="15" viewBox="0 0 16 15" fill="none">
              <path d="M14 3.5H2C1.45 3.5 1 3.95 1 4.5V12.5C1 13.05 1.45 13.5 2 13.5H14C14.55 13.5 15 13.05 15 12.5V4.5C15 3.95 14.55 3.5 14 3.5Z" stroke="#FFC83D" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M12 1.5H3C2.45 1.5 2 1.95 2 2.5H14C14 1.95 13.55 1.5 12 1.5Z" stroke="#FFC83D" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </div>
        </button>
        <button
          onClick={() => router.push('/referrals')}
          className="flex flex-col items-center justify-center gap-1 text-[#D2DCF7] hover:text-white transition-colors cursor-pointer border-none bg-transparent"
        >
          <span className="text-[18px]">🤝</span>
          <span className="font-sans font-semibold text-[10px]">Referrals</span>
        </button>
      </nav>
    </div>
  );
}
