'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface AllGamesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/* ── all game data ─────────────────────────────────────────── */
const ALL_GAMES = [
  { id: 's1', title: 'PATRICK VS NEFERTITI', provider: 'Belatra', category: 'Slots', image: '/games/slots/slot-1.png' },
  { id: 's2', title: "SWEET BONANZA SUPER SCATTER", provider: 'Pragmatic Play', category: 'Slots', image: '/games/slots/slot-2.png' },
  { id: 's3', title: 'AMERICAN ROULETTE', provider: 'Endorphina', category: 'Roulette', image: '/games/slots/slot-3.png' },
  { id: 's4', title: "CASH-O-MATIC! EXTREME CASH OUT", provider: 'Nolimit City', category: 'Slots', image: '/games/slots/slot-4.png' },
  { id: 's5', title: 'RIDE\'EM POKER', provider: 'Hacksaw', category: 'Table Games', image: '/games/slots/slot-5.png' },
  { id: 's6', title: 'POPPING MANIA', provider: 'BGaming', category: 'Slots', image: '/games/slots/slot-6.png' },
  { id: 's7', title: 'DOUBLE WIN COLLECTION', provider: 'Booming', category: 'Slots', image: '/games/slots/slot-7.png' },
  { id: 'o1', title: 'MIGHTY MINES', provider: 'Mighty Luck', category: 'Original', image: '/games/original/original-1.png' },
  { id: 'o2', title: 'WINTER PLINKO', provider: 'Mighty Luck', category: 'Original', image: '/games/original/original-2.png' },
  { id: 'o3', title: 'LUCKY CRASH', provider: 'Mighty Luck', category: 'Original', image: '/games/original/original-3.png' },
  { id: 'o4', title: 'DICE DELUXE', provider: 'Mighty Luck', category: 'Original', image: '/games/original/original-4.png' },
  { id: 'o5', title: 'WHEEL OF LUCK', provider: 'Mighty Luck', category: 'Original', image: '/games/original/original-5.png' },
  { id: 'c1', title: 'CRASH', provider: 'Belatra', category: 'Crash Games', image: '/games/crash/crash-1.png' },
  { id: 'c2', title: 'CRASH TOUCHDOWN', provider: 'BGaming', category: 'Crash Games', image: '/games/crash/crash-2.png' },
  { id: 'c3', title: 'CRUSADER', provider: 'Endorphina', category: 'Crash Games', image: '/games/crash/crash-3.png' },
  { id: 'c4', title: 'CRASH BONUS', provider: 'Hacksaw', category: 'Crash Games', image: '/games/crash/crash-4.png' },
  { id: 't1', title: 'BACCARAT ELITE', provider: 'Belatra', category: 'Baccarat', image: '/games/table/table-1.png' },
  { id: 't2', title: 'CLASSIC ROULETTE', provider: 'Pragmatic Play', category: 'Roulette', image: '/games/table/table-2.png' },
  { id: 't3', title: 'LA PARTAGE ROULETTE', provider: 'Belatra', category: 'Roulette', image: '/games/table/table-3.png' },
  { id: 't4', title: 'DRAGON TIGER LUCK', provider: 'BGaming', category: 'Table Games', image: '/games/table/table-4.png' },
];

type SideCategory =
  | 'All Games' | 'Recently Played' | 'Favorites' | 'New Releases'
  | 'Original' | 'Slots' | 'Roulette' | 'Crash Games'
  | 'Table Games' | 'Live Casino' | 'Baccarat' | 'Blackjack';

const topItems: SideCategory[] = [
  'All Games', 'Recently Played', 'Favorites', 'New Releases'
];

const bottomItems: SideCategory[] = [
  'Original', 'Slots', 'Roulette', 'Crash Games',
  'Table Games', 'Live Casino', 'Baccarat', 'Blackjack'
];

/* ── inline category icon renderer ────────────────────────── */
const renderCategoryIcon = (label: SideCategory, active: boolean) => {
  let src = '';
  switch (label) {
    case 'All Games':
      src = '/games/side-icon/all.svg';
      break;
    case 'Recently Played':
      src = '/games/side-icon/recent.svg';
      break;
    case 'Favorites':
      src = '/games/side-icon/like.svg';
      break;
    case 'New Releases':
      src = '/games/side-icon/new.svg';
      break;
    case 'Original':
      src = '/games/side-icon/original.svg';
      break;
    case 'Slots':
      src = '/games/side-icon/casino.svg';
      break;
    case 'Roulette':
      src = '/games/side-icon/roulette.svg';
      break;
    case 'Crash Games':
      src = '/games/side-icon/crash.svg';
      break;
    case 'Table Games':
      src = '/games/game-icons/table.svg';
      break;
    case 'Live Casino':
      src = '/games/side-icon/live.svg';
      break;
    case 'Baccarat':
      src = '/games/side-icon/baccrarat.svg';
      break;
    case 'Blackjack':
      src = '/games/side-icon/blackjack.svg';
      break;
    default:
      return null;
  }

  return (
    <img
      src={src}
      alt={label}
      style={{
        width: '16px',
        height: '16px',
        objectFit: 'contain',
        flexShrink: 0,
        filter: active
          ? 'brightness(0) saturate(100%) invert(100%)' // Solid white
          : 'brightness(0) saturate(100%) invert(77%) sepia(21%) saturate(760%) hue-rotate(192deg) brightness(98%) contrast(96%)', // Solid #A5B8EF
        transition: 'filter 0.15s ease',
      }}
    />
  );
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
              <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
                        {/* Flame Icon: large for desktop, small for mobile */}
                        <svg
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="hidden sm:block shrink-0"
                          style={{ width: '20px', height: '20px' }}
                        >
                          <path
                            d="M8.46484 0.332031C8.48828 0.289062 8.57422 0.195312 8.65625 0.125C8.78125 0.0234375 8.83984 0 8.99609 0C9.15625 0 9.24219 0.0390625 9.64062 0.277344C9.89062 0.429688 10.2305 0.652344 10.3906 0.773438C10.5508 0.890625 10.9297 1.23828 11.2305 1.53906C11.5391 1.84766 11.8867 2.24609 12.0312 2.44922C12.1719 2.64844 12.3789 2.97266 12.4961 3.17188C12.6133 3.37109 12.793 3.73828 12.8984 3.98438C13.0078 4.23047 13.1523 4.64453 13.2266 4.90234C13.3047 5.16016 13.4023 5.57422 13.4453 5.82031C13.5156 6.1875 13.5312 6.42578 13.5312 7.15625C13.5352 7.90625 13.543 8.03516 13.5898 7.99609C13.6211 7.96875 13.7617 7.80078 13.9023 7.61719C14.043 7.4375 14.2773 7.09375 14.418 6.85547C14.582 6.58203 14.7227 6.39453 14.8086 6.33594C14.8984 6.27734 14.9961 6.25 15.1172 6.25C15.2148 6.25 15.3438 6.28125 15.4102 6.32031C15.4727 6.35938 15.6719 6.55469 15.8516 6.75C16.0273 6.94922 16.2656 7.23828 16.3789 7.39453C16.4922 7.54688 16.6563 7.78906 16.7461 7.92969C16.832 8.07031 16.9922 8.35938 17.0977 8.57422C17.207 8.78906 17.3555 9.13281 17.4336 9.33594C17.5078 9.53906 17.6172 9.89062 17.6719 10.1172C17.7266 10.3438 17.8086 10.7656 17.8516 11.0547C17.8945 11.3516 17.9297 11.7812 17.9297 12.0312C17.9297 12.2773 17.9141 12.6289 17.8906 12.8125C17.8672 12.9961 17.8242 13.3047 17.7891 13.4961C17.7539 13.6875 17.6758 14.0273 17.6133 14.25C17.5508 14.4687 17.4453 14.7852 17.3789 14.9531C17.3125 15.1172 17.1719 15.4297 17.0625 15.6445C16.9531 15.8594 16.7578 16.2031 16.625 16.4062C16.4922 16.6094 16.25 16.9375 16.0859 17.1289C15.9258 17.3203 15.6367 17.6289 15.4453 17.8125C15.2539 17.9961 14.9492 18.2617 14.7656 18.3984C14.582 18.5352 14.2305 18.7695 13.9844 18.9141C13.7383 19.0625 13.3516 19.2578 13.125 19.3516C12.8984 19.4453 12.5469 19.5781 12.3438 19.6406C12.1406 19.707 11.7812 19.7969 11.543 19.8398C11.3047 19.8867 11.0156 19.9375 10.8984 19.9609C10.7812 19.9805 10.3867 20 10.0195 20C9.65625 20 9.24219 19.9805 9.10156 19.957C8.96094 19.9336 8.66406 19.8789 8.4375 19.8359C8.21094 19.793 7.80078 19.6836 7.51953 19.5898C7.24219 19.5 6.80859 19.3281 6.5625 19.2109C6.31641 19.0898 5.92969 18.8711 5.70312 18.7227C5.47656 18.5742 5.16016 18.3438 5 18.2148C4.83984 18.082 4.53125 17.7969 4.31641 17.5742C4.10156 17.3516 3.84375 17.0625 3.74609 16.9336C3.64453 16.8047 3.47266 16.5586 3.35938 16.3867C3.25 16.2148 3.04297 15.8438 2.90625 15.5664C2.76562 15.2891 2.58594 14.8477 2.5 14.5898C2.41797 14.332 2.3125 13.9609 2.26953 13.7695C2.22656 13.5781 2.16406 13.2148 2.13281 12.9688C2.09766 12.7227 2.07031 12.3125 2.07031 12.0586C2.07031 11.8086 2.09766 11.4023 2.13281 11.1641C2.16406 10.9219 2.22656 10.5547 2.27344 10.3516C2.31641 10.1484 2.42188 9.77734 2.50781 9.53125C2.59375 9.28516 2.74609 8.90625 2.84766 8.69141C2.94922 8.47656 3.13281 8.14062 3.25 7.94922C3.37109 7.75781 3.59766 7.42969 3.75391 7.22656C3.91016 7.02344 4.21484 6.67969 4.42969 6.46484C4.64844 6.25 5.07031 5.88672 5.37109 5.66406C5.67188 5.4375 6.03906 5.14844 6.19141 5.01953C6.33984 4.89062 6.58984 4.63672 6.75 4.45312C6.91016 4.26953 7.15234 3.95312 7.28516 3.75C7.42188 3.54688 7.62109 3.20312 7.72656 2.98828C7.83203 2.77344 7.96875 2.46484 8.02734 2.30469C8.08203 2.14453 8.17188 1.84375 8.22266 1.64062C8.27734 1.4375 8.34375 1.07812 8.37109 0.839844C8.40234 0.601562 8.44531 0.375 8.46484 0.332031Z"
                            fill="#FFBF1F"
                          />
                        </svg>
                        <svg
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="block sm:hidden shrink-0"
                          style={{ width: '18px', height: '18px' }}
                        >
                          <path
                            d="M8.46484 0.332031C8.48828 0.289062 8.57422 0.195312 8.65625 0.125C8.78125 0.0234375 8.83984 0 8.99609 0C9.15625 0 9.24219 0.0390625 9.64062 0.277344C9.89062 0.429688 10.2305 0.652344 10.3906 0.773438C10.5508 0.890625 10.9297 1.23828 11.2305 1.53906C11.5391 1.84766 11.8867 2.24609 12.0312 2.44922C12.1719 2.64844 12.3789 2.97266 12.4961 3.17188C12.6133 3.37109 12.793 3.73828 12.8984 3.98438C13.0078 4.23047 13.1523 4.64453 13.2266 4.90234C13.3047 5.16016 13.4023 5.57422 13.4453 5.82031C13.5156 6.1875 13.5312 6.42578 13.5312 7.15625C13.5352 7.90625 13.543 8.03516 13.5898 7.99609C13.6211 7.96875 13.7617 7.80078 13.9023 7.61719C14.043 7.4375 14.2773 7.09375 14.418 6.85547C14.582 6.58203 14.7227 6.39453 14.8086 6.33594C14.8984 6.27734 14.9961 6.25 15.1172 6.25C15.2148 6.25 15.3438 6.28125 15.4102 6.32031C15.4727 6.35938 15.6719 6.55469 15.8516 6.75C16.0273 6.94922 16.2656 7.23828 16.3789 7.39453C16.4922 7.54688 16.6563 7.78906 16.7461 7.92969C16.832 8.07031 16.9922 8.35938 17.0977 8.57422C17.207 8.78906 17.3555 9.13281 17.4336 9.33594C17.5078 9.53906 17.6172 9.89062 17.6719 10.1172C17.7266 10.3438 17.8086 10.7656 17.8516 11.0547C17.8945 11.3516 17.9297 11.7812 17.9297 12.0312C17.9297 12.2773 17.9141 12.6289 17.8906 12.8125C17.8672 12.9961 17.8242 13.3047 17.7891 13.4961C17.7539 13.6875 17.6758 14.0273 17.6133 14.25C17.5508 14.4687 17.4453 14.7852 17.3789 14.9531C17.3125 15.1172 17.1719 15.4297 17.0625 15.6445C16.9531 15.8594 16.7578 16.2031 16.625 16.4062C16.4922 16.6094 16.25 16.9375 16.0859 17.1289C15.9258 17.3203 15.6367 17.6289 15.4453 17.8125C15.2539 17.9961 14.9492 18.2617 14.7656 18.3984C14.582 18.5352 14.2305 18.7695 13.9844 18.9141C13.7383 19.0625 13.3516 19.2578 13.125 19.3516C12.8984 19.4453 12.5469 19.5781 12.3438 19.6406C12.1406 19.707 11.7812 19.7969 11.543 19.8398C11.3047 19.8867 11.0156 19.9375 10.8984 19.9609C10.7812 19.9805 10.3867 20 10.0195 20C9.65625 20 9.24219 19.9805 9.10156 19.957C8.96094 19.9336 8.66406 19.8789 8.4375 19.8359C8.21094 19.793 7.80078 19.6836 7.51953 19.5898C7.24219 19.5 6.80859 19.3281 6.5625 19.2109C6.31641 19.0898 5.92969 18.8711 5.70312 18.7227C5.47656 18.5742 5.16016 18.3438 5 18.2148C4.83984 18.082 4.53125 17.7969 4.31641 17.5742C4.10156 17.3516 3.84375 17.0625 3.74609 16.9336C3.64453 16.8047 3.47266 16.5586 3.35938 16.3867C3.25 16.2148 3.04297 15.8438 2.90625 15.5664C2.76562 15.2891 2.58594 14.8477 2.5 14.5898C2.41797 14.332 2.3125 13.9609 2.26953 13.7695C2.22656 13.5781 2.16406 13.2148 2.13281 12.9688C2.09766 12.7227 2.07031 12.3125 2.07031 12.0586C2.07031 11.8086 2.09766 11.4023 2.13281 11.1641C2.16406 10.9219 2.22656 10.5547 2.27344 10.3516C2.31641 10.1484 2.42188 9.77734 2.50781 9.53125C2.59375 9.28516 2.74609 8.90625 2.84766 8.69141C2.94922 8.47656 3.13281 8.14062 3.25 7.94922C3.37109 7.75781 3.59766 7.42969 3.75391 7.22656C3.91016 7.02344 4.21484 6.67969 4.42969 6.46484C4.64844 6.25 5.07031 5.88672 5.37109 5.66406C5.67188 5.4375 6.03906 5.14844 6.19141 5.01953C6.33984 4.89062 6.58984 4.63672 6.75 4.45312C6.91016 4.26953 7.15234 3.95312 7.28516 3.75C7.42188 3.54688 7.62109 3.20312 7.72656 2.98828C7.83203 2.77344 7.96875 2.46484 8.02734 2.30469C8.08203 2.14453 8.17188 1.84375 8.22266 1.64062C8.27734 1.4375 8.34375 1.07812 8.37109 0.839844C8.40234 0.601562 8.44531 0.375 8.46484 0.332031Z"
                            fill="#FFBF1F"
                          />
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
                        {/* Game Provider Icon: large for desktop, small for mobile */}
                        <img src="/games/game-icons/game.svg" alt="Game Providers" className="hidden sm:block" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                        <img src="/games/side-icon/game-p.svg" alt="Game Providers" className="block sm:hidden" style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
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
                            <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
                            <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
                      <div style={{ flexDirection: 'column', justifyContent: 'center', width: '100%', height: '300px', gap: '12px', textAlign: 'center' }}>
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Jost', sans-serif", fontWeight: 800, fontSize: '20px', color: '#FFFFFF' }}>
                          No Results found
                        </span>
                        <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 500, fontSize: '16px', color: '#7795E8', alignContent: 'center', maxWidth: '400px' }}>
                          There are no results in this category for your search term, please select a different category or try searching for something else
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
        className={`fixed top-[50px] left-0 right-0 bottom-[60px] z-[52] bg-[#0C1F56] flex md:hidden flex-col p-5 gap-5 overflow-y-auto transition-all duration-300 ease-in-out ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
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
              className={`flex flex-row items-center justify-center h-[40px] w-[107px] rounded-lg gap-2 cursor-pointer transition-all border-0 shrink-0 ${activeCategory === 'All Games' && !search ? 'bg-[#1463FF] text-white' : 'bg-[#112F82] text-[#A5B8EF]'
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
              className={`flex flex-row items-center justify-center h-[40px] w-[143px] rounded-lg gap-2 cursor-pointer transition-all border-0 shrink-0 ${activeCategory === 'Recently Played' && !search ? 'bg-[#1463FF] text-white' : 'bg-[#112F82] text-[#A5B8EF]'
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
              className={`flex flex-row items-center justify-center h-[40px] w-[103px] rounded-lg gap-2 cursor-pointer transition-all border-0 shrink-0 ${activeCategory === 'Favorites' && !search ? 'bg-[#1463FF] text-white' : 'bg-[#112F82] text-[#A5B8EF]'
                }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span className="font-sans font-semibold text-[12px] tracking-[0.02em]">Favorites</span>
            </button>

            <button
              onClick={() => { setActiveCategory('New Releases'); setSearch(''); }}
              className={`flex flex-row items-center justify-center h-[40px] w-[129.37px] rounded-lg gap-2 cursor-pointer transition-all border-0 shrink-0 ${activeCategory === 'New Releases' && !search ? 'bg-[#1463FF] text-white' : 'bg-[#112F82] text-[#A5B8EF]'
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
                    {/* Flame Icon (mobile): use small side-icon */}
                    <img src="/games/side-icon/game-p.svg" alt="Popular Games" style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
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
