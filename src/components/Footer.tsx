'use client';

import React, { useState } from 'react';

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps = {}) {
  const [isSeoExpanded, setIsSeoExpanded] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    'slot-games': false,
    'live-casino': false,
    'casino': false,
    'legal': false,
    'support': false,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const columns = [
    {
      id: 'slot-games',
      title: 'Slot Games',
      items: ['Slots', 'Skill Games', 'Jackpot', 'Bonus Buy', 'Crash Games'],
    },
    {
      id: 'live-casino',
      title: 'Live Casino',
      items: ['Roulette', 'Blackjack', 'Live Casino', 'Table Games', 'Video Poker'],
    },
    {
      id: 'casino',
      title: 'Casino',
      items: ['About Us', 'Promotions', 'Tournaments', 'Affiliate Program', 'VIP Club', 'Refer a Friend', 'Blog', 'Bonus Shop'],
    },
    {
      id: 'legal',
      title: 'Legal',
      items: ['Privacy Policy', 'Terms & Conditions', 'Bonus Terms', 'Responsible Gambling', 'Payment Methods', 'Sportsbook Rules'],
    },
    {
      id: 'support',
      title: 'Support',
      items: ['Live Support'],
    },
  ];

  return (
    <div className={className || "w-full flex flex-col gap-[40px] md:gap-[100px] mt-[40px] md:mt-[100px]"}>
      
      {/* Child 1: SEO Text Area */}
      <div className="flex flex-col items-start p-0 w-full max-w-[1136px] mx-auto select-none px-4 md:px-0">
        <div className="flex flex-col items-center p-0 w-full isolate relative">
          <div
            className={`w-full max-w-[800px] flex flex-col gap-[24px] md:gap-[32px] overflow-hidden transition-all duration-500 ease-in-out ${
              isSeoExpanded ? 'max-h-[2500px]' : 'max-h-[590px] md:max-h-[660px]'
            }`}
          >
            {/* Play the Best Crypto Casino Games... */}
            <div className="flex flex-col items-start p-0 gap-[16px] md:gap-[24px] w-full">
              <h1 className="w-full font-jost font-bold text-[22px] md:text-[32px] leading-[120%] tracking-[-0.02em] text-white">
                Play the Best Crypto Casino Games Online at Mighty Luck — Fast, Fair and Secure
              </h1>
              <div className="flex flex-col gap-[16px] w-full font-manrope font-medium text-[16px] leading-[160%] text-[#D2DCF7]">
                <p>
                  Step into a next-generation gaming experience where every spin, bet, and hand is powered by blockchain technology. At Mighty Luck Casino, you can explore more than 9,000 crypto casino games across slots, table games, live dealer games, and crash-style favorites. As one of the top crypto casinos online, Mighty Luck gives players instant withdrawals, enhanced privacy, and a secure gambling environment without the friction of traditional payment methods.
                </p>
                <p>
                  Whether you're here to play table games, explore Bitcoin casino games, or try the latest provably fair slots, Mighty Luck delivers one of the most complete online casino experiences available today.
                </p>
                <p>Ready to play games and win real crypto?</p>
                <p>Start playing crypto casino games at Mighty Luck Casino.</p>
              </div>
            </div>

            {/* Why Mighty Luck Is the Ultimate Place... */}
            <div className="flex flex-col items-start p-0 gap-[12px] md:gap-[16px] w-full">
              <h2 className="w-full font-jost font-bold text-[18px] md:text-[24px] leading-[26px] md:leading-[35px] text-white">
                Why Mighty Luck Is the Ultimate Place to Play Crypto Casino Games
              </h2>
              <p className="w-full font-manrope font-medium text-[16px] leading-[160%] text-[#D2DCF7]">
                Mighty Luck Casino offers the perfect blend of crypto gambling convenience, online casino entertainment, and world-class security. Compared to traditional online casinos, Mighty Luck delivers significantly faster payouts, more generous bonuses, and an unmatched selection of various games.
              </p>
            </div>

            {/* Massive Game Variety */}
            <div className="flex flex-col items-start p-0 gap-[16px] w-full">
              <h2 className="w-full font-jost font-bold text-[18px] md:text-[24px] leading-[26px] md:leading-[35px] text-white">
                Massive Game Variety
              </h2>
              <p className="w-full font-manrope font-medium text-[16px] leading-[160%] text-[#D2DCF7]">
                With more than 9,000 casino games, Mighty Luck outshines many crypto casinos and traditional casinos alike. You'll find slots, card games, custom crash formats, and high-stakes tables to suit any gaming budget.
              </p>
            </div>
          </div>

          {/* Fade Overlay & Read more / Read less button */}
          {!isSeoExpanded && (
            <div
              className="absolute bottom-0 left-0 right-0 h-[200px] flex flex-col justify-end items-center pb-[24px] z-10 pointer-events-none"
              style={{ background: 'linear-gradient(0deg, #091741 0%, rgba(9, 23, 65, 0) 100%)' }}
            >
              <button
                onClick={() => setIsSeoExpanded(true)}
                className="flex flex-row items-center justify-center p-0 gap-[4px] w-[93px] h-[19px] bg-transparent border-none outline-none cursor-pointer group pointer-events-auto select-none"
              >
                <span className="font-manrope font-semibold text-[14px] leading-[19px] tracking-[0.01em] text-[#FFBF1F] group-hover:text-white transition-colors">
                  Read more
                </span>
                <div className="w-[16px] h-[16px] flex items-center justify-center relative">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:scale-110">
                    <path d="M1 1L5 5L9 1" stroke="#FFBF1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>
            </div>
          )}

          {isSeoExpanded && (
            <div className="flex justify-center w-full z-10 mt-[24px]">
              <button
                onClick={() => setIsSeoExpanded(false)}
                className="flex flex-row items-center justify-center p-0 gap-[4px] w-[93px] h-[19px] bg-transparent border-none outline-none cursor-pointer group select-none"
              >
                <span className="font-manrope font-semibold text-[14px] leading-[19px] tracking-[0.01em] text-[#FFBF1F] group-hover:text-white transition-colors">
                  Read less
                </span>
                <div className="w-[16px] h-[16px] flex items-center justify-center relative">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-180 transition-transform duration-300 group-hover:scale-110">
                    <path d="M1 1L5 5L9 1" stroke="#FFBF1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Child 2: CRYPTO PAYMENT METHOD FOOTER ICONS */}
      <section className="w-full h-auto py-6 md:h-[100px] flex flex-col md:flex-row justify-between items-center px-[20px] md:px-[40px] border-b border-[#112F82] relative overflow-hidden shrink-0 select-none">
        <div className="absolute w-[390px] h-[390px] left-[calc(50%-195px)] top-[77px] bg-[#1463FF] rounded-full filter blur-[50px] opacity-80 pointer-events-none z-0" />
        <div className="flex flex-row flex-wrap justify-center items-center gap-[16px_31px] md:gap-[28px] max-w-[334px] md:max-w-none mx-auto z-10">
          {Array.from({ length: 11 }, (_, i) => (
            <img
              key={i}
              src={`/games/deposite-icon/d${i + 1}.svg`}
              alt={`Crypto Method ${i + 1}`}
              className="h-[19.05px] w-auto object-contain filter brightness-0 invert hover:scale-110 transition-all duration-300 cursor-pointer"
            />
          ))}
        </div>
      </section>

      {/* Child 3: MAIN WEBSITE FOOTER */}
      <footer className="w-full flex flex-col gap-[40px] md:gap-[48px] select-none text-white pb-[100px] md:pb-[40px] px-4 md:px-0">
        
        {/* Top Row: logo + menus */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-start gap-[40px] md:gap-[49px]">
          
          {/* Logo + copyright */}
          <div className="flex flex-col items-center md:items-start gap-[16px] w-[213px] shrink-0 text-center md:text-left">
            <div className="w-[132px] h-[50px] relative">
              <svg width="132" height="50" viewBox="0 0 132 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="gLogoU" x1="0" y1="0" x2="132" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="12%" stopColor="#FFD85A" />
                    <stop offset="86.68%" stopColor="#FFB800" />
                  </linearGradient>
                </defs>
                <g transform="translate(49, 0) scale(1.09)">
                  <image href="/images/logo.svg" width="34" height="25" />
                </g>
                <text x="18" y="47" fontFamily="Jost, sans-serif" fontWeight="800" fontSize="12" letterSpacing="1.2" fill="#FFFFFF">MIGHTY</text>
                <text x="78" y="47" fontFamily="Jost, sans-serif" fontWeight="800" fontSize="12" letterSpacing="1.2" fill="url(#gLogoU)">LUCK</text>
              </svg>
            </div>
            <span className="font-manrope font-semibold text-[11px] leading-[15px] tracking-[0.01em] text-[#D2DCF7] w-[213px]">
              @ 2026 Mighty Luck. All rights reserved.
            </span>
          </div>

          {/* Mobile Accordions / Desktop Menu Columns */}
          <div className="flex flex-col md:flex-row items-stretch md:items-start gap-[20px] md:gap-[32px] w-full md:w-[728px]">
            {columns.map((col) => (
              <div key={col.id} className="flex flex-col border-b border-white/5 md:border-b-0 pb-3 md:pb-0 w-full md:w-[120px] shrink-0">
                
                {/* Accordion Header (Mobile) / Column Header (Desktop) */}
                <div
                  onClick={() => toggleAccordion(col.id)}
                  className="flex flex-row justify-between items-center md:pointer-events-none md:cursor-default cursor-pointer py-2 md:py-0 w-full"
                >
                  <h3 className="font-jost font-bold text-[16px] md:text-[12px] leading-[23px] md:leading-[17px] tracking-[0.02em] uppercase text-white">
                    {col.title}
                  </h3>
                  {/* Chevron only on mobile */}
                  <div className="block md:hidden w-[24px] h-[24px] flex items-center justify-center">
                    <svg
                      width="10"
                      height="5"
                      viewBox="0 0 10 5"
                      fill="none"
                      className={`transition-transform duration-300 ${openAccordions[col.id] ? 'rotate-180' : ''}`}
                    >
                      <path d="M1 1L5 4L9 1" stroke="#A5B8EF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                {/* Sub-links List */}
                <div
                  className={`flex-col gap-[12px] md:gap-[8px] mt-[12px] md:mt-[12px] transition-all duration-300 md:flex ${
                    openAccordions[col.id] ? 'flex' : 'hidden md:flex'
                  }`}
                >
                  {col.items.map((item) => (
                    <span
                      key={item}
                      className="font-manrope font-semibold text-[14px] md:text-[11px] leading-[19px] md:leading-[15px] tracking-[0.01em] text-[#D2DCF7] cursor-pointer hover:text-white transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* Bottom strip — border-top, legal + badges */}
        <div className="w-full border-t border-[#112F82] pt-[60px] md:pt-[48px] flex flex-col md:flex-row justify-between items-center md:items-start gap-[40px] md:gap-6">
          <p className="font-manrope font-semibold text-[10px] leading-[14px] text-center md:text-justify tracking-[0.01em] text-[#D2DCF7] w-full md:w-[445px]">
            MightyLuck.com is owned and operated by Company Name B.V. a company that is incorporated under the laws of Curacao with company registration number XXXXXX, having its registered address at Street 3XX9, City, Curaçao. MightyLuck.com is licensed and holds a valid Certificate of Operation (ABC/XXXX/XXX/XXXX).
          </p>
          <div className="flex flex-row items-center justify-center md:justify-end gap-[30px] md:gap-[32px] w-full md:w-[288.5px] h-[38px] shrink-0">
            <img src="/games/footer/18.svg" className="w-[38px] h-[38px] object-contain cursor-pointer opacity-80 hover:opacity-100 transition-opacity" alt="18+" />
            <img src="/games/footer/gamble-aware.svg" className="w-[120px] h-[24px] object-contain cursor-pointer opacity-80 hover:opacity-100 transition-opacity" alt="Gamble Aware" />
            <img src="/games/footer/gaming-license.svg" className="w-[66.5px] h-[38px] object-contain cursor-pointer opacity-80 hover:opacity-100 transition-opacity" alt="GCB License Curacao" />
          </div>
        </div>

      </footer>
    </div>
  );
}
