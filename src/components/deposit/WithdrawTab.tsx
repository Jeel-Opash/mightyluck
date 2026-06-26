'use client';

import React from 'react';

interface WithdrawTabProps {
  isMobile: boolean;
}

export default function WithdrawTab({ isMobile }: WithdrawTabProps) {
  const iconSize = isMobile ? '48' : '40';
  const titleClass = isMobile
    ? 'font-jost font-bold text-white text-[16px]'
    : 'font-jost font-bold text-white text-[15px]';
  const textClass = isMobile
    ? 'font-sans text-[12px] text-[#A5B8EF] max-w-[280px]'
    : 'font-sans text-[11px] text-[#A5B8EF] max-w-[260px]';
  const containerClass = isMobile
    ? 'flex flex-col items-center justify-center w-full h-auto gap-4 text-center select-none py-8 shrink-0'
    : 'flex flex-col items-center justify-center w-full h-full gap-3 text-center py-4 shrink-0 select-none';

  return (
    <div className={containerClass}>
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 12V16H11V12H8L12 8L16 12H13Z" fill="#A5B8EF" />
      </svg>
      <h4 className={titleClass}>Fast Withdrawals</h4>
      <p className={textClass}>
        To request a withdrawal, please verify your email and complete your active bonus wagering requirements.
      </p>
    </div>
  );
}
