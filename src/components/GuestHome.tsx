'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import AuthModal from '@/components/AuthModal';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { openAuthModal, toggleSidebar } from '@/redux/features/uiSlice';

// Interface for casino game cards
interface GameCard {
  id: string;
  title: string;
  category: string;
  image: string;
}

interface ProviderCard {
  id: string;
  name: string;
  logo: string;
  gamesCount: number;
}

export default function GuestHome() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchQuery = useAppSelector((state) => state.ui.searchQuery);

  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('lobby');

  // Refs for the horizontal carousels
  const slotsRef = useRef<HTMLDivElement>(null);
  const originalsRef = useRef<HTMLDivElement>(null);
  const crashRef = useRef<HTMLDivElement>(null);
  const providersRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const bonusRef = useRef<HTMLDivElement>(null);
  const collectionsRef = useRef<HTMLDivElement>(null);

  // States for scroll buttons
  const [canScrollSlotsLeft, setCanScrollSlotsLeft] = useState(false);
  const [canScrollSlotsRight, setCanScrollSlotsRight] = useState(true);

  const [canScrollOriginalsLeft, setCanScrollOriginalsLeft] = useState(false);
  const [canScrollOriginalsRight, setCanScrollOriginalsRight] = useState(true);

  const [canScrollCrashLeft, setCanScrollCrashLeft] = useState(false);
  const [canScrollCrashRight, setCanScrollCrashRight] = useState(true);

  const [canScrollProvidersLeft, setCanScrollProvidersLeft] = useState(false);
  const [canScrollProvidersRight, setCanScrollProvidersRight] = useState(true);

  const [canScrollTableLeft, setCanScrollTableLeft] = useState(false);
  const [canScrollTableRight, setCanScrollTableRight] = useState(true);

  const [canScrollBonusLeft, setCanScrollBonusLeft] = useState(false);
  const [canScrollBonusRight, setCanScrollBonusRight] = useState(true);

  const [canScrollCollectionsLeft, setCanScrollCollectionsLeft] = useState(false);
  const [canScrollCollectionsRight, setCanScrollCollectionsRight] = useState(true);

  const [isSeoExpanded, setIsSeoExpanded] = useState(false);

  // Function to toggle a game in favorites
  const toggleFavorite = (e: React.MouseEvent, gameId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(gameId) ? prev.filter((id) => id !== gameId) : [...prev, gameId]
    );
  };

  // Scroll function for carousels
  const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const cardWidth = 152;
      const gap = 12;
      const scrollAmount = (cardWidth + gap) * 3; // Scroll 3 cards at a time
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Check scroll positions to update button disable states
  const checkScrollState = (ref: React.RefObject<HTMLDivElement | null>, setLeft: (can: boolean) => void, setRight: (can: boolean) => void) => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      setLeft(scrollLeft > 5);
      setRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    const slotsEl = slotsRef.current;
    const originalsEl = originalsRef.current;
    const crashEl = crashRef.current;
    const providersEl = providersRef.current;
    const tableEl = tableRef.current;
    const bonusEl = bonusRef.current;
    const collectionsEl = collectionsRef.current;

    const handleSlotsScroll = () => checkScrollState(slotsRef, setCanScrollSlotsLeft, setCanScrollSlotsRight);
    const handleOriginalsScroll = () => checkScrollState(originalsRef, setCanScrollOriginalsLeft, setCanScrollOriginalsRight);
    const handleCrashScroll = () => checkScrollState(crashRef, setCanScrollCrashLeft, setCanScrollCrashRight);
    const handleProvidersScroll = () => checkScrollState(providersRef, setCanScrollProvidersLeft, setCanScrollProvidersRight);
    const handleTableScroll = () => checkScrollState(tableRef, setCanScrollTableLeft, setCanScrollTableRight);
    const handleBonusScroll = () => checkScrollState(bonusRef, setCanScrollBonusLeft, setCanScrollBonusRight);
    const handleCollectionsScroll = () => checkScrollState(collectionsRef, setCanScrollCollectionsLeft, setCanScrollCollectionsRight);

    if (slotsEl) {
      slotsEl.addEventListener('scroll', handleSlotsScroll);
      checkScrollState(slotsRef, setCanScrollSlotsLeft, setCanScrollSlotsRight);
    }

    if (originalsEl) {
      originalsEl.addEventListener('scroll', handleOriginalsScroll);
      checkScrollState(originalsRef, setCanScrollOriginalsLeft, setCanScrollOriginalsRight);
    }

    if (crashEl) {
      crashEl.addEventListener('scroll', handleCrashScroll);
      checkScrollState(crashRef, setCanScrollCrashLeft, setCanScrollCrashRight);
    }

    if (providersEl) {
      providersEl.addEventListener('scroll', handleProvidersScroll);
      checkScrollState(providersRef, setCanScrollProvidersLeft, setCanScrollProvidersRight);
    }

    if (tableEl) {
      tableEl.addEventListener('scroll', handleTableScroll);
      checkScrollState(tableRef, setCanScrollTableLeft, setCanScrollTableRight);
    }

    if (bonusEl) {
      bonusEl.addEventListener('scroll', handleBonusScroll);
      checkScrollState(bonusRef, setCanScrollBonusLeft, setCanScrollBonusRight);
    }

    if (collectionsEl) {
      collectionsEl.addEventListener('scroll', handleCollectionsScroll);
      checkScrollState(collectionsRef, setCanScrollCollectionsLeft, setCanScrollCollectionsRight);
    }

    // Recalculate on window resize
    const handleResize = () => {
      checkScrollState(slotsRef, setCanScrollSlotsLeft, setCanScrollSlotsRight);
      checkScrollState(originalsRef, setCanScrollOriginalsLeft, setCanScrollOriginalsRight);
      checkScrollState(crashRef, setCanScrollCrashLeft, setCanScrollCrashRight);
      checkScrollState(providersRef, setCanScrollProvidersLeft, setCanScrollProvidersRight);
      checkScrollState(tableRef, setCanScrollTableLeft, setCanScrollTableRight);
      checkScrollState(bonusRef, setCanScrollBonusLeft, setCanScrollBonusRight);
      checkScrollState(collectionsRef, setCanScrollCollectionsLeft, setCanScrollCollectionsRight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (slotsEl) slotsEl.removeEventListener('scroll', handleSlotsScroll);
      if (originalsEl) originalsEl.removeEventListener('scroll', handleOriginalsScroll);
      if (crashEl) crashEl.removeEventListener('scroll', handleCrashScroll);
      if (providersEl) providersEl.removeEventListener('scroll', handleProvidersScroll);
      if (tableEl) tableEl.removeEventListener('scroll', handleTableScroll);
      if (bonusEl) bonusEl.removeEventListener('scroll', handleBonusScroll);
      if (collectionsEl) collectionsEl.removeEventListener('scroll', handleCollectionsScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Update scroll states when filtered list changes (e.g. searching)
  useEffect(() => {
    const timer = setTimeout(() => {
      checkScrollState(slotsRef, setCanScrollSlotsLeft, setCanScrollSlotsRight);
      checkScrollState(originalsRef, setCanScrollOriginalsLeft, setCanScrollOriginalsRight);
      checkScrollState(crashRef, setCanScrollCrashLeft, setCanScrollCrashRight);
      checkScrollState(providersRef, setCanScrollProvidersLeft, setCanScrollProvidersRight);
      checkScrollState(tableRef, setCanScrollTableLeft, setCanScrollTableRight);
      checkScrollState(bonusRef, setCanScrollBonusLeft, setCanScrollBonusRight);
      checkScrollState(collectionsRef, setCanScrollCollectionsLeft, setCanScrollCollectionsRight);
    }, 100);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const slotGames: GameCard[] = [
    { id: 's1', title: 'ALLY ALIENS', category: 'Slots', image: '/games/slots/slot-1.png' },
    { id: 's2', title: "ANUBIS' TRIAL", category: 'Slots', image: '/games/slots/slot-2.png' },
    { id: 's3', title: 'CACTUS GOES NUTS', category: 'Slots', image: '/games/slots/slot-3.png' },
    { id: 's4', title: "PANTHER'S RICHES", category: 'Slots', image: '/games/slots/slot-4.png' },
    { id: 's5', title: 'HONEY MONEY MULTIPLIER', category: 'Slots', image: '/games/slots/slot-5.png' },
    { id: 's6', title: 'POPPING MANIA', category: 'Slots', image: '/games/slots/slot-6.png' },
    { id: 's7', title: 'DOUBLE WIN COLLECTION', category: 'Slots', image: '/games/slots/slot-7.png' },
    // Duplicate some slots to demonstrate scroll
    { id: 's8', title: 'ALLY ALIENS II', category: 'Slots', image: '/games/slots/slot-1.png' },
    { id: 's9', title: "ANUBIS' TREASURE", category: 'Slots', image: '/games/slots/slot-2.png' },
    { id: 's10', title: 'CACTUS WILD', category: 'Slots', image: '/games/slots/slot-3.png' },
  ];

  const originalGames: GameCard[] = [
    { id: 'o1', title: 'MIGHTY MINES', category: 'Originals', image: '/games/original/original-1.png' },
    { id: 'o2', title: 'WINTER PLINKO', category: 'Originals', image: '/games/original/original-2.png' },
    { id: 'o3', title: 'LUCKY CRASH', category: 'Originals', image: '/games/original/original-3.png' },
    { id: 'o4', title: 'DICE DELUXE', category: 'Originals', image: '/games/original/original-4.png' },
    { id: 'o5', title: 'WHEEL OF LUCK', category: 'Originals', image: '/games/original/original-5.png' },
    { id: 'o6', title: 'KENO EXTREME', category: 'Originals', image: '/games/original/original-6.png' },
    { id: 'o7', title: 'HILO ROYALE', category: 'Originals', image: '/games/original/original-7.png' },
    { id: 'o8', title: 'LIMBO RUSH', category: 'Originals', image: '/games/original/original-8.png' },
  ];

  const crashGames: GameCard[] = [
    { id: 'c1', title: 'CRASH', category: 'Crash', image: '/games/crash/crash-1.png' },
    { id: 'c2', title: 'CRASH TOUCHDOWN', category: 'Crash', image: '/games/crash/crash-2.png' },
    { id: 'c3', title: 'CRUSADER', category: 'Crash', image: '/games/crash/crash-3.png' },
    { id: 'c4', title: 'CRASH BONUS', category: 'Crash', image: '/games/crash/crash-4.png' },
    { id: 'c5', title: 'CRASH GOAL', category: 'Crash', image: '/games/crash/crash-5.png' },
    { id: 'c6', title: 'CRASH FRUIT', category: 'Crash', image: '/games/crash/crash-6.png' },
    { id: 'c7', title: 'CRASH PUCK', category: 'Crash', image: '/games/crash/crash-7.png' },
    { id: 'c8', title: 'CRASH SPACE', category: 'Crash', image: '/games/crash/crash-8.png' },
  ];

  const providerList: ProviderCard[] = [
    { id: 'p1', name: 'Belatra', logo: '/games/providers/g1.png', gamesCount: 226 },
    { id: 'p2', name: 'BGaming', logo: '/games/providers/g2.png', gamesCount: 226 },
    { id: 'p3', name: 'TaDa Gaming', logo: '/games/providers/g3.png', gamesCount: 226 },
    { id: 'p4', name: 'Endorphina', logo: '/games/providers/g4.png', gamesCount: 226 },
    { id: 'p5', name: 'Nolimit City', logo: '/games/providers/g5.png', gamesCount: 226 },
    { id: 'p6', name: 'Hacksaw Gaming', logo: '/games/providers/g6.png', gamesCount: 226 },
    { id: 'p7', name: 'Booming Games', logo: '/games/providers/g7.png', gamesCount: 226 },
  ];

  const tableGames: GameCard[] = [
    { id: 't1', title: 'BACCARAT', category: 'Table', image: '/games/table/table-1.png' },
    { id: 't2', title: 'AMERICAN ROULETTE', category: 'Table', image: '/games/table/table-2.png' },
    { id: 't3', title: 'LA PARTAGE ROULETTE DE LUXE', category: 'Table', image: '/games/table/table-3.png' },
    { id: 't4', title: 'DRAGON TIGER', category: 'Table', image: '/games/table/table-4.png' },
    { id: 't5', title: 'ANDAR BAHAR', category: 'Table', image: '/games/table/table-5.png' },
    { id: 't6', title: "RIDE'EM POKER", category: 'Table', image: '/games/table/table-6.png' },
    { id: 't7', title: 'DEUCES AND JOKER MULTI-HAND', category: 'Table', image: '/games/table/table-7.png' },
    { id: 't8', title: 'BLACKJACK CLASSIC', category: 'Table', image: '/games/table/table-8.png' },
  ];

  const bonusGames: GameCard[] = [
    { id: 'b1', title: 'ECHNATON GOLD', category: 'Bonus', image: '/games/bonus/bonus-1.png' },
    { id: 'b2', title: 'MONKEYS GO BANANAS MULTIMAX', category: 'Bonus', image: '/games/bonus/bonus-2.png' },
    { id: 'b3', title: 'RAGNA RAVENS WILD ENERGY', category: 'Bonus', image: '/games/bonus/bonus-3.png' },
    { id: 'b4', title: 'NEON VILLAINS', category: 'Bonus', image: '/games/bonus/bonus-4.png' },
    { id: 'b5', title: 'FRUITYLICIOUS DOUBLEMAX', category: 'Bonus', image: '/games/bonus/bonus-5.png' },
    { id: 'b6', title: 'CASH STREAK DICE', category: 'Bonus', image: '/games/bonus/bonus-6.png' },
    { id: 'b7', title: 'LUCKY CLOVERLAND DICE', category: 'Bonus', image: '/games/bonus/bonus-7.png' },
    { id: 'b8', title: 'WILD JOKER STACKS', category: 'Bonus', image: '/games/bonus/bonus-8.png' },
  ];

  const collectionList = [
    { id: 'col1', name: 'MYTHOLOGY', image: '/games/collections/Frame 1.png' },
    { id: 'col2', name: 'FRUITS', image: '/games/collections/Frame 2.png' },
    { id: 'col3', name: 'ANIMALS', image: '/games/collections/Frame 3.png' },
    { id: 'col4', name: 'ASIA', image: '/games/collections/Frame 4.png' },
  ];

  interface WinnerRecord {
    id: string;
    gameTitle: string;
    gameImage: string;
    username: string;
    time: string;
    payout: string;
    payoutAmount: number;
  }

  const recentWinners: WinnerRecord[] = [
    { id: 'w1', gameTitle: 'Sweet Bonanza Super Scatter', gameImage: '/games/slots/slot-1.png', username: 'Alb****', time: '14:16 PM', payout: '$126.1', payoutAmount: 126.1 },
    { id: 'w2', gameTitle: 'Honey Money Multiplier', gameImage: '/games/slots/slot-5.png', username: 'Tra****', time: '14:16 PM', payout: '$15.2', payoutAmount: 15.2 },
    { id: 'w3', gameTitle: 'Dragon Tiger', gameImage: '/games/table/table-4.png', username: 'Hid******', time: '14:15 PM', payout: '$77.08', payoutAmount: 77.08 },
    { id: 'w4', gameTitle: 'Eleven Fortune', gameImage: '/games/slots/slot-7.png', username: 'Gin***', time: '14:15 PM', payout: '$0.00', payoutAmount: 0 },
    { id: 'w5', gameTitle: 'Honey Money Multiplier', gameImage: '/games/slots/slot-5.png', username: 'Tra****', time: '14:15 PM', payout: '$11.23', payoutAmount: 11.23 },
    { id: 'w6', gameTitle: 'XO Paradise', gameImage: '/games/slots/slot-6.png', username: 'Amr******', time: '14:15 PM', payout: '$67.88', payoutAmount: 67.88 },
  ];

  const filteredSlots = slotGames.filter((g) => g.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredOriginals = originalGames.filter((g) => g.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredCrash = crashGames.filter((g) => g.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredTable = tableGames.filter((g) => g.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredBonus = bonusGames.filter((g) => g.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredCollections = collectionList.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredWinners = recentWinners.filter((w) => w.gameTitle.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="w-full max-w-[1440px] min-h-screen mx-auto bg-[#091741] text-white relative flex flex-col select-none overflow-x-hidden">

      {/* 1. Header (Navbar) */}
      <Navbar />

      {/* 2. Page Content Layout (Sidebar + Content Panel) */}
      <div className="flex flex-row items-start w-full px-3 sm:px-4 lg:px-6 pt-4 lg:pt-6 pb-16 gap-3 lg:gap-6 relative">

        {/* Left Sidebar — hidden space on mobile (fixed overlay), takes space on lg+ */}
        <div className="hidden lg:block shrink-0">
          <Sidebar />
        </div>
        <div className="lg:hidden">
          <Sidebar />
        </div>

        {/* Right Main Content Column */}
        <div className="w-full min-w-0 flex-1 flex flex-col gap-8 lg:gap-[40px]">

          {/* Child 1: Main Games Area */}
          <div className="flex flex-col gap-5 lg:gap-[40px] w-full">

            {/* HERO BANNER */}
            <section className="relative w-full rounded-xl lg:rounded-2xl overflow-hidden border border-white/5" style={{ backgroundImage: `url('/images/hero.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', aspectRatio: '1136/356', minHeight: 160 }}>
              {/* Blurs inside banner */}
              <div className="absolute w-[575px] h-[575px] left-[-161px] top-[-102px] rounded-full bg-[#06102B]/60 filter blur-[75px] pointer-events-none" />
              <div className="absolute w-[194px] h-[194px] left-[198px] top-[224px] rounded-full bg-[#103686]/40 filter blur-[25px] pointer-events-none" />
              <div className="absolute w-[129px] h-[129px] left-[1041px] top-[271px] rounded-full bg-[#010A25]/80 filter blur-[25px] pointer-events-none" />

              <div className="absolute w-[80%] max-w-[457px] left-4 sm:left-6 lg:left-[40px] top-1/2 -translate-y-1/2 flex flex-col gap-2 lg:gap-[20px] justify-between items-start z-10">
                <div className="flex flex-col gap-[4px] w-full">
                  <span className="font-jost font-medium text-[11px] sm:text-[18px] lg:text-[28px] leading-tight text-white">
                    Get <span className="text-[#FFC83D] font-extrabold">LUCKY</span> with our exclusive
                  </span>
                  <span className="font-jost font-black text-[18px] sm:text-[30px] lg:text-[48px] leading-[110%] text-white tracking-wide">
                    250% WELCOME<br />BONUS!
                  </span>
                </div>

                {/* Join Now Button */}
                <button
                  onClick={() => dispatch(openAuthModal('join'))}
                  className="w-[110px] h-10 bg-[#FFC83D] hover:bg-[#ffd362] rounded-lg flex items-center justify-center font-sans font-bold text-sm text-[#1A1404] tracking-[0.02em] cursor-pointer active:scale-95 transition-all duration-150"
                >
                  Join Now
                </button>
              </div>

              {/* Carousel Dots indicator */}
              <div className="absolute bottom-[20px] left-1/2 transform -translate-x-1/2 flex gap-[8px] z-10">
                <span className="w-[12px] h-[6px] bg-white rounded-full transition-all" />
                <span className="w-[6px] h-[6px] bg-[#D2DCF7]/50 rounded-full transition-all" />
                <span className="w-[6px] h-[6px] bg-[#D2DCF7]/50 rounded-full transition-all" />
              </div>
            </section>

            {/* DEPOSIT NOW RIBBON */}
            <section className="relative w-full py-4 lg:py-0 lg:h-[100px] bg-[#0C1F56] rounded-[16px] flex flex-col sm:flex-row justify-between items-center px-4 lg:px-[40px] gap-3 lg:gap-[40px] overflow-hidden border border-white/5 select-none">
              {/* Background Glow (Ellipse 6) */}
              <div className="absolute w-[534px] h-[534px] left-[calc(50%-267px)] top-[60px] rounded-full bg-[#1463FF] filter blur-[50px] pointer-events-none z-0 opacity-40" />

              {/* Want to play? Text (z-index 1) */}
              <span className="font-jost font-extrabold text-[18px] md:text-[20px] leading-[26px] md:leading-[29px] text-white tracking-wide text-center shrink-0 z-10">
                Want to play? Deposit Now
              </span>

              {/* Payment Cryptos SVGs (z-index 2) */}
              <div className="flex flex-row flex-wrap items-center justify-center gap-[16px] md:gap-[28px] z-10 shrink-0">
                <img src="/games/deposite-icon/d1.svg" className="w-[13.38px] h-[18.39px] object-contain" alt="Crypto 1" />
                <img src="/games/deposite-icon/d2.svg" className="w-[11.3px] h-[18.09px] object-contain" alt="Crypto 2" />
                <img src="/games/deposite-icon/d3.svg" className="w-[19.09px] h-[17.73px] object-contain" alt="Crypto 3" />
                <img src="/games/deposite-icon/d4.svg" className="w-[18.1px] h-[19.05px] object-contain" alt="Crypto 4" />
                <img src="/games/deposite-icon/d5.svg" className="w-[21.4px] h-[17.7px] object-contain" alt="Crypto 5" />
                <img src="/games/deposite-icon/d6.svg" className="w-[18.14px] h-[18.14px] object-contain" alt="Crypto 6" />
                <img src="/games/deposite-icon/d7.svg" className="w-[15px] h-[16.36px] object-contain" alt="Crypto 7" />
                <img src="/games/deposite-icon/d8.svg" className="w-[14.09px] h-[17.27px] object-contain" alt="Crypto 8" />
                <img src="/games/deposite-icon/d9.svg" className="w-[17.09px] h-[18.56px] object-contain" alt="Crypto 9" />
                <img src="/games/deposite-icon/d10.svg" className="w-[14.2px] h-[17.52px] object-contain" alt="Crypto 10" />
                <img src="/games/deposite-icon/d11.svg" className="w-[19.89px] h-[17.52px] object-contain" alt="Crypto 11" />
              </div>

              {/* Deposit Now Button (Join) (z-index 3) */}
              <button
                onClick={() => dispatch(openAuthModal('join'))}
                className="w-[148px] h-[40px] bg-[#FFC83D] hover:bg-[#ffd362] rounded-[8px] flex items-center justify-center font-sans font-bold text-[14px] leading-[19px] text-[#1A1404] tracking-[0.02em] cursor-pointer z-10 active:scale-95 transition-all duration-150 shrink-0"
              >
                Deposit Now
              </button>
            </section>


            {/* SLOTS SECTION */}
            <section className="flex flex-col gap-[12px] sm:gap-[16px] w-full">
              <div className="flex flex-row justify-between items-center w-full h-[30px]">
                <div className="flex flex-row items-center gap-[12px] h-[30px]">
                  <div className="flex items-center justify-center w-[29.89px] h-[30px]">
                    <img src="/games/game-icons/slot.svg" alt="Slots" className="w-[29.89px] h-[30px] object-contain" />
                  </div>
                  <h2 style={{ fontFamily: "'Jost', sans-serif", fontWeight: 800, fontSize: 'clamp(15px,2vw,20px)', lineHeight: '29px', letterSpacing: '0.01em' }} className="text-white uppercase select-none">SLOTS (1,487)</h2>
                </div>

                <div className="flex flex-row items-center gap-[20px] w-[133px] h-[30px]">
                  <span className="font-sans font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#D2DCF7] cursor-pointer hover:text-white transition-colors select-none">
                    View all
                  </span>

                  <div className="flex flex-row items-center gap-[8px] w-[68px] h-[30px]">
                    <button
                      onClick={() => scrollCarousel(slotsRef, 'left')}
                      disabled={!canScrollSlotsLeft}
                      style={{ background: '#112F82' }}
                      className="w-[30px] h-[30px] rounded-[4px] flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 opacity-100 hover:opacity-100 hover:bg-[#1463FF] text-white"
                    >
                      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 9L1 5L5 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button
                      onClick={() => scrollCarousel(slotsRef, 'right')}
                      disabled={!canScrollSlotsRight}
                      style={{ background: '#112F82' }}
                      className="w-[30px] h-[30px] rounded-[4px] flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 opacity-100 hover:opacity-100 hover:bg-[#1463FF] text-white"
                    >
                      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative w-full overflow-hidden">
                <div
                  ref={slotsRef}
                  className="flex flex-row items-center gap-[12px] overflow-x-auto scrollbar-none scroll-smooth w-full h-[200px] select-none"
                >
                  {filteredSlots.map((game) => (
                    <div
                      key={game.id}
                      onClick={() => dispatch(openAuthModal('join'))}
                      className="w-[152px] h-[200px] flex-none rounded-[12px] relative overflow-hidden bg-[#CDCDCD] transition-all duration-300 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] group cursor-pointer"
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 ease-out group-hover:scale-110"
                        style={{ backgroundImage: `url(${game.image})` }}
                      />
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <button
                          onClick={(e) => toggleFavorite(e, game.id)}
                          className="absolute left-[114px] top-[12px] w-[24px] h-[24px] text-white hover:text-red-500 focus:outline-none transition-colors duration-200 z-20 cursor-pointer flex items-center justify-center"
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill={favorites.includes(game.id) ? "#FF4B4B" : "none"}
                            stroke={favorites.includes(game.id) ? "#FF4B4B" : "#FFFFFF"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="transition-all duration-200"
                          >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                        </button>
                        <div
                          onClick={() => dispatch(openAuthModal('join'))}
                          className="absolute w-[48px] h-[48px] left-[calc(50%-24px)] top-[calc(50%-24px)] rounded-full bg-[#FFC83D] flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 shadow-[0_4px_12px_rgba(255,200,61,0.4)] cursor-pointer"
                        >
                          <svg width="12" height="14" viewBox="0 0 12 14" fill="none" className="ml-[2px] mt-[1px]">
                            <path d="M1.5 1.58579C1.5 0.771239 2.42253 0.29749 3.0827 0.778703L10.5113 6.19291C11.0772 6.60527 11.0772 7.39473 10.5113 7.80709L3.0827 13.2213C2.42253 13.7025 1.5 13.2288 1.5 12.4142V1.58579Z" fill="#0C1F56" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ORIGINALS SECTION */}
            <section className="flex flex-col gap-[16px] w-full">
              <div className="flex flex-row justify-between items-center w-full h-[30px]">
                <div className="flex flex-row items-center gap-[12px] h-[30px]">
                  <div className="flex items-center justify-center w-[29.89px] h-[30px]">
                    <img src="/games/game-icons/originals.svg" alt="Originals" className="w-[29.89px] h-[30px] object-contain" />
                  </div>
                  <h2 style={{ fontFamily: "'Jost', sans-serif", fontWeight: 800, fontSize: 'clamp(15px,2vw,20px)', lineHeight: '29px', letterSpacing: '0.01em' }} className="text-white uppercase select-none">ORIGINALS (14)</h2>
                </div>

                <div className="flex flex-row items-center gap-[20px] w-[133px] h-[30px]">
                  <span className="font-sans font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#D2DCF7] cursor-pointer hover:text-white transition-colors select-none">
                    View all
                  </span>

                  <div className="flex flex-row items-center gap-[8px] w-[68px] h-[30px]">
                    <button
                      onClick={() => scrollCarousel(originalsRef, 'left')}
                      disabled={!canScrollOriginalsLeft}
                      style={{ background: '#112F82' }}
                      className="w-[30px] h-[30px] rounded-[4px] flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 opacity-100 hover:opacity-100 hover:bg-[#1463FF] text-white"
                    >
                      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 9L1 5L5 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button
                      onClick={() => scrollCarousel(originalsRef, 'right')}
                      disabled={!canScrollOriginalsRight}
                      style={{ background: '#112F82' }}
                      className="w-[30px] h-[30px] rounded-[4px] flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 opacity-100 hover:opacity-100 hover:bg-[#1463FF] text-white"
                    >
                      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative w-full overflow-hidden">
                <div
                  ref={originalsRef}
                  className="flex flex-row items-center gap-[12px] overflow-x-auto scrollbar-none scroll-smooth w-full h-[200px] select-none"
                >
                  {filteredOriginals.map((game) => (
                    <div
                      key={game.id}
                      onClick={() => dispatch(openAuthModal('join'))}
                      className="w-[152px] h-[200px] flex-none rounded-[12px] relative overflow-hidden bg-[#CDCDCD] transition-all duration-300 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] group cursor-pointer"
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 ease-out group-hover:scale-110"
                        style={{ backgroundImage: `url(${game.image})` }}
                      />
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <button
                          onClick={(e) => toggleFavorite(e, game.id)}
                          className="absolute left-[114px] top-[12px] w-[24px] h-[24px] text-white hover:text-red-500 focus:outline-none transition-colors duration-200 z-20 cursor-pointer flex items-center justify-center"
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill={favorites.includes(game.id) ? "#FF4B4B" : "none"}
                            stroke={favorites.includes(game.id) ? "#FF4B4B" : "#FFFFFF"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="transition-all duration-200"
                          >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                        </button>
                        <div
                          onClick={() => dispatch(openAuthModal('join'))}
                          className="absolute w-[48px] h-[48px] left-[calc(50%-24px)] top-[calc(50%-24px)] rounded-full bg-[#FFC83D] flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 shadow-[0_4px_12px_rgba(255,200,61,0.4)] cursor-pointer"
                        >
                          <svg width="12" height="14" viewBox="0 0 12 14" fill="none" className="ml-[2px] mt-[1px]">
                            <path d="M1.5 1.58579C1.5 0.771239 2.42253 0.29749 3.0827 0.778703L10.5113 6.19291C11.0772 6.60527 11.0772 7.39473 10.5113 7.80709L3.0827 13.2213C2.42253 13.7025 1.5 13.2288 1.5 12.4142V1.58579Z" fill="#0C1F56" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* WHY JOIN MIGHTY LUCK? SECTION */}
            <section className="flex flex-col gap-[28px] w-full h-auto select-none mt-4">
              <div className="flex flex-row justify-between items-center w-full h-[30px]">
                <div className="flex flex-row items-center gap-[12px] w-auto h-[30px]">
                  <div className="flex items-center justify-center w-[30px] h-[30px]">
                    <img src="/games/game-icons/why.svg" alt="Why Join" className="w-[30px] h-[30px]" />
                  </div>
                  <h2 className="font-jost font-extrabold text-[20px] leading-[29px] tracking-[0.01em] text-white uppercase select-none">
                    WHY JOIN MIGHTY LUCK?
                  </h2>
                </div>
              </div>

              <div className="flex flex-row items-center gap-[12px] w-full">
                <img
                  src="/games/join/clock.png"
                  alt="Fast Withdrawals"
                  className="flex-1 min-w-0 h-[220px] rounded-[12px] object-cover"
                />
                <img
                  src="/games/join/trophy.png"
                  alt="Big Winners Welcome"
                  className="flex-1 min-w-0 h-[220px] rounded-[12px] object-cover"
                />
                <img
                  src="/games/join/10.png"
                  alt="Weekly 10% Cashback"
                  className="flex-1 min-w-0 h-[220px] rounded-[12px] object-cover"
                />
              </div>
            </section>

            {/* CRASH GAMES SECTION */}
            <section className="flex flex-col gap-[16px] w-full">
              <div className="flex flex-row justify-between items-center w-full h-[30px]">
                <div className="flex flex-row items-center gap-[12px] h-[30px]">
                  <div className="flex items-center justify-center w-[29.89px] h-[30px]">
                    <img src="/games/game-icons/crash.svg" alt="Crash Games" className="w-[29.89px] h-[30px] object-contain" />
                  </div>
                  <h2 style={{ fontFamily: "'Jost', sans-serif", fontWeight: 800, fontSize: 'clamp(15px,2vw,20px)', lineHeight: '29px', letterSpacing: '0.01em' }} className="text-white uppercase select-none">CRASH GAMES (723)</h2>
                </div>

                <div className="flex flex-row items-center gap-[12px] w-[125px] h-[30px]">
                  <span className="font-sans font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#D2DCF7] cursor-pointer hover:text-white transition-colors select-none">
                    View all
                  </span>

                  <div className="flex flex-row items-center gap-[8px] w-[68px] h-[30px]">
                    <button
                      onClick={() => scrollCarousel(crashRef, 'left')}
                      disabled={!canScrollCrashLeft}
                      style={{ background: '#112F82' }}
                      className="w-[30px] h-[30px] rounded-[4px] flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 opacity-100 hover:opacity-100 hover:bg-[#1463FF] text-white"
                    >
                      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 9L1 5L5 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button
                      onClick={() => scrollCarousel(crashRef, 'right')}
                      disabled={!canScrollCrashRight}
                      style={{ background: '#112F82' }}
                      className="w-[30px] h-[30px] rounded-[4px] flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 opacity-100 hover:opacity-100 hover:bg-[#1463FF] text-white"
                    >
                      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative w-full overflow-hidden">
                <div
                  ref={crashRef}
                  className="flex flex-row items-center gap-[12px] overflow-x-auto scrollbar-none scroll-smooth w-full h-[200px] select-none"
                >
                  {filteredCrash.map((game) => (
                    <div
                      key={game.id}
                      onClick={() => dispatch(openAuthModal('join'))}
                      className="w-[152px] h-[200px] flex-none rounded-[12px] relative overflow-hidden bg-[#CDCDCD] transition-all duration-300 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] group cursor-pointer"
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 ease-out group-hover:scale-110"
                        style={{ backgroundImage: `url(${game.image})` }}
                      />
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <button
                          onClick={(e) => toggleFavorite(e, game.id)}
                          className="absolute left-[114px] top-[12px] w-[24px] h-[24px] text-white hover:text-red-500 focus:outline-none transition-colors duration-200 z-20 cursor-pointer flex items-center justify-center"
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill={favorites.includes(game.id) ? "#FF4B4B" : "none"}
                            stroke={favorites.includes(game.id) ? "#FF4B4B" : "#FFFFFF"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="transition-all duration-200"
                          >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                        </button>
                        <div
                          onClick={() => dispatch(openAuthModal('join'))}
                          className="absolute w-[48px] h-[48px] left-[calc(50%-24px)] top-[calc(50%-24px)] rounded-full bg-[#FFC83D] flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 shadow-[0_4px_12px_rgba(255,200,61,0.4)] cursor-pointer"
                        >
                          <svg width="12" height="14" viewBox="0 0 12 14" fill="none" className="ml-[2px] mt-[1px]">
                            <path d="M1.5 1.58579C1.5 0.771239 2.42253 0.29749 3.0827 0.778703L10.5113 6.19291C11.0772 6.60527 11.0772 7.39473 10.5113 7.80709L3.0827 13.2213C2.42253 13.7025 1.5 13.2288 1.5 12.4142V1.58579Z" fill="#0C1F56" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* GAME PROVIDERS SECTION */}
            <section className="flex flex-col gap-[20px] w-full">
              <div className="flex flex-row justify-between items-center w-full h-[30px]">
                <div className="flex flex-row items-center gap-[12px] h-[30px]">
                  <div className="flex items-center justify-center w-[29.89px] h-[30px]">
                    <img src="/games/game-icons/game.svg" alt="Game Providers" className="w-[29.89px] h-[30px] object-contain" />
                  </div>
                  <h2 style={{ fontFamily: "'Jost', sans-serif", fontWeight: 800, fontSize: 'clamp(15px,2vw,20px)', lineHeight: '29px', letterSpacing: '0.01em' }} className="text-white uppercase select-none">GAME PROVIDERS (34)</h2>
                </div>

                <div className="flex flex-row items-center gap-[12px] w-[125px] h-[30px]">
                  <span className="font-sans font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#D2DCF7] cursor-pointer hover:text-white transition-colors select-none">
                    View all
                  </span>

                  <div className="flex flex-row items-center gap-[8px] w-[68px] h-[30px]">
                    <button
                      onClick={() => scrollCarousel(providersRef, 'left')}
                      disabled={!canScrollProvidersLeft}
                      style={{ background: '#112F82' }}
                      className="w-[30px] h-[30px] rounded-[4px] flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 opacity-100 hover:opacity-100 hover:bg-[#1463FF] text-white"
                    >
                      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 9L1 5L5 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button
                      onClick={() => scrollCarousel(providersRef, 'right')}
                      disabled={!canScrollProvidersRight}
                      style={{ background: '#112F82' }}
                      className="w-[30px] h-[30px] rounded-[4px] flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 opacity-100 hover:opacity-100 hover:bg-[#1463FF] text-white"
                    >
                      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative w-full overflow-hidden">
                <div
                  ref={providersRef}
                  className="flex flex-row items-center gap-[12px] overflow-x-auto scrollbar-none scroll-smooth w-full h-[100px] select-none"
                >
                  {providerList.map((provider) => (
                    <div
                      key={provider.id}
                      className="w-[152px] h-[100px] flex-none rounded-[12px] bg-[#0C1F56] hover:bg-[#173EAD] flex flex-col justify-center items-center p-[12px] gap-[8px] border border-white/5 shadow-md transition-all duration-300 group cursor-pointer"
                    >
                      <div className="w-[80px] h-[40px] flex items-center justify-center">
                        <img
                          src={provider.logo}
                          alt={provider.name}
                          className="max-w-full max-h-full object-contain filter brightness-100 transition-all duration-300"
                        />
                      </div>
                      <div className="flex flex-row justify-center items-center w-[104px] h-[14px]">
                        <span className="font-sans font-semibold text-[10px] leading-[14px] text-center text-[#FFC83D]">
                          {provider.gamesCount} Games
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* TABLE GAMES SECTION */}
            <section className="flex flex-col gap-[20px] w-full">
              <div className="flex flex-row justify-between items-center w-full h-[30px]">
                <div className="flex flex-row items-center gap-[12px] h-[30px]">
                  <div className="flex items-center justify-center w-[29.89px] h-[30px]">
                    <img src="/games/game-icons/table.svg" alt="Table Games" className="w-[29.89px] h-[30px] object-contain" />
                  </div>
                  <h2 style={{ fontFamily: "'Jost', sans-serif", fontWeight: 800, fontSize: 'clamp(15px,2vw,20px)', lineHeight: '29px', letterSpacing: '0.01em' }} className="text-white uppercase select-none">TABLE GAMES (51)</h2>
                </div>

                <div className="flex flex-row items-center gap-[12px] w-[124px] h-[30px]">
                  <span className="font-sans font-medium text-[12px] leading-[16px] tracking-[0.02em] text-[#D2DCF7] cursor-pointer hover:text-white transition-colors select-none">
                    View all
                  </span>

                  <div className="flex flex-row items-center gap-[8px] w-[68px] h-[30px]">
                    <button
                      onClick={() => scrollCarousel(tableRef, 'left')}
                      disabled={!canScrollTableLeft}
                      style={{ background: '#112F82' }}
                      className="w-[30px] h-[30px] rounded-[4px] flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 opacity-100 hover:opacity-100 hover:bg-[#1463FF] text-white"
                    >
                      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 9L1 5L5 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button
                      onClick={() => scrollCarousel(tableRef, 'right')}
                      disabled={!canScrollTableRight}
                      style={{ background: '#112F82' }}
                      className="w-[30px] h-[30px] rounded-[4px] flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 opacity-100 hover:opacity-100 hover:bg-[#1463FF] text-white"
                    >
                      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative w-full overflow-hidden">
                <div
                  ref={tableRef}
                  className="flex flex-row items-center gap-[12px] overflow-x-auto scrollbar-none scroll-smooth w-full h-[200px] select-none"
                >
                  {filteredTable.map((game) => (
                    <div
                      key={game.id}
                      onClick={() => dispatch(openAuthModal('join'))}
                      className="w-[152px] h-[200px] flex-none rounded-[12px] relative overflow-hidden bg-[#CDCDCD] transition-all duration-300 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] group cursor-pointer"
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 ease-out group-hover:scale-110"
                        style={{ backgroundImage: `url(${game.image})` }}
                      />
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <button
                          onClick={(e) => toggleFavorite(e, game.id)}
                          className="absolute left-[114px] top-[12px] w-[24px] h-[24px] text-white hover:text-red-500 focus:outline-none transition-colors duration-200 z-20 cursor-pointer flex items-center justify-center"
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill={favorites.includes(game.id) ? "#FF4B4B" : "none"}
                            stroke={favorites.includes(game.id) ? "#FF4B4B" : "#FFFFFF"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="transition-all duration-200"
                          >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                        </button>
                        <div
                          onClick={() => dispatch(openAuthModal('join'))}
                          className="absolute w-[48px] h-[48px] left-[calc(50%-24px)] top-[calc(50%-24px)] rounded-full bg-[#FFC83D] flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 shadow-[0_4px_12px_rgba(255,200,61,0.4)] cursor-pointer"
                        >
                          <svg width="12" height="14" viewBox="0 0 12 14" fill="none" className="ml-[2px] mt-[1px]">
                            <path d="M1.5 1.58579C1.5 0.771239 2.42253 0.29749 3.0827 0.778703L10.5113 6.19291C11.0772 6.60527 11.0772 7.39473 10.5113 7.80709L3.0827 13.2213C2.42253 13.7025 1.5 13.2288 1.5 12.4142V1.58579Z" fill="#0C1F56" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* BONUS BUYS SECTION */}
            <section className="flex flex-col gap-[20px] w-full">
              <div className="flex flex-row justify-between items-center w-full h-[30px]">
                <div className="flex flex-row items-center gap-[12px] h-[30px]">
                  <div className="flex items-center justify-center w-[29.89px] h-[30px]">
                    <img src="/games/game-icons/bonus.svg" alt="Bonus Buys" className="w-[29.89px] h-[30px] object-contain" />
                  </div>
                  <h2 style={{ fontFamily: "'Jost', sans-serif", fontWeight: 800, fontSize: 'clamp(15px,2vw,20px)', lineHeight: '29px', letterSpacing: '0.01em' }} className="text-white uppercase select-none">BONUS BUYS (145)</h2>
                </div>

                <div className="flex flex-row items-center gap-[12px] w-[125px] h-[30px]">
                  <span className="font-sans font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#D2DCF7] cursor-pointer hover:text-white transition-colors select-none">
                    View all
                  </span>

                  <div className="flex flex-row items-center gap-[8px] w-[68px] h-[30px]">
                    <button
                      onClick={() => scrollCarousel(bonusRef, 'left')}
                      disabled={!canScrollBonusLeft}
                      style={{ background: '#112F82' }}
                      className="w-[30px] h-[30px] rounded-[4px] flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 opacity-100 hover:opacity-100 hover:bg-[#1463FF] text-white"
                    >
                      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 9L1 5L5 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button
                      onClick={() => scrollCarousel(bonusRef, 'right')}
                      disabled={!canScrollBonusRight}
                      style={{ background: '#112F82' }}
                      className="w-[30px] h-[30px] rounded-[4px] flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 opacity-100 hover:opacity-100 hover:bg-[#1463FF] text-white"
                    >
                      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative w-full overflow-hidden">
                <div
                  ref={bonusRef}
                  className="flex flex-row items-center gap-[12px] overflow-x-auto scrollbar-none scroll-smooth w-full h-[200px] select-none"
                >
                  {filteredBonus.map((game) => (
                    <div
                      key={game.id}
                      onClick={() => dispatch(openAuthModal('join'))}
                      className="w-[152px] h-[200px] flex-none rounded-[12px] relative overflow-hidden bg-[#CDCDCD] transition-all duration-300 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] group cursor-pointer"
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 ease-out group-hover:scale-110"
                        style={{ backgroundImage: `url(${game.image})` }}
                      />
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <button
                          onClick={(e) => toggleFavorite(e, game.id)}
                          className="absolute left-[114px] top-[12px] w-[24px] h-[24px] text-white hover:text-red-500 focus:outline-none transition-colors duration-200 z-20 cursor-pointer flex items-center justify-center"
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill={favorites.includes(game.id) ? "#FF4B4B" : "none"}
                            stroke={favorites.includes(game.id) ? "#FF4B4B" : "#FFFFFF"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="transition-all duration-200"
                          >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                        </button>
                        <div
                          onClick={() => dispatch(openAuthModal('join'))}
                          className="absolute w-[48px] h-[48px] left-[calc(50%-24px)] top-[calc(50%-24px)] rounded-full bg-[#FFC83D] flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 shadow-[0_4px_12px_rgba(255,200,61,0.4)] cursor-pointer"
                        >
                          <svg width="12" height="14" viewBox="0 0 12 14" fill="none" className="ml-[2px] mt-[1px]">
                            <path d="M1.5 1.58579C1.5 0.771239 2.42253 0.29749 3.0827 0.778703L10.5113 6.19291C11.0772 6.60527 11.0772 7.39473 10.5113 7.80709L3.0827 13.2213C2.42253 13.7025 1.5 13.2288 1.5 12.4142V1.58579Z" fill="#0C1F56" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* COLLECTIONS SECTION */}
            <section className="flex flex-col gap-[20px] w-full">
              <div className="flex flex-row justify-between items-center w-full h-[30px]">
                <div className="flex flex-row items-center gap-[12px] h-[30px]">
                  <div className="flex items-center justify-center w-[29.89px] h-[30px]">
                    <img src="/games/game-icons/collections.svg" alt="Collections" className="w-[29.89px] h-[30px] object-contain" />
                  </div>
                  <h2 style={{ fontFamily: "'Jost', sans-serif", fontWeight: 800, fontSize: 'clamp(15px,2vw,20px)', lineHeight: '29px', letterSpacing: '0.01em' }} className="text-white uppercase select-none">COLLECTIONS (17)</h2>
                </div>

                <div className="flex flex-row items-center gap-[12px] w-[125px] h-[30px]">
                  <span className="font-sans font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#D2DCF7] cursor-pointer hover:text-white transition-colors select-none">
                    View all
                  </span>

                  <div className="flex flex-row items-center gap-[8px] w-[68px] h-[30px]">
                    <button
                      onClick={() => scrollCarousel(collectionsRef, 'left')}
                      disabled={!canScrollCollectionsLeft}
                      style={{ background: '#112F82' }}
                      className="w-[30px] h-[30px] rounded-[4px] flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 opacity-100 hover:opacity-100 hover:bg-[#1463FF] text-white"
                    >
                      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 9L1 5L5 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button
                      onClick={() => scrollCarousel(collectionsRef, 'right')}
                      disabled={!canScrollCollectionsRight}
                      style={{ background: '#112F82' }}
                      className="w-[30px] h-[30px] rounded-[4px] flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 opacity-100 hover:opacity-100 hover:bg-[#1463FF] text-white"
                    >
                      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative w-full overflow-hidden">
                <div
                  ref={collectionsRef}
                  className="flex flex-row items-center gap-[12px] overflow-x-auto scrollbar-none scroll-smooth w-full h-[100px] select-none"
                >
                  {filteredCollections.map((col) => (
                    <div
                      key={col.id}
                      className="w-[316px] h-[100px] flex-none rounded-[12px] bg-[#0C1F56] hover:bg-[#173EAD] flex flex-row items-center p-[12px] pr-[24px] pl-[12px] gap-[12px] border border-white/5 shadow-md transition-all duration-300 group cursor-pointer"
                    >
                      <div className="w-[76px] h-[76px] flex-none bg-[#0E1B3D] rounded-[8px] relative overflow-hidden">
                        <div className="absolute w-[70px] h-[70px] left-[calc(50%-35px)] top-[calc(50%-35px)] bg-[#1463FF]/60 rounded-full filter blur-[15px] group-hover:scale-125 transition-transform duration-300 pointer-events-none" />
                        <img
                          src={col.image}
                          alt={col.name}
                          className="absolute w-[71px] h-[67px] left-[calc(50%-35.5px)] top-[calc(50%-33.5px)] object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <span className="font-jost font-extrabold text-[22px] leading-[32px] tracking-[0.01em] text-white uppercase text-center flex-grow select-none">
                        {col.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* RECENT WINNERS SECTION */}
            <section className="flex flex-col gap-[12px] w-full mt-[8px]">
              <div className="flex flex-row justify-between items-center w-full h-[30px] mb-[12px]">
                <div className="flex flex-row items-center gap-[12px] w-[231px] h-[30px]">
                  <div className="flex items-center justify-center w-[30px] h-[30px]">
                    <img src="/games/game-icons/recent.svg" alt="Recent Winners" className="w-[30px] h-[30px]" />
                  </div>
                  <h2 className="font-jost font-extrabold text-[20px] leading-[29px] tracking-[0.01em] text-white uppercase select-none">
                    RECENT WINNERS
                  </h2>
                </div>
              </div>

              <div className="flex flex-row justify-between items-center w-full px-4 md:px-[24px] h-[20px] text-white font-jost font-bold text-[14px] leading-[20px] tracking-[0.02em] uppercase select-none opacity-80">
                <span className="flex-1 min-w-[150px] text-left">GAME</span>
                <span className="w-[120px] sm:w-[200px] text-left">USERNAME</span>
                <span className="hidden md:block w-[100px] text-left">TIME</span>
                <span className="w-[100px] text-right">PAYOUT</span>
              </div>

              <div className="flex flex-col gap-[8px] w-full">
                {filteredWinners.map((winner) => (
                  <div
                    key={winner.id}
                    className="flex flex-row justify-between items-center w-full h-[60px] px-4 md:px-[24px] bg-[#0C1F56] rounded-[8px] hover:bg-[#112B75] transition-colors duration-200 border border-white/5"
                  >
                    <div className="flex flex-row items-center gap-[12px] flex-1 min-w-[150px] pr-2">
                      <div
                        className="w-[22px] h-[30px] rounded-[1.8px] bg-cover bg-center bg-[#CDCDCD] flex-none border border-white/10"
                        style={{ backgroundImage: `url(${winner.gameImage})` }}
                      />
                      <span className="font-sans font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white truncate max-w-[120px] sm:max-w-[220px]">
                        {winner.gameTitle}
                      </span>
                    </div>

                    <span className="font-sans font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white w-[120px] sm:w-[200px] text-left truncate">
                      {winner.username}
                    </span>

                    <span className="hidden md:block font-sans font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white w-[100px] text-left">
                      {winner.time}
                    </span>

                    <span
                      className={`font-sans font-semibold text-[14px] leading-[19px] tracking-[0.02em] w-[100px] text-right ${winner.payoutAmount > 0 ? 'text-[#00DD29]' : 'text-[#7795E8]'}`}
                    >
                      {winner.payout}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Child 2: SEO Text Area */}
          <div className="flex flex-col gap-[40px] w-full">
            <div className="w-full max-w-[800px] flex flex-col items-center gap-[32px] relative mx-auto">
              <div className={`w-full max-w-[800px] flex flex-col gap-[24px] overflow-hidden transition-all duration-500 ease-in-out ${isSeoExpanded ? 'max-h-[1500px]' : 'max-h-[300px]'}`}>
                <div className="flex flex-col gap-[12px]">
                  <h1 className="font-jost font-bold text-[32px] leading-[1.2] tracking-[-0.02em] text-white">
                    Play the Best Crypto Casino Games Online at Mighty Luck — Fast, Fair and Secure
                  </h1>
                  <p className="font-sans font-medium text-[16px] leading-[1.6] text-[#D2DCF7]">
                    Step into a next-generation gaming experience where every spin, bet, and hand is powered by blockchain technology. At Mighty Luck Casino, you can explore more than 9,000 crypto casino games across slots, table games, live dealer games, and crash-style favorites. As one of the top crypto casinos online, Mighty Luck gives players instant withdrawals, enhanced privacy, and a secure gambling environment without the friction of traditional payment methods. Whether you're here to play table games, explore Bitcoin casino games, or try the latest provably fair slots, Mighty Luck delivers one of the most complete online casino experiences available today. Ready to play games and win real crypto? Start playing crypto casino games at Mighty Luck Casino.
                  </p>
                </div>

                <div className="flex flex-col gap-[12px]">
                  <h2 className="font-jost font-bold text-[24px] leading-[35px] text-white">
                    Why Mighty Luck Is the Ultimate Place to Play Crypto Casino Games
                  </h2>
                  <p className="font-sans font-medium text-[16px] leading-[1.6] text-[#D2DCF7]">
                    Mighty Luck Casino offers the perfect blend of crypto gambling convenience, online casino entertainment, and world-class security. Compared to traditional online casinos, Mighty Luck delivers significantly faster payouts, more generous bonuses, and an unmatched selection of various games.
                  </p>
                </div>

                <div className="flex flex-col gap-[12px]">
                  <h2 className="font-jost font-bold text-[24px] leading-[35px] text-white">
                    Massive Game Variety
                  </h2>
                  <p className="font-sans font-medium text-[16px] leading-[1.6] text-[#D2DCF7]">
                    With more than 9,000 casino games, Mighty Luck outshines many crypto casinos and traditional casinos alike. You’ll find:
                  </p>
                </div>
              </div>

              {!isSeoExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-[200px] flex items-end justify-center pb-[16px] bg-gradient-to-t from-[#091741] via-[#091741]/80 to-transparent z-10 pointer-events-none">
                  <button
                    onClick={() => setIsSeoExpanded(true)}
                    className="flex flex-row items-center gap-[6px] px-[16px] py-[8px] bg-transparent border-none outline-none cursor-pointer group pointer-events-auto select-none"
                  >
                    <span className="font-sans font-semibold text-[14px] leading-[19px] tracking-[0.01em] text-[#FFBF1F] group-hover:text-white transition-colors">
                      Read more
                    </span>
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      stroke="#FFBF1F"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform duration-300 group-hover:stroke-white mt-[1px]"
                    >
                      <path d="M1 1L5 5L9 1" />
                    </svg>
                  </button>
                </div>
              )}

              {isSeoExpanded && (
                <div className="flex justify-center w-full z-10 mt-[8px]">
                  <button
                    onClick={() => setIsSeoExpanded(false)}
                    className="flex flex-row items-center gap-[6px] px-[16px] py-[8px] bg-transparent border-none outline-none cursor-pointer group select-none"
                  >
                    <span className="font-sans font-semibold text-[14px] leading-[19px] tracking-[0.01em] text-[#FFBF1F] group-hover:text-white transition-colors">
                      Read less
                    </span>
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      stroke="#FFBF1F"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform duration-300 group-hover:stroke-white rotate-180 mt-[1px]"
                    >
                      <path d="M1 1L5 5L9 1" />
                    </svg>
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
                  className="h-[19.05px] w-auto object-contain filter brightness-0 invert opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer"
                />
              ))}
            </div>
          </section>

          {/* Child 4: MAIN WEBSITE FOOTER */}
          <footer className="w-full flex flex-col gap-[48px] select-none text-white pb-[40px]">
            <div className="w-full flex flex-col md:flex-row justify-between items-start gap-[49px]">
              <div className="flex flex-col items-start gap-[16px] w-auto">
                <img src="/images/logo.svg" className="w-[130.49px] h-[50px] object-contain" alt="Mighty Luck" />
                <span className="font-sans font-semibold text-[11px] leading-[15px] tracking-[0.01em] text-[#D2DCF7]">
                  @ 2026 Mighty Luck. All rights reserved.
                </span>
              </div>

              <div className="flex flex-row flex-wrap md:flex-nowrap items-start gap-[32px] w-full md:w-[728px] justify-between">
                {/* Column 1: Slot Games */}
                <div className="flex flex-col gap-[12px] w-[120px]">
                  <h3 className="font-jost font-bold text-[12px] leading-[17px] tracking-[0.02em] uppercase text-white">
                    Slot Games
                  </h3>
                  <div className="flex flex-col gap-[8px]">
                    {['Slots', 'Skill Games', 'Jackpot', 'Bonus Buy', 'Crash Games'].map((item) => (
                      <span key={item} className="font-sans font-semibold text-[11px] leading-[15px] tracking-[0.01em] text-[#D2DCF7] cursor-pointer hover:text-white transition-colors">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Column 2: Live Casino */}
                <div className="flex flex-col gap-[12px] w-[120px]">
                  <h3 className="font-jost font-bold text-[12px] leading-[17px] tracking-[0.02em] uppercase text-white">
                    Live Casino
                  </h3>
                  <div className="flex flex-col gap-[8px]">
                    {['Roulette', 'Blackjack', 'Live Casino', 'Table Games', 'Video Poker'].map((item) => (
                      <span key={item} className="font-sans font-semibold text-[11px] leading-[15px] tracking-[0.01em] text-[#D2DCF7] cursor-pointer hover:text-white transition-colors">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Column 3: Casino */}
                <div className="flex flex-col gap-[12px] w-[120px]">
                  <h3 className="font-jost font-bold text-[12px] leading-[17px] tracking-[0.02em] uppercase text-white">
                    Casino
                  </h3>
                  <div className="flex flex-col gap-[8px]">
                    {['About Us', 'Promotions', 'Tournaments', 'Affiliate Program', 'VIP Club', 'Refer a Friend', 'Blog', 'Bonus Shop'].map((item) => (
                      <span key={item} className="font-sans font-semibold text-[11px] leading-[15px] tracking-[0.01em] text-[#D2DCF7] cursor-pointer hover:text-white transition-colors">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Column 4: Legal */}
                <div className="flex flex-col gap-[12px] w-[120px]">
                  <h3 className="font-jost font-bold text-[12px] leading-[17px] tracking-[0.02em] uppercase text-white">
                    Legal
                  </h3>
                  <div className="flex flex-col gap-[8px]">
                    {['Privacy Policy', 'Terms & Conditions', 'Bonus Terms', 'Responsible Gambling', 'Payment Methods', 'Sportsbook Rules'].map((item) => (
                      <span key={item} className="font-sans font-semibold text-[11px] leading-[15px] tracking-[0.01em] text-[#D2DCF7] cursor-pointer hover:text-white transition-colors">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Column 5: Support */}
                <div className="flex flex-col gap-[12px] w-[120px]">
                  <h3 className="font-jost font-bold text-[12px] leading-[17px] tracking-[0.02em] uppercase text-white">
                    Support
                  </h3>
                  <div className="flex flex-col gap-[8px]">
                    {['Live Support'].map((item) => (
                      <span key={item} className="font-sans font-semibold text-[11px] leading-[15px] tracking-[0.01em] text-[#D2DCF7] cursor-pointer hover:text-white transition-colors">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

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

      <AuthModal />

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden flex-row items-center justify-around bg-[#0C1F56] border-t border-white/5 h-14 px-2">
        <button onClick={() => dispatch(openAuthModal('join'))} className="flex flex-col items-center gap-0.5 text-[#D2DCF7] hover:text-white cursor-pointer bg-transparent border-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>
          <span className="text-[9px] font-semibold font-sans">Join</span>
        </button>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex flex-col items-center gap-0.5 text-[#D2DCF7] hover:text-white cursor-pointer bg-transparent border-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
          <span className="text-[9px] font-semibold font-sans">Home</span>
        </button>
        <button onClick={() => dispatch(toggleSidebar())} className="flex flex-col items-center gap-0.5 text-[#D2DCF7] hover:text-white cursor-pointer bg-transparent border-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          <span className="text-[9px] font-semibold font-sans">Menu</span>
        </button>
      </nav>
    </div>
  );
}
