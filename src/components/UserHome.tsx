'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { openDepositModal, toggleSidebar, openAllGamesModal } from '@/redux/features/uiSlice';

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

export default function UserHome() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchQuery = useAppSelector((state) => state.ui.searchQuery);

  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('lobby');

  // Refs for the horizontal carousels
  const slotsRef = useRef<HTMLDivElement>(null);
  const originalsRef = useRef<HTMLDivElement>(null);
  const promotionsRef = useRef<HTMLDivElement>(null);
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

  const [canScrollPromotionsLeft, setCanScrollPromotionsLeft] = useState(false);
  const [canScrollPromotionsRight, setCanScrollPromotionsRight] = useState(true);

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

  // Function to toggle a game in favorites
  const toggleFavorite = (e: React.MouseEvent, gameId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(gameId) ? prev.filter((id) => id !== gameId) : [...prev, gameId]
    );
  };

  // Scroll function for carousels
  const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right', customCardWidth?: number) => {
    if (ref.current) {
      const cardWidth = customCardWidth || 152;
      const gap = 12;
      const scrollAmount = (cardWidth + gap) * (customCardWidth ? 1 : 3); // Scroll 1 card for large promos, 3 cards for games
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
    const promotionsEl = promotionsRef.current;
    const crashEl = crashRef.current;
    const providersEl = providersRef.current;
    const tableEl = tableRef.current;
    const bonusEl = bonusRef.current;
    const collectionsEl = collectionsRef.current;

    const handleSlotsScroll = () => checkScrollState(slotsRef, setCanScrollSlotsLeft, setCanScrollSlotsRight);
    const handleOriginalsScroll = () => checkScrollState(originalsRef, setCanScrollOriginalsLeft, setCanScrollOriginalsRight);
    const handlePromotionsScroll = () => checkScrollState(promotionsRef, setCanScrollPromotionsLeft, setCanScrollPromotionsRight);
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

    if (promotionsEl) {
      promotionsEl.addEventListener('scroll', handlePromotionsScroll);
      checkScrollState(promotionsRef, setCanScrollPromotionsLeft, setCanScrollPromotionsRight);
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
      checkScrollState(promotionsRef, setCanScrollPromotionsLeft, setCanScrollPromotionsRight);
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
      if (promotionsEl) promotionsEl.removeEventListener('scroll', handlePromotionsScroll);
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
      checkScrollState(promotionsRef, setCanScrollPromotionsLeft, setCanScrollPromotionsRight);
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

      {/* 2. Page Content Layout (Sidebar + Content Panel) */}
      <div className="flex flex-row items-start w-full px-3 sm:px-4 lg:px-6 pt-0 pb-16 gap-3 lg:gap-6 relative">

        {/* Left Sidebar */}
        <div className="hidden lg:block shrink-0"><Sidebar /></div>
        <div className="lg:hidden"><Sidebar /></div>

        {/* Right Main Content Column */}
        <div className="w-full min-w-0 flex-1 flex flex-col gap-8 lg:gap-[40px]">

          {/* Child 1: Main Games Area */}
          <div className="flex flex-col gap-5 lg:gap-[40px] w-full">

            <div className="w-full flex flex-col items-center gap-[12px] lg:gap-[16px]">
              <section className="relative w-full rounded-xl lg:rounded-2xl overflow-hidden border border-white/5" style={{ backgroundImage: `url('/images/hero.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', aspectRatio: '1136/356', minHeight: 160 }}>
                {/* Blurs inside banner */}
                <div className="absolute w-[575px] h-[575px] left-[-161px] top-[-102px] rounded-full bg-[#06102B]/60 filter blur-[75px] pointer-events-none" />
                <div className="absolute w-[194px] h-[194px] left-[198px] top-[224px] rounded-full bg-[#103686]/40 filter blur-[25px] pointer-events-none" />
                <div className="absolute w-[129px] h-[129px] left-[1041px] top-[271px] rounded-full bg-[#010A25]/80 filter blur-[25px] pointer-events-none" />

                <div className="absolute w-[85%] max-w-[457px] left-4 sm:left-6 lg:left-[40px] top-1/2 -translate-y-1/2 flex flex-col gap-2 lg:gap-[20px] justify-between items-start z-10">
                  <div className="flex flex-col gap-[2px] sm:gap-[4px] w-full">
                    <span className="font-jost font-medium text-[12px] sm:text-[18px] lg:text-[28px] leading-tight text-white">
                      Get <span className="text-[#FFC83D] font-extrabold">LUCKY</span> with our exclusive
                    </span>
                    <span className="font-jost font-black text-[20px] sm:text-[30px] lg:text-[48px] leading-[110%] text-white tracking-wide">
                      250% WELCOME<br />BONUS!
                    </span>
                  </div>

                  <button
                    onClick={() => dispatch(openDepositModal())}
                    className="w-[108px] h-[32px] md:w-[120px] md:h-10 bg-[#FFC83D] hover:bg-[#ffd362] rounded-[6px] md:rounded-lg flex items-center justify-center font-sans font-bold text-[12px] md:text-sm text-[#1A1404] tracking-[0.02em] cursor-pointer active:scale-95 transition-all duration-150"
                  >
                    Deposit Now
                  </button>
                </div>
              </section>

              {/* Carousel Dots indicator */}
              <div className="flex gap-[8px] z-10">
                <span className="w-[12px] h-[6px] bg-white rounded-full transition-all" />
                <span className="w-[6px] h-[6px] bg-[#D2DCF7]/50 rounded-full transition-all" />
                <span className="w-[6px] h-[6px] bg-[#D2DCF7]/50 rounded-full transition-all" />
              </div>
            </div>



            <nav className="w-full flex flex-row items-center overflow-x-auto scrollbar-none select-none shrink-0" style={{ gap: '8px' }}>
              {[
                { id: 'lobby', name: 'Lobby', icon: '/games/game-icons/lobby.png', mobileIcon: '/games/side-icon/all.svg', ref: null },
                { id: 'slots', name: 'Slots', icon: '/games/game-icons/slot.svg', mobileIcon: '/games/side-icon/casino.svg', ref: slotsRef },
                { id: 'originals', name: 'Originals', icon: '/games/game-icons/originals.svg', mobileIcon: '/games/side-icon/original.svg', ref: originalsRef },
                { id: 'crash', name: 'Crash Games', icon: '/games/game-icons/crash.svg', mobileIcon: '/games/side-icon/crash.svg', ref: crashRef },
                { id: 'providers', name: 'Providers', icon: '/games/game-icons/game.svg', mobileIcon: '/games/side-icon/game-p.svg', ref: providersRef },
                { id: 'table', name: 'Table Games', icon: '/games/game-icons/table.svg', mobileIcon: '/games/side-icon/roulette.svg', ref: tableRef },
                { id: 'bonus', name: 'Bonus Buys', icon: '/games/game-icons/bonus.svg', mobileIcon: '/games/side-icon/new.svg', ref: bonusRef },
                { id: 'collections', name: 'Collection', icon: '/games/game-icons/collections.svg', mobileIcon: '/games/side-icon/popular.svg', ref: collectionsRef },
              ].map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      if (cat.ref && cat.ref.current) {
                        cat.ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      } else if (cat.id === 'lobby') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '10px',
                      gap: '6.4px',
                      height: '40px',
                      minWidth: '106.6px',
                      flex: '1 0 auto',
                      background: isActive ? '#1463FF' : '#0C1F56',
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                    }}
                    className={`group active:scale-95 ${isActive ? '' : 'hover-nav-tab'}`}
                  >
                    <img
                      src={cat.icon}
                      alt={cat.name}
                      style={{
                        width: '16px',
                        height: '16px',
                        objectFit: 'contain',
                        flexShrink: 0,
                        filter: isActive
                          ? 'brightness(0) saturate(100%) invert(77%) sepia(60%) saturate(600%) hue-rotate(5deg) brightness(105%)'
                          : 'brightness(0) invert(1) opacity(0.75)',
                        transition: 'filter 0.15s',
                      }}
                      className="hidden sm:block"
                    />
                    <img
                      src={cat.mobileIcon}
                      alt={cat.name}
                      style={{
                        width: '16px',
                        height: '16px',
                        objectFit: 'contain',
                        flexShrink: 0,
                        filter: isActive
                          ? 'brightness(0) saturate(100%) invert(77%) sepia(60%) saturate(600%) hue-rotate(5deg) brightness(105%)'
                          : 'brightness(0) invert(1) opacity(0.75)',
                        transition: 'filter 0.15s',
                      }}
                      className="block sm:hidden"
                    />
                    <span
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: isActive ? 700 : 600,
                        fontSize: '14px',
                        lineHeight: '19px',
                        letterSpacing: '0.02em',
                        color: isActive ? '#FFFFFF' : '#D2DCF7',
                        whiteSpace: 'nowrap',
                        transition: 'color 0.15s',
                      }}
                      className={isActive ? '' : 'nav-tab-label'}
                    >
                      {cat.name}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* SLOTS SECTION */}
            <section className="game-section-container">
              <div className="game-section-header">
                <div className="game-section-title-wrapper">
                  <div className="game-section-icon">
                    <img src="/games/game-icons/slot.svg" alt="Slots" className="hidden sm:block" />
                    <img src="/games/side-icon/casino.svg" alt="Slots" className="block sm:hidden" />
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
                      className="w-[152px] h-[200px] flex-none rounded-[12px] relative overflow-hidden bg-[#CDCDCD] transition-all duration-300 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] group cursor-pointer game-card"
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
                          <svg width="24" height="24" viewBox="0 0 24 24" fill={favorites.includes(game.id) ? "#FF4B4B" : "none"} stroke={favorites.includes(game.id) ? "#FF4B4B" : "#FFFFFF"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-200">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                        </button>
                        <div onClick={() => router.push(`/game/${game.id}`)} className="absolute w-[48px] h-[48px] left-[calc(50%-24px)] top-[calc(50%-24px)] rounded-full bg-[#FFC83D] flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 shadow-[0_4px_12px_rgba(255,200,61,0.4)] cursor-pointer">
                          <svg width="12" height="14" viewBox="0 0 12 14" fill="none" className="ml-[2px] mt-[1px]"><path d="M1.5 1.58579C1.5 0.771239 2.42253 0.29749 3.0827 0.778703L10.5113 6.19291C11.0772 6.60527 11.0772 7.39473 10.5113 7.80709L3.0827 13.2213C2.42253 13.7025 1.5 13.2288 1.5 12.4142V1.58579Z" fill="#0C1F56" /></svg>
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
                    <img src="/games/game-icons/originals.svg" alt="Originals" className="hidden sm:block" />
                    <img src="/games/side-icon/original.svg" alt="Originals" className="block sm:hidden" />
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
                      className="w-[152px] h-[200px] flex-none rounded-[12px] relative overflow-hidden bg-[#CDCDCD] transition-all duration-300 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] group cursor-pointer game-card"
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



            {/* PROMOTIONS SECTION */}
            <section className="flex flex-col gap-[20px] w-full">
              <div className="flex flex-row justify-between items-center w-full h-[30px]">
                <div className="flex flex-row items-center gap-[12px] w-[186px] h-[30px]">
                  <div className="flex items-center justify-center w-[30px] h-[30px] relative">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 0L18.09 4.12L23.09 3.09L24.12 8.09L29.12 9.12L27.06 13.71L30 17.78L26.31 21.23L26.78 26.31L21.72 25.84L19.24 30L15 27.25L10.76 30L8.28 25.84L3.22 26.31L3.69 21.23L0 17.78L2.94 13.71L0.88 9.12L5.88 8.09L6.91 3.09L11.91 4.12L15 0Z" fill="#FFC83D" />
                      <path d="M12.5 10.5C11.3954 10.5 10.5 11.3954 10.5 12.5C10.5 13.6046 11.3954 14.5 12.5 14.5C13.6046 14.5 14.5 13.6046 14.5 12.5C14.5 11.3954 13.6046 10.5 12.5 10.5ZM17.5 15.5C16.3954 15.5 15.5 16.3954 15.5 17.5C15.5 18.6046 16.3954 19.5 17.5 19.5C18.6046 19.5 19.5 18.6046 19.5 17.5C19.5 16.3954 18.6046 15.5 17.5 15.5ZM18.5 10.5L11.5 19.5" stroke="#091741" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h2 className="font-jost font-extrabold text-[20px] leading-[29px] tracking-[0.01em] text-white uppercase select-none">
                    PROMOTIONS
                  </h2>
                </div>

                <div className="flex flex-row items-center gap-[12px] w-[68px] h-[30px]">
                  <div className="flex flex-row items-center gap-[8px] w-[68px] h-[30px]">
                    <button
                      onClick={() => scrollCarousel(promotionsRef, 'left', 560)}
                      disabled={!canScrollPromotionsLeft}
                      className="w-[30px] h-[30px] bg-[#112F82] hover:bg-[#1463FF] disabled:opacity-40 disabled:hover:bg-[#112F82] rounded-[4px] flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed text-white"
                    >
                      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 9L1 5L5 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button
                      onClick={() => scrollCarousel(promotionsRef, 'right', 560)}
                      disabled={!canScrollPromotionsRight}
                      className="w-[30px] h-[30px] bg-[#112F82] hover:bg-[#1463FF] disabled:opacity-40 disabled:hover:bg-[#112F82] rounded-[4px] flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed text-white"
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
                  ref={promotionsRef}
                  className="flex flex-row items-center gap-[12px] overflow-x-auto scrollbar-none scroll-smooth w-full h-[220px] select-none promo-slider"
                >
                  {/* Card 1 */}
                  <div className="relative w-[560px] h-[220px] flex-none rounded-[16px] overflow-hidden border border-white/5 shadow-lg select-none group promo-card">
                    <div
                      className="absolute inset-0 bg-cover bg-right md:bg-center transition-transform duration-500 ease-out group-hover:scale-105"
                      style={{ backgroundImage: `linear-gradient(90deg, #091741 21.96%, rgba(9, 23, 65, 0) 60.27%), url('/promotion 1.png')` }}
                    />
                    <div className="absolute w-[160px] h-[160px] left-[-75px] top-[-77.6px] rounded-full bg-[#1463FF] filter blur-[50px] pointer-events-none z-10" />

                    <div className="absolute z-20 flex flex-col items-start justify-between left-[17.78px] md:left-[24px] top-[17.78px] md:top-[calc(50%-57px)] bottom-[17.78px] md:bottom-auto w-[130px] md:w-[290px] h-auto md:h-[114px] gap-[10px] md:gap-[16px]">
                      <h3 className="font-jost font-extrabold text-[13px] md:text-[24px] leading-[120%] tracking-[0.01em] text-white uppercase">
                        150% RELOAD BONUS + 50 FREE SPINS
                      </h3>
                      <button
                        onClick={() => alert('Promotion 1 claimed')}
                        className="w-[90px] h-[30px] md:w-[110px] md:h-[40px] bg-[#FFC83D] hover:bg-[#ffd362] rounded-[6px] md:rounded-[8px] flex items-center justify-center font-sans font-bold text-[11px] md:text-[14px] leading-none md:leading-[19px] text-[#1A1404] tracking-[0.02em] cursor-pointer active:scale-95 transition-all duration-150 shrink-0"
                      >
                        Claim Now
                      </button>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="relative w-[560px] h-[220px] flex-none rounded-[16px] overflow-hidden border border-white/5 shadow-lg select-none group promo-card">
                    <div
                      className="absolute inset-0 bg-cover bg-right md:bg-center transition-transform duration-500 ease-out group-hover:scale-105"
                      style={{ backgroundImage: `linear-gradient(90deg, #060B4D 39.55%, rgba(6, 11, 77, 0) 50%), url('/promotion 2.png')` }}
                    />
                    <div className="absolute w-[160px] h-[160px] left-[-75px] top-[-77.6px] rounded-full bg-[#1463FF] filter blur-[50px] pointer-events-none z-10" />

                    <div className="absolute z-20 flex flex-col items-start justify-between left-[17.78px] md:left-[24px] top-[17.78px] md:top-[calc(50%-57px)] bottom-[17.78px] md:bottom-auto w-[130px] md:w-[290px] h-auto md:h-[114px] gap-[10px] md:gap-[16px]">
                      <h3 className="font-jost font-extrabold text-[13px] md:text-[24px] leading-[120%] tracking-[0.01em] text-white uppercase">
                        150% RELOAD BONUS + 50 FREE SPINS
                      </h3>
                      <button
                        onClick={() => alert('Promotion 2 claimed')}
                        className="w-[90px] h-[30px] md:w-[110px] md:h-[40px] bg-[#FFC83D] hover:bg-[#ffd362] rounded-[6px] md:rounded-[8px] flex items-center justify-center font-sans font-bold text-[11px] md:text-[14px] leading-none md:leading-[19px] text-[#1A1404] tracking-[0.02em] cursor-pointer active:scale-95 transition-all duration-150 shrink-0"
                      >
                        Claim Now
                      </button>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="relative w-[560px] h-[220px] flex-none rounded-[16px] overflow-hidden border border-white/5 shadow-lg select-none group promo-card">
                    <div
                      className="absolute inset-0 bg-cover bg-right md:bg-center transition-transform duration-500 ease-out group-hover:scale-105"
                      style={{ backgroundImage: `linear-gradient(90deg, #091741 21.96%, rgba(9, 23, 65, 0) 60.27%), url('/promotion 1.png')` }}
                    />
                    <div className="absolute w-[160px] h-[160px] left-[-75px] top-[-77.6px] rounded-full bg-[#1463FF] filter blur-[50px] pointer-events-none z-10" />

                    <div className="absolute z-20 flex flex-col items-start justify-between left-[17.78px] md:left-[24px] top-[17.78px] md:top-[calc(50%-57px)] bottom-[17.78px] md:bottom-auto w-[130px] md:w-[290px] h-auto md:h-[114px] gap-[10px] md:gap-[16px]">
                      <h3 className="font-jost font-extrabold text-[13px] md:text-[24px] leading-[120%] tracking-[0.01em] text-white uppercase">
                        150% RELOAD BONUS + 50 FREE SPINS
                      </h3>
                      <button
                        onClick={() => alert('Promotion 3 claimed')}
                        className="w-[90px] h-[30px] md:w-[110px] md:h-[40px] bg-[#FFC83D] hover:bg-[#ffd362] rounded-[6px] md:rounded-[8px] flex items-center justify-center font-sans font-bold text-[11px] md:text-[14px] leading-none md:leading-[19px] text-[#1A1404] tracking-[0.02em] cursor-pointer active:scale-95 transition-all duration-150 shrink-0"
                      >
                        Claim Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>



            {/* CRASH GAMES SECTION */}
            <section className="game-section-container">
              <div className="game-section-header">
                <div className="game-section-title-wrapper">
                  <div className="game-section-icon">
                    <img src="/games/game-icons/crash.svg" alt="Crash Games" className="hidden sm:block" />
                    <img src="/games/side-icon/crash.svg" alt="Crash Games" className="block sm:hidden" />
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
                  className="flex flex-row items-center gap-[12px] overflow-x-auto scrollbar-none scroll-smooth w-full h-[200px] select-none"
                >
                  {filteredCrash.map((game) => (
                    <div
                      key={game.id}
                      onClick={() => router.push(`/game/${game.id}`)}
                      className="w-[152px] h-[200px] flex-none rounded-[12px] relative overflow-hidden bg-[#CDCDCD] transition-all duration-300 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] group cursor-pointer game-card"
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
                    <img src="/games/game-icons/game.svg" alt="Game Providers" className="hidden sm:block" />
                    <img src="/games/side-icon/game-p.svg" alt="Game Providers" className="block sm:hidden" />
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
                  className="flex flex-row items-center gap-[12px] overflow-x-auto scrollbar-none scroll-smooth w-full h-[76px] md:h-[110px] select-none mobile-providers-grid"
                >
                  {providerList.map((provider) => (
                    <div
                      key={provider.id}
                      className="w-[88px] h-[60px] md:w-[152px] md:h-[100px] flex-none rounded-[8px] md:rounded-[12px] bg-[#0C1F56] hover:bg-[#173EAD] flex flex-col justify-center items-center py-[7.2px] px-[14.4px] md:p-[12px] gap-[4.8px] md:gap-[8px] border border-white/5 shadow-md transition-all duration-300 group cursor-pointer"
                    >
                      <div className="w-full h-[24px] md:w-[80px] md:h-[40px] flex items-center justify-center">
                        <img
                          src={provider.logo}
                          alt={provider.name}
                          className="max-w-full max-h-full object-contain filter brightness-100 transition-all duration-300"
                        />
                      </div>
                      <div className="flex flex-row justify-center items-center w-full h-[10px] md:h-[14px]">
                        <span className="font-sans font-semibold text-[8px] md:text-[10px] leading-[10px] md:leading-[14px] text-center text-[#FFC83D] whitespace-nowrap">
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
                    <img src="/games/game-icons/table.svg" alt="Table Games" className="hidden sm:block" />
                    <img src="/games/side-icon/roulette.svg" alt="Table Games" className="block sm:hidden" />
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
                  className="flex flex-row items-center gap-[12px] overflow-x-auto scrollbar-none scroll-smooth w-full h-[200px] select-none"
                >
                  {filteredTable.map((game) => (
                    <div
                      key={game.id}
                      onClick={() => router.push(`/game/${game.id}`)}
                      className="w-[152px] h-[200px] flex-none rounded-[12px] relative overflow-hidden bg-[#CDCDCD] transition-all duration-300 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] group cursor-pointer game-card"
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
                    <img src="/games/game-icons/bonus.svg" alt="Bonus Buys" className="hidden sm:block" />
                    <img src="/games/side-icon/new.svg" alt="Bonus Buys" className="block sm:hidden" />
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
                  className="flex flex-row items-center gap-[12px] overflow-x-auto scrollbar-none scroll-smooth w-full h-[200px] select-none"
                >
                  {filteredBonus.map((game) => (
                    <div
                      key={game.id}
                      onClick={() => router.push(`/game/${game.id}`)}
                      className="w-[152px] h-[200px] flex-none rounded-[12px] relative overflow-hidden bg-[#CDCDCD] transition-all duration-300 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] group cursor-pointer game-card"
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
                    <img src="/games/game-icons/collections.svg" alt="Collections" className="hidden sm:block" />
                    <img src="/games/side-icon/popular.svg" alt="Collections" className="block sm:hidden" />
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
                  className="flex flex-row items-center gap-[7.2px] md:gap-[12px] overflow-x-auto scrollbar-none scroll-smooth w-full py-[4px] h-[68px] md:h-[108px] select-none"
                >
                  {filteredCollections.map((col) => (
                    <div
                      key={col.id}
                      className="w-[183px] md:w-[316px] h-[60px] md:h-[100px] flex-none rounded-[8px] md:rounded-[12px] bg-[#0C1F56] hover:bg-[#1463FF] flex flex-row items-center pt-[7.2px] pr-[14.4px] pb-[7.2px] pl-[7.2px] md:p-[12px] md:pr-[24px] md:pl-[12px] gap-[7.2px] md:gap-[12px] border border-white/5 shadow-md transition-all duration-300 group cursor-pointer"
                    >
                      <div className="w-[45.6px] md:w-[76px] h-[45.6px] md:h-[76px] flex-none bg-[#0E1B3D] rounded-[5px] md:rounded-[8px] relative overflow-hidden">
                        <div className="absolute w-[42px] md:w-[70px] h-[42px] md:h-[70px] left-[calc(50%-21px)] md:left-[calc(50%-35px)] top-[calc(50%-21px)] md:top-[calc(50%-35px)] bg-[#1463FF]/60 rounded-full filter blur-[9px] md:blur-[15px] group-hover:scale-125 transition-transform duration-300 pointer-events-none" />
                        <img
                          src={col.image}
                          alt={col.name}
                          className="absolute w-[42.6px] md:w-[71px] h-[40.2px] md:h-[67px] left-[calc(50%-21.3px)] md:left-[calc(50%-35.5px)] top-[calc(50%-20.1px)] md:top-[calc(50%-33.5px)] object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <span className="font-jost font-extrabold text-[14px] md:text-[22px] leading-tight md:leading-[32px] tracking-[0.01em] text-white uppercase text-center flex-grow select-none">
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

          {/* Reusable responsive Footer component */}
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
        <button onClick={() => { }} className="flex flex-col items-center gap-1 text-[#D2DCF7] hover:text-white cursor-pointer bg-transparent border-0 flex-1">
          <img src="/games/side-icon/vip.svg" alt="VIP" className="w-5 h-5 object-contain" />
          <span className="text-[10px] font-semibold font-sans">VIP</span>
        </button>
        <button onClick={() => { }} className="flex flex-col items-center gap-1 text-[#D2DCF7] hover:text-white cursor-pointer bg-transparent border-0 flex-1">
          <img src="/games/side-icon/tour.svg" alt="Tourneys" className="w-5 h-5 object-contain" />
          <span className="text-[10px] font-semibold font-sans">Tourneys</span>
        </button>
      </nav>
    </div>
  );
}
