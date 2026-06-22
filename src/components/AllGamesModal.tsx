'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface AllGamesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/* ── all game data ─────────────────────────────────────────── */
const ALL_GAMES = [
  { id: 's1', title: 'PATRICK VS NEFERTITI',          provider: 'Belatra',       category: 'Slots',    image: '/games/slots/slot-1.png' },
  { id: 's2', title: "SWEET BONANZA SUPER SCATTER",   provider: 'Pragmatic Play',category: 'Slots',    image: '/games/slots/slot-2.png' },
  { id: 's3', title: 'AMERICAN ROULETTE',             provider: 'Endorphina',    category: 'Roulette', image: '/games/slots/slot-3.png' },
  { id: 's4', title: "CASH-O-MATIC! EXTREME CASH OUT",provider: 'Nolimit City',  category: 'Slots',    image: '/games/slots/slot-4.png' },
  { id: 's5', title: 'RIDE\'EM POKER',                provider: 'Hacksaw',       category: 'Table Games', image: '/games/slots/slot-5.png' },
  { id: 's6', title: 'POPPING MANIA',            provider: 'BGaming',       category: 'Slots',    image: '/games/slots/slot-6.png' },
  { id: 's7', title: 'DOUBLE WIN COLLECTION',    provider: 'Booming',       category: 'Slots',    image: '/games/slots/slot-7.png' },
  { id: 'o1', title: 'MIGHTY MINES',             provider: 'Mighty Luck',   category: 'Original', image: '/games/original/original-1.png' },
  { id: 'o2', title: 'WINTER PLINKO',            provider: 'Mighty Luck',   category: 'Original', image: '/games/original/original-2.png' },
  { id: 'o3', title: 'LUCKY CRASH',              provider: 'Mighty Luck',   category: 'Original', image: '/games/original/original-3.png' },
  { id: 'o4', title: 'DICE DELUXE',              provider: 'Mighty Luck',   category: 'Original', image: '/games/original/original-4.png' },
  { id: 'o5', title: 'WHEEL OF LUCK',            provider: 'Mighty Luck',   category: 'Original', image: '/games/original/original-5.png' },
  { id: 'c1', title: 'CRASH',                    provider: 'Belatra',       category: 'Crash Games', image: '/games/crash/crash-1.png' },
  { id: 'c2', title: 'CRASH TOUCHDOWN',          provider: 'BGaming',       category: 'Crash Games', image: '/games/crash/crash-2.png' },
  { id: 'c3', title: 'CRUSADER',                 provider: 'Endorphina',    category: 'Crash Games', image: '/games/crash/crash-3.png' },
  { id: 'c4', title: 'CRASH BONUS',              provider: 'Hacksaw',       category: 'Crash Games', image: '/games/crash/crash-4.png' },
  { id: 't1', title: 'BACCARAT ELITE',           provider: 'Belatra',       category: 'Baccarat',    image: '/games/table/table-1.png' },
  { id: 't2', title: 'CLASSIC ROULETTE',         provider: 'Pragmatic Play',category: 'Roulette',    image: '/games/table/table-2.png' },
  { id: 't3', title: 'LA PARTAGE ROULETTE',      provider: 'Belatra',       category: 'Roulette',    image: '/games/table/table-3.png' },
  { id: 't4', title: 'DRAGON TIGER LUCK',        provider: 'BGaming',       category: 'Table Games', image: '/games/table/table-4.png' },
];

type SideCategory =
  | 'All Games' | 'Recently Played' | 'Favorites' | 'New Releases'
  | 'Original'  | 'Slots'           | 'Roulette'  | 'Crash Games'
  | 'Table Games' | 'Live Casino'   | 'Baccarat'  | 'Blackjack';

const topItems: SideCategory[] = [
  'All Games', 'Recently Played', 'Favorites', 'New Releases'
];

const bottomItems: SideCategory[] = [
  'Original', 'Slots', 'Roulette', 'Crash Games',
  'Table Games', 'Live Casino', 'Baccarat', 'Blackjack'
];

/* ── inline category icon renderer ────────────────────────── */
const renderCategoryIcon = (label: SideCategory, active: boolean) => {
  const color = active ? '#FFFFFF' : '#A5B8EF';
  switch (label) {
    case 'All Games':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      );
    case 'Recently Played':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case 'Favorites':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      );
    case 'New Releases':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    case 'Original':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case 'Slots':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="2" y1="9" x2="22" y2="9" />
          <circle cx="7" cy="13" r="1.5" />
          <circle cx="12" cy="13" r="1.5" />
          <circle cx="17" cy="13" r="1.5" />
          <path d="M22 6h2v6h-2" />
        </svg>
      );
    case 'Roulette':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="3" x2="12" y2="21" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="5.6" y1="5.6" x2="18.4" y2="18.4" />
          <line x1="18.4" y1="5.6" x2="5.6" y2="18.4" />
        </svg>
      );
    case 'Crash Games':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5L9 12L13 16L19.5 8" />
          <polyline points="15 8 19.5 8 19.5 12.5" />
        </svg>
      );
    case 'Table Games':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="9" cy="9" r="1.5" />
          <circle cx="15" cy="15" r="1.5" />
          <circle cx="9" cy="15" r="1.5" />
          <circle cx="15" cy="9" r="1.5" />
        </svg>
      );
    case 'Live Casino':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 0 0-10 10c0 5.523 4.477 10 10 10s10-4.477 10-10A10 10 0 0 0 12 2z" />
          <path d="M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case 'Baccarat':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2s-8 6-8 12c0 4.418 3.582 8 8 8s8-3.582 8-8c0-6-8-12-8-12z" />
        </svg>
      );
    case 'Blackjack':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="6" width="12" height="16" rx="2" transform="rotate(-10 3 6)" />
          <rect x="8" y="3" width="12" height="16" rx="2" transform="rotate(10 8 3)" />
        </svg>
      );
    default:
      return null;
  }
};

/* ── single game card component ────────────────────────────── */
function GameCard({ game, onClick }: { game: typeof ALL_GAMES[0]; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        width: '152px',
        height: '200px',
        borderRadius: '12px',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        background: '#CDCDCD',
        boxSizing: 'border-box',
        flexShrink: 0,
      }}
      className="transition-transform duration-200 hover:scale-[1.03] select-none"
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${game.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '12px',
        }}
      />
      {/* Play Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'opacity 0.2s',
          opacity: hovered ? 1 : 0,
          pointerEvents: hovered ? 'auto' : 'none',
          zIndex: 20,
        }}
      >
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: '#FFC83D',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(255,200,61,0.5)',
          }}
          className="transform transition-transform duration-200 hover:scale-110"
        >
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
            <path d="M1.5 1.586C1.5 0.771 2.423.298 3.083.779l7.428 5.414c.566.412.566 1.202 0 1.614L3.083 13.221C2.423 13.703 1.5 13.229 1.5 12.414V1.586Z" fill="#0C1F56" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ── main modal component ───────────────────────────────────── */
export default function AllGamesModal({ isOpen, onClose }: AllGamesModalProps) {
  const [activeCategory, setActiveCategory] = useState<SideCategory>('All Games');
  const [search, setSearch] = useState('');
  const router = useRouter();
  const providersScrollRef = useRef<HTMLDivElement>(null);

  /* Escape key to close */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  /* Filter games by category & search term */
  const getCategoryFilter = (cat: SideCategory): string[] => {
    switch (cat) {
      case 'All Games':
      case 'Recently Played':
      case 'Favorites':
      case 'New Releases':
        return ['Slots', 'Original', 'Crash Games', 'Table Games', 'Roulette', 'Baccarat', 'Blackjack'];
      case 'Original':
        return ['Original'];
      case 'Slots':
        return ['Slots'];
      case 'Roulette':
        return ['Roulette'];
      case 'Crash Games':
        return ['Crash Games'];
      case 'Table Games':
        return ['Table Games'];
      case 'Live Casino':
        return ['Slots', 'Original', 'Crash Games', 'Table Games', 'Roulette', 'Baccarat', 'Blackjack'];
      case 'Baccarat':
        return ['Baccarat'];
      case 'Blackjack':
        return ['Blackjack'];
      default:
        return [];
    }
  };

  const currentCats = getCategoryFilter(activeCategory);
  const visibleGames = ALL_GAMES.filter((g) =>
    currentCats.includes(g.category) &&
    (g.title.toLowerCase().includes(search.toLowerCase()) ||
     g.provider.toLowerCase().includes(search.toLowerCase()))
  );

  const isDefaultView = activeCategory === 'All Games' && !search;

  /* Provider pagination actions */
  const scrollProviders = (direction: 'left' | 'right') => {
    if (providersScrollRef.current) {
      const scrollAmt = direction === 'left' ? -164 : 164;
      providersScrollRef.current.scrollBy({ left: scrollAmt, behavior: 'smooth' });
    }
  };

  return (
    <>
      <style>{`
        .agm-scrollbar-none::-webkit-scrollbar { display: none !important; }
        .agm-scrollbar-none { -ms-overflow-style: none !important; scrollbar-width: none !important; }
        .agm-search-placeholder::placeholder {
          font-family: 'Manrope', sans-serif;
          font-weight: 600;
          font-size: 14px;
          color: #BBCAF3;
          opacity: 1;
        }
        @media (min-width: 1150px) {
          .agm-close-btn {
            position: absolute !important;
            right: -48px !important;
            top: 0px !important;
          }
        }
        @media (max-width: 1149px) {
          .agm-close-btn {
            position: absolute !important;
            right: 16px !important;
            top: 16px !important;
          }
        }
      `}</style>

      {/* ── DESKTOP MODAL VIEW ── */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-[9999] bg-black/75 backdrop-blur-sm hidden md:flex items-center justify-center p-4 animate-in fade-in duration-200"
      >
        <div style={{ position: 'relative' }}>
          {/* Close button outside container right top corner */}
          <button
            onClick={onClose}
            className="agm-close-btn w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all cursor-pointer border-none"
            title="Close"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Modal Container (1056px x 636px, background #091741, padding 24px) */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              padding: '24px',
              gap: '20px',
              width: '1056px',
              height: '636px',
              background: '#091741',
              borderRadius: '20px',
              boxSizing: 'border-box',
            }}
            className="shadow-2xl select-none"
          >
            {/* ── LEFT SIDEBAR (180px x 588px) ── */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: '0px',
                gap: '12px',
                width: '180px',
                height: '588px',
                flexShrink: 0,
              }}
            >
              {/* Box 1 (180px x 200px, background #0C1F56) */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  padding: '16px',
                  gap: '10px',
                  width: '180px',
                  height: '200px',
                  background: '#0C1F56',
                  borderRadius: '12px',
                  boxSizing: 'border-box',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '0px', gap: '8px', width: '148px', height: '168px' }}>
                  {topItems.map((label) => {
                    const active = activeCategory === label && !search;
                    return (
                      <button
                        key={label}
                        onClick={() => {
                          setActiveCategory(label);
                          setSearch('');
                        }}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: '10px',
                          gap: '8px',
                          width: '148px',
                          height: '36px',
                          background: active ? '#1463FF' : '#112F82',
                          borderRadius: '8px',
                          border: 'none',
                          cursor: 'pointer',
                          boxSizing: 'border-box',
                          transition: 'all 0.15s ease',
                        }}
                        className="hover:brightness-110 active:scale-95 duration-100"
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '16px', height: '16px', flexShrink: 0 }}>
                          {renderCategoryIcon(label, active)}
                        </div>
                        <span
                          style={{
                            fontFamily: "'Manrope', sans-serif",
                            fontStyle: 'normal',
                            fontWeight: 600,
                            fontSize: '12px',
                            lineHeight: '16px',
                            letterSpacing: '0.02em',
                            color: active ? '#FFFFFF' : '#A5B8EF',
                          }}
                        >
                          {label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Box 2 (180px x 376px, background #0C1F56) */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  padding: '16px',
                  gap: '10px',
                  width: '180px',
                  height: '376px',
                  background: '#0C1F56',
                  borderRadius: '12px',
                  boxSizing: 'border-box',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '0px', gap: '8px', width: '148px', height: '344px' }}>
                  {bottomItems.map((label) => {
                    const active = activeCategory === label && !search;
                    return (
                      <button
                        key={label}
                        onClick={() => {
                          setActiveCategory(label);
                          setSearch('');
                        }}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: '10px',
                          gap: '8px',
                          width: '148px',
                          height: '36px',
                          background: active ? '#1463FF' : '#112F82',
                          borderRadius: '8px',
                          border: 'none',
                          cursor: 'pointer',
                          boxSizing: 'border-box',
                          transition: 'all 0.15s ease',
                        }}
                        className="hover:brightness-110 active:scale-95 duration-100"
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '16px', height: '16px', flexShrink: 0 }}>
                          {renderCategoryIcon(label, active)}
                        </div>
                        <span
                          style={{
                            fontFamily: "'Manrope', sans-serif",
                            fontStyle: 'normal',
                            fontWeight: 600,
                            fontSize: '12px',
                            lineHeight: '16px',
                            letterSpacing: '0.02em',
                            color: active ? '#FFFFFF' : '#A5B8EF',
                          }}
                        >
                          {label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── RIGHT CONTENT (808px x 588px) ── */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '0px',
                gap: '24px',
                width: '808px',
                height: '588px',
              }}
            >
              {/* Search input field container (808px x 40px, background #112F82) */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: '10px 20px',
                  gap: '10px',
                  width: '808px',
                  height: '40px',
                  background: '#112F82',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  border: search ? '1px solid #1463FF' : 'none',
                }}
              >
                {/* Search Icon */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '16px', height: '16px', flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="6.5" cy="6.5" r="5.5" stroke="#BBCAF3" strokeWidth="1.8" />
                    <path d="M10.5 10.5L14.5 14.5" stroke="#BBCAF3" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="What are you looking for?"
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    fontFamily: "'Manrope', sans-serif",
                    fontStyle: 'normal',
                    fontWeight: 600,
                    fontSize: '14px',
                    lineHeight: '19px',
                    color: '#FFFFFF',
                    padding: 0,
                  }}
                  className="agm-search-placeholder"
                />

                {search && (
                  <button
                    onClick={() => setSearch('')}
                    style={{
                      background: '#1463FF',
                      border: 'none',
                      borderRadius: '4px',
                      color: '#FFFFFF',
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 700,
                      fontSize: '11px',
                      padding: '4px 8px',
                      cursor: 'pointer'
                    }}
                    className="hover:bg-[#2c75ff] active:scale-95 transition-all"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Content area: Default Popular/Providers View or Category Grid View */}
              {isDefaultView ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '0px',
                    gap: '32px',
                    width: '808px',
                    height: '524px',
                    overflowY: 'auto',
                  }}
                  className="agm-scrollbar-none"
                >
                  {/* Popular Games Section */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '0px', gap: '20px', width: '808px', height: '249px', flexShrink: 0 }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '808px', height: '29px' }}>
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0px', gap: '8px', height: '29px' }}>
                        {/* Flame Icon */}
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 0C5.5 2.75 3.6 6.36 4.5 10.91C5.4 15.45 8.1 17.27 10 20C11.9 17.27 14.6 15.45 15.5 10.91C16.4 6.36 14.5 2.75 10 0ZM10 16.36C8.2 16.36 6.8 14.95 6.8 13.18C6.8 10.91 8.6 9.55 10 7.73C11.4 9.55 13.2 10.91 13.2 13.18C13.2 14.95 11.8 16.36 10 16.36Z" fill="#FFBF1F"/>
                        </svg>
                        <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 800, fontSize: '20px', lineHeight: '29px', letterSpacing: '0.01em', textTransform: 'uppercase', color: '#FFFFFF' }}>
                          Popular Games
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0px', gap: '12px', width: '808px', height: '200px' }}>
                      {ALL_GAMES.slice(0, 5).map((game) => (
                        <GameCard
                          key={game.id}
                          game={game}
                          onClick={() => {
                            router.push(`/game/${game.id}`);
                            onClose();
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Game Providers Section */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '0px', gap: '20px', width: '808px', height: '150px', flexShrink: 0 }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '808px', height: '30px' }}>
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0px', gap: '8px', height: '29px' }}>
                        {/* Game Provider Icon */}
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C7.58 2 4 5.58 4 10C4 12.5 5.15 14.73 6.94 16.22C7.03 16.3 7.15 16.34 7.27 16.34H12.73C12.85 16.34 12.97 16.3 13.06 16.22C14.85 14.73 16 12.5 16 10C16 5.58 12.42 2 12 2ZM8.5 7.5C8.5 6.67 9.17 6 10 6C10.83 6 11.5 6.67 11.5 7.5C11.5 8.33 10.83 9 10 9C9.17 9 8.5 8.33 8.5 7.5Z" fill="#FFC83D"/>
                        </svg>
                        <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 800, fontSize: '20px', lineHeight: '29px', letterSpacing: '0.01em', color: '#FFFFFF' }}>
                          GAME PROVIDERS
                        </span>
                      </div>

                      {/* Carousel controls */}
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0px', gap: '12px', width: '68px', height: '30px' }}>
                        <button
                          onClick={() => scrollProviders('left')}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '0px',
                            width: '30px',
                            height: '30px',
                            background: '#112F82',
                            borderRadius: '4px',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#FFFFFF'
                          }}
                          className="hover:bg-[#153896] active:scale-90 duration-100"
                        >
                          <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(180deg)' }}>
                            <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        <button
                          onClick={() => scrollProviders('right')}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '0px',
                            width: '30px',
                            height: '30px',
                            background: '#112F82',
                            borderRadius: '4px',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#FFFFFF'
                          }}
                          className="hover:bg-[#153896] active:scale-90 duration-100"
                        >
                          <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Providers List (Horizontal Carousel) */}
                    <div
                      ref={providersScrollRef}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: '0px',
                        gap: '12px',
                        width: '808px',
                        height: '100px',
                        overflowX: 'auto',
                      }}
                      className="agm-scrollbar-none"
                    >
                      {[
                        { name: 'BELATRA', logo: '/games/providers/g1.png', count: '226 Games' },
                        { name: 'BGAMING', logo: '/games/providers/g2.png', count: '226 Games' },
                        { name: 'TaDa GAMING', logo: '/games/providers/g3.png', count: '226 Games' },
                        { name: 'ENDORPHINA', logo: '/games/providers/g4.png', count: '226 Games' },
                        { name: 'NOLIMIT CITY', logo: '/games/providers/g5.png', count: '226 Games' },
                        { name: 'HACKSAW', logo: '/games/providers/g6.png', count: '226 Games' },
                        { name: 'BOOMING', logo: '/games/providers/g7.png', count: '226 Games' },
                      ].map((provider) => (
                        <div
                          key={provider.name}
                          onClick={() => setSearch(provider.name)}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '12px 24px',
                            gap: '8px',
                            width: '152px',
                            height: '100px',
                            background: '#0C1F56',
                            borderRadius: '12px',
                            flexShrink: 0,
                            boxSizing: 'border-box',
                            cursor: 'pointer'
                          }}
                          className="hover:brightness-110 active:scale-95 duration-100"
                        >
                          <img
                            src={provider.logo}
                            alt={provider.name}
                            style={{ width: '80px', height: '40px', objectFit: 'contain' }}
                          />
                          <span
                            style={{
                              fontFamily: "'Manrope', sans-serif",
                              fontWeight: 600,
                              fontSize: '10px',
                              lineHeight: '14px',
                              textAlign: 'center',
                              color: '#FFC83D',
                            }}
                          >
                            {provider.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Category Specific or Search Results Grid View */
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '0px',
                    gap: '20px',
                    width: '808px',
                    height: '524px',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '808px', height: '29px' }}>
                    <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 800, fontSize: '20px', lineHeight: '29px', letterSpacing: '0.01em', textTransform: 'uppercase', color: '#FFFFFF' }}>
                      {search ? `Search results for "${search}"` : activeCategory}
                    </span>
                  </div>

                  <div
                    style={{
                      width: '808px',
                      flex: 1,
                      overflowY: 'auto',
                    }}
                    className="agm-scrollbar-none"
                  >
                    {visibleGames.length > 0 ? (
                      <div className="grid grid-cols-5 gap-y-4 gap-x-3 w-full pb-6">
                        {visibleGames.map((game) => (
                          <GameCard
                            key={game.id}
                            game={game}
                            onClick={() => {
                              router.push(`/game/${game.id}`);
                              onClose();
                            }}
                          />
                        ))}
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '300px', gap: '12px', textAlign: 'center' }}>
                        <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 800, fontSize: '20px', color: '#FFFFFF' }}>
                          No Results found
                        </span>
                        <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 500, fontSize: '13px', color: '#7795E8', maxWidth: '400px' }}>
                          There are no results in this category matching your search. Please try another term or select a different category.
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE OVERLAY VIEW ── */}
      <div
        className={`fixed top-[50px] left-0 right-0 bottom-[60px] z-[52] bg-[#0C1F56] flex md:hidden flex-col p-5 gap-5 overflow-y-auto transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        {/* Mobile Search input bar */}
        <div className="flex flex-row items-center gap-[12px] w-full h-[50px] bg-[#112F82] px-[20px] rounded-lg shrink-0 border border-white/5 focus-within:border-[#1463FF]/40">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-[#BBCAF3]">
            <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.8" />
            <path d="M10.5 10.5L14.5 14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Start typing a game name"
            className="agm-search-placeholder flex-1 h-[22px] bg-transparent border-none outline-none text-white font-sans font-semibold text-[16px] leading-[22px] placeholder-[#BBCAF3] focus:ring-0 p-0"
          />

          <button
            onClick={onClose}
            className="w-[20px] h-[20px] flex items-center justify-center text-[#A5B8EF] hover:text-white bg-transparent border-0 cursor-pointer p-0"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Categories Row */}
        <div className="w-full overflow-x-auto agm-scrollbar-none shrink-0 select-none">
          <div className="flex flex-row items-start gap-2 w-[510px] h-[40px]">
            <button
              onClick={() => { setActiveCategory('All Games'); setSearch(''); }}
              className={`flex flex-row items-center justify-center h-[40px] w-[107px] rounded-lg gap-2 cursor-pointer transition-all border-0 shrink-0 ${
                activeCategory === 'All Games' && !search ? 'bg-[#1463FF] text-white' : 'bg-[#112F82] text-[#A5B8EF]'
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <rect x="2" y="6" width="20" height="12" rx="3" />
                <line x1="6" y1="12" x2="10" y2="12" />
                <line x1="8" y1="10" x2="8" y2="14" />
                <line x1="15" y1="13" x2="15.01" y2="13" />
                <line x1="18" y1="11" x2="18.01" y2="11" />
              </svg>
              <span className="font-sans font-semibold text-[12px] tracking-[0.02em]">All Games</span>
            </button>

            <button
              onClick={() => { setActiveCategory('Recently Played'); setSearch(''); }}
              className={`flex flex-row items-center justify-center h-[40px] w-[143px] rounded-lg gap-2 cursor-pointer transition-all border-0 shrink-0 ${
                activeCategory === 'Recently Played' && !search ? 'bg-[#1463FF] text-white' : 'bg-[#112F82] text-[#A5B8EF]'
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="font-sans font-semibold text-[12px] tracking-[0.02em]">Recently Played</span>
            </button>

            <button
              onClick={() => { setActiveCategory('Favorites'); setSearch(''); }}
              className={`flex flex-row items-center justify-center h-[40px] w-[103px] rounded-lg gap-2 cursor-pointer transition-all border-0 shrink-0 ${
                activeCategory === 'Favorites' && !search ? 'bg-[#1463FF] text-white' : 'bg-[#112F82] text-[#A5B8EF]'
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span className="font-sans font-semibold text-[12px] tracking-[0.02em]">Favorites</span>
            </button>

            <button
              onClick={() => { setActiveCategory('New Releases'); setSearch(''); }}
              className={`flex flex-row items-center justify-center h-[40px] w-[129.37px] rounded-lg gap-2 cursor-pointer transition-all border-0 shrink-0 ${
                activeCategory === 'New Releases' && !search ? 'bg-[#1463FF] text-white' : 'bg-[#112F82] text-[#A5B8EF]'
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className="font-sans font-semibold text-[12px] tracking-[0.02em]">New Releases</span>
            </button>
          </div>
        </div>

        {/* Scrollable Mobile Body Content */}
        <div className="flex-1 w-full flex flex-col gap-6 overflow-y-auto agm-scrollbar-none">
          {search ? (
            <div className="w-full flex flex-col gap-3">
              <span className="font-jost font-black text-[16px] tracking-wide uppercase text-white">
                Search Results ({visibleGames.length})
              </span>
              {visibleGames.length > 0 ? (
                <div className="grid grid-cols-3 gap-x-2 gap-y-3 pb-6">
                  {visibleGames.map((game) => (
                    <div
                      key={game.id}
                      onClick={() => {
                        router.push(`/game/${game.id}`);
                        onClose();
                      }}
                      className="w-full aspect-[121.6/160] max-w-[121.6px] mx-auto relative cursor-pointer active:scale-95 transition-transform"
                    >
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundImage: `url(${game.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          borderRadius: '9.6px',
                        }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <span className="font-jost font-extrabold text-[16px] text-white">No Results found</span>
                  <span className="font-sans text-[12px] text-[#A5B8EF] mt-1">Try another keyword.</span>
                </div>
              )}
            </div>
          ) : activeCategory === 'All Games' ? (
            <>
              {/* Popular Games Section */}
              <div className="flex flex-col gap-3 w-full shrink-0">
                <div className="flex flex-row justify-between items-center w-full">
                  <div className="flex flex-row items-center gap-[7.2px]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFBF1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 fill-[#FFBF1F]">
                      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                    </svg>
                    <h2 className="font-jost font-black text-[16px] leading-[23px] uppercase text-white tracking-[0.01em]">
                      Popular Games
                    </h2>
                  </div>
                </div>

                <div className="w-full overflow-x-auto agm-scrollbar-none">
                  <div className="flex flex-row items-center gap-2 w-[512px]">
                    {ALL_GAMES.slice(0, 4).map((game) => (
                      <div
                        key={game.id}
                        onClick={() => {
                          router.push(`/game/${game.id}`);
                          onClose();
                        }}
                        className="w-[121.6px] h-[160px] relative shrink-0 active:scale-95 transition-transform cursor-pointer"
                      >
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: `url(${game.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: '9.6px',
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Game Providers Section */}
              <div className="flex flex-col gap-3 w-full shrink-0 pb-6">
                <div className="flex flex-row justify-between items-center w-full">
                  <div className="flex flex-row items-center gap-[7.2px]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFC83D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 fill-[#FFC83D]">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <h2 className="font-jost font-black text-[16px] leading-[23px] uppercase text-white tracking-[0.01em]">
                      GAME PROVIDERS
                    </h2>
                  </div>
                </div>

                <div className="w-full overflow-x-auto agm-scrollbar-none">
                  <div className="flex flex-row items-center gap-2 w-[472px] h-[60px]">
                    {[
                      { name: 'BELATRA', logo: '/games/providers/g1.png', count: '226 Games' },
                      { name: 'BGAMING', logo: '/games/providers/g2.png', count: '226 Games' },
                      { name: 'TaDa GAMING', logo: '/games/providers/g3.png', count: '226 Games' },
                      { name: 'ENDORPHINA', logo: '/games/providers/g4.png', count: '226 Games' },
                      { name: 'NOLIMIT CITY', logo: '/games/providers/g5.png', count: '226 Games' },
                    ].map((provider) => (
                      <div
                        key={provider.name}
                        onClick={() => setSearch(provider.name)}
                        className="flex flex-col justify-center items-center p-[7.2px_14.4px] gap-[4.8px] w-[88px] h-[60px] bg-[#112F82] rounded-[8px] shrink-0 cursor-pointer active:scale-95 transition-transform"
                      >
                        <img
                          src={provider.logo}
                          alt={provider.name}
                          className="w-[48px] h-[24px] object-contain"
                        />
                        <span className="font-manrope font-semibold text-[8px] leading-[11px] text-center text-[#FFC83D] whitespace-nowrap">
                          {provider.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full flex flex-col gap-3">
              <span className="font-jost font-black text-[16px] tracking-wide uppercase text-white">
                {activeCategory} ({visibleGames.length})
              </span>
              {visibleGames.length > 0 ? (
                <div className="grid grid-cols-3 gap-x-2 gap-y-3 pb-6">
                  {visibleGames.map((game) => (
                    <div
                      key={game.id}
                      onClick={() => {
                        router.push(`/game/${game.id}`);
                        onClose();
                      }}
                      className="w-full aspect-[121.6/160] max-w-[121.6px] mx-auto relative cursor-pointer active:scale-95 transition-transform"
                    >
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundImage: `url(${game.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          borderRadius: '9.6px',
                        }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <span className="font-jost font-extrabold text-[16px] text-white">No games in this category</span>
                  <span className="font-sans text-[12px] text-[#A5B8EF] mt-1">Check back later!</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
