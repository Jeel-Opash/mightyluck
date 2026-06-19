'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import Sidebar from '@/components/Sidebar';

const ALL_GAMES = [
  { id: 's1',  title: 'ALLY ALIENS',               image: '/games/slots/slot-1.png',          provider: 'BGaming', category: 'Slots' },
  { id: 's2',  title: "ANUBIS' TRIAL",              image: '/games/slots/slot-2.png',          provider: 'BGaming', category: 'Slots' },
  { id: 's3',  title: 'CACTUS GOES NUTS',           image: '/games/slots/slot-3.png',          provider: 'BGaming', category: 'Slots' },
  { id: 's4',  title: "PANTHER'S RICHES",           image: '/games/slots/slot-4.png',          provider: 'BGaming', category: 'Slots' },
  { id: 's5',  title: 'HONEY MONEY MULTIPLIER',     image: '/games/slots/slot-5.png',          provider: 'BGaming', category: 'Slots' },
  { id: 's6',  title: 'POPPING MANIA',              image: '/games/slots/slot-6.png',          provider: 'BGaming', category: 'Slots' },
  { id: 's7',  title: 'DOUBLE WIN COLLECTION',      image: '/games/slots/slot-7.png',          provider: 'BGaming', category: 'Slots' },
  { id: 's8',  title: 'ALLY ALIENS II',             image: '/games/slots/slot-1.png',          provider: 'BGaming', category: 'Slots' },
  { id: 's9',  title: "ANUBIS' TREASURE",           image: '/games/slots/slot-2.png',          provider: 'BGaming', category: 'Slots' },
  { id: 's10', title: 'CACTUS WILD',                image: '/games/slots/slot-3.png',          provider: 'BGaming', category: 'Slots' },
  { id: 'o1',  title: 'MIGHTY MINES',               image: '/games/original/original-1.png',   provider: 'Mighty Luck', category: 'Originals' },
  { id: 'o2',  title: 'WINTER PLINKO',              image: '/games/original/original-2.png',   provider: 'Mighty Luck', category: 'Originals' },
  { id: 'o3',  title: 'LUCKY CRASH',                image: '/games/original/original-3.png',   provider: 'Mighty Luck', category: 'Originals' },
  { id: 'o4',  title: 'DICE DELUXE',                image: '/games/original/original-4.png',   provider: 'Mighty Luck', category: 'Originals' },
  { id: 'o5',  title: 'WHEEL OF LUCK',              image: '/games/original/original-5.png',   provider: 'Mighty Luck', category: 'Originals' },
  { id: 'o6',  title: 'KENO EXTREME',               image: '/games/original/original-6.png',   provider: 'Mighty Luck', category: 'Originals' },
  { id: 'o7',  title: 'HILO ROYALE',                image: '/games/original/original-7.png',   provider: 'Mighty Luck', category: 'Originals' },
  { id: 'o8',  title: 'LIMBO RUSH',                 image: '/games/original/original-8.png',   provider: 'Mighty Luck', category: 'Originals' },
  { id: 'c1',  title: 'CRASH',                      image: '/games/crash/crash-1.png',         provider: 'BGaming', category: 'Crash' },
  { id: 'c2',  title: 'CRASH TOUCHDOWN',            image: '/games/crash/crash-2.png',         provider: 'BGaming', category: 'Crash' },
  { id: 'c3',  title: 'CRUSADER',                   image: '/games/crash/crash-3.png',         provider: 'BGaming', category: 'Crash' },
  { id: 'c4',  title: 'CRASH BONUS',                image: '/games/crash/crash-4.png',         provider: 'BGaming', category: 'Crash' },
  { id: 'c5',  title: 'CRASH GOAL',                 image: '/games/crash/crash-5.png',         provider: 'BGaming', category: 'Crash' },
  { id: 'c6',  title: 'CRASH FRUIT',                image: '/games/crash/crash-6.png',         provider: 'BGaming', category: 'Crash' },
  { id: 'c7',  title: 'CRASH PUCK',                 image: '/games/crash/crash-7.png',         provider: 'BGaming', category: 'Crash' },
  { id: 'c8',  title: 'CRASH SPACE',                image: '/games/crash/crash-8.png',         provider: 'BGaming', category: 'Crash' },
  { id: 't1',  title: 'BACCARAT',                   image: '/games/table/table-1.png',         provider: 'Belatra', category: 'Table' },
  { id: 't2',  title: 'AMERICAN ROULETTE',          image: '/games/table/table-2.png',         provider: 'Belatra', category: 'Table' },
  { id: 't3',  title: 'LA PARTAGE ROULETTE',        image: '/games/table/table-3.png',         provider: 'Belatra', category: 'Table' },
  { id: 't4',  title: 'DRAGON TIGER',               image: '/games/table/table-4.png',         provider: 'Belatra', category: 'Table' },
  { id: 't5',  title: 'ANDAR BAHAR',                image: '/games/table/table-5.png',         provider: 'Belatra', category: 'Table' },
  { id: 't6',  title: "RIDE'EM POKER",              image: '/games/table/table-6.png',         provider: 'Belatra', category: 'Table' },
  { id: 't7',  title: 'DEUCES AND JOKER',           image: '/games/table/table-7.png',         provider: 'Belatra', category: 'Table' },
  { id: 't8',  title: 'BLACKJACK CLASSIC',          image: '/games/table/table-8.png',         provider: 'Belatra', category: 'Table' },
  { id: 'b1',  title: 'ECHNATON GOLD',              image: '/games/bonus/bonus-1.png',         provider: 'Hacksaw', category: 'Bonus' },
  { id: 'b2',  title: 'MONKEYS GO BANANAS',         image: '/games/bonus/bonus-2.png',         provider: 'Hacksaw', category: 'Bonus' },
  { id: 'b3',  title: 'RAGNA RAVENS',               image: '/games/bonus/bonus-3.png',         provider: 'Hacksaw', category: 'Bonus' },
  { id: 'b4',  title: 'NEON VILLAINS',              image: '/games/bonus/bonus-4.png',         provider: 'Hacksaw', category: 'Bonus' },
  { id: 'b5',  title: 'FRUITYLICIOUS',              image: '/games/bonus/bonus-5.png',         provider: 'Hacksaw', category: 'Bonus' },
  { id: 'b6',  title: 'CASH STREAK DICE',           image: '/games/bonus/bonus-6.png',         provider: 'Hacksaw', category: 'Bonus' },
  { id: 'b7',  title: 'LUCKY CLOVERLAND',           image: '/games/bonus/bonus-7.png',         provider: 'Hacksaw', category: 'Bonus' },
  { id: 'b8',  title: 'WILD JOKER STACKS',          image: '/games/bonus/bonus-8.png',         provider: 'Hacksaw', category: 'Bonus' },
];

export default function GamePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const game = ALL_GAMES.find((g) => g.id === id) ?? ALL_GAMES[0];
  const otherGames = ALL_GAMES.filter((g) => g.id !== game.id);

  const [isRealPlay, setIsRealPlay] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  return (
    <div className="w-full min-h-screen bg-[#091741] text-white select-none overflow-x-hidden">
      <div className="flex flex-row items-start w-full max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-6 pt-0 pb-16 gap-3 lg:gap-6">

        {/* Sidebar */}
        <div className="hidden lg:block shrink-0"><Sidebar /></div>
        <div className="lg:hidden"><Sidebar /></div>

        {/* Main content */}
        <div className="w-full min-w-0 flex-1 flex flex-col gap-[40px] pt-4">

          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#A5B8EF] hover:text-white transition-colors cursor-pointer bg-transparent border-0 w-fit"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            <span className="font-semibold text-[14px]">Back to Lobby</span>
          </button>

          {/* Game window + info bar */}
          <div className="flex flex-col gap-[20px] w-full">

            {/* Game window */}
            <div
              className="relative w-full rounded-[16px] overflow-hidden border border-white/10"
              style={{ aspectRatio: '16/9', background: '#071131' }}
            >
              {/* Blurred bg */}
              <div
                className="absolute inset-0 bg-cover bg-center scale-110 blur-lg opacity-30 pointer-events-none"
                style={{ backgroundImage: `url(${game.image})` }}
              />
              {/* Centered game art */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[220px] h-[280px] rounded-[16px] overflow-hidden shadow-2xl border border-white/10">
                  <img src={game.image} alt={game.title} className="w-full h-full object-cover" />
                </div>
              </div>
              {/* Play overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                <button
                  className="w-[72px] h-[72px] rounded-full bg-[#FFC83D] hover:bg-[#ffd362] active:scale-95 flex items-center justify-center shadow-[0_0_30px_rgba(255,200,61,0.5)] transition-all cursor-pointer border-0"
                >
                  <svg width="24" height="28" viewBox="0 0 12 14" fill="none">
                    <path d="M1.5 1.586C1.5 0.771 2.423.298 3.083.779l7.428 5.414c.566.412.566 1.202 0 1.614L3.083 13.221C2.423 13.703 1.5 13.229 1.5 12.414V1.586z" fill="#0C1F56" />
                  </svg>
                </button>
                <span className="font-bold text-[15px] text-white/70 tracking-wider uppercase">
                  {isRealPlay ? 'Click to Play for Real' : 'Click to Play for Fun'}
                </span>
              </div>
            </div>

            {/* Info bar */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full rounded-[16px] bg-[#0C1F56] px-5 lg:px-[30px] py-4 lg:py-0 lg:h-[76px] gap-4 lg:gap-0 border border-white/5">

              {/* Left: provider + title */}
              <div className="flex items-center gap-4 lg:gap-[32px]">
                <div className="flex items-center justify-center h-[36px] px-3 rounded-[6px] bg-[#112F82] border border-white/10">
                  <span className="font-bold text-[12px] text-white tracking-widest uppercase">{game.provider}</span>
                </div>
                <div className="hidden lg:block h-[28px] w-px bg-white/20" />
                <span className="font-jost font-bold text-[18px] lg:text-[20px] text-white">{game.title}</span>
                <span className="text-[11px] font-semibold text-[#A5B8EF] bg-[#112F82] px-2 py-0.5 rounded">{game.category}</span>
              </div>

              {/* Right: actions */}
              <div className="flex items-center gap-6 lg:gap-[40px]">
                {/* Favorite */}
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="flex items-center justify-center w-[20px] h-[20px] cursor-pointer bg-transparent border-0 transition-transform hover:scale-110"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={isFavorite ? '#FFC83D' : 'none'} stroke={isFavorite ? '#FFC83D' : '#A5B8EF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>

                {/* Fun / Real toggle */}
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-semibold text-[#A5B8EF] whitespace-nowrap">Fun Play</span>
                  <button
                    onClick={() => setIsRealPlay(!isRealPlay)}
                    className={`flex h-[24px] w-[44px] rounded-full items-center transition-colors duration-200 cursor-pointer border-0 px-[3px] ${isRealPlay ? 'bg-[#1463FF] justify-end' : 'bg-[#112F82] justify-start'}`}
                  >
                    <span className="w-[18px] h-[18px] rounded-full bg-white block" />
                  </button>
                  <span className="text-[12px] font-bold text-white whitespace-nowrap">Real Play</span>
                </div>
              </div>
            </div>
          </div>

          {/* Other games you might like */}
          <div className="flex flex-col gap-[20px] w-full">

            {/* Header */}
            <div className="flex items-center justify-between w-full h-[30px]">
              <div className="flex items-center gap-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2l2.4 4.86 5.36.78-3.88 3.78.92 5.34L12 14.27l-4.8 2.49.92-5.34L4.24 7.64l5.36-.78L12 2z" fill="#FFC83D" />
                </svg>
                <h2 className="font-jost font-extrabold text-[18px] lg:text-[20px] text-white uppercase tracking-wide">
                  OTHER GAMES YOU MIGHT LIKE
                </h2>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-[12px] font-semibold text-[#D2DCF7] cursor-pointer hover:text-white transition-colors hidden sm:block"
                  onClick={() => router.push('/')}>
                  View all
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => { scrollRef.current?.scrollBy({ left: -480, behavior: 'smooth' }); setTimeout(checkScroll, 350); }}
                    disabled={!canScrollLeft}
                    className="w-[30px] h-[30px] rounded-[4px] bg-[#112F82] hover:bg-[#1463FF] disabled:opacity-40 flex items-center justify-center cursor-pointer border-0 transition-colors"
                  >
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M5 9L1 5L5 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  <button
                    onClick={() => { scrollRef.current?.scrollBy({ left: 480, behavior: 'smooth' }); setTimeout(checkScroll, 350); }}
                    disabled={!canScrollRight}
                    className="w-[30px] h-[30px] rounded-[4px] bg-[#112F82] hover:bg-[#1463FF] disabled:opacity-40 flex items-center justify-center cursor-pointer border-0 transition-colors"
                  >
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M1 9L5 5L1 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Cards */}
            <div
              ref={scrollRef}
              onScroll={checkScroll}
              className="flex flex-row gap-[12px] overflow-x-auto scroll-smooth w-full h-[200px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {otherGames.map((g) => (
                <div
                  key={g.id}
                  onClick={() => router.push(`/game/${g.id}`)}
                  className="w-[152px] h-[200px] flex-none rounded-[12px] relative overflow-hidden bg-[#0C1F56] cursor-pointer group transition-all duration-300 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${g.image})` }}
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-[4px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-[44px] h-[44px] rounded-full bg-[#FFC83D] flex items-center justify-center shadow-[0_4px_12px_rgba(255,200,61,0.4)] hover:scale-110 active:scale-95 transition-transform">
                      <svg width="12" height="14" viewBox="0 0 12 14" fill="none" className="ml-[2px]">
                        <path d="M1.5 1.586C1.5 0.771 2.423.298 3.083.779l7.428 5.414c.566.412.566 1.202 0 1.614L3.083 13.221C2.423 13.703 1.5 13.229 1.5 12.414V1.586z" fill="#0C1F56" />
                      </svg>
                    </div>
                  </div>
                  {/* Title on bottom */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-[10px] font-bold truncate">{g.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
