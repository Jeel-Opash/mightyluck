'use client';

import React from 'react';

interface TransactionsTabProps {
  isMobile: boolean;
}

export default function TransactionsTab({ isMobile }: TransactionsTabProps) {
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
        <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM7 10H17V12H7V10ZM7 14H14V16H7V14ZM7 6H17V8H7V6Z" fill="#A5B8EF" />
      </svg>
      <h4 className={titleClass}>Transaction Ledger</h4>
      <p className={textClass}>
        No recent transactions found. All verified deposits and withdrawals will show here.
      </p>
    </div>
  );
}
