'use client';

import React, { useState } from 'react';

interface WithdrawTabProps {
  isMobile: boolean;
}

export default function WithdrawTab({ isMobile }: WithdrawTabProps) {
  const [verificationStarted, setVerificationStarted] = useState(false);

  const steps = [
    { id: 1, label: 'Confirm personal details' },
    { id: 2, label: 'Upload identity document' },
    { id: 3, label: 'Upload proof of address' },
  ];

  if (verificationStarted) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full text-center py-6 select-none animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-center w-[84px] h-[84px] rounded-full bg-[#1463FF] mb-4 shadow-[0_0_15px_rgba(20,99,255,0.4)]">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17L4 12" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h4 className="font-jost font-bold text-white text-[18px] mb-2">Verification In Progress</h4>
        <p className="font-manrope text-[13px] text-[#A5B8EF] max-w-[280px] leading-relaxed mb-6">
          Our team is currently reviewing your documents. Withdrawals will be enabled once verification is complete.
        </p>
        <button
          onClick={() => setVerificationStarted(false)}
          className="w-full max-w-[300px] h-[48px] bg-[#112F82] hover:bg-[#1a44bb] rounded-lg flex items-center justify-center font-sans font-bold text-[14px] text-white cursor-pointer active:scale-95 transition-all"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full h-full text-center select-none py-2 shrink-0">
      {/* Title */}
      <h3 className="font-jost font-black text-white text-[20px] md:text-[22px] leading-tight tracking-[0.01em] mb-1">
        Verify your account
      </h3>
      
      {/* Subtitle */}
      <p className="font-manrope font-medium text-[13px] md:text-[14px] text-[#A5B8EF] leading-relaxed max-w-[340px] mb-6">
        For security reasons, withdrawals are available only after KYC verification is completed.
      </p>

      {/* Steps List */}
      <div className="flex flex-col gap-3 w-full max-w-[380px] mb-6">
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex flex-row items-center gap-4 w-full h-[54px] bg-[#112F82] border border-white/5 rounded-xl px-4 box-border"
          >
            {/* Step Number Badge */}
            <div className="flex items-center justify-center w-[28px] h-[28px] rounded-[6px] bg-[#1463FF] shrink-0 font-sans font-extrabold text-[14px] text-white">
              {step.id}
            </div>
            {/* Step Label */}
            <span className="font-manrope font-bold text-[14px] text-white text-left">
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 w-full max-w-[380px]">
        <button
          onClick={() => setVerificationStarted(true)}
          className="w-full h-[50px] bg-[#FFC83D] hover:bg-[#ffd362] rounded-lg flex items-center justify-center font-sans font-bold text-[14px] text-[#1A1404] tracking-[0.02em] cursor-pointer active:scale-95 transition-all duration-150 border-none"
        >
          Start verification
        </button>
        <button
          onClick={() => alert('Wager requirements must be met before withdrawing.')}
          className="w-full h-[50px] bg-[#112F82] hover:bg-[#183fa8] rounded-lg flex items-center justify-center font-sans font-bold text-[14px] text-white tracking-[0.02em] cursor-pointer active:scale-95 transition-all duration-150 border-none"
        >
          Preview verified withdrawal
        </button>
      </div>
    </div>
  );
}
