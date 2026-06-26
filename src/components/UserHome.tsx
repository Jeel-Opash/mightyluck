'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { openDepositModal, closeDepositModal, toggleSidebar, openAllGamesModal, closeAllGamesModal, setSidebarOpen } from '@/redux/features/uiSlice';
import { 
  GameCard, 
  ProviderCard, 
  WinnerRecord,
  slotGames, 
  originalGames, 
  crashGames, 
  providerList, 
  tableGames, 
  bonusGames, 
  collectionList, 
  recentWinners 
} from '@/data/mockGames';

export default function UserHome() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchQuery = useAppSelector((state) => state.ui.searchQuery);
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);
  const allGamesOpen = useAppSelector((state) => state.ui.allGamesOpen);
  const depositModalOpen = useAppSelector((state) => state.ui.depositModalOpen);

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
  const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right', scrollByContainer?: boolean) => {
    if (ref.current) {
      let scrollAmount: number;
      if (scrollByContainer) {
        // For promotion cards (w-full snap): scroll exactly one card width = container clientWidth + gap
        const gap = 12;
        scrollAmount = ref.current.clientWidth + gap;
      } else {
        const cardWidth = 152;
        const gap = 12;
        scrollAmount = (cardWidth + gap) * 2; // Scroll 2 cards at a time
      }
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



  const filteredSlots = slotGames.filter((g) => g.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredOriginals = originalGames.filter((g) => g.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredCrash = crashGames.filter((g) => g.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredTable = tableGames.filter((g) => g.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredBonus = bonusGames.filter((g) => g.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredCollections = collectionList.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredWinners = recentWinners.filter((w) => w.gameTitle.toLowerCase().includes(searchQuery.toLowerCase()));

  const renderGameGrid = (games: GameCard[], title: string, icon: string) => {
    return (
      <section className="game-section-container w-full">
        <div className="game-section-header">
          <div className="game-section-title-wrapper">
            <div className="game-section-icon">
              <img src={icon} alt={title} className="object-contain" />
            </div>
            <h2 className="game-section-title">{title.toUpperCase()} ({games.length})</h2>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(148px,1fr))] gap-[12.8px] md:gap-[16px] w-full mt-4">
          {games.map((game) => (
            <div
              key={game.id}
              onClick={() => router.push(`/game/${game.id}`)}
              className="game-card !w-full !h-auto aspect-[148/200] group cursor-pointer relative"
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 ease-out group-hover:scale-110"
                style={{ backgroundImage: `url(${game.image})` }}
              />
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <button
                  onClick={(e) => toggleFavorite(e, game.id)}
                  className="absolute right-3 top-3 w-[24px] h-[24px] text-white hover:text-red-500 focus:outline-none transition-colors duration-200 z-20 cursor-pointer flex items-center justify-center"
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
      </section>
    );
  };

  const renderCategoryContent = () => {
    switch (activeCategory) {
      case 'slots':
        return renderGameGrid(filteredSlots, 'Slots', '/games/game-icons/slot.svg');
      case 'originals':
        return renderGameGrid(filteredOriginals, 'Originals', '/games/game-icons/originals.svg');
      case 'crash':
        return renderGameGrid(filteredCrash, 'Crash Games', '/games/game-icons/crash.svg');
      case 'table':
        return renderGameGrid(filteredTable, 'Table Games', '/games/game-icons/table.svg');
      case 'bonus':
        return renderGameGrid(filteredBonus, 'Bonus Buys', '/games/game-icons/bonus.svg');
      case 'collections':
        return (
          <section className="game-section-container w-full">
            <div className="game-section-header">
              <div className="game-section-title-wrapper">
                <div className="game-section-icon">
                  <img src="/games/game-icons/collections.svg" alt="Collections" className="object-contain" />
                </div>
                <h2 className="game-section-title">COLLECTION ({filteredCollections.length})</h2>
              </div>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(316px,1fr))] gap-[12.8px] md:gap-[16px] w-full mt-4">
              {filteredCollections.map((col) => (
                <div
                  key={col.id}
                  className="!w-full h-[60px] md:h-[100px] rounded-[8px] md:rounded-[12px] bg-[#0C1F56] hover:bg-[#1463FF] flex flex-row items-center pt-[7.2px] pr-[14.4px] pb-[7.2px] pl-[7.2px] md:p-[12px] md:pr-[24px] md:pl-[12px] gap-[7.2px] md:gap-[12px] border border-white/5 shadow-md transition-all duration-300 group cursor-pointer"
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
          </section>
        );
      case 'providers':
        return (
          <section className="game-section-container w-full">
            <div className="game-section-header">
              <div className="game-section-title-wrapper">
                <div className="game-section-icon">
                  <img src="/games/game-icons/game.svg" alt="Providers" className="object-contain" />
                </div>
                <h2 className="game-section-title">PROVIDERS ({providerList.length})</h2>
              </div>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(142.4px,1fr))] gap-[12.8px] md:gap-[16px] w-full mt-4">
              {providerList.map((provider) => (
                <div
                  key={provider.id}
                  className="!w-full h-[78.36px] bg-[#0C1F56] border border-white/5 rounded-[8.9px] flex flex-col justify-center items-center gap-[4.45px] hover:bg-[#112F82] transition-colors cursor-pointer"
                >
                  <img src={provider.logo} className="w-[106.8px] h-[35.6px] object-contain" alt={provider.name} />
                  <span className="font-manrope font-semibold text-[8.9px] leading-[12.46px] tracking-[0.02em] text-[#A5B8EF]">{provider.gamesCount} Games</span>
                </div>
              ))}
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full relative flex flex-col select-none">

      {/* Mobile Sidebar - fixed layout, rendered outside the flex layout to prevent gap offset on mobile */}
      <div className="xl:hidden">
        <Sidebar />
      </div>

      {/* 2. Page Content Layout (Sidebar + Content Panel) */}
      <div className="flex flex-row items-start w-full gap-6 relative">

        {/* Left Sidebar */}
        <div className="hidden xl:block shrink-0"><Sidebar /></div>

        {/* Right Main Content Column */}
        <div className="w-full min-w-0 flex-1 flex flex-col gap-8 xl:gap-[40px]">

          {/* Child 1: Main Games Area */}
          <div className="flex flex-col gap-5 lg:gap-[40px] w-full">

            <div className="w-full flex flex-col items-center gap-[12px] lg:gap-[16px]">
              <section className="relative w-full h-[170px] min-[375px]:h-[200px] min-[480px]:h-[240px] md:h-[300px] lg:h-[353px] rounded-[16px] overflow-hidden border border-white/5 mt-[4px] isolate">
                <img
                  src="/images/hero.jpg"
                  alt="Welcome Banner"
                  className="absolute inset-0 w-full h-full object-cover scale-[1.02] pointer-events-none z-0"
                />
                {/* Blurs inside banner */}
                <div className="absolute w-[575px] h-[575px] left-[-161px] top-[-102px] rounded-full bg-[#06102B]/60 filter blur-[75px] pointer-events-none" />
                <div className="absolute w-[194px] h-[194px] left-[198px] top-[224px] rounded-full bg-[#103686]/40 filter blur-[25px] pointer-events-none" />
                <div className="absolute w-[129px] h-[129px] left-[1041px] top-[271px] rounded-full bg-[#010A25]/80 filter blur-[25px] pointer-events-none" />

                <div className="absolute w-[85%] max-w-[457px] left-4 sm:left-6 lg:left-[40px] top-1/2 -translate-y-1/2 flex flex-col gap-2 min-[375px]:gap-3 lg:gap-[20px] justify-between items-start z-10">
                  <div className="flex flex-col gap-[2px] sm:gap-[4px] w-full">
                    <span className="font-jost font-medium text-[11px] min-[375px]:text-[13px] min-[480px]:text-[16px] md:text-[22px] lg:text-[28px] leading-tight text-white select-none">
                      Get <span className="text-[#FFC83D] font-extrabold">LUCKY</span> with our exclusive
                    </span>
                    <span className="font-jost font-black text-[18px] min-[375px]:text-[22px] min-[480px]:text-[28px] md:text-[38px] lg:text-[48px] leading-[110%] text-white tracking-wide select-none">
                      250% WELCOME<br />BONUS!
                    </span>
                  </div>

                  <button
                    onClick={() => dispatch(openDepositModal())}
                    className="w-[96px] h-[32px] min-[375px]:w-[108px] min-[375px]:h-[36px] md:w-[130px] md:h-[42px] lg:w-[146px] lg:h-[48px] bg-[#FFC83D] hover:bg-[#ffd362] rounded-[6px] md:rounded-lg flex items-center justify-center font-sans font-bold text-[11px] min-[375px]:text-[12px] md:text-[14px] lg:text-[16px] text-[#1A1404] tracking-[0.02em] cursor-pointer active:scale-95 transition-all duration-150 border-none shadow-[0_4px_12px_rgba(255,200,61,0.2)]"
                  >
                    Join Now
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
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '8px 12.8px',
                      gap: '6.4px',
                      width: '106.6px',
                      height: '40px',
                      background: isActive ? '#1463FF' : '#0C1F56',
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                      flex: 'none',
                      order: 1,
                      flexGrow: 1,
                    }}
                    className={`group active:scale-95 shrink-0 ${isActive ? '' : 'hover-nav-tab'}`}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '0px',
                        width: '16px',
                        height: '16px',
                        flex: 'none',
                        order: 0,
                        flexGrow: 0,
                      }}
                    >
                      <img
                        src={cat.icon}
                        alt={cat.name}
                        style={{
                          width: '15.94px',
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
                          width: '15.94px',
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
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-manrope), sans-serif",
                        fontWeight: isActive ? 700 : 600,
                        fontSize: '12px',
                        lineHeight: '16px',
                        letterSpacing: '0.02em',
                        color: isActive ? '#FFFFFF' : '#D2DCF7',
                        whiteSpace: 'nowrap',
                        transition: 'color 0.15s',
                        height: '16px',
                        flex: 'none',
                        order: 1,
                        flexGrow: 0,
                      }}
                      className={isActive ? '' : 'nav-tab-label'}
                    >
                      {cat.name}
                    </span>
                  </button>
                );
              })}
            </nav>

            {activeCategory === 'lobby' ? (
              <>
                {/* SLOTS SECTION */}
                <section className="game-section-container">
                  <div className="game-section-header">
                    <div className="game-section-title-wrapper">
                      <div className="game-section-icon">
                        <img src="/games/game-icons/slot.svg" alt="Slots" className="object-contain" />
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
                      {[...filteredSlots, ...filteredSlots, ...filteredSlots].map((game, index) => (
                        <div
                          key={`${game.id}-${index}`}
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
                              className="absolute right-3 top-3 w-[24px] h-[24px] text-white hover:text-red-500 focus:outline-none transition-colors duration-200 z-20 cursor-pointer flex items-center justify-center"
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
                        <img src="/games/game-icons/originals.svg" alt="Originals" className="object-contain" />
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
                      {[...filteredOriginals, ...filteredOriginals, ...filteredOriginals].map((game, index) => (
                        <div
                          key={`${game.id}-${index}`}
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
                              className="absolute right-3 top-3 w-[24px] h-[24px] text-white hover:text-red-500 focus:outline-none transition-colors duration-200 z-20 cursor-pointer flex items-center justify-center"
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
                  <div className="game-section-header">
                    <div className="game-section-title-wrapper">
                      <div className="game-section-icon">
                        <img src="/games/game-icons/promotion.png" alt="Promotions" className="object-contain" />
                      </div>
                      <h2 className="game-section-title">PROMOTIONS</h2>
                    </div>

                    <div className="flex flex-row items-center gap-[12px] w-[68px] h-[30px]">
                      <div className="flex flex-row items-center gap-[8px] w-[68px] h-[30px]">
                        <button
                          onClick={() => scrollCarousel(promotionsRef, 'left', true)}
                          disabled={!canScrollPromotionsLeft}
                          className="w-[30px] h-[30px] bg-[#112F82] hover:bg-[#1463FF] disabled:opacity-40 disabled:hover:bg-[#112F82] rounded-[4px] flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed text-white"
                        >
                          <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 9L1 5L5 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                        <button
                          onClick={() => scrollCarousel(promotionsRef, 'right', true)}
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
                      className="flex flex-row gap-[12px] overflow-x-auto scrollbar-none scroll-smooth w-full select-none"
                      style={{ scrollSnapType: 'x mandatory' }}
                    >
                      {[
                        { img: '/promotion 1.png', label: '150% Reload Bonus', id: 1 },
                        { img: '/promotion 2.png', label: '250% Welcome Bonus', id: 2 },
                        { img: '/promotion 1.png', label: '150% Reload Bonus', id: 3 },
                      ].map((promo) => (
                        <div
                          key={promo.id}
                          onClick={() => alert(`Promotion ${promo.id} claimed`)}
                          className="relative flex-none w-full sm:w-[560px] aspect-[560/220] sm:aspect-auto h-auto sm:h-[220px] rounded-[16px] overflow-hidden border border-white/5 shadow-lg group cursor-pointer"
                          style={{ scrollSnapAlign: 'start' }}
                        >
                          <img
                            src={promo.img}
                            alt={promo.label}
                            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 pointer-events-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </section>



                {/* CRASH GAMES SECTION */}
                <section className="game-section-container">
                  <div className="game-section-header">
                    <div className="game-section-title-wrapper">
                      <div className="game-section-icon">
                        <img src="/games/game-icons/crash.svg" alt="Crash Games" className="object-contain" />
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
                      {[...filteredCrash, ...filteredCrash, ...filteredCrash].map((game, index) => (
                        <div
                          key={`${game.id}-${index}`}
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
                              className="absolute right-3 top-3 w-[24px] h-[24px] text-white hover:text-red-500 focus:outline-none transition-colors duration-200 z-20 cursor-pointer flex items-center justify-center"
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
                        <img src="/games/game-icons/game.svg" alt="Game Providers" className="object-contain" />
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
                      {[...providerList, ...providerList, ...providerList].map((provider, index) => (
                        <div
                          key={`${provider.id}-${index}`}
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
                        <img src="/games/game-icons/table.svg" alt="Table Games" className="object-contain" />
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
                      {[...filteredTable, ...filteredTable, ...filteredTable].map((game, index) => (
                        <div
                          key={`${game.id}-${index}`}
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
                              className="absolute right-3 top-3 w-[24px] h-[24px] text-white hover:text-red-500 focus:outline-none transition-colors duration-200 z-20 cursor-pointer flex items-center justify-center"
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
                        <img src="/games/game-icons/bonus.svg" alt="Bonus Buys" className="object-contain" />
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
                      {[...filteredBonus, ...filteredBonus, ...filteredBonus].map((game, index) => (
                        <div
                          key={`${game.id}-${index}`}
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
                              className="absolute right-3 top-3 w-[24px] h-[24px] text-white hover:text-red-500 focus:outline-none transition-colors duration-200 z-20 cursor-pointer flex items-center justify-center"
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
                        <img src="/games/game-icons/collections.svg" alt="Collections" className="object-contain" />
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
                      {[...filteredCollections, ...filteredCollections, ...filteredCollections].map((col, index) => (
                        <div
                          key={`${col.id}-${index}`}
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
              </>
            ) : (
              renderCategoryContent()
            )}

            {/* RECENT WINNERS SECTION */}
            <section className="winners-section-container">
              <div className="winners-header-wrapper">
                <div className="winners-header-title-wrapper">
                  <div className="winners-header-icon">
                    <img src="/games/game-icons/recent.svg" alt="Recent Winners" className="object-contain" />
                  </div>
                  <h2 className="winners-header-title">
                    RECENT WINNERS
                  </h2>
                </div>
              </div>

              {/* Mobile-only progress line divider */}
              <div className="md:hidden w-full h-[8px] rounded-full bg-white/10 overflow-hidden mt-[12px] mb-[16px]">
                <div className="h-full w-[70%] bg-[#1463FF] rounded-full" />
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
        <button
          onClick={() => {
            dispatch(toggleSidebar());
            dispatch(closeAllGamesModal());
            dispatch(closeDepositModal());
          }}
          className={`flex flex-col items-center gap-1 cursor-pointer bg-transparent border-0 flex-1 transition-colors ${sidebarOpen ? 'text-[#FFC83D]' : 'text-[#D2DCF7] hover:text-white'}`}
        >
          <img
            src="/mobile/sidebar/menu.png"
            alt="Menu"
            className="w-5 h-5 object-contain transition-all"
            style={{
              filter: sidebarOpen
                ? 'brightness(0) saturate(100%) invert(77%) sepia(60%) saturate(600%) hue-rotate(5deg) brightness(105%)'
                : 'none'
            }}
          />
          <span className="text-[10px] font-semibold font-sans">Menu</span>
        </button>
        <button
          onClick={() => {
            if (allGamesOpen) {
              dispatch(closeAllGamesModal());
            } else {
              dispatch(openAllGamesModal());
              dispatch(setSidebarOpen(false));
            }
          }}
          className={`flex flex-col items-center gap-1 cursor-pointer bg-transparent border-0 flex-1 transition-colors ${allGamesOpen ? 'text-[#FFC83D]' : 'text-[#D2DCF7] hover:text-white'}`}
        >
          <img
            src="/mobile/sidebar/search.png"
            alt="Search"
            className="w-5 h-5 object-contain transition-all"
            style={{
              filter: allGamesOpen
                ? 'brightness(0) saturate(100%) invert(77%) sepia(60%) saturate(600%) hue-rotate(5deg) brightness(105%)'
                : 'none'
            }}
          />
          <span className="text-[10px] font-semibold font-sans">Search</span>
        </button>
        <button
          onClick={() => {
            if (depositModalOpen) {
              dispatch(closeDepositModal());
            } else {
              dispatch(openDepositModal());
              dispatch(setSidebarOpen(false));
            }
          }}
          className={`flex flex-col items-center gap-1 cursor-pointer bg-transparent border-0 flex-1 transition-colors ${depositModalOpen ? 'text-[#FFC83D]' : 'text-[#D2DCF7] hover:text-white'}`}
        >
          <img
            src="/games/side-icon/pro.svg"
            alt="Offers"
            className="w-5 h-5 object-contain transition-all"
            style={{
              filter: depositModalOpen
                ? 'brightness(0) saturate(100%) invert(77%) sepia(60%) saturate(600%) hue-rotate(5deg) brightness(105%)'
                : 'none'
            }}
          />
          <span className="text-[10px] font-semibold font-sans">Offers</span>
        </button>
        <button
          onClick={() => { }}
          className="flex flex-col items-center gap-1 text-[#D2DCF7] hover:text-white cursor-pointer bg-transparent border-0 flex-1"
        >
          <img src="/games/side-icon/vip.svg" alt="VIP" className="w-5 h-5 object-contain" />
          <span className="text-[10px] font-semibold font-sans">VIP</span>
        </button>
        <button
          onClick={() => { }}
          className="flex flex-col items-center gap-1 text-[#D2DCF7] hover:text-white cursor-pointer bg-transparent border-0 flex-1"
        >
          <img src="/games/side-icon/tour.svg" alt="Tourneys" className="w-5 h-5 object-contain" />
          <span className="text-[10px] font-semibold font-sans">Tourneys</span>
        </button>
      </nav>
    </div>
  );
}
