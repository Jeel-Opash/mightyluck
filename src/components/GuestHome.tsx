'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
      const cardWidth = 148;
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
    <div className="w-full min-h-screen bg-[#091741] text-white relative flex flex-col select-none overflow-x-hidden">

      {/* 2. Page Content Layout (Sidebar + Content Panel) */}
      <div className="flex flex-row items-start w-full max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-6 pt-0 pb-16 gap-3 lg:gap-6 relative">

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
            <section className="game-section-container">
              <div className="game-section-header">
                <div className="game-section-title-wrapper">
                  <div className="game-section-icon">
                    <img src="/games/game-icons/slot.svg" alt="Slots" />
                  </div>
                  <h2 className="game-section-title">SLOTS (1,487)</h2>
                </div>

                <div className="game-section-actions-wrapper">
                  <span className="game-section-view-all">
                    View all
                  </span>

                  <div className="game-section-nav">
                    <button
                      onClick={() => scrollCarousel(slotsRef, 'left')}
                      disabled={!canScrollSlotsLeft}
                      className="game-section-btn"
                    >
                      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 9L1 5L5 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button
                      onClick={() => scrollCarousel(slotsRef, 'right')}
                      disabled={!canScrollSlotsRight}
                      className="game-section-btn"
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
                  className="game-cards-slider scrollbar-none"
                >
                  {filteredSlots.map((game) => (
                    <div
                      key={game.id}
                      onClick={() => router.push(`/game/${game.id}`)}
                      className="game-card group cursor-pointer"
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
                          onClick={() => router.push(`/game/${game.id}`)}
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
            <section className="game-section-container">
              <div className="game-section-header">
                <div className="game-section-title-wrapper">
                  <div className="game-section-icon">
                    <img src="/games/game-icons/originals.svg" alt="Originals" />
                  </div>
                  <h2 className="game-section-title">ORIGINALS (14)</h2>
                </div>

                <div className="game-section-actions-wrapper">
                  <span className="game-section-view-all">
                    View all
                  </span>

                  <div className="game-section-nav">
                    <button
                      onClick={() => scrollCarousel(originalsRef, 'left')}
                      disabled={!canScrollOriginalsLeft}
                      className="game-section-btn"
                    >
                      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 9L1 5L5 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button
                      onClick={() => scrollCarousel(originalsRef, 'right')}
                      disabled={!canScrollOriginalsRight}
                      className="game-section-btn"
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
                  className="game-cards-slider scrollbar-none"
                >
                  {filteredOriginals.map((game) => (
                    <div
                      key={game.id}
                      onClick={() => router.push(`/game/${game.id}`)}
                      className="game-card group cursor-pointer"
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
                          onClick={() => router.push(`/game/${game.id}`)}
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
            <section className="game-section-container mt-4">
              <div className="game-section-header">
                <div className="game-section-title-wrapper">
                  <div className="game-section-icon">
                    <img src="/games/game-icons/why.svg" alt="Why Join" />
                  </div>
                  <h2 className="game-section-title">WHY JOIN MIGHTY LUCK?</h2>
                </div>
              </div>

              <div className="flex flex-row items-center gap-[12px] w-full overflow-x-auto scrollbar-none snap-x snap-mandatory">
                <img
                  src="/games/join/clock.png"
                  alt="Fast Withdrawals"
                  className="w-[279px] h-[158px] md:w-auto md:flex-1 md:h-[220px] rounded-[10px] md:rounded-[12px] object-cover snap-start shrink-0"
                />
                <img
                  src="/games/join/trophy.png"
                  alt="Big Winners Welcome"
                  className="w-[279px] h-[158px] md:w-auto md:flex-1 md:h-[220px] rounded-[10px] md:rounded-[12px] object-cover snap-start shrink-0"
                />
                <img
                  src="/games/join/10.png"
                  alt="Weekly 10% Cashback"
                  className="w-[279px] h-[158px] md:w-auto md:flex-1 md:h-[220px] rounded-[10px] md:rounded-[12px] object-cover snap-start shrink-0"
                />
              </div>
            </section>

            {/* CRASH GAMES SECTION */}
            <section className="game-section-container">
              <div className="game-section-header">
                <div className="game-section-title-wrapper">
                  <div className="game-section-icon">
                    <img src="/games/game-icons/crash.svg" alt="Crash Games" />
                  </div>
                  <h2 className="game-section-title">CRASH GAMES (723)</h2>
                </div>

                <div className="game-section-actions-wrapper">
                  <span className="game-section-view-all">
                    View all
                  </span>

                  <div className="game-section-nav">
                    <button
                      onClick={() => scrollCarousel(crashRef, 'left')}
                      disabled={!canScrollCrashLeft}
                      className="game-section-btn"
                    >
                      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 9L1 5L5 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button
                      onClick={() => scrollCarousel(crashRef, 'right')}
                      disabled={!canScrollCrashRight}
                      className="game-section-btn"
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
                  className="game-cards-slider scrollbar-none"
                >
                  {filteredCrash.map((game) => (
                    <div
                      key={game.id}
                      onClick={() => router.push(`/game/${game.id}`)}
                      className="game-card group cursor-pointer"
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
                          onClick={() => router.push(`/game/${game.id}`)}
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
            <section className="game-section-container">
              <div className="game-section-header">
                <div className="game-section-title-wrapper">
                  <div className="game-section-icon">
                    <img src="/games/game-icons/game.svg" alt="Game Providers" />
                  </div>
                  <h2 className="game-section-title">GAME PROVIDERS (34)</h2>
                </div>

                <div className="game-section-actions-wrapper">
                  <span className="game-section-view-all">
                    View all
                  </span>

                  <div className="game-section-nav">
                    <button
                      onClick={() => scrollCarousel(providersRef, 'left')}
                      disabled={!canScrollProvidersLeft}
                      className="game-section-btn"
                    >
                      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 9L1 5L5 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button
                      onClick={() => scrollCarousel(providersRef, 'right')}
                      disabled={!canScrollProvidersRight}
                      className="game-section-btn"
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
                  className="game-cards-slider scrollbar-none !h-[100px]"
                >
                  {providerList.map((provider) => (
                    <div
                      key={provider.id}
                      className="w-[120px] h-[80px] flex-none rounded-[12px] bg-[#0C1F56] hover:bg-[#173EAD] flex flex-col items-center justify-center gap-[8px] border border-white/5 cursor-pointer transition-all duration-300"
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
            <section className="game-section-container">
              <div className="game-section-header">
                <div className="game-section-title-wrapper">
                  <div className="game-section-icon">
                    <img src="/games/game-icons/table.svg" alt="Table Games" />
                  </div>
                  <h2 className="game-section-title">TABLE GAMES (51)</h2>
                </div>

                <div className="game-section-actions-wrapper">
                  <span className="game-section-view-all">
                    View all
                  </span>

                  <div className="game-section-nav">
                    <button
                      onClick={() => scrollCarousel(tableRef, 'left')}
                      disabled={!canScrollTableLeft}
                      className="game-section-btn"
                    >
                      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 9L1 5L5 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button
                      onClick={() => scrollCarousel(tableRef, 'right')}
                      disabled={!canScrollTableRight}
                      className="game-section-btn"
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
                  className="game-cards-slider scrollbar-none"
                >
                  {filteredTable.map((game) => (
                    <div
                      key={game.id}
                      onClick={() => router.push(`/game/${game.id}`)}
                      className="game-card group cursor-pointer"
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
                          onClick={() => router.push(`/game/${game.id}`)}
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
            <section className="game-section-container">
              <div className="game-section-header">
                <div className="game-section-title-wrapper">
                  <div className="game-section-icon">
                    <img src="/games/game-icons/bonus.svg" alt="Bonus Buys" />
                  </div>
                  <h2 className="game-section-title">BONUS BUYS (145)</h2>
                </div>

                <div className="game-section-actions-wrapper">
                  <span className="game-section-view-all">
                    View all
                  </span>

                  <div className="game-section-nav">
                    <button
                      onClick={() => scrollCarousel(bonusRef, 'left')}
                      disabled={!canScrollBonusLeft}
                      className="game-section-btn"
                    >
                      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 9L1 5L5 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button
                      onClick={() => scrollCarousel(bonusRef, 'right')}
                      disabled={!canScrollBonusRight}
                      className="game-section-btn"
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
                  className="game-cards-slider scrollbar-none"
                >
                  {filteredBonus.map((game) => (
                    <div
                      key={game.id}
                      onClick={() => router.push(`/game/${game.id}`)}
                      className="game-card group cursor-pointer"
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
                          onClick={() => router.push(`/game/${game.id}`)}
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
            <section className="game-section-container">
              <div className="game-section-header">
                <div className="game-section-title-wrapper">
                  <div className="game-section-icon">
                    <img src="/games/game-icons/collections.svg" alt="Collections" />
                  </div>
                  <h2 className="game-section-title">COLLECTIONS (17)</h2>
                </div>

                <div className="game-section-actions-wrapper">
                  <span className="game-section-view-all">
                    View all
                  </span>

                  <div className="game-section-nav">
                    <button
                      onClick={() => scrollCarousel(collectionsRef, 'left')}
                      disabled={!canScrollCollectionsLeft}
                      className="game-section-btn"
                    >
                      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 9L1 5L5 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button
                      onClick={() => scrollCarousel(collectionsRef, 'right')}
                      disabled={!canScrollCollectionsRight}
                      className="game-section-btn"
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
                  className="game-cards-slider scrollbar-none !h-[100px]"
                >
                  {filteredCollections.map((col) => (
                    <div
                      key={col.id}
                      className="w-[308px] h-[100px] flex-none rounded-[12px] bg-[#0C1F56] hover:bg-[#173EAD] flex flex-row items-center p-[12px] pr-[24px] pl-[12px] gap-[12px] border border-white/5 shadow-md transition-all duration-300 group cursor-pointer"
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
            <section className="winners-section-container">
              <div className="winners-header-wrapper">
                <div className="winners-header-title-wrapper">
                  <div className="winners-header-icon">
                    <img src="/games/game-icons/recent.svg" alt="Recent Winners" className="w-[30px] h-[30px]" />
                  </div>
                  <h2 className="winners-header-title">
                    RECENT WINNERS
                  </h2>
                </div>
              </div>

              <div className="winners-table-container scrollbar-none">
                <div className="winners-table-inner">
                  <div className="winners-table-header-row">
                    <span className="winners-table-header-game">GAME</span>
                    <div className="winners-table-header-right-frame">
                      <span className="winners-table-header-username">USERNAME</span>
                      <span className="winners-table-header-time">TIME</span>
                      <span className="winners-table-header-payout">PAYOUT</span>
                    </div>
                  </div>

                  {filteredWinners.map((winner) => (
                    <div
                      key={winner.id}
                      className="winner-row-container"
                    >
                      <div className="winner-row-game-frame">
                        <div
                          className="winner-row-game-image-rect"
                          style={{ backgroundImage: `url(${winner.gameImage})` }}
                        />
                        <span className="winner-row-game-title">
                          {winner.gameTitle}
                        </span>
                      </div>

                      <div className="winner-row-right-frame">
                        <span className="winner-row-username">
                          {winner.username}
                        </span>
                        <span className="winner-row-time">
                          {winner.time}
                        </span>
                        <span
                          className={`winner-row-payout ${winner.payoutAmount > 0 ? 'win' : 'zero'}`}
                        >
                          {winner.payout}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
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
                    With more than 9,000 casino games, Mighty Luck outshines many crypto casinos and traditional casinos alike. You’ll find:
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
                      <linearGradient id="gLogo" x1="0" y1="0" x2="132" y2="0" gradientUnits="userSpaceOnUse">
                        <stop offset="12%" stopColor="#FFD85A" />
                        <stop offset="86.68%" stopColor="#FFB800" />
                      </linearGradient>
                      <linearGradient id="gCrown" x1="4.07" y1="12.38" x2="29.42" y2="12.38" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFD85A" />
                        <stop offset="1" stopColor="#FFB800" />
                      </linearGradient>
                    </defs>
                    {/* Crown icon — loaded from logo.svg, scaled to fit top 26px */}
                    <g transform="translate(49, 0) scale(1.09)">
                      <image href="/images/logo.svg" width="34" height="25" />
                    </g>
                    {/* MIGHTY — white, Jost 800 */}
                    <text x="18" y="47" fontFamily="Jost, sans-serif" fontWeight="800" fontSize="12" letterSpacing="1.2" fill="#FFFFFF">MIGHTY</text>
                    {/* LUCK — gold gradient, Jost 800 */}
                    <text x="78" y="47" fontFamily="Jost, sans-serif" fontWeight="800" fontSize="12" letterSpacing="1.2" fill="url(#gLogo)">LUCK</text>
                  </svg>
                </div>
                <span className="font-sans font-semibold text-[11px] leading-[15px] tracking-[0.01em] text-[#D2DCF7] w-[213px]">
                  @ 2026 Mighty Luck. All rights reserved.
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

            {/* Bottom strip — border-top, legal + badges */}
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

      <AuthModal />

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden flex-row items-center justify-around bg-[#0C1F56] border-t border-white/5 h-[60px] px-2">
        <button onClick={() => dispatch(toggleSidebar())} className="flex flex-col items-center gap-1 text-[#D2DCF7] hover:text-white cursor-pointer bg-transparent border-0 flex-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6" /><path d="M3 12h12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          <span className="text-[10px] font-semibold font-sans">Menu</span>
        </button>
        <button onClick={() => { }} className="flex flex-col items-center gap-1 text-[#D2DCF7] hover:text-white cursor-pointer bg-transparent border-0 flex-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <span className="text-[10px] font-semibold font-sans">Search</span>
        </button>
        <button onClick={() => dispatch(openAuthModal('join'))} className="flex flex-col items-center gap-1 text-[#D2DCF7] hover:text-white cursor-pointer bg-transparent border-0 flex-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" /><line x1="12" y1="22" x2="12" y2="7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" /></svg>
          <span className="text-[10px] font-semibold font-sans">Offers</span>
        </button>
        <button onClick={() => { }} className="flex flex-col items-center gap-1 text-[#D2DCF7] hover:text-white cursor-pointer bg-transparent border-0 flex-1">
          <div className="w-5 h-5 flex items-center justify-center">
            <span className="text-[9px] font-black text-[#D2DCF7] border border-[#D2DCF7] rounded px-[2px] leading-none">VIP</span>
          </div>
          <span className="text-[10px] font-semibold font-sans">VIP</span>
        </button>
        <button onClick={() => { }} className="flex flex-col items-center gap-1 text-[#D2DCF7] hover:text-white cursor-pointer bg-transparent border-0 flex-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
          <span className="text-[10px] font-semibold font-sans">Tourneys</span>
        </button>
      </nav>
    </div>
  );
}
