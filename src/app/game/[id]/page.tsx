'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import DepositModal from '@/components/DepositModal';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { openDepositModal, closeDepositModal, toggleSidebar } from '@/redux/features/uiSlice';

const ALL_GAMES = [
  { id: 's1', title: 'ALLY ALIENS', image: '/games/slots/slot-1.png', provider: 'BGaming', category: 'Slots' },
  { id: 's2', title: "ANUBIS' TRIAL", image: '/games/slots/slot-2.png', provider: 'BGaming', category: 'Slots' },
  { id: 's3', title: 'CACTUS GOES NUTS', image: '/games/slots/slot-3.png', provider: 'BGaming', category: 'Slots' },
  { id: 's4', title: "PANTHER'S RICHES", image: '/games/slots/slot-4.png', provider: 'BGaming', category: 'Slots' },
  { id: 's5', title: 'HONEY MONEY MULTIPLIER', image: '/games/slots/slot-5.png', provider: 'BGaming', category: 'Slots' },
  { id: 's6', title: 'POPPING MANIA', image: '/games/slots/slot-6.png', provider: 'BGaming', category: 'Slots' },
  { id: 's7', title: 'DOUBLE WIN COLLECTION', image: '/games/slots/slot-7.png', provider: 'BGaming', category: 'Slots' },
  { id: 's8', title: 'ALLY ALIENS II', image: '/games/slots/slot-1.png', provider: 'BGaming', category: 'Slots' },
  { id: 's9', title: "ANUBIS' TREASURE", image: '/games/slots/slot-2.png', provider: 'BGaming', category: 'Slots' },
  { id: 's10', title: 'CACTUS WILD', image: '/games/slots/slot-3.png', provider: 'BGaming', category: 'Slots' },
  { id: 'o1', title: 'MIGHTY MINES', image: '/games/original/original-1.png', provider: 'Mighty Luck', category: 'Originals' },
  { id: 'o2', title: 'WINTER PLINKO', image: '/games/original/original-2.png', provider: 'Mighty Luck', category: 'Originals' },
  { id: 'o3', title: 'LUCKY CRASH', image: '/games/original/original-3.png', provider: 'Mighty Luck', category: 'Originals' },
  { id: 'o4', title: 'DICE DELUXE', image: '/games/original/original-4.png', provider: 'Mighty Luck', category: 'Originals' },
  { id: 'o5', title: 'WHEEL OF LUCK', image: '/games/original/original-5.png', provider: 'Mighty Luck', category: 'Originals' },
  { id: 'o6', title: 'KENO EXTREME', image: '/games/original/original-6.png', provider: 'Mighty Luck', category: 'Originals' },
  { id: 'o7', title: 'HILO ROYALE', image: '/games/original/original-7.png', provider: 'Mighty Luck', category: 'Originals' },
  { id: 'o8', title: 'LIMBO RUSH', image: '/games/original/original-8.png', provider: 'Mighty Luck', category: 'Originals' },
  { id: 'c1', title: 'CRASH', image: '/games/crash/crash-1.png', provider: 'BGaming', category: 'Crash' },
  { id: 'c2', title: 'CRASH TOUCHDOWN', image: '/games/crash/crash-2.png', provider: 'BGaming', category: 'Crash' },
  { id: 'c3', title: 'CRUSADER', image: '/games/crash/crash-3.png', provider: 'BGaming', category: 'Crash' },
  { id: 'c4', title: 'CRASH BONUS', image: '/games/crash/crash-4.png', provider: 'BGaming', category: 'Crash' },
  { id: 'c5', title: 'CRASH GOAL', image: '/games/crash/crash-5.png', provider: 'BGaming', category: 'Crash' },
  { id: 'c6', title: 'CRASH FRUIT', image: '/games/crash/crash-6.png', provider: 'BGaming', category: 'Crash' },
  { id: 'c7', title: 'CRASH PUCK', image: '/games/crash/crash-7.png', provider: 'BGaming', category: 'Crash' },
  { id: 'c8', title: 'CRASH SPACE', image: '/games/crash/crash-8.png', provider: 'BGaming', category: 'Crash' },
  { id: 't1', title: 'BACCARAT', image: '/games/table/table-1.png', provider: 'Belatra', category: 'Table' },
  { id: 't2', title: 'AMERICAN ROULETTE', image: '/games/table/table-2.png', provider: 'Belatra', category: 'Table' },
  { id: 't3', title: 'LA PARTAGE ROULETTE', image: '/games/table/table-3.png', provider: 'Belatra', category: 'Table' },
  { id: 't4', title: 'DRAGON TIGER', image: '/games/table/table-4.png', provider: 'Belatra', category: 'Table' },
  { id: 't5', title: 'ANDAR BAHAR', image: '/games/table/table-5.png', provider: 'Belatra', category: 'Table' },
  { id: 't6', title: "RIDE'EM POKER", image: '/games/table/table-6.png', provider: 'Belatra', category: 'Table' },
  { id: 't7', title: 'DEUCES AND JOKER', image: '/games/table/table-7.png', provider: 'Belatra', category: 'Table' },
  { id: 't8', title: 'BLACKJACK CLASSIC', image: '/games/table/table-8.png', provider: 'Belatra', category: 'Table' },
  { id: 'b1', title: 'ECHNATON GOLD', image: '/games/bonus/bonus-1.png', provider: 'Hacksaw', category: 'Bonus' },
  { id: 'b2', title: 'MONKEYS GO BANANAS', image: '/games/bonus/bonus-2.png', provider: 'Hacksaw', category: 'Bonus' },
  { id: 'b3', title: 'RAGNA RAVENS', image: '/games/bonus/bonus-3.png', provider: 'Hacksaw', category: 'Bonus' },
  { id: 'b4', title: 'NEON VILLAINS', image: '/games/bonus/bonus-4.png', provider: 'Hacksaw', category: 'Bonus' },
  { id: 'b5', title: 'FRUITYLICIOUS', image: '/games/bonus/bonus-5.png', provider: 'Hacksaw', category: 'Bonus' },
  { id: 'b6', title: 'CASH STREAK DICE', image: '/games/bonus/bonus-6.png', provider: 'Hacksaw', category: 'Bonus' },
  { id: 'b7', title: 'LUCKY CLOVERLAND', image: '/games/bonus/bonus-7.png', provider: 'Hacksaw', category: 'Bonus' },
  { id: 'b8', title: 'WILD JOKER STACKS', image: '/games/bonus/bonus-8.png', provider: 'Hacksaw', category: 'Bonus' },
];

export default function GamePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const dispatch = useAppDispatch();
  const depositModalOpen = useAppSelector((state) => state.ui.depositModalOpen);

  const game = ALL_GAMES.find((g) => g.id === id) ?? ALL_GAMES[0];
  const otherGames = ALL_GAMES.filter((g) => g.id !== game.id);

  const [isRealPlay, setIsRealPlay] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSeoExpanded, setIsSeoExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    checkScroll();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#091741] text-white select-none overflow-x-hidden">
      <div className="flex flex-row items-start w-full max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-6 pt-0 pb-16 gap-3 lg:gap-6">

        {/* Sidebar */}
        <div className="hidden lg:block shrink-0"><Sidebar /></div>
        <div className="lg:hidden"><Sidebar /></div>

        {/* Main content */}
        <div className="w-full min-w-0 flex-1 flex flex-col gap-[50px] pt-4">

          {/* Top content wrapper containing back button and game container */}
          <div className="flex flex-col gap-[40px] w-full max-w-[1136px]">
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
                className="relative w-full h-[220px] xs:h-[280px] sm:h-[380px] md:h-[480px] lg:h-[657px] rounded-[16px] overflow-hidden"
                style={{
                  backgroundImage: "url('/game-1.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              />

              {/* Info / Control Bar */}
              <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-[1136px] min-h-[80px] sm:h-[100px] bg-[#0C1F56] rounded-[16px] py-[16px] sm:py-[12px] px-[20px] sm:px-[30px] gap-4 sm:gap-[12px]">

                {/* Left: provider logo + separator line + title */}
                <div className="flex flex-row items-center gap-4 sm:gap-[32px] w-full sm:w-auto h-[40px] justify-start">
                  {/* Provider Logo */}
                  <div className="w-[80px] h-[40px] flex items-center justify-center shrink-0">
                    <img
                      src="/games/providers/g2.png"
                      alt="Provider logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {/* Vertical Separator Line */}
                  <div className="w-[1px] h-[33px] bg-white/60 shrink-0" />
                  {/* Game Title */}
                  <div className="flex flex-row justify-start items-center shrink-0 w-auto max-w-[150px] h-[29px]">
                    <span className="font-jost font-bold text-[18px] sm:text-[20px] leading-[29px] text-white truncate">
                      {game.title}
                    </span>
                  </div>
                </div>

                {/* Right Actions: expand, like, and switch */}
                <div className="flex flex-row justify-between sm:justify-end items-center gap-6 sm:gap-[40px] w-full sm:w-auto h-[24px]">

                  {/* Expand and Like icons */}
                  <div className="flex flex-row items-center gap-[24px] w-auto h-[20px]">
                    <button className="w-[20px] h-[20px] bg-transparent border-none outline-none cursor-pointer flex items-center justify-center hover:scale-110 transition-transform">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.0885417 0.458333C0.145833 0.328125 0.255208 0.192708 0.364583 0.125L0.546875 0.00520833L6.09375 0L6.29167 0.119792C6.41667 0.197917 6.51562 0.317708 6.57812 0.458333C6.625 0.578125 6.66667 0.755208 6.66667 0.84375C6.66667 0.9375 6.61979 1.11458 6.5625 1.23438C6.48438 1.40104 6.40104 1.48438 6.23958 1.5625C6.03125 1.65625 5.90104 1.66667 2.83854 1.66667L5.14062 3.96875C7.0625 5.89583 7.44792 6.30729 7.47396 6.45833C7.49479 6.55729 7.49479 6.72917 7.47917 6.83333C7.45833 6.96875 7.38021 7.09896 7.23958 7.23958C7.09896 7.38021 6.96875 7.45833 6.83854 7.47917C6.72917 7.49479 6.55729 7.49479 6.45833 7.47396C6.30729 7.44792 5.89583 7.0625 1.66667 2.83854V4.42708C1.66667 5.90104 1.65625 6.03125 1.5625 6.23437C1.48438 6.40104 1.40104 6.48438 1.23958 6.5625C1.11458 6.61979 0.932292 6.66667 0.833333 6.66667C0.734375 6.66667 0.552083 6.61979 0.432292 6.5625C0.270833 6.48958 0.177083 6.39583 0.104167 6.25C0.00520833 6.05208 0 5.9375 0 3.35938C0 0.921875 0.0104167 0.65625 0.0885417 0.458333Z" fill="white" />
                        <path d="M13.4271 0.463542C13.4792 0.328125 13.5885 0.197917 13.6979 0.125L13.8802 0.0104167L19.4271 0L19.6146 0.119792C19.7188 0.182292 19.849 0.322917 19.901 0.432292C19.9948 0.614583 20 0.802083 20 3.32292C20 5.89583 19.9948 6.02604 19.8958 6.23958C19.8177 6.40625 19.7344 6.48438 19.5729 6.5625C19.4479 6.61979 19.2656 6.66667 19.1667 6.66667C19.0677 6.66667 18.8854 6.61979 18.7656 6.5625C18.599 6.48438 18.5156 6.40625 18.4375 6.23958C18.3438 6.03125 18.3333 5.90104 18.3333 2.83854L16.0312 5.14062C14.1042 7.0625 13.6927 7.44792 13.5417 7.47917C13.4427 7.49479 13.2708 7.5 13.1667 7.47917C13.0312 7.45833 12.901 7.38021 12.7604 7.23958C12.6198 7.09896 12.5417 6.96875 12.5208 6.83854C12.5052 6.72917 12.5052 6.5625 12.526 6.45833C12.5521 6.30729 12.9375 5.89583 17.151 1.66667H15.5677C14.099 1.66667 13.9687 1.65625 13.7656 1.5625C13.599 1.48438 13.5156 1.40625 13.4375 1.23958C13.3802 1.11458 13.3333 0.942708 13.3333 0.848958C13.3333 0.755208 13.375 0.583333 13.4271 0.463542Z" fill="white" />
                        <path d="M3.91667 14.9115C5.15625 13.6719 6.23958 12.625 6.32812 12.5781C6.41667 12.5365 6.5625 12.5 6.65625 12.5C6.74479 12.5 6.91146 12.5417 7.01562 12.5885C7.11979 12.6406 7.26042 12.75 7.32292 12.8385C7.39062 12.9219 7.45833 13.0625 7.47917 13.151C7.49479 13.2344 7.49479 13.401 7.47396 13.5156C7.44271 13.7031 7.22917 13.9323 2.83854 18.3333H4.42708C5.90104 18.3333 6.03125 18.3438 6.23437 18.4375C6.40104 18.5156 6.48438 18.599 6.5625 18.7604C6.61979 18.8854 6.66667 19.0573 6.66667 19.151C6.66667 19.2448 6.625 19.4219 6.57812 19.5417C6.51562 19.6771 6.41667 19.8021 6.09375 20H0.572917L0.385417 19.8802C0.28125 19.8177 0.151042 19.6771 0.0989583 19.5677C0.00520833 19.3854 0 19.1979 0 16.6771C0 14.1042 0.00520833 13.974 0.104167 13.7604C0.182292 13.599 0.265625 13.5156 0.432292 13.4375C0.552083 13.3802 0.734375 13.3333 0.833333 13.3333C0.932292 13.3333 1.11458 13.3802 1.23958 13.4375C1.40104 13.5156 1.48438 13.599 1.5625 13.7604C1.65625 13.9688 1.66667 14.099 1.66667 17.1615L3.91667 14.9115Z" fill="white" />
                        <path d="M12.6771 12.8385C12.7396 12.75 12.875 12.6406 12.974 12.5885C13.0729 12.5417 13.2292 12.5 13.3229 12.5C13.4115 12.5 13.5521 12.5208 13.6354 12.5521C13.7135 12.5833 14.8021 13.6302 18.3333 17.1615V15.5729C18.3333 14.099 18.3438 13.9688 18.4375 13.7604C18.5156 13.599 18.599 13.5156 18.7656 13.4375C18.8854 13.3802 19.0677 13.3333 19.1667 13.3333C19.2656 13.3333 19.4479 13.3802 19.5729 13.4375C19.7292 13.5104 19.8229 13.599 19.8958 13.75C19.9948 13.9479 20 14.0625 20 16.6406C20 19.0781 19.9896 19.3438 19.9115 19.5417C19.849 19.6771 19.75 19.8021 19.4271 20H13.9062L13.7135 19.8802C13.5833 19.8021 13.4844 19.6771 13.4271 19.5417C13.375 19.4219 13.3333 19.2448 13.3333 19.151C13.3333 19.0573 13.3802 18.8854 13.4375 18.7604C13.5156 18.599 13.599 18.5156 13.7656 18.4375C13.9687 18.3438 14.099 18.3333 17.1615 18.3333L14.8594 16.026C12.7708 13.9323 12.5573 13.7031 12.526 13.5156C12.5052 13.401 12.5052 13.2344 12.5208 13.151C12.5417 13.0625 12.6094 12.9219 12.6771 12.8385Z" fill="white" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className="w-[20px] h-[20px] bg-transparent border-none outline-none cursor-pointer flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10 5.83337C10 5.83337 10 5.83337 9.24 4.83337C8.36 3.67337 7.06 2.83337 5.5 2.83337C3.01 2.83337 1 4.84337 1 7.33337C1 8.26337 1.28 9.12337 1.76 9.83337C2.57 11.0434 10 18.8334 10 18.8334M10 5.83337C10 5.83337 10 5.83337 10.76 4.83337C11.64 3.67337 12.94 2.83337 14.5 2.83337C16.99 2.83337 19 4.84337 19 7.33337C19 8.26337 18.72 9.12337 18.24 9.83337C17.43 11.0434 10 18.8334 10 18.8334"
                          stroke={isFavorite ? "#FF4B4B" : "white"}
                          fill={isFavorite ? "#FF4B4B" : "none"}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Fun / Real Play Switch */}
                  <div className="flex flex-row items-center gap-[8px] w-auto h-[24px]">
                    <span className="font-manrope font-semibold text-[12px] leading-[16px] text-[#A5B8EF] tracking-[0.02em] whitespace-nowrap select-none">
                      Fun Play
                    </span>

                    {/* Toggle button */}
                    <button
                      onClick={() => setIsRealPlay(!isRealPlay)}
                      className={`flex flex-row items-center w-[42px] h-[24px] rounded-[30px] border-none outline-none cursor-pointer transition-all duration-300 ${isRealPlay ? 'bg-[#1463FF] pl-[20px] pr-[3px] py-[3px]' : 'bg-[#112F82] pl-[3px] pr-[20px] py-[3px]'
                        }`}
                    >
                      <div className="w-[18px] h-[18px] bg-white rounded-[30px] shrink-0" />
                    </button>

                    <span className={`font-manrope text-[12px] leading-[16px] tracking-[0.02em] whitespace-nowrap select-none transition-colors duration-200 ${isRealPlay ? 'font-bold text-white' : 'font-semibold text-[#A5B8EF]'
                      }`}>
                      Real Play
                    </span>
                  </div>

                </div>

              </div>
            </div>
          </div>

          <div className="game-section-container w-full max-w-[1136px]">

            <div className="game-section-header">

              <div className="game-section-title-wrapper">
                <div className="game-section-icon">
                  <svg viewBox="0 0 34 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path
                      d="M33.1198 7.41853L24.191 11.0541C23.9175 11.1662 23.6056 11.0595 23.4552 10.8051L17.478 0.292432C17.2455 -0.104222 16.6655 -0.0960149 16.4467 0.308846L10.1796 10.8325C10.0346 11.1006 9.70631 11.2155 9.42455 11.0951L0.826733 7.41853C0.36169 7.21883 -0.122501 7.65925 0.027954 8.14071L5.1106 24.3269C5.18719 24.5731 5.41698 24.7427 5.67685 24.7427L27.4354 24.7482C27.6843 24.7482 27.9059 24.5923 27.9934 24.3598L33.9022 8.1708C34.0773 7.68661 33.5986 7.2243 33.1226 7.41853H33.1198ZM20.602 15.2668L16.351 22.7896C16.2908 22.8962 16.1321 22.8552 16.1266 22.7348L15.9543 18.1802H14.4689V18.1637C14.4306 18.1692 14.3923 18.1802H11.2683C11.178 18.1802 11.1206 18.0817 11.1616 18.0023L15.7437 9.51395C15.9051 9.23493 16.2005 9.06532 16.5206 9.06532H19.6035C19.6938 9.06532 19.7512 9.1638 19.7102 9.24313L16.5534 15.089H20.4953C20.5883 15.089 20.6458 15.1875 20.5993 15.2695L20.602 15.2668Z"
                      fill="#FFBF1F"
                    />
                  </svg>
                </div>
                <h2 className="game-section-title">
                  OTHER GAMES YOU MIGHT LIKE
                </h2>
              </div>

              <div className="game-section-actions-wrapper">
                <span
                  onClick={() => router.push('/')}
                  className="game-section-view-all"
                >
                  View all
                </span>

                {/* Navigation arrows */}
                <div className="game-section-nav">
                  {/* Left scroll */}
                  <button
                    onClick={() => { scrollRef.current?.scrollBy({ left: -480, behavior: 'smooth' }); setTimeout(checkScroll, 350); }}
                    disabled={!canScrollLeft}
                    className="game-section-btn"
                  >
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                      <path d="M5 9L1 5L5 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {/* Right scroll */}
                  <button
                    onClick={() => { scrollRef.current?.scrollBy({ left: 480, behavior: 'smooth' }); setTimeout(checkScroll, 350); }}
                    disabled={!canScrollRight}
                    className="game-section-btn"
                  >
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                      <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>

            </div>

            {/* Cards List container */}
            <div
              ref={scrollRef}
              onScroll={checkScroll}
              className="game-cards-slider scrollbar-none"
            >
              {otherGames.map((g) => (
                <div
                  key={g.id}
                  onClick={() => router.push(`/game/${g.id}`)}
                  className="w-[152px] h-[200px] flex-none rounded-[12px] relative overflow-hidden bg-[#0C1F56] cursor-pointer group transition-all duration-300 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] game-card"
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

          {/* Child 2: SEO Text Area */}
          <div className="flex flex-col items-start p-0 gap-[40px] w-full max-w-[1136px] mx-auto select-none pt-[40px]">
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

          {/* Crypto payment method badges row */}
          <section className="w-full max-w-[1136px] h-auto py-6 md:h-[100px] flex flex-col md:flex-row justify-between items-center px-[20px] md:px-[40px] border-b border-[#112F82] relative overflow-hidden shrink-0 select-none">
            <div className="absolute w-[390px] h-[390px] left-[calc(50%-195px)] top-[77px] bg-[#1463FF] rounded-full filter blur-[50px] opacity-80 pointer-events-none z-0" />
            <div className="flex flex-row flex-wrap justify-center items-center gap-[16px] md:gap-[28px] mx-auto z-10">
              {Array.from({ length: 11 }, (_, i) => (
                <img
                  key={i}
                  src={`/games/deposite-icon/d${i + 1}.svg`}
                  alt={`Crypto Method ${i + 1}`}
                  className="h-[19.05px] w-auto object-contain filter brightness-0 invert hover:scale-110 transition-all duration-300 cursor-pointer"
                  style={{ color: '#FFFFFF' }}
                />
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="w-full max-w-[1136px] flex flex-col gap-[48px] select-none text-white pb-[40px]">

            {/* Top Row: logo + menus */}
            <div className="w-full flex flex-col md:flex-row justify-between items-start gap-[49px]">

              {/* Logo + copyright */}
              <div className="flex flex-col items-start gap-[16px] w-[213px] shrink-0">
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
                    <g transform="translate(49, 0) scale(1.09)">
                      <image href="/images/logo.svg" width="34" height="25" />
                    </g>
                    <text x="18" y="47" fontFamily="Jost, sans-serif" fontWeight="800" fontSize="12" letterSpacing="1.2" fill="#FFFFFF">MIGHTY</text>
                    <text x="78" y="47" fontFamily="Jost, sans-serif" fontWeight="800" fontSize="12" letterSpacing="1.2" fill="url(#gLogoU)">LUCK</text>
                  </svg>
                </div>
                <span className="font-sans font-semibold text-[11px] leading-[15px] tracking-[0.01em] text-[#D2DCF7] w-[213px]">
                  © 2026 Mighty Luck. All rights reserved.
                </span>
              </div>

              {/* Menu columns wrapper */}
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
                    {['Roulette', 'Blackjack', 'Baccarat', 'Table Games', 'Video Poker'].map((item) => (
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
                    {['About Us', 'Promotions', 'Tournaments', 'Affiliate Program', 'Vip Club', 'Refer a Friend', 'Blog', 'Bonus Shop'].map((item) => (
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
                    {['Privacy Policy', 'Terms & Conditions', 'Disclaimers', 'Responsible Gambling', 'Payment Methods', 'Sportsbook Rules'].map((item) => (
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
                    {['Live Support'].map((item) => (
                      <span key={item} className="w-[120px] font-sans font-semibold text-[11px] leading-[15px] tracking-[0.01em] text-[#D2DCF7] cursor-pointer hover:text-white transition-colors">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Row: license, badges */}
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-[24px] pt-[24px] border-t border-[#112F82]">
              <p className="w-full md:w-[445px] font-sans font-semibold text-[10px] leading-[14px] text-justify text-[#D2DCF7]">
                MightyLuck.com is owned and operated by Company Name B.V. a company that is incorporated under the laws of Curacao with company registration number XXXXXX, having its registered address at Street 3XX9, City, Curaçao. MightyLuck.com is licensed and holds a valid Certificate of Operation (ABC/XXXX/XXX/XXXX).
              </p>
              <div className="flex flex-row items-center gap-[32px] h-[38px] shrink-0">
                <img src="/games/footer/18plus.svg" className="w-[38px] h-[38px] object-contain cursor-pointer opacity-80 hover:opacity-100 transition-opacity" alt="18+" />
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
    </div>
  );
}
