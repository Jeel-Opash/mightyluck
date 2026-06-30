'use client';

import React, { useState } from 'react';

interface WithdrawTabProps {
  isMobile: boolean;
  verificationStep: number;
  setVerificationStep: (step: number) => void;
}

export default function WithdrawTab({
  isMobile,
  verificationStep,
  setVerificationStep,
}: WithdrawTabProps) {
  // Form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [country, setCountry] = useState('United States');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  // No file upload states needed (static design only)
  const [withdrawAmount, setWithdrawAmount] = useState('100');
  const [destinationAddress, setDestinationAddress] = useState('');

  const countries = [
    { name: 'United States', image: '/images/america.svg' },
    { name: 'United Kingdom', image: '/images/uk.svg' },
    { name: 'Germany', image: '/images/germany.svg' },
    { name: 'Ukraine', image: '/images/ukraine.svg' },
    { name: 'India', image: '/images/india.svg' },
  ];

  const FlagIcon = ({ name, size = 20 }: { name: string; size?: number }) => {
    const found = countries.find(c => c.name === name);
    if (found) {
      return (
        <img
          src={found.image}
          alt={name}
          width={size}
          height={size}
          className="object-cover rounded-full shrink-0 block"
          style={{ width: `${size}px`, height: `${size}px` }}
        />
      );
    }
    return <span style={{ fontSize: `${size}px`, lineHeight: 1 }} className="shrink-0">🇺🇸</span>;
  };

  const stepsOverview = [
    { id: 1, label: 'Confirm personal details' },
    { id: 2, label: 'Upload identity document' },
    { id: 3, label: 'Upload proof of address' },
  ];



  // SCREEN 4: Withdrawal Requested Success
  if (verificationStep === 4) {
    if (isMobile) {
      return (
        <div className="flex flex-col items-center w-full select-none py-2 gap-[16px] animate-in fade-in zoom-in-95 box-border">
          {/* Lock circle container */}
          <div className="flex flex-row justify-center items-center w-full h-[120px]">
            <div className="w-[120px] h-[120px] relative">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="60" r="58" stroke="#112F82" strokeWidth="4" />
                <path d="M 60,2 A 58,58 0 0,1 60,118" stroke="#1463FF" strokeWidth="4" strokeLinecap="round" />
                <circle cx="60" cy="60" r="35" fill="#1463FF" />
                <g transform="translate(49.2, 45.5)">
                  <path d="M6 10V6.5C6 3.46 8.46 1 11.5 1C14.54 1 17 3.46 17 6.5V10H18C19.66 10 21 11.34 21 13V23C21 24.66 19.66 26 18 26H5C3.34 26 2 24.66 2 23V13C2 11.34 3.34 10 5 10H6ZM8 10H15V6.5C15 4.57 13.43 3 11.5 3C9.57 3 8 4.57 8 6.5V10Z" fill="#FFFFFF" />
                </g>
              </svg>
            </div>
          </div>

          {/* Title & subtitle container */}
          <div className="flex flex-col items-center gap-[6px] w-full text-center px-2">
            <span className="font-manrope font-bold text-[18px] leading-[24px] text-white text-center tracking-[0.02em] block w-full" style={{ fontFamily: "var(--font-sans), sans-serif" }}>
              Withdrawal requested
            </span>
            <span className="font-manrope font-medium text-[11px] leading-[15px] text-[#A5B8EF] text-center tracking-[0.02em] block w-full" style={{ fontFamily: "var(--font-sans), sans-serif" }}>
              Your withdrawal request was successfully submitted.<br />Our payments team is now reviewing it
            </span>
          </div>

          {/* Details table box */}
          <div className="flex flex-col justify-center items-start gap-[8px] w-full bg-[#112F82] rounded-lg p-[16px] box-border">
            <div className="flex flex-row justify-between items-center w-full">
              <span className="font-manrope font-semibold text-[10px] text-[#A5B8EF]" style={{ fontFamily: "var(--font-sans), sans-serif" }}>Amount</span>
              <span className="font-manrope font-bold text-[12px] text-white" style={{ fontFamily: "var(--font-sans), sans-serif" }}>
                ${parseFloat(withdrawAmount) ? parseFloat(withdrawAmount).toFixed(2) : '100.00'}
              </span>
            </div>
            <div className="w-full border-t border-dashed border-[#193EA5] my-[4px]" />
            <div className="flex flex-row justify-between items-center w-full">
              <span className="font-manrope font-semibold text-[10px] text-[#A5B8EF]" style={{ fontFamily: "var(--font-sans), sans-serif" }}>Method</span>
              <span className="font-manrope font-bold text-[12px] text-white" style={{ fontFamily: "var(--font-sans), sans-serif" }}>Bitcoin</span>
            </div>
            <div className="w-full border-t border-dashed border-[#193EA5] my-[4px]" />
            <div className="flex flex-row justify-between items-center w-full">
              <span className="font-manrope font-semibold text-[10px] text-[#A5B8EF]" style={{ fontFamily: "var(--font-sans), sans-serif" }}>Estimated arrival</span>
              <span className="font-manrope font-bold text-[12px] text-white" style={{ fontFamily: "var(--font-sans), sans-serif" }}>1-24 hours</span>
            </div>
            <div className="w-full border-t border-dashed border-[#193EA5] my-[4px]" />
            <div className="flex flex-row justify-between items-center w-full">
              <span className="font-manrope font-semibold text-[10px] text-[#A5B8EF]" style={{ fontFamily: "var(--font-sans), sans-serif" }}>Status</span>
              <div className="flex flex-row justify-center items-center px-[8px] py-[4px] bg-[#0C1F56] rounded-[4px] shrink-0">
                <span className="font-manrope font-semibold text-[10px] text-[#4886FF] whitespace-nowrap" style={{ fontFamily: "var(--font-sans), sans-serif" }}>Pending review</span>
              </div>
            </div>
          </div>

          {/* Help & Back button */}
          <div className="flex flex-col gap-[12px] w-full mt-2">
            <div className="flex flex-row justify-center items-center gap-[8px] w-full">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z" stroke="#7795E8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 8V8.01" stroke="#7795E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.5 4.5C4.5 3.67 5.17 3 6 3C6.83 3 7.5 3.67 7.5 4.5C7.5 5.33 6.83 6 6 6" stroke="#7795E8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-manrope font-semibold text-[10px] text-[#7795E8]" style={{ fontFamily: "var(--font-sans), sans-serif" }}>
                Having problems? <span className="text-[#FFC83D] cursor-pointer hover:underline">Contact support</span>
              </span>
            </div>
            <button
              onClick={() => setVerificationStep(3)}
              className="w-full h-[50px] bg-[#112F82] hover:brightness-110 rounded-lg flex items-center justify-center font-sans font-bold text-[14px] text-[#D2DCF7] tracking-[0.02em] cursor-pointer active:scale-95 transition-all border-none"
              style={{ fontFamily: "var(--font-sans), sans-serif" }}
            >
              Back to withdrawal form
            </button>
          </div>
        </div>
      );
    }

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0px',
          gap: '20px',
          width: '428px',
          height: '365px',
        }}
        className="select-none animate-in fade-in zoom-in-95 shrink-0"
      >
        {/* Lock circle container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0px',
            width: '428px',
            height: '120px',
          }}
        >
          <div style={{ width: '120px', height: '120px', position: 'relative' }}>
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="60" cy="60" r="58" stroke="#112F82" strokeWidth="4" />
              <path d="M 60,2 A 58,58 0 0,1 60,118" stroke="#1463FF" strokeWidth="4" strokeLinecap="round" />
              <circle cx="60" cy="60" r="35" fill="#1463FF" />
              <g transform="translate(49.2, 45.5)">
                <path d="M6 10V6.5C6 3.46 8.46 1 11.5 1C14.54 1 17 3.46 17 6.5V10H18C19.66 10 21 11.34 21 13V23C21 24.66 19.66 26 18 26H5C3.34 26 2 24.66 2 23V13C2 11.34 3.34 10 5 10H6ZM8 10H15V6.5C15 4.57 13.43 3 11.5 3C9.57 3 8 4.57 8 6.5V10Z" fill="#FFFFFF" />
              </g>
            </svg>
          </div>
        </div>

        {/* Title & subtitle container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0px',
            gap: '8px',
            width: '428px',
            height: '67px',
          }}
        >
          <h3
            style={{
              width: '428px',
              height: '27px',
              fontFamily: "var(--font-sans), sans-serif",
              fontWeight: 700,
              fontSize: '20px',
              lineHeight: '27px',
              textAlign: 'center',
              letterSpacing: '0.02em',
              color: '#FFFFFF',
              margin: 0,
            }}
          >
            Withdrawal requested
          </h3>
          <p
            style={{
              width: '428px',
              height: '32px',
              fontFamily: "var(--font-sans), sans-serif",
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: '16px',
              textAlign: 'center',
              letterSpacing: '0.02em',
              color: '#A5B8EF',
              margin: 0,
            }}
          >
            Your withdrawal request was successfully submitted.<br />Our payments team is now reviewing it
          </p>
        </div>

        {/* Details Card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '10px 16px',
            gap: '8px',
            width: '428px',
            height: '138px',
            background: '#112F82',
            borderRadius: '8px',
            boxSizing: 'border-box',
          }}
        >
          {/* Amount row */}
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '396px', height: '16px' }}>
            <span style={{ display: 'inline-block', width: '198px', height: '14px', fontFamily: "var(--font-sans), sans-serif", fontWeight: 600, fontSize: '10px', lineHeight: '14px', letterSpacing: '0.02em', color: '#A5B8EF' }}>Amount</span>
            <span style={{ display: 'inline-block', width: '198px', height: '16px', fontFamily: "var(--font-sans), sans-serif", fontWeight: 700, fontSize: '12px', lineHeight: '16px', textAlign: 'right', letterSpacing: '0.02em', color: '#FFFFFF' }}>
              ${parseFloat(withdrawAmount) ? parseFloat(withdrawAmount).toFixed(2) : '100.00'}
            </span>
          </div>
          <div style={{ width: '396px', height: '0px', borderTop: '1px dashed #193EA5' }} />

          {/* Method row */}
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '396px', height: '16px' }}>
            <span style={{ display: 'inline-block', width: '198px', height: '14px', fontFamily: "var(--font-sans), sans-serif", fontWeight: 600, fontSize: '10px', lineHeight: '14px', letterSpacing: '0.02em', color: '#A5B8EF' }}>Method</span>
            <span style={{ display: 'inline-block', width: '198px', height: '16px', fontFamily: "var(--font-sans), sans-serif", fontWeight: 700, fontSize: '12px', lineHeight: '16px', textAlign: 'right', letterSpacing: '0.02em', color: '#FFFFFF' }}>Bitcoin</span>
          </div>
          <div style={{ width: '396px', height: '0px', borderTop: '1px dashed #193EA5' }} />

          {/* Estimated arrival row */}
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '396px', height: '16px' }}>
            <span style={{ display: 'inline-block', width: '198px', height: '14px', fontFamily: "var(--font-sans), sans-serif", fontWeight: 600, fontSize: '10px', lineHeight: '14px', letterSpacing: '0.02em', color: '#A5B8EF' }}>Estimated arrival</span>
            <span style={{ display: 'inline-block', width: '198px', height: '16px', fontFamily: "var(--font-sans), sans-serif", fontWeight: 700, fontSize: '12px', lineHeight: '16px', textAlign: 'right', letterSpacing: '0.02em', color: '#FFFFFF' }}>1-24 hours</span>
          </div>
          <div style={{ width: '396px', height: '0px', borderTop: '1px dashed #193EA5' }} />

          {/* Status row */}
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '396px', height: '22px' }}>
            <span style={{ display: 'inline-block', width: '290px', height: '14px', fontFamily: "var(--font-sans), sans-serif", fontWeight: 600, fontSize: '10px', lineHeight: '14px', letterSpacing: '0.02em', color: '#A5B8EF' }}>Status</span>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '4px 8px', gap: '4px', width: '106px', height: '22px', background: '#0C1F56', borderRadius: '4px', boxSizing: 'border-box' }}>
              <span style={{ display: 'inline-block', width: '90px', height: '14px', fontFamily: "var(--font-sans), sans-serif", fontWeight: 600, fontSize: '10px', lineHeight: '14px', letterSpacing: '0.02em', color: '#4886FF', whiteSpace: 'nowrap', textAlign: 'center' }}>Pending review</span>
            </div>
          </div>
        </div>

        {/* Help & Back button container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '12px',
            width: '428px',
            height: '76px',
          }}
        >
          {/* Help row */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0px',
              gap: '8px',
              width: '428px',
              height: '14px',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z" stroke="#7795E8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 8V8.01" stroke="#7795E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.5 4.5C4.5 3.67 5.17 3 6 3C6.83 3 7.5 3.67 7.5 4.5C7.5 5.33 6.83 6 6 6" stroke="#7795E8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span
              style={{
                fontFamily: "var(--font-sans), sans-serif",
                fontWeight: 600,
                fontSize: '10px',
                lineHeight: '14px',
                letterSpacing: '0.02em',
                color: '#7795E8',
              }}
            >
              Having problems? <span style={{ color: '#FFC83D', cursor: 'pointer' }} className="hover:underline">Contact support</span>
            </span>
          </div>

          {/* Back button */}
          <button
            type="button"
            onClick={() => setVerificationStep(3)}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px 30px',
              gap: '10px',
              width: '428px',
              height: '50px',
              background: '#112F82',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
            }}
            className="hover:brightness-110 active:scale-98 transition-all duration-150"
          >
            <span
              style={{
                fontFamily: "var(--font-sans), sans-serif",
                fontWeight: 700,
                fontSize: '16px',
                lineHeight: '22px',
                letterSpacing: '0.02em',
                color: '#D2DCF7',
              }}
            >
              Back to withdrawal form
            </span>
          </button>
        </div>
      </div>
    );
  }

  // SCREEN 3: Verified Withdrawal Form
  if (verificationStep === 3) {
    if (isMobile) {
      return (
        <div className="flex flex-col items-center w-full select-none py-2 gap-[16px] animate-in fade-in zoom-in-95 box-border">
          {/* Available balance card */}
          <div className="flex flex-row justify-between items-center w-full p-[16px] bg-[#112F82] rounded-[10px] box-border">
            <div className="flex flex-col items-start gap-[4px] grow">
              <span className="font-manrope font-semibold text-[12px] leading-[16px] text-[#A5B8EF]">Available balance</span>
              <span className="font-manrope font-bold text-[20px] leading-[27px] text-white">$1,248.50</span>
            </div>
            <div className="flex flex-row justify-center items-center px-[8px] py-[4px] bg-[#09430B] rounded-[4px] gap-[4px] shrink-0">
              <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 2.8L3.25 5L8 1" stroke="#1AFF20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-manrope font-semibold text-[10px] leading-[14px] text-[#1AFF20]">Verified</span>
            </div>
          </div>

          {/* 1. Select method */}
          <div className="flex flex-col items-start gap-[8px] w-full">
            <span className="font-manrope font-medium text-[12px] leading-[16px] text-[#BBCAF3]">1.Select withdrawal method</span>
            <div className="flex flex-row items-center justify-between w-full h-[39px] bg-[#112F82] rounded-lg px-[16px] box-border">
              <div className="flex flex-row items-center gap-[8px]">
                <div className="w-[16px] h-[16px] rounded-full bg-[#FFC83D] flex items-center justify-center shrink-0">
                  <span className="text-[10px] text-[#112F82] font-black font-mono">₿</span>
                </div>
                <span className="font-manrope font-bold text-[14px] text-white">Bitcoin</span>
                <span className="font-manrope font-medium text-[10px] text-[#BBCAF3]">(Min. withdraw $50)</span>
              </div>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <path d="M1 1L5 5L9 1" stroke="#A5B8EF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* 2. Enter amount */}
          <div className="flex flex-col items-start gap-[8px] w-full">
            <span className="font-manrope font-medium text-[12px] leading-[16px] text-[#BBCAF3]">2.Enter withdrawal amount</span>
            <div className="flex flex-row items-center w-full h-[39px] bg-[#112F82] rounded-lg px-[16px] box-border">
              <span className="font-manrope font-bold text-[14px] text-white mr-1">$</span>
              <input
                type="text"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                className="bg-transparent border-none outline-none text-white font-manrope font-bold text-[14px] w-full p-0"
              />
            </div>
          </div>

          {/* Details list */}
          <div className="flex flex-col gap-[8px] w-full py-1">
            <div className="flex flex-row justify-between items-center w-full">
              <span className="font-manrope font-semibold text-[10px] text-[#7795E8]">Minimum withdrawal</span>
              <span className="font-manrope font-bold text-[12px] text-white">$50</span>
            </div>
            <div className="w-full border-t border-dashed border-[#193EA5]" />
            <div className="flex flex-row justify-between items-center w-full">
              <span className="font-manrope font-semibold text-[10px] text-[#7795E8]">Processing fee</span>
              <span className="font-manrope font-bold text-[12px] text-white">Free</span>
            </div>
            <div className="w-full border-t border-dashed border-[#193EA5]" />
            <div className="flex flex-row justify-between items-center w-full">
              <span className="font-manrope font-semibold text-[10px] text-[#7795E8]">Estimated arrival</span>
              <span className="font-manrope font-bold text-[12px] text-white">1-24 hours</span>
            </div>
          </div>

          {/* 3. Destination */}
          <div className="flex flex-col items-start gap-[8px] w-full">
            <span className="font-manrope font-medium text-[12px] leading-[16px] text-[#BBCAF3]">3.Enter dectination details</span>
            <div className="flex flex-row items-center w-full h-[39px] bg-[#112F82] rounded-lg px-[16px] box-border">
              <input
                type="text"
                placeholder="Bitcoin wallet address"
                value={destinationAddress}
                onChange={(e) => setDestinationAddress(e.target.value)}
                className="bg-transparent border-none outline-none text-white font-manrope font-semibold text-[14px] w-full p-0 placeholder-[#A5B8EF]/60"
              />
            </div>
            <span className="font-manrope font-semibold text-[10px] leading-[14px] text-[#7795E8] w-full">
              Withdrawals may be reviewed by our payments team beforeprocessing. Make sure the destination details are correct.
            </span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-[10px] w-full mt-2">
            <button
              onClick={() => {
                setVerificationStep(4);
              }}
              className="w-full h-[50px] bg-[#FFC83D] hover:bg-[#ffd362] rounded-lg flex items-center justify-center font-sans font-bold text-[14px] text-[#1A1404] tracking-[0.02em] cursor-pointer active:scale-95 transition-all border-none"
            >
              Request withdrawal
            </button>
            <button
              onClick={() => setVerificationStep(0)}
              className="w-full h-[50px] bg-[#112F82] hover:brightness-110 rounded-lg flex items-center justify-center font-sans font-bold text-[14px] text-[#D2DCF7] tracking-[0.02em] cursor-pointer active:scale-95 transition-all border-none"
            >
              Back
            </button>
          </div>
        </div>
      );
    }

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0px',
          gap: '16px',
          width: '428px',
          height: '508px',
        }}
        className="select-none animate-in fade-in zoom-in-95 shrink-0"
      >
        {/* Available balance card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px',
            gap: '20px',
            width: '428px',
            height: '79px',
            background: '#112F82',
            borderRadius: '10px',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '0px',
              gap: '4px',
              width: '326px',
              height: '47px',
              flexGrow: 1,
            }}
          >
            <span
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 600,
                fontSize: '12px',
                lineHeight: '16px',
                letterSpacing: '0.02em',
                color: '#A5B8EF',
              }}
            >
              Available balance
            </span>
            <span
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: '20px',
                lineHeight: '27px',
                letterSpacing: '0.02em',
                color: '#FFFFFF',
              }}
            >
              $1,248.50
            </span>
          </div>

          {/* Verified Badge */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '4px 8px',
              gap: '4px',
              width: '70px',
              height: '22px',
              background: '#09430B',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
          >
            <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 2.8L3.25 5L8 1" stroke="#1AFF20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 600,
                fontSize: '10px',
                lineHeight: '14px',
                letterSpacing: '0.02em',
                color: '#1AFF20',
              }}
            >
              Verified
            </span>
          </div>
        </div>

        {/* 1. Select method */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '8px',
            width: '428px',
            height: '61px',
          }}
        >
          <span
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: '16px',
              letterSpacing: '0.02em',
              color: '#BBCAF3',
            }}
          >
            1.Select withdrawal method
          </span>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '10px 16px',
              gap: '12px',
              width: '428px',
              height: '39px',
              background: '#112F82',
              borderRadius: '8px',
              boxSizing: 'border-box',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#FFC83D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '10px', color: '#112F82', fontWeight: 900, fontFamily: 'monospace' }}>₿</span>
              </div>
              <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '14px', lineHeight: '19px', color: '#FFFFFF' }}>Bitcoin</span>
              <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 500, fontSize: '10px', lineHeight: '14px', color: '#BBCAF3' }}>(Min. withdraw $50)</span>
            </div>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="#A5B8EF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* 2. Enter amount */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '8px',
            width: '428px',
            height: '61px',
          }}
        >
          <span
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: '16px',
              letterSpacing: '0.02em',
              color: '#BBCAF3',
            }}
          >
            2.Enter withdrawal amount
          </span>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '10px 16px',
              gap: '12px',
              width: '428px',
              height: '39px',
              background: '#112F82',
              borderRadius: '8px',
              boxSizing: 'border-box',
            }}
          >
            <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '14px', lineHeight: '19px', color: '#FFFFFF', marginRight: '4px' }}>$</span>
            <input
              type="text"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value.replace(/[^0-9.]/g, ''))}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#FFFFFF',
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: '14px',
                lineHeight: '19px',
                width: '100%',
                padding: '0px',
              }}
            />
          </div>
        </div>

        {/* Details list */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '8px',
            width: '428px',
            height: '80px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '16px' }}>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 600, fontSize: '10px', lineHeight: '14px', color: '#7795E8' }}>Minimum withdrawal</span>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '12px', lineHeight: '16px', color: '#FFFFFF' }}>$50</span>
          </div>
          <div style={{ width: '100%', height: '0px', borderTop: '1px dashed #193EA5' }} />
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '16px' }}>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 600, fontSize: '10px', lineHeight: '14px', color: '#7795E8' }}>Processing fee</span>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '12px', lineHeight: '16px', color: '#FFFFFF' }}>Free</span>
          </div>
          <div style={{ width: '100%', height: '0px', borderTop: '1px dashed #193EA5' }} />
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '16px' }}>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 600, fontSize: '10px', lineHeight: '14px', color: '#7795E8' }}>Estimated arrival</span>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '12px', lineHeight: '16px', color: '#FFFFFF' }}>1-24 hours</span>
          </div>
        </div>

        {/* 3. Destination */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '8px',
            width: '428px',
            height: '97px',
          }}
        >
          <span
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: '16px',
              letterSpacing: '0.02em',
              color: '#BBCAF3',
            }}
          >
            3.Enter dectination details
          </span>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '10px 16px',
              gap: '12px',
              width: '428px',
              height: '39px',
              background: '#112F82',
              borderRadius: '8px',
              boxSizing: 'border-box',
            }}
          >
            <input
              type="text"
              placeholder="Bitcoin wallet address"
              value={destinationAddress}
              onChange={(e) => setDestinationAddress(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#FFFFFF',
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 600,
                fontSize: '14px',
                lineHeight: '19px',
                width: '100%',
                padding: '0px',
              }}
              className="placeholder-[#A5B8EF]/60"
            />
          </div>
          <span
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 600,
              fontSize: '10px',
              lineHeight: '14px',
              letterSpacing: '0.02em',
              color: '#7795E8',
            }}
          >
            Withdrawals may be reviewed by our payments team beforeprocessing. Make sure the destination details are correct.
          </span>
        </div>

        {/* Request button */}
        <button
          onClick={() => {
            setVerificationStep(4);
          }}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px 30px',
            gap: '10px',
            width: '428px',
            height: '50px',
            background: '#FFC83D',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
          }}
          className="hover:brightness-110 active:scale-98 transition-all duration-150"
        >
          <span
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 700,
              fontSize: '16px',
              lineHeight: '22px',
              letterSpacing: '0.02em',
              color: '#1A1404',
            }}
          >
            Request withdrawal
          </span>
        </button>
      </div>
    );
  }

  // SCREEN 2: Verification In Progress
  if (verificationStep === 2) {
    if (isMobile) {
      return (
        <div className="flex flex-col items-center w-full select-none py-2 gap-[20px] animate-in fade-in zoom-in-95 box-border">
          {/* Checked Icon Container */}
          <div className="flex flex-row justify-center items-center w-full h-[120px]">
            <div className="w-[120px] h-[120px] rounded-full border-[2.5px] border-[#1463FF] flex items-center justify-center">
              <div className="w-[70px] h-[70px] rounded-full bg-[#1463FF] flex items-center justify-center">
                <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.125 9.2L8.5 15.575L22.125 2" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Title and Subtitle Container */}
          <div className="flex flex-col items-center gap-[8px] w-full text-center px-2">
            <span className="font-manrope font-bold text-[18px] leading-[24px] text-white tracking-[0.02em] block w-full text-center">
              Verification submitted
            </span>
            <span className="font-manrope font-medium text-[11px] leading-[15px] text-[#A5B8EF] tracking-[0.02em] block w-full text-center">
              Your documents were received. Withdrawals willbecome available once the review is complete.
            </span>
          </div>

          {/* Status Info box */}
          <div className="flex flex-col justify-center items-start gap-[8px] w-full bg-[#112F82] rounded-lg p-[12px] box-border">
            {/* Status Row */}
            <div className="flex flex-row justify-between items-center w-full">
              <span className="font-manrope font-semibold text-[10px] leading-[14px] text-[#A5B8EF] tracking-[0.02em]">
                Status
              </span>
              <div className="flex flex-row justify-center items-center px-[8px] py-[4px] bg-[#3E2A09] rounded-[6px]">
                <span className="font-manrope font-semibold text-[10px] leading-[14px] text-[#FFC83D] tracking-[0.02em]">
                  Under review
                </span>
              </div>
            </div>

            {/* Dashed line */}
            <div className="w-full border-t border-dashed border-[#193EA5] my-[4px]" />

            {/* Estimated Review Row */}
            <div className="flex flex-row justify-between items-center w-full">
              <span className="font-manrope font-semibold text-[10px] leading-[14px] text-[#A5B8EF] tracking-[0.02em]">
                Estimated review
              </span>
              <span className="font-manrope font-bold text-[12px] leading-[16px] text-white tracking-[0.02em]">
                24-28 hours
              </span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => setVerificationStep(3)}
            className="w-full h-[50px] bg-[#FFC83D] hover:bg-[#ffd362] rounded-lg flex items-center justify-center font-sans font-bold text-[14px] text-[#1A1404] tracking-[0.02em] cursor-pointer active:scale-95 transition-all duration-150 border-none"
          >
            Preview verified state
          </button>
        </div>
      );
    }

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0px',
          gap: '20px',
          width: '428px',
          height: '371px',
        }}
        className="select-none animate-in fade-in zoom-in-95 shrink-0"
      >
        {/* Checked Icon Container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0px',
            width: '428px',
            height: '120px',
          }}
        >
          {/* Outer circle outline */}
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              border: '2.5px solid #1463FF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Inner solid circle */}
            <div
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                backgroundColor: '#1463FF',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* Checkmark SVG */}
              <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.125 9.2L8.5 15.575L22.125 2" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Title and Subtitle Container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0px',
            gap: '8px',
            width: '428px',
            height: '67px',
          }}
        >
          <h3
            style={{
              width: '428px',
              height: '27px',
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 700,
              fontSize: '20px',
              lineHeight: '27px',
              textAlign: 'center',
              letterSpacing: '0.02em',
              color: '#FFFFFF',
              margin: 0,
            }}
          >
            Verification submitted
          </h3>
          <p
            style={{
              width: '428px',
              height: '32px',
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: '16px',
              textAlign: 'center',
              letterSpacing: '0.02em',
              color: '#A5B8EF',
              margin: 0,
            }}
          >
            Your documents were received. Withdrawals willbecome available once the review is complete.
          </p>
        </div>

        {/* Status Info box */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '10px 16px',
            gap: '8px',
            width: '428px',
            height: '74px',
            background: '#112F82',
            borderRadius: '8px',
            boxSizing: 'border-box',
          }}
        >
          {/* Row 1: Status */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0px',
              gap: '12px',
              width: '100%',
              height: '22px',
            }}
          >
            <span
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 600,
                fontSize: '10px',
                lineHeight: '14px',
                letterSpacing: '0.02em',
                color: '#A5B8EF',
              }}
            >
              Status
            </span>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '4px 8px',
                gap: '4px',
                width: '81px',
                height: '22px',
                background: '#3E2A09',
                borderRadius: '6px',
                boxSizing: 'border-box',
              }}
            >
              <span
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 600,
                  fontSize: '10px',
                  lineHeight: '14px',
                  letterSpacing: '0.02em',
                  color: '#FFC83D',
                }}
              >
                Under review
              </span>
            </div>
          </div>

          {/* Dashed separator */}
          <div
            style={{
              width: '100%',
              height: '0px',
              borderTop: '1px dashed #193EA5',
            }}
          />

          {/* Row 2: Estimated review */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0px',
              gap: '12px',
              width: '100%',
              height: '16px',
            }}
          >
            <span
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 600,
                fontSize: '10px',
                lineHeight: '14px',
                letterSpacing: '0.02em',
                color: '#A5B8EF',
              }}
            >
              Estimated review
            </span>
            <span
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '16px',
                textAlign: 'right',
                letterSpacing: '0.02em',
                color: '#FFFFFF',
              }}
            >
              24-28 hours
            </span>
          </div>
        </div>

        {/* Preview verified state button */}
        <button
          onClick={() => setVerificationStep(3)}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px 30px',
            gap: '10px',
            width: '428px',
            height: '50px',
            background: '#FFC83D',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
          }}
          className="hover:brightness-110 active:scale-98 transition-all duration-150"
        >
          <span
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 700,
              fontSize: '16px',
              lineHeight: '22px',
              letterSpacing: '0.02em',
              color: '#1A1404',
            }}
          >
            Preview verified state
          </span>
        </button>
      </div>
    );
  }

  // SCREEN 1: Complete Verification Form
  if (verificationStep === 1) {
    if (isMobile) {
      return (
        <div className="flex flex-col items-center w-full select-none py-2 gap-[16px] animate-in fade-in zoom-in-95 box-border">
          {/* Header section */}
          <div className="flex flex-col items-start gap-[4px] w-full px-1">
            <span className="font-manrope font-semibold text-[12px] leading-[16px] text-[#BBCAF3] tracking-[0.02em]">
              1.Complete verification
            </span>
            <span className="font-manrope font-semibold text-[10px] leading-[14px] text-[#7795E8] tracking-[0.02em]">
              We need to verify your account before enabling withdrawals.
            </span>
          </div>

          {/* Form input fields */}
          <div className="flex flex-col gap-[10px] w-full">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Legal first name"
              className="w-full h-[40px] bg-[#112F82] rounded-lg px-[16px] box-border border border-white/5 font-sans font-semibold text-[14px] text-white placeholder-[#A5B8EF] outline-none"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Legal last name"
              className="w-full h-[40px] bg-[#112F82] rounded-lg px-[16px] box-border border border-white/5 font-sans font-semibold text-[14px] text-white placeholder-[#A5B8EF] outline-none"
            />
            <div className="flex flex-row gap-[8px] w-full">
              <input
                type="text"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                placeholder="Date of birth"
                className="flex-1 min-w-0 h-[40px] bg-[#112F82] rounded-lg px-[16px] box-border border border-white/5 font-sans font-semibold text-[14px] text-white placeholder-[#A5B8EF] outline-none"
              />
              {/* Country selector */}
              <div className="relative flex-1 min-w-0">
                <button
                  type="button"
                  onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                  className="w-full h-[40px] bg-[#112F82] rounded-lg px-[16px] box-border border border-white/5 flex flex-row items-center justify-between font-sans font-bold text-[12px] text-white outline-none cursor-pointer"
                >
                  <span className="truncate flex items-center gap-[8px]">
                    <FlagIcon name={country} size={20} />
                    <span>{country}</span>
                  </span>
                  <span className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-[#A5B8EF] ml-[4px]" />
                </button>
                {isCountryDropdownOpen && (
                  <div className="absolute left-0 right-0 bottom-[44px] bg-[#112F82] border border-white/10 rounded-lg max-h-[150px] overflow-y-auto z-[200] shadow-lg">
                    {countries.map((c) => (
                      <div
                        key={c.name}
                        onClick={() => {
                          setCountry(c.name);
                          setIsCountryDropdownOpen(false);
                        }}
                        className="px-[16px] py-[8px] text-[12px] font-semibold text-white hover:bg-[#1463FF]/20 cursor-pointer flex items-center gap-[8px]"
                      >
                        <FlagIcon name={c.name} size={16} />
                        <span>{c.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Upload Documents header */}
          <div className="flex flex-col items-start gap-[4px] w-full px-1 mt-2">
            <span className="font-manrope font-semibold text-[12px] leading-[16px] text-[#BBCAF3] tracking-[0.02em]">
              2.Upload documents
            </span>
          </div>

          {/* Document Uploads - Static Design */}
          <div className="flex flex-col gap-[10px] w-full">
            <div
              className="flex flex-row items-center gap-[12px] w-full h-[60px] bg-[#112F82] rounded-[10px] px-[10px] box-border border border-white/5"
            >
              <div className="flex items-center justify-center w-[40px] h-[40px] bg-[#0C1F56] rounded-md shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 15V3m0 0L8 7m4-4l4 4" stroke="#1463FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex flex-col items-start gap-[2px] truncate">
                <span className="font-manrope font-bold text-[13px] leading-[17px] text-white">Identity document</span>
                <span className="font-manrope font-medium text-[11px] leading-[15px] truncate text-[#A5B8EF]">
                  Passport, ID card, or driving license
                </span>
              </div>
            </div>

            <div
              className="flex flex-row items-center gap-[12px] w-full h-[60px] bg-[#112F82] rounded-[10px] px-[10px] box-border border border-white/5"
            >
              <div className="flex items-center justify-center w-[40px] h-[40px] bg-[#0C1F56] rounded-md shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 15V3m0 0L8 7m4-4l4 4" stroke="#1463FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex flex-col items-start gap-[2px] truncate">
                <span className="font-manrope font-bold text-[13px] leading-[17px] text-white">Proof of address</span>
                <span className="font-manrope font-medium text-[11px] leading-[15px] truncate text-[#A5B8EF]">
                  Utility bill or bank statement
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-[10px] w-full mt-2">
            <button
              onClick={() => {
                if (!firstName || !lastName || !dob) {
                  alert('Please fill in your details.');
                  return;
                }
                setVerificationStep(2);
              }}
              className="w-full h-[50px] bg-[#FFC83D] hover:bg-[#ffd362] rounded-lg flex items-center justify-center font-sans font-bold text-[14px] text-[#1A1404] tracking-[0.02em] cursor-pointer active:scale-95 transition-all border-none"
            >
              Submit verification
            </button>
            <button
              onClick={() => setVerificationStep(0)}
              className="w-full h-[50px] bg-[#112F82] hover:brightness-110 rounded-lg flex items-center justify-center font-sans font-bold text-[14px] text-[#D2DCF7] tracking-[0.02em] cursor-pointer active:scale-95 transition-all border-none"
            >
              Back
            </button>
          </div>
        </div>
      );
    }

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0px',
          gap: '20px',
          width: '428px',
          height: '510px',
        }}
        className="select-none animate-in fade-in zoom-in-95 shrink-0"
      >
        {/* 1. Complete verification section (428px x 198px) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '12px',
            width: '428px',
            height: '198px',
          }}
        >
          {/* Header labels */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '0px',
              gap: '4px',
              width: '428px',
              height: '34px',
            }}
          >
            <span
              style={{
                width: '135px',
                height: '16px',
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 500,
                fontSize: '12px',
                lineHeight: '16px',
                letterSpacing: '0.02em',
                color: '#BBCAF3',
              }}
            >
              1.Complete verification
            </span>
            <span
              style={{
                width: '428px',
                height: '14px',
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 600,
                fontSize: '10px',
                lineHeight: '14px',
                letterSpacing: '0.02em',
                color: '#7795E8',
              }}
            >
              We need to verify your account before enabling withdrawals.
            </span>
          </div>

          {/* Form input fields */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '0px',
              gap: '12px',
              width: '428px',
              height: '144px',
            }}
          >
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Legal first name"
              style={{
                width: '428px',
                height: '40px',
                background: '#112F82',
                borderRadius: '8px',
                padding: '10px 16px',
                boxSizing: 'border-box',
                border: 'none',
                outline: 'none',
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 600,
                fontSize: '14px',
                lineHeight: '19px',
                letterSpacing: '0.02em',
                color: '#FFFFFF',
              }}
              className="placeholder-[#A5B8EF] hover:brightness-105 focus:brightness-105 duration-100"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Legal last name"
              style={{
                width: '428px',
                height: '40px',
                background: '#112F82',
                borderRadius: '8px',
                padding: '10px 16px',
                boxSizing: 'border-box',
                border: 'none',
                outline: 'none',
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 600,
                fontSize: '14px',
                lineHeight: '19px',
                letterSpacing: '0.02em',
                color: '#FFFFFF',
              }}
              className="placeholder-[#A5B8EF] hover:brightness-105 focus:brightness-105 duration-100"
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                padding: '0px',
                gap: '8px',
                width: '428px',
                height: '40px',
              }}
            >
              <input
                type="text"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                placeholder="Date of birth"
                style={{
                  width: '210px',
                  height: '40px',
                  background: '#112F82',
                  borderRadius: '8px',
                  padding: '10px 16px',
                  boxSizing: 'border-box',
                  border: 'none',
                  outline: 'none',
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '19px',
                  letterSpacing: '0.02em',
                  color: '#FFFFFF',
                  flexGrow: 1,
                }}
                className="placeholder-[#A5B8EF] hover:brightness-105 focus:brightness-105 duration-100"
              />
              {/* Custom Country Selector */}
              <div style={{ position: 'relative', width: '210px', height: '40px', flexGrow: 1 }}>
                <button
                  type="button"
                  onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: '10px 16px',
                    gap: '10px',
                    width: '210px',
                    height: '40px',
                    background: '#112F82',
                    borderRadius: '8px',
                    border: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                    justifyContent: 'space-between',
                  }}
                  className="hover:brightness-105 duration-100"
                >
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                    <FlagIcon name={country} size={20} />
                    <span
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 700,
                        fontSize: '12px',
                        lineHeight: '16px',
                        letterSpacing: '0.02em',
                        color: '#FFFFFF',
                      }}
                    >
                      {country}
                    </span>
                  </div>
                  {/* Chevron Down vector */}
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '14px', height: '14px' }}>
                    <svg width="7" height="4" viewBox="0 0 7 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L3.5 3L6 1" stroke="#A5B8EF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>
                {isCountryDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      left: '0px',
                      right: '0px',
                      bottom: '44px',
                      background: '#112F82',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      maxHeight: '150px',
                      overflowY: 'auto',
                      zIndex: 200,
                      boxShadow: '0px 4px 20px rgba(0,0,0,0.3)',
                    }}
                  >
                    {countries.map((c) => (
                      <div
                        key={c.name}
                        onClick={() => {
                          setCountry(c.name);
                          setIsCountryDropdownOpen(false);
                        }}
                        style={{
                          padding: '10px 16px',
                          fontFamily: "'Manrope', sans-serif",
                          fontWeight: 600,
                          fontSize: '12px',
                          color: '#FFFFFF',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                        className="hover:bg-white/10"
                      >
                        <FlagIcon name={c.name} size={16} />
                        <span>{c.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Upload documents section (428px x 160px) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '12px',
            width: '428px',
            height: '160px',
          }}
        >
          {/* Header label */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '0px',
              gap: '8px',
              width: '428px',
              height: '16px',
            }}
          >
            <span
              style={{
                width: '121px',
                height: '16px',
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 500,
                fontSize: '12px',
                lineHeight: '16px',
                letterSpacing: '0.02em',
                color: '#BBCAF3',
              }}
            >
              2.Upload documents
            </span>
          </div>

          {/* Upload card 1 (Static Design) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '10px',
              gap: '20px',
              width: '428px',
              height: '60px',
              background: '#112F82',
              borderRadius: '10px',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '0px',
                gap: '16px',
                width: '408px',
                height: '40px',
              }}
            >
              {/* Icon Box */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '12px',
                  gap: '10px',
                  width: '40px',
                  height: '40px',
                  background: '#0C1F56',
                  borderRadius: '6px',
                  boxSizing: 'border-box',
                  position: 'relative',
                }}
              >
                <div style={{ position: 'absolute', left: '12px', top: '12px', width: '16px', height: '16px' }} className="flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 15V3m0 0L8 7m4-4l4 4" stroke="#1463FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Texts */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '0px',
                  gap: '4px',
                  width: '352px',
                  height: '39px',
                  flexGrow: 1,
                }}
              >
                <span
                  style={{
                    width: '131px',
                    height: '19px',
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: '19px',
                    letterSpacing: '0.02em',
                    color: '#FFFFFF',
                  }}
                >
                  Identity document
                </span>
                <span
                  style={{
                    width: '336px',
                    height: '16px',
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 500,
                    fontSize: '12px',
                    lineHeight: '16px',
                    letterSpacing: '0.02em',
                    color: '#A5B8EF',
                  }}
                  className="truncate"
                >
                  Passport, ID card, or driving license
                </span>
              </div>
            </div>
          </div>

          {/* Upload card 2 (Static Design) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px',
              gap: '20px',
              width: '428px',
              height: '60px',
              background: '#112F82',
              borderRadius: '10px',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '0px',
                gap: '16px',
                width: '408px',
                height: '40px',
              }}
            >
              {/* Icon Box */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '12px',
                  gap: '10px',
                  width: '40px',
                  height: '40px',
                  background: '#0C1F56',
                  borderRadius: '6px',
                  boxSizing: 'border-box',
                  position: 'relative',
                }}
              >
                <div style={{ position: 'absolute', left: '12px', top: '12px', width: '16px', height: '16px' }} className="flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 15V3m0 0L8 7m4-4l4 4" stroke="#1463FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Texts */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '0px',
                  gap: '4px',
                  width: '352px',
                  height: '39px',
                  flexGrow: 1,
                }}
              >
                <span
                  style={{
                    width: '116px',
                    height: '19px',
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: '19px',
                    letterSpacing: '0.02em',
                    color: '#FFFFFF',
                  }}
                >
                  Proof of address
                </span>
                <span
                  style={{
                    width: '336px',
                    height: '16px',
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 500,
                    fontSize: '12px',
                    lineHeight: '16px',
                    letterSpacing: '0.02em',
                    color: '#A5B8EF',
                  }}
                  className="truncate"
                >
                  Utility bill or bank statement
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons frame (428px x 112px) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '12px',
            width: '428px',
            height: '112px',
          }}
        >
          {/* Submit Verification button */}
          <button
            type="button"
            onClick={() => {
              if (!firstName || !lastName || !dob) {
                alert('Please fill in your details.');
                return;
              }
              setVerificationStep(2);
            }}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px 30px',
              gap: '10px',
              width: '428px',
              height: '50px',
              background: '#FFC83D',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
            }}
            className="hover:bg-[#ffd362] active:scale-98 transition-all duration-150"
          >
            <span
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: '16px',
                lineHeight: '22px',
                letterSpacing: '0.02em',
                color: '#1A1404',
              }}
            >
              Submit verification
            </span>
          </button>

          {/* Back button */}
          <button
            type="button"
            onClick={() => setVerificationStep(0)}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px 30px',
              gap: '10px',
              width: '428px',
              height: '50px',
              background: '#112F82',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
            }}
            className="hover:brightness-110 active:scale-98 transition-all duration-150"
          >
            <span
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: '16px',
                lineHeight: '22px',
                letterSpacing: '0.02em',
                color: '#D2DCF7',
              }}
            >
              Back
            </span>
          </button>
        </div>
      </div>
    );
  }

  // SCREEN 0: Steps Overview
  if (isMobile) {
    return (
      <div className="flex flex-col items-center w-full select-none py-2 gap-[16px] animate-in fade-in zoom-in-95 box-border">
        {/* Title & Description Frame */}
        <div className="flex flex-col items-center gap-[6px] w-full text-center px-2">
          <span className="font-manrope font-bold text-[18px] leading-[24px] text-white text-center tracking-[0.02em] block w-full">
            Verify your account
          </span>
          <span className="font-manrope font-medium text-[11px] leading-[15px] text-[#A5B8EF] text-center tracking-[0.02em] block w-full">
            For security reasons, withdrawals are available only after KYC verification is completed.
          </span>
        </div>

        {/* Steps List Frame */}
        <div className="flex flex-col gap-[10px] w-full">
          {stepsOverview.map((step) => (
            <div
              key={step.id}
              className="flex flex-row items-center gap-[12px] w-full h-[50px] bg-[#112F82] rounded-lg px-[12px] box-border border border-white/5"
            >
              <div className="flex items-center justify-center w-[26px] h-[26px] bg-[#1463FF] rounded-[4px] font-jost font-extrabold text-[12px] text-white shrink-0">
                {step.id}
              </div>
              <span className="font-manrope font-bold text-[12px] leading-[16px] text-white text-left tracking-[0.02em]">
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* Buttons Frame */}
        <div className="flex flex-col gap-[10px] w-full mt-2">
          <button
            onClick={() => setVerificationStep(1)}
            className="w-full h-[50px] bg-[#FFC83D] hover:bg-[#ffd362] rounded-lg flex items-center justify-center font-sans font-bold text-[14px] text-[#1A1404] tracking-[0.02em] cursor-pointer active:scale-95 transition-all duration-150 border-none"
          >
            Start verification
          </button>
          <button
            onClick={() => setVerificationStep(3)}
            className="w-full h-[50px] bg-[#112F82] hover:brightness-110 rounded-lg flex items-center justify-center font-sans font-bold text-[14px] text-white tracking-[0.02em] cursor-pointer active:scale-95 transition-all duration-150 border-none"
          >
            Preview verified withdrawal
          </button>
        </div>
      </div>
    );
  }

  // Desktop Screen 0: Steps Overview
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0px',
        gap: '20px',
        width: '428px',
        height: '393px',
      }}
      className="select-none animate-in fade-in zoom-in-95 shrink-0"
    >
      {/* Title section (428px x 67px) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '0px',
          gap: '8px',
          width: '428px',
          height: '67px',
        }}
      >
        <h3
          style={{
            width: '428px',
            height: '27px',
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: '20px',
            lineHeight: '27px',
            textAlign: 'center',
            letterSpacing: '0.02em',
            color: '#FFFFFF',
            margin: 0,
          }}
        >
          Verify your account
        </h3>
        <p
          style={{
            width: '428px',
            height: '32px',
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 500,
            fontSize: '12px',
            lineHeight: '16px',
            textAlign: 'center',
            letterSpacing: '0.02em',
            color: '#A5B8EF',
            margin: 0,
          }}
        >
          For security reasons, withdrawals are available only after KYC verification is completed.
        </p>
      </div>

      {/* Forms & steps list (428px x 306px) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '0px',
          gap: '20px',
          width: '428px',
          height: '306px',
        }}
      >
        {/* Steps container (428px x 174px) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '12px',
            width: '428px',
            height: '174px',
          }}
        >
          {stepsOverview.map((step) => (
            <div
              key={step.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px',
                gap: '20px',
                width: '428px',
                height: '50px',
                background: '#112F82',
                borderRadius: '8px',
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: '0px',
                  gap: '12px',
                  width: '408px',
                  height: '30px',
                }}
              >
                {/* Badge (30px x 30px) */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '0px 12px',
                    width: '30px',
                    height: '30px',
                    background: '#1463FF',
                    borderRadius: '4px',
                    boxSizing: 'border-box',
                  }}
                >
                  <span
                    style={{
                      width: 'auto',
                      height: '17px',
                      fontFamily: "'Jost', sans-serif",
                      fontWeight: 800,
                      fontSize: '14px',
                      lineHeight: '17px',
                      letterSpacing: '0.01em',
                      color: '#FFFFFF',
                    }}
                  >
                    {step.id}
                  </span>
                </div>

                {/* Label text */}
                <span
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 700,
                    fontSize: '12px',
                    lineHeight: '16px',
                    letterSpacing: '0.02em',
                    color: '#FFFFFF',
                  }}
                >
                  {step.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons frame (428px x 112px) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '12px',
            width: '428px',
            height: '112px',
          }}
        >
          {/* Start verification button */}
          <button
            type="button"
            onClick={() => setVerificationStep(1)}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px 30px',
              gap: '10px',
              width: '428px',
              height: '50px',
              background: '#FFC83D',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
            }}
            className="hover:bg-[#ffd362] active:scale-98 transition-all duration-150"
          >
            <span
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: '16px',
                lineHeight: '22px',
                letterSpacing: '0.02em',
                color: '#1A1404',
              }}
            >
              Start verification
            </span>
          </button>

          {/* Preview verified withdrawal button */}
          <button
            type="button"
            onClick={() => setVerificationStep(3)}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px 30px',
              gap: '10px',
              width: '428px',
              height: '50px',
              background: '#112F82',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
            }}
            className="hover:brightness-110 active:scale-98 transition-all duration-150"
          >
            <span
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: '16px',
                lineHeight: '22px',
                letterSpacing: '0.02em',
                color: '#D2DCF7',
              }}
            >
              Preview verified withdrawal
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
