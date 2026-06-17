'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AllGamesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/* ── all game data ─────────────────────────────────────────── */
const ALL_GAMES = [
  { id: 's1', title: 'ALLY ALIENS',              provider: 'Belatra',       category: 'Slots',    image: '/games/slots/slot-1.png' },
  { id: 's2', title: "ANUBIS' TRIAL",            provider: 'BGaming',       category: 'Slots',    image: '/games/slots/slot-2.png' },
  { id: 's3', title: 'CACTUS GOES NUTS',         provider: 'Endorphina',    category: 'Slots',    image: '/games/slots/slot-3.png' },
  { id: 's4', title: "PANTHER'S RICHES",         provider: 'Nolimit City',  category: 'Slots',    image: '/games/slots/slot-4.png' },
  { id: 's5', title: 'HONEY MONEY MULTIPLIER',   provider: 'Hacksaw',       category: 'Slots',    image: '/games/slots/slot-5.png' },
  { id: 's6', title: 'POPPING MANIA',            provider: 'BGaming',       category: 'Slots',    image: '/games/slots/slot-6.png' },
  { id: 's7', title: 'DOUBLE WIN COLLECTION',    provider: 'Booming',       category: 'Slots',    image: '/games/slots/slot-7.png' },
  { id: 'o1', title: 'MIGHTY MINES',             provider: 'Mighty Luck',   category: 'Original', image: '/games/original/original-1.png' },
  { id: 'o2', title: 'WINTER PLINKO',            provider: 'Mighty Luck',   category: 'Original', image: '/games/original/original-2.png' },
  { id: 'o3', title: 'LUCKY CRASH',              provider: 'Mighty Luck',   category: 'Original', image: '/games/original/original-3.png' },
  { id: 'o4', title: 'DICE DELUXE',              provider: 'Mighty Luck',   category: 'Original', image: '/games/original/original-4.png' },
  { id: 'o5', title: 'WHEEL OF LUCK',            provider: 'Mighty Luck',   category: 'Original', image: '/games/original/original-5.png' },
  { id: 'c1', title: 'CRASH',                    provider: 'Belatra',       category: 'Crash',    image: '/games/crash/crash-1.png' },
  { id: 'c2', title: 'CRASH TOUCHDOWN',          provider: 'BGaming',       category: 'Crash',    image: '/games/crash/crash-2.png' },
  { id: 'c3', title: 'CRUSADER',                 provider: 'Endorphina',    category: 'Crash',    image: '/games/crash/crash-3.png' },
  { id: 'c4', title: 'CRASH BONUS',              provider: 'Hacksaw',       category: 'Crash',    image: '/games/crash/crash-4.png' },
  { id: 't1', title: 'BACCARAT',                 provider: 'Belatra',       category: 'Table',    image: '/games/table/table-1.png' },
  { id: 't2', title: 'AMERICAN ROULETTE',        provider: 'Pragmatic Play',category: 'Table',    image: '/games/table/table-2.png' },
  { id: 't3', title: 'LA PARTAGE ROULETTE',      provider: 'Belatra',       category: 'Table',    image: '/games/table/table-3.png' },
  { id: 't4', title: 'DRAGON TIGER',             provider: 'BGaming',       category: 'Table',    image: '/games/table/table-4.png' },
  { id: 'b1', title: 'ECHNATON GOLD',            provider: 'Push Gaming',   category: 'Bonus',    image: '/games/bonus/bonus-1.png' },
  { id: 'b2', title: 'MONKEYS GO BANANAS',       provider: 'BGaming',       category: 'Bonus',    image: '/games/bonus/bonus-2.png' },
  { id: 'b3', title: 'RAGNA RAVENS WILD ENERGY', provider: 'Nolimit City',  category: 'Bonus',    image: '/games/bonus/bonus-3.png' },
  { id: 'b4', title: 'NEON VILLAINS',            provider: 'Push Gaming',   category: 'Bonus',    image: '/games/bonus/bonus-4.png' },
];

type SideCategory =
  | 'All Games' | 'Recently Played' | 'Favorites' | 'New Releases'
  | 'Original'  | 'Slots'           | 'Roulette'  | 'Crash Games'
  | 'Table Games' | 'Live Casino'   | 'Baccarat'  | 'Blackjack';

const topItems: { icon: string; label: SideCategory }[] = [
  { icon: '/games/side-icon/all.svg',    label: 'All Games' },
  { icon: '/games/side-icon/recent.svg', label: 'Recently Played' },
  { icon: '/games/side-icon/like.svg',   label: 'Favorites' },
  { icon: '/games/side-icon/new-r.svg',  label: 'New Releases' },
];

const bottomItems: { icon: string; label: SideCategory }[] = [
  { icon: '/games/side-icon/original.svg',  label: 'Original' },
  { icon: '/games/side-icon/casino.svg',    label: 'Slots' },
  { icon: '/games/side-icon/roulette.svg',  label: 'Roulette' },
  { icon: '/games/side-icon/crash.svg',     label: 'Crash Games' },
  { icon: '/games/side-icon/live-c.svg',    label: 'Table Games' },
  { icon: '/games/side-icon/live.svg',      label: 'Live Casino' },
  { icon: '/games/side-icon/baccrarat.svg', label: 'Baccarat' },
  { icon: '/games/side-icon/blackjack.svg', label: 'Blackjack' },
];

/* ── sidebar nav item ──────────────────────────────────────── */
function NavItem({ icon, label, active, onClick }: {
  icon: string; label: string; active: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-row items-center px-[12px] py-[8px] gap-[8px] h-[36px] rounded-[8px] border-none cursor-pointer transition-colors duration-200 shrink-0 md:w-full select-none text-left ${
        active ? 'bg-[#1463FF] text-white' : 'bg-[#112F82] text-[#A5B8EF] hover:bg-[#153896]'
      }`}
    >
      <img
        src={icon}
        alt={label}
        className="w-[16px] h-[16px] object-contain shrink-0 filter brightness-0 invert transition-opacity"
        style={{ opacity: active ? 1 : 0.65 }}
      />
      <span className="font-sans font-semibold text-[12px] leading-[16px] tracking-[0.02em] whitespace-nowrap">
        {label}
      </span>
    </button>
  );
}

/* ── single game card (responsive width) ────────────────────── */
function GameCard({ game, onClick }: { game: typeof ALL_GAMES[0]; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="aspect-[152/200] w-full max-w-[160px] mx-auto rounded-[12px] overflow-hidden relative cursor-pointer bg-[#1A1F3C] transition-transform duration-200 hover:scale-[1.03] select-none"
      style={{
        backgroundImage: `url(${game.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* bottom gradient + text */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-[32px_8px_10px] flex flex-col gap-[2px]">
        <span className="font-jost font-extrabold text-[12px] leading-[14px] tracking-[0.01em] uppercase text-white truncate">
          {game.title}
        </span>
        <span className="font-sans font-semibold text-[9px] leading-[12px] tracking-[0.02em] uppercase text-white/65 truncate">
          {game.provider}
        </span>
      </div>

      {/* hover play overlay */}
      <div className={`absolute inset-0 bg-black/45 flex items-center justify-center transition-opacity duration-200 ${
        hovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="w-[44px] h-[44px] rounded-full bg-[#FFC83D] flex items-center justify-center shadow-[0_4px_12px_rgba(255,200,61,0.5)] transform transition-transform duration-200 hover:scale-115">
          <svg width="11" height="13" viewBox="0 0 12 14" fill="none">
            <path d="M1.5 1.586C1.5 0.771 2.423.298 3.083.779l7.428 5.414c.566.412.566 1.202 0 1.614L3.083 13.221C2.423 13.703 1.5 13.229 1.5 12.414V1.586Z" fill="#0C1F56" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ── main modal ─────────────────────────────────────────────── */
export default function AllGamesModal({ isOpen, onClose }: AllGamesModalProps) {
  const [activeCategory, setActiveCategory] = useState<SideCategory>('All Games');
  const [search, setSearch] = useState('');
  const router = useRouter();

  /* Escape key */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  /* filter games by category + search */
  const getCategoryFilter = (cat: SideCategory): string[] => {
    const map: Record<SideCategory, string[]> = {
      'All Games':      ['Slots','Original','Crash','Table','Bonus'],
      'Recently Played':['Slots','Original','Crash','Table','Bonus'],
      'Favorites':      ['Slots','Original','Crash','Table','Bonus'],
      'New Releases':   ['Slots','Original','Crash','Table','Bonus'],
      'Original':       ['Original'],
      'Slots':          ['Slots'],
      'Roulette':       ['Table'],
      'Crash Games':    ['Crash'],
      'Table Games':    ['Table'],
      'Live Casino':    ['Table'],
      'Baccarat':       ['Table'],
      'Blackjack':      ['Table'],
    };
    return map[cat] ?? [];
  };

  const cats = getCategoryFilter(activeCategory);
  const visibleGames = ALL_GAMES.filter((g) =>
    cats.includes(g.category) &&
    (g.title.toLowerCase().includes(search.toLowerCase()) ||
     g.provider.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      {/* placeholder input style */}
      <style>{`
        .agm-search::placeholder { color: #BBCAF3; opacity: 1;
          font-family: 'Manrope', sans-serif; font-weight: 600; font-size: 14px; }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-[9999] bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
      >
        {/* Modal Box */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[1056px] h-full max-h-[636px] bg-[#091741] rounded-[20px] p-5 md:p-6 flex flex-col md:flex-row gap-5 overflow-hidden border border-white/10 shadow-2xl"
        >
          {/* Header row for mobile close */}
          <div className="flex flex-row items-center justify-between md:hidden w-full border-b border-white/5 pb-2">
            <span className="font-jost font-black text-[18px] text-white tracking-wide uppercase">All Games</span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all cursor-pointer border-none"
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* ── LEFT SIDEBAR ── */}
          {/* On mobile: horizontal scroll container. On desktop: vertical layout. */}
          <div className="flex flex-col gap-3 w-full md:w-[180px] shrink-0">
            {/* Desktop Close Button */}
            <div className="hidden md:flex flex-row justify-end w-full">
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all cursor-pointer border-none"
                title="Close"
              >
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Scrollable Nav list */}
            <div className="flex flex-row md:flex-col gap-2 w-full md:bg-[#0C1F56] md:p-4 md:rounded-[12px] overflow-x-auto md:overflow-y-auto scrollbar-none pb-2 md:pb-0">
              {/* Top items */}
              {topItems.map((item) => (
                <NavItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  active={activeCategory === item.label}
                  onClick={() => setActiveCategory(item.label)}
                />
              ))}
              {/* Divider for desktop */}
              <div className="hidden md:block w-full h-[1px] bg-white/5 my-1" />
              {/* Bottom items */}
              {bottomItems.map((item) => (
                <NavItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  active={activeCategory === item.label}
                  onClick={() => setActiveCategory(item.label)}
                />
              ))}
            </div>
          </div>

          {/* ── RIGHT CONTENT ── */}
          <div className="flex-1 min-w-0 flex flex-col gap-4 overflow-hidden">
            {/* Search Input Container */}
            <div
              className={`flex flex-row items-center gap-2.5 w-full h-[40px] bg-[#112F82] px-4 rounded-lg border transition-colors ${
                search ? 'border-[#1463FF]' : 'border-white/5'
              }`}
            >
              {/* Search icon */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                <circle cx="6.5" cy="6.5" r="5.5" stroke="white" strokeWidth="1.5" opacity="0.7" />
                <path d="M10.5 10.5L14.5 14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
              </svg>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="What are you looking for?"
                className="agm-search w-full bg-transparent border-none outline-none font-sans font-semibold text-[14px] text-white placeholder-[#BBCAF3]"
              />

              {/* Clear button */}
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="flex items-center justify-center px-3 h-[28px] bg-[#1463FF] hover:bg-[#2c75ff] rounded-md border-none cursor-pointer font-sans font-bold text-[12px] text-white transition-colors shrink-0"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Active Category Title */}
            <div className="flex flex-row items-center gap-2 shrink-0">
              <span className="font-jost font-black text-[18px] sm:text-[20px] leading-tight tracking-[0.01em] uppercase text-white">
                {activeCategory}
              </span>
            </div>

            {/* Game Grid Box */}
            <div className="flex-1 w-full overflow-y-auto scrollbar-none pr-1">
              {visibleGames.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {visibleGames.map((g) => (
                    <GameCard
                      key={g.id}
                      game={g}
                      onClick={() => {
                        router.push(`/game/${g.id}`);
                        onClose();
                      }}
                    />
                  ))}
                </div>
              ) : (
                /* No Results State */
                <div className="flex flex-col items-center justify-center w-full h-[300px] gap-3 text-center px-4 py-8">
                  <span className="font-jost font-extrabold text-[18px] sm:text-[20px] text-white">
                    No Results for your Search
                  </span>
                  <span className="font-sans font-medium text-[13px] sm:text-[14px] text-[#7795E8] max-w-[440px] leading-relaxed">
                    There are no results in this category for your search term, please select a different category or try searching for something else
                  </span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
