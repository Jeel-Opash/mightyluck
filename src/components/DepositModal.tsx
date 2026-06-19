'use client';

import { useState, useEffect, useRef } from 'react';
import { useAppSelector } from '@/redux/store';

// Helper Icons for the premium mobile Wallet design
const YellowWalletIcon = () => (
  <svg width="20" height="20" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <path d="M14 3.5H2C1.45 3.5 1 3.95 1 4.5V12.5C1 13.05 1.45 13.5 2 13.5H14C14.55 13.5 15 13.05 15 12.5V4.5C15 3.95 14.55 3.5 14 3.5Z" stroke="#FFC83D" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M12 1.5H3C2.45 1.5 2 1.95 2 2.5H14C14 1.95 13.55 1.5 12 1.5Z" stroke="#FFC83D" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="12" cy="8.5" r="1.5" fill="#FFC83D" />
  </svg>
);

const DollarCircleIcon = () => (
  <div className="w-5 h-5 rounded-full bg-[#FFC83D] flex items-center justify-center shrink-0 shadow-sm">
    <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 1V9M2 2.5H5.5C6.328 2.5 7 3.172 7 4C7 4.828 6.328 5.5 5.5 5.5H2.5C1.672 5.5 1 6.172 1 7C1 7.828 1.672 8.5 2.5 8.5H6" stroke="#1A1404" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

const BitcoinCircleIcon = () => (
  <div className="w-5 h-5 rounded-full bg-[#FFC83D] flex items-center justify-center shrink-0 shadow-sm">
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.5 2.5H5.5C6.052 2.5 6.5 2.948 6.5 3.5C6.5 4.052 6.052 4.5 5.5 4.5M3.5 4.5H6C6.552 4.5 7 4.948 7 5.5C7 6.052 6.552 6.5 6 6.5H3.5M3.5 1.5V8.5M5 1.5V2.5M5 7.5V8.5M2.5 2.5H3.5M2.5 6.5H3.5" stroke="#1A1404" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

const SwapIcon = () => (
  <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <path d="M1 4H14.5M14.5 4L11 1M14.5 4L11 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 10H3.5M3.5 10L7 7M3.5 10L7 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DepositModal({ isOpen, onClose }: DepositModalProps) {
  const { user } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState<'deposit' | 'bonuses' | 'withdraw' | 'transactions'>('deposit');
  const [selectedBonus, setSelectedBonus] = useState('150% Reload Bonus + 30 Free Spins');
  const [isBonusDropdownOpen, setIsBonusDropdownOpen] = useState(false);
  
  const [selectedPayment, setSelectedPayment] = useState<'Bitcoin' | 'Credit Card'>('Bitcoin');
  const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = useState(false);
  
  const [usdAmount, setUsdAmount] = useState('100');
  const [btcAmount, setBtcAmount] = useState('0.00954');
  const [isUsdPrimary, setIsUsdPrimary] = useState(true);
  
  const [copied, setCopied] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [depositConfirmed, setDepositConfirmed] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [activeBonusCard, setActiveBonusCard] = useState(0);
  const bonusScrollRef = useRef<HTMLDivElement>(null);

  // Credit Card step: 'address' | 'payment'
  const [creditCardStep, setCreditCardStep] = useState<'address' | 'payment'>('address');

  // Address fields for Credit Card
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('United States');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  // Payment details fields for Credit Card
  const [ccAmountOption, setCcAmountOption] = useState<20 | 30 | 100 | 'custom'>(30);
  const [ccCustomAmount, setCcCustomAmount] = useState('50');
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [creditCardExp, setCreditCardExp] = useState('');
  const [creditCardCcv, setCreditCardCcv] = useState('');

  const btcAddress = 'bc1q7ndh47hf93rdhuhef873hheufhe447qasl2e';

  const bonusDropdownRef = useRef<HTMLDivElement>(null);
  const paymentDropdownRef = useRef<HTMLDivElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  // Mock BTC to USD rate: 1 BTC = $65,000 USD
  const btcRate = 65000;

  useEffect(() => {
    // Handle click outside to close dropdowns
    function handleClickOutside(event: MouseEvent) {
      if (bonusDropdownRef.current && !bonusDropdownRef.current.contains(event.target as Node)) {
        setIsBonusDropdownOpen(false);
      }
      if (paymentDropdownRef.current && !paymentDropdownRef.current.contains(event.target as Node)) {
        setIsPaymentDropdownOpen(false);
      }
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset steps if payment method changes
  useEffect(() => {
    setCreditCardStep('address');
  }, [selectedPayment]);

  const handleUsdChange = (val: string) => {
    setUsdAmount(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setBtcAmount((num / btcRate).toFixed(6));
    } else {
      setBtcAmount('');
    }
  };

  const handleBtcChange = (val: string) => {
    setBtcAmount(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setUsdAmount((num * btcRate).toFixed(2));
    } else {
      setUsdAmount('');
    }
  };

  const togglePrimaryCurrency = () => {
    setIsUsdPrimary(!isUsdPrimary);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(btcAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getDepositAmount = () => {
    if (ccAmountOption === 'custom') {
      return parseFloat(ccCustomAmount) || 0;
    }
    return ccAmountOption;
  };

  // Visa inline SVG
  const VisaIcon = () => (
    <svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="rounded-[2px] shrink-0">
      <rect width="24" height="15" fill="#1A1F71" rx="2" />
      <path d="M4 11L5.5 4H7.2L5.7 11H4ZM12.1 4.2C11.8 4 11.2 3.8 10.5 3.8C8.8 3.8 7.6 4.7 7.6 6C7.6 7 8.5 7.5 9.2 7.8C9.9 8.1 10.1 8.3 10.1 8.6C10.1 9.1 9.5 9.3 9 9.3C8.1 9.3 7.6 9.1 7.2 8.9L6.8 10.6C7.3 10.8 8.1 11 9 11C10.8 11 12 10.1 12 8.7C12 7.7 11.4 7.2 10.4 6.7C9.8 6.4 9.5 6.2 9.5 5.9C9.5 5.6 9.9 5.3 10.5 5.3C11 5.3 11.5 5.4 11.8 5.6L12.1 4.2ZM15.4 4H13.8C13.4 4 13.1 4.2 12.9 4.6L9.9 11H11.7L12.1 10H14.3L14.5 11H16.1L15.4 4ZM12.6 8.6L13.5 6.2L14 8.6H12.6ZM20.8 4H19.2C18.8 4 18.5 4.3 18.3 4.7L15.8 11H17.6L18 10H20.2L20.4 11H22L20.8 4ZM18.5 8.6L19.4 6.2L19.9 8.6H18.5Z" fill="white" />
    </svg>
  );

  // Mastercard inline SVG
  const MastercardIcon = () => (
    <svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="rounded-[2px] shrink-0">
      <rect width="24" height="15" fill="#0A0915" rx="2" />
      <circle cx="9" cy="7.5" r="4.5" fill="#EB001B" />
      <circle cx="15" cy="7.5" r="4.5" fill="#F79E1B" fillOpacity="0.8" />
    </svg>
  );

  // Country Flags
  const USFlag = () => (
    <img src="/images/america.svg" className="w-[18px] h-[12px] object-contain rounded-[1px] shrink-0" alt="US" />
  );

  const CanadaFlag = () => (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="rounded-[1px] shrink-0">
      <rect width="18" height="12" fill="#D80621" />
      <rect x="4.5" width="9" height="12" fill="#FFFFFF" />
      <path d="M9 3L10 5.5L12 5L10.5 7L11 9.5L9 8L7 9.5L7.5 7L6 5L8 5.5L9 3Z" fill="#D80621" />
    </svg>
  );

  const UKFlag = () => (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="rounded-[1px] shrink-0">
      <rect width="18" height="12" fill="#012169" />
      <path d="M0 0L18 12M18 0L0 12" stroke="#FFFFFF" strokeWidth="2" />
      <path d="M0 0L18 12M18 0L0 12" stroke="#C8102E" strokeWidth="1" />
      <path d="M9 0V12M0 6H18" stroke="#FFFFFF" strokeWidth="3" />
      <path d="M9 0V12M0 6H18" stroke="#C8102E" strokeWidth="2" />
    </svg>
  );

  const bonusOptions = [
    {
      id: 'reload',
      title: '150% Reload Bonus + 30 Free Spins',
      subtext: '(Min. Deposit $10)',
      icon: 'gift'
    },
    {
      id: 'welcome',
      title: '350% Welcome Bonus',
      subtext: '45x PT - Min. Dep. $20',
      icon: 'star'
    },
    {
      id: 'crypto',
      title: '500% Crypto Bonus',
      subtext: '45x PT - Min. Dep. $20',
      icon: 'coin'
    },
    {
      id: 'none',
      title: 'I will deposit without bonus',
      subtext: '',
      icon: 'slash'
    }
  ];

  const renderBonusIcon = (iconType: string, className = "w-[16px] h-[16px]") => {
    switch (iconType) {
      case 'gift':
        return (
          <img src="/images/bonus-icon.svg" className={`${className} object-contain`} alt="Reload Bonus" />
        );
      case 'star':
        return (
          <img src="/games/deposite-cashback/350.svg" className={`${className} object-contain`} alt="Welcome Bonus" />
        );
      case 'coin':
        return (
          <img src="/games/deposite-cashback/500.svg" className={`${className} object-contain`} alt="Crypto Bonus" />
        );
      case 'slash':
        return (
          <img src="/games/deposite-cashback/i.svg" className={`${className} object-contain`} alt="No Bonus" />
        );
      default:
        return null;
    }
  };

  const getSelectedBonusIcon = () => {
    if (selectedBonus.includes('150%')) return 'gift';
    if (selectedBonus.includes('350%')) return 'star';
    if (selectedBonus.includes('500%')) return 'coin';
    return 'slash';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4">
      <style>{`
        .promo-input::placeholder {
          font-family: 'Manrope', sans-serif;
          font-weight: 600;
          font-size: 14px;
          line-height: 19px;
          letter-spacing: 0.02em;
          color: #7795E8;
          opacity: 1;
        }
      `}</style>
      <div className="absolute inset-0" onClick={onClose} />

      <div className="sm:hidden relative w-full h-full bg-[#0C1F56] overflow-hidden flex flex-col items-center gap-0 border border-white/10 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        
        <div className="absolute w-[71.5px] h-[71.5px] left-[6px] top-[32px] bg-[#1463FF] rounded-full filter blur-[12.5px] pointer-events-none z-0" />

        <div className="w-full h-[50px] flex flex-row justify-between items-center px-[20px] bg-[#0C1F56] shrink-0 z-10 relative select-none">
          <div className="flex flex-row items-center gap-[10px] w-auto h-[30px] shrink-0 relative">
            <svg width="34" height="25" viewBox="0 0 34 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <defs>
                <linearGradient id="crown-gradient-modal" x1="4.07382" y1="12.3753" x2="29.4186" y2="12.3753" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFD85A" />
                  <stop offset="1" stopColor="#FFB800" />
                </linearGradient>
              </defs>
              <path
                d="M33.1198 7.41853L24.191 11.0541C23.9175 11.1662 23.6056 11.0595 23.4552 10.8051L17.478 0.292432C17.2455 -0.104222 16.6655 -0.0960149 16.4467 0.308846L10.1796 10.8325C10.0346 11.1006 9.70631 11.2155 9.42455 11.0951L0.826733 7.41853C0.36169 7.21883 -0.122501 7.65925 0.027954 8.14071L5.1106 24.3269C5.18719 24.5731 5.41698 24.7427 5.67685 24.7427L27.4354 24.7482C27.6843 24.7482 27.9059 24.5923 27.9934 24.3598L33.9022 8.1708C34.0773 7.68661 33.5986 7.2243 33.1226 7.41853H33.1198ZM20.602 15.2668L16.351 22.7896C16.2908 22.8962 16.1321 22.8552 16.1266 22.7348L15.9543 18.1802H14.4689V18.1637C14.4306 18.1692 14.3923 18.1802 14.3513 18.1802H11.2683C11.178 18.1802 11.1206 18.0817 11.1616 18.0023L15.7437 9.51395C15.9051 9.23493 16.2005 9.06532 16.5206 9.06532H19.6035C19.6938 9.06532 19.7512 9.1638 19.7102 9.24313L16.5534 15.089H20.4953C20.5883 15.089 20.6458 15.1875 20.5993 15.2695L20.602 15.2668Z"
                fill="url(#crown-gradient-modal)"
              />
            </svg>
          </div>

          <div className="flex flex-row items-center gap-[16px] h-[30px] shrink-0">
            <div className="flex flex-row justify-center items-center px-[20px] h-[30px] bg-[#112F82] rounded-[6px] shrink-0">
              <span className="font-manrope font-bold text-[10.5px] leading-[14px] tracking-[0.02em] text-white">
                ${user ? user.balance.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '105,98'}
              </span>
            </div>

            {/* Plus Button */}
            <div className="w-[30px] h-[30px] bg-[#FFC83D] rounded-[6px] flex items-center justify-center shrink-0 shadow-sm cursor-pointer hover:bg-[#ffd362] active:scale-95 transition-all">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 1V11M1 6H11" stroke="#1A1404" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>

            {/* Notification Icon */}
            <div className="relative w-[30px] h-[30px] bg-[#173EAD] rounded-[6px] flex items-center justify-center cursor-pointer hover:bg-[#2051db] transition-colors shrink-0">
              <svg width="12" height="14" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 16C7.9 16 8.62 15.28 8.62 14.38H5.38C5.38 15.28 6.1 16 7 16ZM12.27 11.12V7C12.27 4.87 11.13 3.09 9.14 2.62V2.12C9.14 1.5 8.64 1 8.02 1H5.98C5.36 1 4.86 1.5 4.86 2.12V2.62C2.86 3.09 1.73 4.86 1.73 7V11.12L0.1 12.75C-0.23 13.08 0 13.62 0.47 13.62H13.53C14 13.62 14.23 13.08 13.9 12.75L12.27 11.12Z" fill="#D2DCF7" />
              </svg>
              <div className="absolute w-[8px] h-[8px] left-[22px] top-[0px] bg-[#FF0E0E] rounded-full border border-[#173EAD]" />
            </div>

            {/* Gift/Offer Icon */}
            <div className="relative w-[30px] h-[30px] bg-[#173EAD] rounded-[6px] flex items-center justify-center cursor-pointer hover:bg-[#2051db] transition-colors shrink-0">
              <img src="/images/bonus-icon.svg" className="w-[12px] h-[12px] object-contain" alt="Gift" />
              <div className="absolute w-[8px] h-[8px] left-[22px] top-[0px] bg-[#FF0E0E] rounded-full border border-[#173EAD]" />
            </div>

            {/* Avatar image */}
            <img src="/image.png" alt="Avatar" className="w-[30px] h-[30px] rounded-full object-cover shrink-0 cursor-pointer border border-[#FFD85A]/50" />
          </div>
        </div>

        {/* Gap of 30px between Header and Body Panel */}
        <div className="w-full h-[30px] bg-[#0C1F56] shrink-0" />

        {/* Main Wallet Panel (Figma specified: background: #091741, border-radius: 30px 30px 0px 0px) */}
        <div className="flex-1 w-full bg-[#091741] rounded-t-[30px] flex flex-col items-center p-[16px_20px_24px] gap-[16px] relative overflow-hidden select-none">
          
          {/* Glowing Aura inside Modal Body (Ellipse 7) */}
          <div className="absolute w-[174px] h-[176px] left-[calc(50%-174px/2-165px)] top-[-125px] bg-[#1463FF] filter blur-[40px] pointer-events-none z-0" />

          {/* Drag handle/indicator (Rectangle 226) */}
          <div 
            onClick={onClose}
            className="w-[70px] h-[6px] bg-[#112F82] rounded-[100px] shrink-0 cursor-pointer z-10 hover:bg-[#1a44bb] transition-colors"
            title="Dismiss Wallet"
          />

          {/* Title Bar: Wallet title + Close button */}
          <div className="flex flex-row justify-between items-center w-full h-[29px] z-10 shrink-0">
            <div className="flex flex-row items-center gap-[12px] h-[29px]">
              <YellowWalletIcon />
              <span className="font-jost font-extrabold text-[20px] leading-[29px] tracking-[0.01em] text-white">Wallet</span>
            </div>
            {/* Dismiss X button */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#A5B8EF] hover:text-white transition-all cursor-pointer border-none bg-transparent"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Tab Buttons bar (Deposit, Bonuses, Withdraw, Transactions) */}
          <div className="flex flex-row items-center gap-[8px] w-full h-[30px] z-10 shrink-0">
            {[
              { id: 'deposit', label: 'Deposit' },
              { id: 'bonuses', label: 'Bonuses' },
              { id: 'withdraw', label: 'Withdraw' },
              { id: 'transactions', label: 'Transactions' }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    background: isActive ? '#1463FF' : '#112F82',
                    color: isActive ? '#FFFFFF' : '#A5B8EF',
                  }}
                  className="flex-1 h-[30px] rounded-[6px] flex items-center justify-center font-sans text-[12px] font-semibold tracking-[0.02em] cursor-pointer hover:brightness-110 active:scale-98 transition-all duration-150 border-none"
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex-1 w-full bg-[#0C1F56] rounded-[16px] p-[16px] gap-[16px] flex flex-col z-10 overflow-y-auto scrollbar-none min-h-[250px] sm:h-[396px]">
            {depositConfirmed ? (
              <div className="flex flex-col items-center justify-center w-full h-full gap-[20px] text-center select-none py-4">
                <p className="font-sans font-semibold text-[14px] leading-[22px] tracking-[0.01em] text-white max-w-[320px]">
                  Your transaction in progress and pending confirmation from the blockchain.
                </p>

                <div className="flex flex-row items-center justify-center gap-[24px] my-[8px]">
                  <svg width="52" height="38" viewBox="0 0 34 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M33.1198 7.41853L24.191 11.0541C23.9175 11.1662 23.6056 11.0595 23.4552 10.8051L17.478 0.292432C17.2455 -0.104222 16.6655 -0.0960149 16.4467 0.308846L10.1796 10.8325C10.0346 11.1006 9.70631 11.2155 9.42455 11.0951L0.826733 7.41853C0.36169 7.21883 -0.122501 7.65925 0.027954 8.14071L5.1106 24.3269C5.18719 24.5731 5.41698 24.7427 5.67685 24.7427L27.4354 24.7482C27.6843 24.7482 27.9059 24.5923 27.9934 24.3598L33.9022 8.1708C34.0773 7.68661 33.5986 7.2243 33.1226 7.41853H33.1198ZM20.602 15.2668L16.351 22.7896C16.2908 22.8962 16.1321 22.8552 16.1266 22.7348L15.9543 18.1802H14.4689V18.1637C14.4306 18.1692 14.3923 18.1802 14.3513 18.1802H11.2683C11.178 18.1802 11.1206 18.0817 11.1616 18.0023L15.7437 9.51395C15.9051 9.23493 16.2005 9.06532 16.5206 9.06532H19.6035C19.6938 9.06532 19.7512 9.1638 19.7102 9.24313L16.5534 15.089H20.4953C20.5883 15.089 20.6458 15.1875 20.5993 15.2695L20.602 15.2668Z" fill="white"/>
                  </svg>

                  <svg width="52" height="38" viewBox="0 0 34 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M33.1198 7.41853L24.191 11.0541C23.9175 11.1662 23.6056 11.0595 23.4552 10.8051L17.478 0.292432C17.2455 -0.104222 16.6655 -0.0960149 16.4467 0.308846L10.1796 10.8325C10.0346 11.1006 9.70631 11.2155 9.42455 11.0951L0.826733 7.41853C0.36169 7.21883 -0.122501 7.65925 0.027954 8.14071L5.1106 24.3269C5.18719 24.5731 5.41698 24.7427 5.67685 24.7427L27.4354 24.7482C27.6843 24.7482 27.9059 24.5923 27.9934 24.3598L33.9022 8.1708C34.0773 7.68661 33.5986 7.2243 33.1226 7.41853H33.1198ZM20.602 15.2668L16.351 22.7896C16.2908 22.8962 16.1321 22.8552 16.1266 22.7348L15.9543 18.1802H14.4689V18.1637C14.4306 18.1692 14.3923 18.1802 14.3513 18.1802H11.2683C11.178 18.1802 11.1206 18.0817 11.1616 18.0023L15.7437 9.51395C15.9051 9.23493 16.2005 9.06532 16.5206 9.06532H19.6035C19.6938 9.06532 19.7512 9.1638 19.7102 9.24313L16.5534 15.089H20.4953C20.5883 15.089 20.6458 15.1875 20.5993 15.2695L20.602 15.2668Z" fill="white"/>
                  </svg>

                  <svg width="52" height="38" viewBox="0 0 34 25" fill="none" xmlns="http://www.w3.org/2000/svg" style={{opacity: 0.35}}>
                    <path d="M33.1198 7.41853L24.191 11.0541C23.9175 11.1662 23.6056 11.0595 23.4552 10.8051L17.478 0.292432C17.2455 -0.104222 16.6655 -0.0960149 16.4467 0.308846L10.1796 10.8325C10.0346 11.1006 9.70631 11.2155 9.42455 11.0951L0.826733 7.41853C0.36169 7.21883 -0.122501 7.65925 0.027954 8.14071L5.1106 24.3269C5.18719 24.5731 5.41698 24.7427 5.67685 24.7427L27.4354 24.7482C27.6843 24.7482 27.9059 24.5923 27.9934 24.3598L33.9022 8.1708C34.0773 7.68661 33.5986 7.2243 33.1226 7.41853H33.1198ZM20.602 15.2668L16.351 22.7896C16.2908 22.8962 16.1321 22.8552 16.1266 22.7348L15.9543 18.1802H14.4689V18.1637C14.4306 18.1692 14.3923 18.1802 14.3513 18.1802H11.2683C11.178 18.1802 11.1206 18.0817 11.1616 18.0023L15.7437 9.51395C15.9051 9.23493 16.2005 9.06532 16.5206 9.06532H19.6035C19.6938 9.06532 19.7512 9.1638 19.7102 9.24313L16.5534 15.089H20.4953C20.5883 15.089 20.6458 15.1875 20.5993 15.2695L20.602 15.2668Z" fill="white"/>
                  </svg>
                </div>

                <p className="font-sans font-medium text-[13px] leading-[21px] tracking-[0.01em] text-white max-w-[320px]">
                  1 confirmation is required for deposits to be credited.{' '}
                  <br className="hidden sm:block" />
                  Want to know how many confirmations this transaction has?{' '}
                  <br />
                  Please{' '}
                  <a
                     href="https://www.blockchain.com/explorer"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-[#FFC83D] hover:text-[#ffd362] underline underline-offset-2 transition-colors font-semibold"
                  >
                    click here
                  </a>
                  .
                </p>
              </div>
            ) : activeTab === 'deposit' && (
              <>
                {/* 1. Select a Bonus */}
                <div className="flex flex-col items-start gap-[8px] w-full relative shrink-0" ref={bonusDropdownRef}>
                  <span className="font-sans font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3]">
                    1.Select a Bonus
                  </span>
                  
                  <div 
                    onClick={() => setIsBonusDropdownOpen(!isBonusDropdownOpen)}
                    style={{
                      border: isBonusDropdownOpen ? '1px solid #1463FF' : '1px solid rgba(255,255,255,0.05)'
                    }}
                    className="flex flex-row items-center justify-between px-[16px] w-full h-[50px] bg-[#112F82] rounded-[8px] cursor-pointer hover:bg-[#153a9e] transition-all duration-150"
                  >
                    <div className="flex flex-row items-center gap-[8px]">
                      <div className="text-[#FFC83D] flex items-center justify-center">
                        {renderBonusIcon('gift', 'w-[16px] h-[16px]')}
                      </div>
                      <span className="font-sans font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white">
                        {selectedBonus}
                      </span>
                    </div>
                    <svg 
                      width="10" 
                      height="6" 
                      viewBox="0 0 10 6" 
                      fill="none" 
                      className={`transform transition-transform duration-200 ${isBonusDropdownOpen ? 'rotate-180' : ''}`}
                    >
                      <path d="M1 1L5 5L9 1" stroke="#A5B8EF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  {isBonusDropdownOpen && (
                    <div className="absolute top-[78px] left-0 right-0 bg-[#0C1F56] rounded-[8px] border-2 border-[#1463FF] shadow-2xl z-[9999] overflow-hidden flex flex-col">
                      <div className="px-[16px] py-[12px] border-b border-white/5 font-sans font-bold text-[12px] text-white bg-[#091741]">
                        Choose one bonus on next deposits
                      </div>
                      <div className="flex flex-col max-h-[180px] overflow-y-auto">
                        {bonusOptions.map((opt) => {
                          const isSelected = selectedBonus === opt.title;
                          return (
                            <div 
                              key={opt.id}
                              onClick={() => {
                                setSelectedBonus(opt.title);
                                setIsBonusDropdownOpen(false);
                              }}
                              className={`flex flex-row items-center gap-[12px] px-[16px] py-[10px] cursor-pointer transition-colors ${
                                isSelected ? 'bg-[#1463FF]' : 'hover:bg-[#112F82]'
                              }`}
                            >
                              <div className={`shrink-0 ${isSelected ? 'text-white' : 'text-[#A5B8EF]'}`}>
                                {renderBonusIcon(opt.icon, 'w-[16px] h-[16px]')}
                              </div>
                              <div className="flex flex-col">
                                <span className="font-sans font-bold text-[13px] text-white">
                                  {opt.title}
                                </span>
                                {opt.subtext && (
                                  <span className={`font-sans font-semibold text-[10px] ${
                                    isSelected ? 'text-white/80' : 'text-[#7795E8]'
                                  }`}>
                                    {opt.subtext}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Select a Payment Method */}
                <div className="flex flex-col items-start gap-[8px] w-full relative shrink-0" ref={paymentDropdownRef}>
                  <span className="font-sans font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3]">
                    2.Select a payment method
                  </span>
                  
                  <div 
                    onClick={() => setIsPaymentDropdownOpen(!isPaymentDropdownOpen)}
                    className="flex flex-row items-center justify-between px-[16px] w-full h-[50px] bg-[#112F82] rounded-[8px] cursor-pointer hover:bg-[#153a9e] transition-all duration-150 border border-white/5"
                  >
                    <div className="flex flex-row items-center gap-[8px]">
                      {selectedPayment === 'Bitcoin' ? (
                        <>
                          <BitcoinCircleIcon />
                          <div className="flex flex-row items-center gap-[8px]">
                            <span className="font-sans font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white">
                              Bitcoin
                            </span>
                            <span className="font-sans font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#7795E8]">
                              (Min. Deposit $10)
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex flex-row items-center gap-[4px] shrink-0">
                            <VisaIcon />
                            <MastercardIcon />
                          </div>
                          <div className="flex flex-row items-center gap-[8px]">
                            <span className="font-sans font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white">
                              Credit Card
                            </span>
                            <span className="font-sans font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#7795E8]">
                              (Min. $30 - Max. $2500)
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                    <svg 
                      width="10" 
                      height="6" 
                      viewBox="0 0 10 6" 
                      fill="none" 
                      className={`transform transition-transform duration-200 ${isPaymentDropdownOpen ? 'rotate-180' : ''}`}
                    >
                      <path d="M1 1L5 5L9 1" stroke="#A5B8EF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  {isPaymentDropdownOpen && (
                    <div className="absolute top-[78px] left-0 right-0 bg-[#112F82] rounded-[8px] border border-white/10 shadow-xl z-50 overflow-hidden">
                      {/* Option 1: Credit Card */}
                      <div 
                        onClick={() => {
                          setSelectedPayment('Credit Card');
                          setIsPaymentDropdownOpen(false);
                        }}
                        className="flex flex-row items-center justify-between px-[16px] py-[12px] text-white font-sans text-[13px] hover:bg-[#1463FF] cursor-pointer transition-colors"
                      >
                        <div className="flex flex-row items-center gap-[8px]">
                          <div className="flex flex-row items-center gap-[4px]">
                            <VisaIcon />
                            <MastercardIcon />
                          </div>
                          <span>Credit Card (Min. $30 - Max. $2500)</span>
                        </div>
                      </div>
                      
                      {/* Option 2: Bitcoin */}
                      <div 
                        onClick={() => {
                          setSelectedPayment('Bitcoin');
                          setIsPaymentDropdownOpen(false);
                        }}
                        className="flex flex-row items-center justify-between px-[16px] py-[12px] text-white font-sans text-[13px] hover:bg-[#1463FF] cursor-pointer transition-colors"
                      >
                        <div className="flex flex-row items-center gap-[8px]">
                          <BitcoinCircleIcon />
                          <span>Bitcoin (Min. $10)</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Conditional Sub-form Rendering based on selected payment method */}
                {selectedPayment === 'Bitcoin' ? (
                  <>
                    {/* WARNING NOTE */}
                    <div className="flex flex-row items-start gap-[8px] w-full shrink-0">
                      <div className="w-[12px] h-[12px] mt-[2px] flex items-center justify-center shrink-0">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 1C3.24 1 1 3.24 1 6C1 8.76 3.24 11 6 11C8.76 11 11 8.76 11 6C11 3.24 8.76 1 6 1ZM6 8.5C5.72 8.5 5.5 8.28 5.5 8V6C5.5 5.72 5.72 5.5 6 5.5C6.28 5.5 6.5 5.72 6.5 6V8C6.5 8.28 6.28 8.5 6 8.5ZM6 4.5C5.72 4.5 5.5 4.28 5.5 4C5.5 3.72 5.72 3.5 6 3.5C6.28 3.5 6.5 3.72 6.5 4C6.5 4.28 6.28 4.5 6 4.5Z" fill="#7795E8"/>
                        </svg>
                      </div>
                      <span className="font-sans font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#7795E8] select-none">
                        Only deposit BTC via the Bitcoin network. Deposit of other assets or from other networks will be lost.
                      </span>
                    </div>

                    {/* 3. Calculate amount */}
                    <div className="flex flex-col items-start gap-[8px] w-full shrink-0">
                      <span className="font-sans font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3]">
                        3.Calculate the amount you want to deposit
                      </span>
                      
                      <div className="flex flex-row justify-center items-center gap-[8px] w-full h-[50px]">
                        <div className="flex flex-row items-center px-[16px] gap-[12px] flex-grow h-full bg-[#112F82] rounded-[8px] border border-white/5">
                          <DollarCircleIcon />
                          <input 
                            type="number"
                            value={usdAmount}
                            onChange={(e) => handleUsdChange(e.target.value)}
                            className="w-full bg-transparent border-none outline-none font-sans font-bold text-[14px] leading-[19px] text-white placeholder-white/30"
                            placeholder="0.00"
                          />
                        </div>

                        <button 
                          onClick={togglePrimaryCurrency}
                          className="w-[50px] h-[50px] bg-[#1463FF] hover:bg-[#2c75ff] rounded-[8px] flex items-center justify-center text-white shrink-0 active:scale-90 transition-transform cursor-pointer border-none bg-transparent"
                        >
                          <SwapIcon />
                        </button>

                        <div className="flex flex-row items-center px-[16px] gap-[12px] flex-grow h-full bg-[#112F82] rounded-[8px] border border-white/5">
                          <BitcoinCircleIcon />
                          <input 
                            type="number"
                            value={btcAmount}
                            onChange={(e) => handleBtcChange(e.target.value)}
                            className="w-full bg-transparent border-none outline-none font-sans font-bold text-[14px] leading-[19px] text-white placeholder-white/30"
                            placeholder="0.000000"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 4. BTC Deposit Address */}
                    <div className="flex flex-col items-start gap-[8px] w-full relative shrink-0">
                      <span className="font-sans font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3]">
                        4.BTC Deposit Address
                      </span>
                      
                      <div className="flex flex-row items-center justify-between px-[16px] w-full h-[50px] bg-[#112F82] rounded-[8px] border border-white/5">
                        <span className="font-sans font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-[#7795E8] truncate max-w-[200px] sm:max-w-[250px] select-all">
                          {btcAddress}
                        </span>
                        
                        <div className="flex flex-row items-center gap-[12px] shrink-0">
                          <button 
                            onClick={copyAddress}
                            className="w-[16px] h-[16px] text-[#BBCAF3] hover:text-white transition-colors cursor-pointer relative border-none bg-transparent p-0 flex items-center justify-center"
                            title="Copy Address"
                          >
                            {copied ? (
                              <span className="absolute bottom-[24px] right-[-10px] bg-[#1463FF] text-white text-[10px] px-1.5 py-0.5 rounded shadow-lg font-sans font-bold">
                                Copied!
                              </span>
                            ) : null}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8 5H6C4.89543 5 4 5.89543 4 7V19C4 20.1046 4.89543 21 6 21H16C17.1046 21 18 20.1046 18 19V17M16 3H10C8.89543 3 8 3.89543 8 5V15C8 16.1046 8.89543 17 10 17H16C17.1046 17 18 16.1046 18 15V5C18 3.89543 17.1046 3 16 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>

                          <button 
                            onClick={() => setShowQrCode(!showQrCode)}
                            className="w-[16px] h-[16px] text-[#BBCAF3] hover:text-white transition-colors cursor-pointer border-none bg-transparent p-0 flex items-center justify-center"
                            title="Show QR Code"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3 11H9V3H3V11ZM5 5H7V9H5V5ZM3 21H9V13H3V21ZM5 15H7V19H5V15ZM13 3V11H19V3H13ZM15 5H17V9H15V5ZM13 13H15V15H13V13ZM15 15H17V17H15V15ZM13 17H15V19H13V17ZM15 19H17V21H15V19ZM17 13H19V15H17V13ZM17 17H19V21H17V17Z" fill="currentColor"/>
                            </svg>
                          </button>
                        </div>
                      </div>

                      {showQrCode && (
                        <div className="absolute bottom-[58px] right-0 bg-[#0C1F56] border border-white/10 rounded-[12px] p-4 flex flex-col items-center gap-2 shadow-2xl z-[100]">
                          <div className="w-[120px] h-[120px] bg-white p-2 rounded flex flex-wrap gap-[2px]">
                            {Array.from({ length: 144 }).map((_, i) => {
                              const isFilled = (i % 3 === 0 && i % 4 !== 0) || (i < 30 && i % 2 === 0) || (i > 110 && i % 5 === 0) || (i % 7 === 1);
                              return (
                                <div 
                                  key={i} 
                                  style={{ background: isFilled ? '#091741' : '#FFFFFF' }}
                                  className="w-[8px] h-[8px]" 
                                />
                              );
                            })}
                          </div>
                          <span className="font-sans text-[10px] text-[#BBCAF3]">Scan with crypto wallet</span>
                        </div>
                      )}
                    </div>
                  </>
                ) : creditCardStep === 'address' ? (
                  /* Credit Card Address Fields (Step 1) */
                  <div className="flex flex-col items-start gap-[12px] w-full shrink-0">
                    <div className="flex flex-col gap-[2px] w-full">
                      <span className="font-sans font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white">
                        Enter your address
                      </span>
                      <div className="flex flex-row items-start gap-[8px] w-full mt-[2px]">
                        <div className="w-[12px] h-[12px] mt-[2px] flex items-center justify-center shrink-0">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 1C3.24 1 1 3.24 1 6C1 8.76 3.24 11 6 11C8.76 11 11 8.76 11 6C11 3.24 8.76 1 6 1ZM6 8.5C5.72 8.5 5.5 8.28 5.5 8V6C5.5 5.72 5.72 5.5 6 5.5C6.28 5.5 6.5 5.72 6.5 6V8C6.5 8.28 6.28 8.5 6 8.5ZM6 4.5C5.72 4.5 5.5 4.28 5.5 4C5.5 3.72 5.72 3.5 6 3.5C6.28 3.5 6.5 3.72 6.5 4C6.5 4.28 6.28 4.5 6 4.5Z" fill="#7795E8"/>
                          </svg>
                        </div>
                        <span className="font-sans font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#7795E8] select-none">
                          Please fill up your address details before completing your deposit. This information is required for credit card deposits.
                        </span>
                      </div>
                    </div>

                    {/* Street */}
                    <input 
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full h-[50px] px-[16px] bg-[#112F82] rounded-[8px] border border-white/5 font-sans font-semibold text-[14px] leading-[19px] text-white placeholder-[#A5B8EF]/60 outline-none focus:border-white/10"
                      placeholder="Street"
                    />

                    {/* City & Postal Code */}
                    <div className="flex flex-row gap-[8px] w-full">
                      <input 
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="flex-1 h-[50px] px-[16px] bg-[#112F82] rounded-[8px] border border-white/5 font-sans font-semibold text-[14px] leading-[19px] text-white placeholder-[#A5B8EF]/60 outline-none focus:border-white/10"
                        placeholder="City"
                      />
                      <input 
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="flex-1 h-[50px] px-[16px] bg-[#112F82] rounded-[8px] border border-white/5 font-sans font-semibold text-[14px] leading-[19px] text-white placeholder-[#A5B8EF]/60 outline-none focus:border-white/10"
                        placeholder="Postal Code"
                      />
                    </div>

                    {/* State & Country */}
                    <div className="flex flex-row gap-[8px] w-full relative">
                      <input 
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="flex-1 h-[50px] px-[16px] bg-[#112F82] rounded-[8px] border border-white/5 font-sans font-semibold text-[14px] leading-[19px] text-white placeholder-[#A5B8EF]/60 outline-none focus:border-white/10"
                        placeholder="State"
                      />
                      
                      {/* Country dropdown */}
                      <div className="flex-1 relative" ref={countryDropdownRef}>
                        <div 
                          onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                          className="flex flex-row items-center justify-between px-[16px] h-[50px] bg-[#112F82] rounded-[8px] cursor-pointer hover:bg-[#153a9e] transition-all duration-150 border border-white/5"
                        >
                          <div className="flex flex-row items-center gap-[8px] truncate">
                            {country === 'United States' && <USFlag />}
                            {country === 'Canada' && <CanadaFlag />}
                            {country === 'United Kingdom' && <UKFlag />}
                            <span className="font-sans font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white truncate">
                              {country}
                            </span>
                          </div>
                          <svg 
                            width="10" 
                            height="6" 
                            viewBox="0 0 10 6" 
                            fill="none" 
                            className={`transform transition-transform duration-200 shrink-0 ${isCountryDropdownOpen ? 'rotate-180' : ''}`}
                          >
                            <path d="M1 1L5 5L9 1" stroke="#A5B8EF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>

                        {isCountryDropdownOpen && (
                          <div className="absolute bottom-[58px] left-0 right-0 bg-[#112F82] rounded-[8px] border border-white/10 shadow-xl z-50 overflow-hidden">
                            {[
                              { name: 'United States', flag: <USFlag /> },
                              { name: 'Canada', flag: <CanadaFlag /> },
                              { name: 'United Kingdom', flag: <UKFlag /> }
                            ].map((c, idx) => (
                              <div 
                                key={idx}
                                onClick={() => {
                                  setCountry(c.name);
                                  setIsCountryDropdownOpen(false);
                                }}
                                className="flex flex-row items-center gap-[8px] px-[16px] py-[10px] text-white font-sans text-[13px] hover:bg-[#1463FF] cursor-pointer transition-colors"
                              >
                                {c.flag}
                                <span>{c.name}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Credit Card Payment Details (Step 2) */
                  <div className="flex flex-col items-start gap-[12px] w-full shrink-0">
                    
                    {/* Select an amount */}
                    <div className="flex flex-col items-start gap-[8px] w-full">
                      <div className="flex flex-row items-center justify-between w-full">
                        <span className="font-sans font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3]">
                          Select an amount
                        </span>
                        {creditCardStep === 'payment' && (
                          <button 
                            onClick={() => setCreditCardStep('address')}
                            className="font-sans font-semibold text-[10px] text-[#7795E8] hover:text-white transition-colors cursor-pointer flex items-center gap-1 border-none bg-transparent p-0"
                          >
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6 8L3 5L6 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Edit Address
                          </button>
                        )}
                      </div>

                      <div className="flex flex-row items-center gap-[8px] w-full h-[50px]">
                        {[20, 30, 100].map((amount) => {
                          const isActive = ccAmountOption === amount;
                          return (
                            <button
                              key={amount}
                              type="button"
                              onClick={() => setCcAmountOption(amount as any)}
                              className={`flex-1 h-full rounded-[8px] flex items-center justify-center font-sans font-bold text-[14px] leading-[19px] transition-all cursor-pointer border-none ${
                                isActive 
                                  ? 'bg-[#1463FF] text-white' 
                                  : 'bg-[#112F82] text-[#A5B8EF] hover:bg-[#153a9e]'
                              }`}
                            >
                              ${amount}
                            </button>
                          );
                        })}

                        {/* Custom Amount Option */}
                        <div className="flex-1 h-full relative">
                          {ccAmountOption === 'custom' ? (
                            <div className="flex flex-row items-center px-[12px] w-full h-full bg-[#112F82] border border-[#1463FF] rounded-[8px]">
                              <span className="font-sans font-bold text-[14px] text-white mr-1">$</span>
                              <input 
                                type="number"
                                value={ccCustomAmount}
                                onChange={(e) => setCcCustomAmount(e.target.value)}
                                className="w-full bg-transparent border-none outline-none font-sans font-bold text-[14px] text-white placeholder-white/30"
                                placeholder="0"
                                autoFocus
                              />
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setCcAmountOption('custom')}
                              className="w-full h-full rounded-[8px] bg-[#112F82] text-[#A5B8EF] hover:bg-[#153a9e] flex items-center justify-center font-sans font-bold text-[14px] leading-[19px] cursor-pointer border-none"
                            >
                              Custom...
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Enter your payment details */}
                    <div className="flex flex-col items-start gap-[8px] w-full">
                      <span className="font-sans font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3]">
                        Enter your payment details
                      </span>

                      {/* Card Number Input */}
                      <input 
                        type="text"
                        value={creditCardNumber}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').substring(0, 16);
                          const match = val.match(/.{1,4}/g);
                          setCreditCardNumber(match ? match.join(' ') : val);
                        }}
                        className="w-full h-[50px] px-[16px] bg-[#112F82] rounded-[8px] border border-white/5 font-sans font-semibold text-[14px] leading-[19px] text-white placeholder-[#A5B8EF]/60 outline-none focus:border-white/10"
                        placeholder="Credit Card Number"
                      />

                      {/* Exp. and CCV */}
                      <div className="flex flex-row gap-[8px] w-full">
                        <input 
                          type="text"
                          value={creditCardExp}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').substring(0, 4);
                            if (val.length >= 3) {
                              setCreditCardExp(`${val.slice(0, 2)}/${val.slice(2)}`);
                            } else {
                              setCreditCardExp(val);
                            }
                          }}
                          className="flex-1 h-[50px] px-[16px] bg-[#112F82] rounded-[8px] border border-white/5 font-sans font-semibold text-[14px] leading-[19px] text-white placeholder-[#A5B8EF]/60 outline-none focus:border-white/10"
                          placeholder="Exp. (MM/YY)"
                        />
                        <input 
                          type="password"
                          value={creditCardCcv}
                          onChange={(e) => setCreditCardCcv(e.target.value.replace(/\D/g, '').substring(0, 4))}
                          className="flex-1 h-[50px] px-[16px] bg-[#112F82] rounded-[8px] border border-white/5 font-sans font-semibold text-[14px] leading-[19px] text-white placeholder-[#A5B8EF]/60 outline-none focus:border-white/10"
                          placeholder="CCV"
                        />
                      </div>
                    </div>

                    {/* Info note */}
                    <div className="flex flex-row items-start gap-[8px] w-full mt-[2px]">
                      <div className="w-[12px] h-[12px] mt-[2px] flex items-center justify-center shrink-0">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 1C3.24 1 1 3.24 1 6C1 8.76 3.24 11 6 11C8.76 11 11 8.76 11 6C11 3.24 8.76 1 6 1ZM6 8.5C5.72 8.5 5.5 8.28 5.5 8V6C5.5 5.72 5.72 5.5 6 5.5C6.28 5.5 6.5 5.72 6.5 6V8C6.5 8.28 6.28 8.5 6 8.5ZM6 4.5C5.72 4.5 5.5 4.28 5.5 4C5.5 3.72 5.72 3.5 6 3.5C6.28 3.5 6.5 3.72 6.5 4C6.5 4.28 6.28 4.5 6 4.5Z" fill="#7795E8"/>
                        </svg>
                      </div>
                      <span className="font-sans font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#7795E8] select-none">
                        Your transaction will be processed instantly and safely.
                      </span>
                    </div>
                  </div>
                )}
              </>
            )}

            {activeTab === 'bonuses' && (
              <div className="flex flex-col gap-[16px] w-full h-full select-none shrink-0">

                {/* Promo Code Row */}
                <div className="flex flex-col gap-[8px] w-full">
                  <span className="font-sans font-medium text-[13px] leading-[18px] tracking-[0.01em] text-white">
                    If you have a Bonus Code &ndash; enter it here
                  </span>
                  {/* Input + Apply row */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: '0px',
                      gap: '8px',
                      width: '100%',
                      height: '50px',
                    }}
                  >
                    {/* Input — height: 50px, bg: #112F82 */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: '10px 16px',
                        gap: '12px',
                        height: '50px',
                        flexGrow: 1,
                        background: '#112F82',
                        borderRadius: '8px',
                        boxSizing: 'border-box',
                        minWidth: 0,
                      }}
                    >
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Promo Code"
                        className="promo-input"
                        style={{
                          width: '100%',
                          height: '24px',
                          fontFamily: "'Manrope', sans-serif",
                          fontStyle: 'normal',
                          fontWeight: 600,
                          fontSize: '14px',
                          lineHeight: '24px',
                          letterSpacing: '0.02em',
                          color: '#FFFFFF',
                          background: 'transparent',
                          border: 'none',
                          outline: 'none',
                          flexGrow: 1,
                        }}
                        onFocus={(e) => {
                          (e.currentTarget.parentElement?.parentElement as HTMLElement).style.boxShadow = '0 0 0 1.5px rgba(20,99,255,0.6)';
                        }}
                        onBlur={(e) => {
                          (e.currentTarget.parentElement?.parentElement as HTMLElement).style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    {/* Apply — height: 50px, Manrope 700 14px, r-8 */}
                    <button
                      type="button"
                      onClick={() => {
                        if (!promoCode.trim()) return;
                        alert(`Promo code "${promoCode}" applied!`);
                        setPromoCode('');
                      }}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '10px 30px',
                        gap: '10px',
                        width: '100px',
                        height: '50px',
                        background: '#FFC83D',
                        borderRadius: '8px',
                        border: 'none',
                        flexShrink: 0,
                        cursor: 'pointer',
                        transition: 'background 0.15s',
                        fontFamily: 'Manrope, sans-serif',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        fontSize: '14px',
                        lineHeight: '19px',
                        letterSpacing: '0.02em',
                        color: '#1A1404',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#ffd362')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = '#FFC83D')}
                      onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
                      onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* Available Bonuses label */}
                <span className="font-sans font-medium text-[13px] leading-[18px] tracking-[0.01em] text-white">
                  Available bonuses for you
                </span>

                {/* Horizontally scrollable bonus cards */}
                <div
                  ref={bonusScrollRef}
                  onScroll={() => {
                    if (!bonusScrollRef.current) return;
                    const { scrollLeft, scrollWidth, clientWidth } = bonusScrollRef.current;
                    const idx = Math.round((scrollLeft / (scrollWidth - clientWidth)) * 2);
                    setActiveBonusCard(Math.min(2, Math.max(0, idx)));
                  }}
                  className="flex flex-row gap-[10px] overflow-x-auto scrollbar-none scroll-smooth snap-x snap-mandatory w-full"
                  style={{ scrollSnapType: 'x mandatory' }}
                >
                  {[
                    {
                      title: '150% Reload Bonus + 30 Free Spins',
                      minDeposit: '$30',
                      maxCashout: '40x',
                      maxAmount: '$30',
                      wager: '10x',
                    },
                    {
                      title: '350% Welcome Bonus',
                      minDeposit: '$20',
                      maxCashout: '45x',
                      maxAmount: '$50',
                      wager: '45x',
                    },
                    {
                      title: '500% Crypto Bonus',
                      minDeposit: '$20',
                      maxCashout: '50x',
                      maxAmount: '$100',
                      wager: '45x',
                    },
                  ].map((bonus, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        padding: '20px',
                        gap: '12px',
                        width: '280px',
                        height: '205px',
                        background: '#112F82',
                        borderRadius: '12px',
                        flexShrink: 0,
                        alignSelf: 'stretch',
                        scrollSnapAlign: 'start',
                        boxSizing: 'border-box',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: '0px',
                          gap: '10px',
                          width: '240px',
                          height: '20px',
                          alignSelf: 'stretch',
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            width: '240px',
                            height: '20px',
                            fontFamily: "'Jost', sans-serif",
                            fontStyle: 'normal',
                            fontWeight: 700,
                            fontSize: '14px',
                            lineHeight: '20px',
                            letterSpacing: '0.02em',
                            color: '#FFFFFF',
                            flexGrow: 1,
                            flexShrink: 0,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {bonus.title}
                        </span>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          padding: '0px',
                          gap: '9px',
                          width: '240px',
                          height: '81px',
                          alignSelf: 'stretch',
                          flexShrink: 0,
                        }}
                      >
                        {/* Stats Row 1 */}
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            padding: '0px',
                            gap: '12px',
                            width: '240px',
                            height: '36px',
                            alignSelf: 'stretch',
                            flexShrink: 0,
                          }}
                        >
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '0px', gap: '2px', width: '114px', flexGrow: 1 }}>
                            <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 500, fontSize: '10px', lineHeight: '14px', color: '#BBCAF3' }}>Min. Deposit</span>
                            <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 700, fontSize: '14px', lineHeight: '20px', color: '#FFFFFF' }}>{bonus.minDeposit}</span>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '0px', gap: '2px', width: '114px', flexGrow: 1 }}>
                            <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 500, fontSize: '10px', lineHeight: '14px', color: '#BBCAF3' }}>Max. Cashout</span>
                            <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 700, fontSize: '14px', lineHeight: '20px', color: '#FFFFFF' }}>{bonus.maxCashout}</span>
                          </div>
                        </div>

                        {/* Stats Row 2 */}
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            padding: '0px',
                            gap: '12px',
                            width: '240px',
                            height: '36px',
                            alignSelf: 'stretch',
                            flexShrink: 0,
                          }}
                        >
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '0px', gap: '2px', width: '114px', flexGrow: 1 }}>
                            <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 500, fontSize: '10px', lineHeight: '14px', color: '#BBCAF3' }}>Max. Amount</span>
                            <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 700, fontSize: '14px', lineHeight: '20px', color: '#FFFFFF' }}>{bonus.maxAmount}</span>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '0px', gap: '2px', width: '114px', flexGrow: 1 }}>
                            <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 500, fontSize: '10px', lineHeight: '14px', color: '#BBCAF3' }}>Wager (dep.+bonus)</span>
                            <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 700, fontSize: '14px', lineHeight: '20px', color: '#FFFFFF' }}>{bonus.wager}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => alert(`"${bonus.title}" activated!`)}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: '10px 20px',
                          gap: '10px',
                          width: '240px',
                          height: '40px',
                          background: '#FFC83D',
                          borderRadius: '6px',
                          border: 'none',
                          flexShrink: 0,
                          alignSelf: 'stretch',
                          cursor: 'pointer',
                          transition: 'background 0.15s, transform 0.1s',
                          fontFamily: "'Manrope', sans-serif",
                          fontWeight: 700,
                          fontSize: '12px',
                          color: '#1A1404',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = '#ffd362')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = '#FFC83D')}
                        onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
                        onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      >
                        Activate
                      </button>
                    </div>
                  ))}
                </div>

                {/* Dot pagination indicators */}
                <div className="flex flex-row items-center justify-center gap-[6px] mt-auto pt-[4px]">
                  {[0, 1, 2].map((i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        if (!bonusScrollRef.current) return;
                        const cardWidth = bonusScrollRef.current.scrollWidth / 3;
                        bonusScrollRef.current.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
                        setActiveBonusCard(i);
                      }}
                      style={{
                        width: activeBonusCard === i ? '20px' : '8px',
                        height: '8px',
                        borderRadius: '4px',
                        background: activeBonusCard === i ? '#FFFFFF' : 'rgba(255,255,255,0.35)',
                        transition: 'all 0.3s ease',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'withdraw' && (
              <div className="flex flex-col items-center justify-center w-full h-full gap-4 text-center select-none py-8 shrink-0">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 12V16H11V12H8L12 8L16 12H13Z" fill="#A5B8EF" />
                </svg>
                <h4 className="font-jost font-bold text-white text-[16px]">Fast Withdrawals</h4>
                <p className="font-sans text-[12px] text-[#A5B8EF] max-w-[280px]">
                  To request a withdrawal, please verify your email and complete your active bonus wagering requirements.
                </p>
              </div>
            )}

            {activeTab === 'transactions' && (
              <div className="flex flex-col items-center justify-center w-full h-full gap-4 text-center select-none py-8 shrink-0">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM7 10H17V12H7V10ZM7 14H14V16H7V14ZM7 6H17V8H7V6Z" fill="#A5B8EF" />
                </svg>
                <h4 className="font-jost font-bold text-white text-[16px]">Transaction Ledger</h4>
                <p className="font-sans text-[12px] text-[#A5B8EF] max-w-[280px]">
                  No recent transactions found. All verified deposits and withdrawals will show here.
                </p>
              </div>
            )}
          </div>

          {/* Bottom CTA Button — hidden on bonuses tab */}
          {activeTab !== 'bonuses' && (depositConfirmed ? (
            /* ── Confirmed state CTA ── */
            <div className="flex flex-col items-center gap-[12px] w-full z-10 shrink-0 mt-auto pb-4">
              <button
                onClick={onClose}
                className="w-full h-[60px] max-w-[374px] bg-[#FFC83D] hover:bg-[#ffd362] rounded-[8px] flex items-center justify-center font-sans font-bold text-[15px] leading-[19px] text-[#1A1404] tracking-[0.02em] cursor-pointer active:scale-95 transition-all duration-150 shadow-[0_4px_16px_rgba(255,200,61,0.35)] border-none"
              >
                Go to games
              </button>
              <div className="flex flex-row items-center gap-[6px]">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="7" cy="7" r="6" stroke="#A5B8EF" strokeWidth="1.5"/>
                  <path d="M7 4V7.5" stroke="#A5B8EF" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="7" cy="10" r="0.75" fill="#A5B8EF"/>
                </svg>
                <span className="font-sans font-medium text-[12px] leading-[16px] tracking-[0.01em] text-[#A5B8EF]">
                  Having problems?{' '}
                  <button
                    type="button"
                    onClick={() => alert('Opening live support...')}
                    className="text-[#FFC83D] hover:text-[#ffd362] font-semibold transition-colors cursor-pointer bg-transparent border-0 p-0"
                  >
                    Contact support
                  </button>
                </span>
              </div>
            </div>
          ) : selectedPayment === 'Bitcoin' ? (
            <div className="w-full flex justify-center pb-6 shrink-0 z-10">
              <button
                onClick={() => {
                  setDepositConfirmed(true);
                }}
                className="w-full h-[60px] max-w-[374px] bg-[#FFC83D] hover:bg-[#ffd362] rounded-[8px] flex items-center justify-center font-sans font-bold text-[16px] leading-[22px] text-[#1A1404] tracking-[0.02em] cursor-pointer active:scale-95 transition-all duration-150 border-none"
              >
                I&apos;ve completed my deposit
              </button>
            </div>
          ) : creditCardStep === 'address' ? (
            <div className="w-full flex justify-center pb-6 shrink-0 z-10">
              <button
                onClick={() => {
                  if (!street || !city || !postalCode || !state) {
                    alert('Please fill out all address details.');
                    return;
                  }
                  setCreditCardStep('payment');
                }}
                className="w-full h-[60px] max-w-[374px] bg-[#FFC83D] hover:bg-[#ffd362] rounded-[8px] flex items-center justify-center font-sans font-bold text-[16px] leading-[22px] text-[#1A1404] tracking-[0.02em] cursor-pointer active:scale-95 transition-all duration-150 border-none"
              >
                Continue
              </button>
            </div>
          ) : (
            <div className="w-full flex justify-center pb-6 shrink-0 z-10">
              <button
                onClick={() => {
                  if (!creditCardNumber || !creditCardExp || !creditCardCcv) {
                    alert('Please fill out all credit card details.');
                    return;
                  }
                  setDepositConfirmed(true);
                }}
                className="w-full h-[60px] max-w-[374px] bg-[#FFC83D] hover:bg-[#ffd362] rounded-[8px] flex items-center justify-center font-sans font-bold text-[16px] leading-[22px] text-[#1A1404] tracking-[0.02em] cursor-pointer active:scale-95 transition-all duration-150 border-none"
              >
                Deposit ${getDepositAmount()}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────── */}
      {/* DESKTOP CONTAINER (hidden on mobile, visible on sm+) */}
      {/* ──────────────────────────────────────────────────────── */}
      <div 
        style={{
          width: '500px',
          height: '604px',
          padding: '24px 20px 32px',
          gap: '24px',
          background: '#091741',
          borderRadius: '16px',
          isolation: 'isolate',
        }}
        className="hidden sm:flex relative flex-col items-center z-10 border border-white/10 shadow-2xl overflow-visible animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Glowing Aura inside Modal Body (Ellipse 7) */}
        <div 
          style={{
            position: 'absolute',
            width: '173px',
            height: '173px',
            left: 'calc(50% - 173px/2 + 0.5px)',
            top: '-145px',
            background: '#1463FF',
            filter: 'blur(40px)',
            zIndex: 0,
          }}
          className="pointer-events-none" 
        />

        {/* Inner layout frame (460px x 474px, order 1, z-index 1) */}
        <div 
          style={{
            width: '460px',
            height: '474px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '24px',
            zIndex: 1,
          }}
          className="select-none"
        >
          {/* Title bar (460px x 29px, order 0) */}
          <div 
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'flex-start',
              padding: '0px',
              gap: '12px',
              width: '460px',
              height: '29px',
            }}
            className="relative"
          >
            {/* Wallet Group (94px x 29px) */}
            <div 
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '0px',
                gap: '12px',
                width: '94px',
                height: '29px',
              }}
            >
              {/* Wallet Icon Frame (20px x 20px) */}
              <div style={{ width: '20px', height: '20px', position: 'relative' }} className="flex items-center justify-center shrink-0">
                <img src="/games/wallet.svg" alt="Wallet" style={{ width: '20px', height: '18px', objectFit: 'contain' }} />
              </div>

              {/* Wallet Text */}
              <span 
                style={{
                  width: '62px',
                  height: '29px',
                  fontFamily: "'Jost', sans-serif",
                  fontStyle: 'normal',
                  fontWeight: 800,
                  fontSize: '20px',
                  lineHeight: '29px',
                  letterSpacing: '0.01em',
                  color: '#FFFFFF',
                }}
              >
                Wallet
              </span>
            </div>

            {/* Dismiss X button absolute-positioned on right */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                right: '0px',
                top: '0px',
                width: '29px',
                height: '29px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className="text-[#A5B8EF] hover:text-white hover:bg-white/10 transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Body Frame (460px x 421px, order 1) */}
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '0px',
              gap: '16px',
              width: '460px',
              height: '421px',
            }}
          >
            {/* Tab Buttons (460px x 30px, order 0) */}
            <div 
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '0px',
                gap: '8px',
                width: '460px',
                height: '30px',
              }}
            >
              {[
                { id: 'deposit', label: 'Deposit' },
                { id: 'bonuses', label: 'Bonuses' },
                { id: 'withdraw', label: 'Withdraw' },
                { id: 'transactions', label: 'Transactions' }
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    style={{
                      width: '109px',
                      height: '30px',
                      background: isActive ? '#1463FF' : '#112F82',
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '10px 16px',
                      gap: '8px',
                      flexGrow: 1,
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: isActive ? 700 : 600,
                      fontSize: '12px',
                      lineHeight: '16px',
                      letterSpacing: '0.02em',
                      color: isActive ? '#FFFFFF' : '#A5B8EF',
                    }}
                    className="hover:brightness-110 active:scale-98 transition-all duration-150"
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Content Container (460px x 375px, order 1, background: #0C1F56, border-radius: 16px) */}
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '16px',
                gap: '16px',
                width: '460px',
                height: '375px',
                background: '#0C1F56',
                borderRadius: '16px',
                boxSizing: 'border-box',
              }}
              className="overflow-y-auto scrollbar-none"
            >
              {depositConfirmed ? (
                /* Confirmed/Pending Screen */
                <div className="flex flex-col items-center justify-center w-full h-full gap-[20px] text-center select-none py-2">
                  <p className="font-sans font-semibold text-[14px] leading-[22px] tracking-[0.01em] text-white max-w-[320px]">
                    Your transaction in progress and pending confirmation from the blockchain.
                  </p>

                  <div className="flex flex-row items-center justify-center gap-[24px] my-[4px]">
                    <svg width="42" height="30" viewBox="0 0 34 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M33.1198 7.41853L24.191 11.0541C23.9175 11.1662 23.6056 11.0595 23.4552 10.8051L17.478 0.292432C17.2455 -0.104222 16.6655 -0.0960149 16.4467 0.308846L10.1796 10.8325C10.0346 11.1006 9.70631 11.2155 9.42455 11.0951L0.826733 7.41853C0.36169 7.21883 -0.122501 7.65925 0.027954 8.14071L5.1106 24.3269C5.18719 24.5731 5.41698 24.7427 5.67685 24.7427L27.4354 24.7482C27.6843 24.7482 27.9059 24.5923 27.9934 24.3598L33.9022 8.1708C34.0773 7.68661 33.5986 7.2243 33.1226 7.41853H33.1198ZM20.602 15.2668L16.351 22.7896C16.2908 22.8962 16.1321 22.8552 16.1266 22.7348L15.9543 18.1802H14.4689V18.1637C14.4306 18.1692 14.3923 18.1802 14.3513 18.1802H11.2683C11.178 18.1802 11.1206 18.0817 11.1616 18.0023L15.7437 9.51395C15.9051 9.23493 16.2005 9.06532 16.5206 9.06532H19.6035C19.6938 9.06532 19.7512 9.1638 19.7102 9.24313L16.5534 15.089H20.4953C20.5883 15.089 20.6458 15.1875 20.5993 15.2695L20.602 15.2668Z" fill="white"/>
                    </svg>
                    <svg width="42" height="30" viewBox="0 0 34 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M33.1198 7.41853L24.191 11.0541C23.9175 11.1662 23.6056 11.0595 23.4552 10.8051L17.478 0.292432C17.2455 -0.104222 16.6655 -0.0960149 16.4467 0.308846L10.1796 10.8325C10.0346 11.1006 9.70631 11.2155 9.42455 11.0951L0.826733 7.41853C0.36169 7.21883 -0.122501 7.65925 0.027954 8.14071L5.1106 24.3269C5.18719 24.5731 5.41698 24.7427 5.67685 24.7427L27.4354 24.7482C27.6843 24.7482 27.9059 24.5923 27.9934 24.3598L33.9022 8.1708C34.0773 7.68661 33.5986 7.2243 33.1226 7.41853H33.1198ZM20.602 15.2668L16.351 22.7896C16.2908 22.8962 16.1321 22.8552 16.1266 22.7348L15.9543 18.1802H14.4689V18.1637C14.4306 18.1692 14.3923 18.1802 14.3513 18.1802H11.2683C11.178 18.1802 11.1206 18.0817 11.1616 18.0023L15.7437 9.51395C15.9051 9.23493 16.2005 9.06532 16.5206 9.06532H19.6035C19.6938 9.06532 19.7512 9.1638 19.7102 9.24313L16.5534 15.089H20.4953C20.5883 15.089 20.6458 15.1875 20.5993 15.2695L20.602 15.2668Z" fill="white"/>
                    </svg>
                    <svg width="42" height="30" viewBox="0 0 34 25" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.35 }}>
                      <path d="M33.1198 7.41853L24.191 11.0541C23.9175 11.1662 23.6056 11.0595 23.4552 10.8051L17.478 0.292432C17.2455 -0.104222 16.6655 -0.0960149 16.4467 0.308846L10.1796 10.8325C10.0346 11.1006 9.70631 11.2155 9.42455 11.0951L0.826733 7.41853C0.36169 7.21883 -0.122501 7.65925 0.027954 8.14071L5.1106 24.3269C5.18719 24.5731 5.41698 24.7427 5.67685 24.7427L27.4354 24.7482C27.6843 24.7482 27.9059 24.5923 27.9934 24.3598L33.9022 8.1708C34.0773 7.68661 33.5986 7.2243 33.1226 7.41853H33.1198ZM20.602 15.2668L16.351 22.7896C16.2908 22.8962 16.1321 22.8552 16.1266 22.7348L15.9543 18.1802H14.4689V18.1637C14.4306 18.1692 14.3923 18.1802 14.3513 18.1802H11.2683C11.178 18.1802 11.1206 18.0817 11.1616 18.0023L15.7437 9.51395C15.9051 9.23493 16.2005 9.06532 16.5206 9.06532H19.6035C19.6938 9.06532 19.7512 9.1638 19.7102 9.24313L16.5534 15.089H20.4953C20.5883 15.089 20.6458 15.1875 20.5993 15.2695L20.602 15.2668Z" fill="white"/>
                    </svg>
                  </div>

                  <p className="font-sans font-medium text-[12px] leading-[18px] tracking-[0.01em] text-white max-w-[320px]">
                    1 confirmation is required for deposits to be credited.{' '}
                    <br className="hidden sm:block" />
                    Want to know how many confirmations this transaction has?{' '}
                    <br />
                    Please{' '}
                    <a
                      href="https://www.blockchain.com/explorer"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FFC83D] hover:text-[#ffd362] underline underline-offset-2 transition-colors font-semibold"
                    >
                      click here
                    </a>
                    .
                  </p>
                </div>
              ) : activeTab === 'deposit' && (
                <>
                  {/* 1. Select a Bonus */}
                  <div 
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      padding: '0px',
                      gap: '8px',
                      width: '428px',
                      height: '62px',
                    }}
                    className="relative shrink-0" 
                    ref={bonusDropdownRef}
                  >
                    <span 
                      style={{
                        width: '97px',
                        height: '16px',
                        fontFamily: "'Manrope', sans-serif",
                        fontStyle: 'normal',
                        fontWeight: 600,
                        fontSize: '12px',
                        lineHeight: '16px',
                        letterSpacing: '0.02em',
                        color: '#BBCAF3',
                      }}
                    >
                      1.Select a Bonus
                    </span>
                    
                    <div 
                      onClick={() => setIsBonusDropdownOpen(!isBonusDropdownOpen)}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: '10px 16px',
                        gap: '12px',
                        width: '428px',
                        height: '40px',
                        background: '#112F82',
                        borderRadius: '8px',
                        border: isBonusDropdownOpen ? '1px solid #1463FF' : '1px solid rgba(255,255,255,0.05)',
                        boxSizing: 'border-box',
                      }}
                      className="cursor-pointer hover:bg-[#153a9e] transition-all duration-150"
                    >
                      <div 
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: '0px',
                          gap: '8px',
                          width: '370px',
                          height: '19px',
                        }}
                      >
                        <div className="w-[16px] h-[16px] relative flex items-center justify-center shrink-0">
                          {renderBonusIcon(getSelectedBonusIcon(), 'w-[16px] h-[16px]')}
                        </div>
                        <span 
                          style={{
                            width: '245px',
                            height: '19px',
                            fontFamily: "'Manrope', sans-serif",
                            fontStyle: 'normal',
                            fontWeight: 700,
                            fontSize: '14px',
                            lineHeight: '19px',
                            letterSpacing: '0.02em',
                            color: '#FFFFFF',
                          }}
                          className="truncate"
                        >
                          {selectedBonus}
                        </span>
                      </div>
                      
                      <div 
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '0px',
                          gap: '11.67px',
                          width: '14px',
                          height: '14px',
                        }}
                        className="shrink-0"
                      >
                        <div 
                          style={{
                            margin: '0 auto',
                            width: '7px',
                            height: '3.5px',
                            border: '1.5px solid #A5B8EF',
                            borderTop: 'none',
                            borderRight: 'none',
                            transform: isBonusDropdownOpen ? 'rotate(135deg) translateY(-1px)' : 'rotate(-45deg)',
                            transition: 'transform 0.2s',
                          }}
                          className="shrink-0" 
                        />
                      </div>
                    </div>

                    {isBonusDropdownOpen && (
                      <div 
                        style={{ width: '428px', top: '68px' }} 
                        className="absolute left-0 bg-[#0C1F56] rounded-[8px] border-2 border-[#1463FF] shadow-2xl z-[9999] overflow-hidden flex flex-col"
                      >
                        <div className="px-[16px] py-[12px] border-b border-white/5 font-sans font-bold text-[12px] text-white bg-[#091741]">
                          Choose one bonus on next deposits
                        </div>
                        <div className="flex flex-col max-h-[160px] overflow-y-auto">
                          {bonusOptions.map((opt) => {
                            const isSelected = selectedBonus === opt.title;
                            return (
                              <div 
                                key={opt.id}
                                onClick={() => {
                                  setSelectedBonus(opt.title);
                                  setIsBonusDropdownOpen(false);
                                }}
                                className={`flex flex-row items-center gap-[12px] px-[16px] py-[10px] cursor-pointer transition-colors ${
                                  isSelected ? 'bg-[#1463FF]' : 'hover:bg-[#112F82]'
                                }`}
                              >
                                <div className={`shrink-0 ${isSelected ? 'text-white' : 'text-[#A5B8EF]'}`}>
                                  {renderBonusIcon(opt.icon, 'w-[16px] h-[16px]')}
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-sans font-bold text-[13px] text-white">
                                    {opt.title}
                                  </span>
                                  {opt.subtext && (
                                    <span className={`font-sans font-semibold text-[10px] ${
                                      isSelected ? 'text-white/80' : 'text-[#7795E8]'
                                    }`}>
                                      {opt.subtext}
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 2. Select a payment method */}
                  <div 
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      padding: '0px',
                      gap: '8px',
                      width: '428px',
                      height: '63px',
                    }}
                    className="relative shrink-0" 
                    ref={paymentDropdownRef}
                  >
                    <span 
                      style={{
                        width: '163px',
                        height: '16px',
                        fontFamily: "'Manrope', sans-serif",
                        fontStyle: 'normal',
                        fontWeight: 600,
                        fontSize: '12px',
                        lineHeight: '16px',
                        letterSpacing: '0.02em',
                        color: '#BBCAF3',
                      }}
                    >
                      2.Select a payment method
                    </span>
                    
                    <div 
                      onClick={() => setIsPaymentDropdownOpen(!isPaymentDropdownOpen)}
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
                        border: '1px solid rgba(255,255,255,0.05)',
                        boxSizing: 'border-box',
                      }}
                      className="cursor-pointer hover:bg-[#153a9e] transition-all duration-150"
                    >
                      <div 
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: '0px',
                          gap: '8px',
                          width: '370px',
                          height: '19px',
                        }}
                      >
                        {selectedPayment === 'Bitcoin' ? (
                          <>
                            <div className="w-[16px] h-[16px] relative flex items-center justify-center shrink-0">
                              <img src="/images/bitcoin.svg" className="w-[16px] h-[16px] object-contain" alt="Bitcoin" />
                            </div>
                            <div 
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: '0px',
                                gap: '8px',
                                width: '346px',
                                height: '19px',
                              }}
                            >
                              <span 
                                style={{
                                  width: '50px',
                                  height: '19px',
                                  fontFamily: "'Manrope', sans-serif",
                                  fontStyle: 'normal',
                                  fontWeight: 700,
                                  fontSize: '14px',
                                  lineHeight: '19px',
                                  letterSpacing: '0.02em',
                                  color: '#FFFFFF',
                                }}
                              >
                                Bitcoin
                              </span>
                              <span 
                                style={{
                                  width: '89px',
                                  height: '14px',
                                  fontFamily: "'Manrope', sans-serif",
                                  fontStyle: 'normal',
                                  fontWeight: 500,
                                  fontSize: '10px',
                                  lineHeight: '14px',
                                  letterSpacing: '0.02em',
                                  color: '#7795E8',
                                }}
                              >
                                (Min. Deposit $10)
                              </span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex flex-row items-center gap-[4px] shrink-0">
                              <img src="/images/visa.svg" className="w-[24px] h-[15px] object-contain" alt="Visa" />
                              <MastercardIcon />
                            </div>
                            <div className="flex flex-row items-center gap-[8px]">
                              <span className="font-sans font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white">
                                Credit Card
                              </span>
                              <span className="font-sans font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#7795E8]">
                                (Min. $30 - Max. $2500)
                              </span>
                            </div>
                          </>
                        )}
                      </div>

                      <div 
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '0px',
                          gap: '11.67px',
                          width: '14px',
                          height: '14px',
                        }}
                        className="shrink-0"
                      >
                        <div 
                          style={{
                            margin: '0 auto',
                            width: '7px',
                            height: '3.5px',
                            border: '1.5px solid #A5B8EF',
                            borderTop: 'none',
                            borderRight: 'none',
                            transform: isPaymentDropdownOpen ? 'rotate(135deg) translateY(-1px)' : 'rotate(-45deg)',
                            transition: 'transform 0.2s',
                          }}
                          className="shrink-0" 
                        />
                      </div>
                    </div>

                    {isPaymentDropdownOpen && (
                      <div 
                        style={{ width: '428px', top: '68px' }} 
                        className="absolute left-0 bg-[#112F82] rounded-[8px] border border-white/10 shadow-xl z-50 overflow-hidden"
                      >
                        <div 
                          onClick={() => {
                            setSelectedPayment('Credit Card');
                            setIsPaymentDropdownOpen(false);
                          }}
                          className="flex flex-row items-center justify-between px-[16px] py-[12px] text-white font-sans text-[13px] hover:bg-[#1463FF] cursor-pointer transition-colors"
                        >
                          <div className="flex flex-row items-center gap-[8px]">
                            <div className="flex flex-row items-center gap-[4px]">
                              <img src="/images/visa.svg" className="w-[24px] h-[15px] object-contain" alt="Visa" />
                              <MastercardIcon />
                            </div>
                            <span>Credit Card (Min. $30 - Max. $2500)</span>
                          </div>
                        </div>
                        
                        <div 
                          onClick={() => {
                            setSelectedPayment('Bitcoin');
                            setIsPaymentDropdownOpen(false);
                          }}
                          className="flex flex-row items-center justify-between px-[16px] py-[12px] text-white font-sans text-[13px] hover:bg-[#1463FF] cursor-pointer transition-colors"
                        >
                          <div className="flex flex-row items-center gap-[8px]">
                            <img src="/images/bitcoin.svg" className="w-[16px] h-[16px] object-contain" alt="Bitcoin" />
                            <span>Bitcoin (Min. $10)</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Payment sub-contents */}
                  {selectedPayment === 'Bitcoin' ? (
                    <>
                      {/* Warning message */}
                      <div 
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'flex-start',
                          padding: '0px',
                          gap: '8px',
                          width: '428px',
                          height: '28px',
                        }}
                        className="shrink-0"
                      >
                        <div className="shrink-0 flex items-center justify-center pt-[2px]">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="7" cy="7" r="6" stroke="#7795E8" strokeWidth="1.5"/>
                            <path d="M7 4V4.5" stroke="#7795E8" strokeWidth="1.5" strokeLinecap="round"/>
                            <path d="M7 6V10" stroke="#7795E8" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        </div>

                        <span 
                          style={{
                            width: '408px',
                            height: '28px',
                            fontFamily: "'Manrope', sans-serif",
                            fontStyle: 'normal',
                            fontWeight: 500,
                            fontSize: '10px',
                            lineHeight: '14px',
                            letterSpacing: '0.02em',
                            color: '#7795E8',
                          }}
                        >
                          Only deposit BTC via the Bitcoin network. Deposit of other assets or from other networks will be lost.
                        </span>
                      </div>

                      {/* 3. Calculate amount */}
                      <div 
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          padding: '0px',
                          gap: '8px',
                          width: '428px',
                          height: '64px',
                        }}
                        className="shrink-0"
                      >
                        <span 
                          style={{
                            width: '259px',
                            height: '16px',
                            fontFamily: "'Manrope', sans-serif",
                            fontStyle: 'normal',
                            fontWeight: 600,
                            fontSize: '12px',
                            lineHeight: '16px',
                            letterSpacing: '0.02em',
                            color: '#BBCAF3',
                          }}
                        >
                          3.Calculate the amount you want to deposit
                        </span>
                        
                        <div 
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '0px',
                            gap: '8px',
                            width: '428px',
                            height: '40px',
                          }}
                        >
                          {/* USD Input Frame */}
                          <div 
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              padding: '10px 16px',
                              gap: '12px',
                              width: '186px',
                              height: '40px',
                              background: '#112F82',
                              borderRadius: '8px',
                              boxSizing: 'border-box',
                            }}
                            className="flex-grow border border-white/5"
                          >
                            <img src="/images/doller.svg" className="w-5 h-5 object-contain shrink-0" alt="USD" />
                            <input 
                              type="number"
                              value={usdAmount}
                              onChange={(e) => handleUsdChange(e.target.value)}
                              style={{
                                width: '130px',
                                height: '19px',
                                fontFamily: "'Manrope', sans-serif",
                                fontStyle: 'normal',
                                fontWeight: 700,
                                fontSize: '14px',
                                lineHeight: '19px',
                                letterSpacing: '0.02em',
                                color: '#FFFFFF',
                                background: 'transparent',
                                border: 'none',
                                outline: 'none',
                              }}
                              placeholder="100"
                            />
                          </div>

                          {/* Swap Button Frame */}
                          <button 
                            onClick={togglePrimaryCurrency}
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                              padding: '0px',
                              gap: '2px',
                              width: '40px',
                              height: '40px',
                              background: '#1463FF',
                              borderRadius: '8px',
                              border: 'none',
                              cursor: 'pointer',
                            }}
                            className="hover:bg-[#2c75ff] transition-colors shrink-0 active:scale-95 duration-100"
                          >
                            {/* SVG swap arrows */}
                            <div style={{ width: '14px', height: '8px', position: 'relative' }}>
                              <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-0 top-0">
                                <path d="M12.5 4H1.5M12.5 4L9.5 1M12.5 4L9.5 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <div style={{ width: '14px', height: '8px', position: 'relative', transform: 'matrix(-1, 0, 0, 1, 0, 0)' }}>
                              <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-0 top-0">
                                <path d="M12.5 4H1.5M12.5 4L9.5 1M12.5 4L9.5 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </button>

                          {/* BTC Input Frame */}
                          <div 
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              padding: '10px 16px',
                              gap: '12px',
                              width: '186px',
                              height: '40px',
                              background: '#112F82',
                              borderRadius: '8px',
                              boxSizing: 'border-box',
                            }}
                            className="flex-grow border border-white/5"
                          >
                            <img src="/images/bitcoin.svg" className="w-5 h-5 object-contain shrink-0" alt="BTC" />
                            <input 
                              type="number"
                              value={btcAmount}
                              onChange={(e) => handleBtcChange(e.target.value)}
                              style={{
                                width: '130px',
                                height: '19px',
                                fontFamily: "'Manrope', sans-serif",
                                fontStyle: 'normal',
                                fontWeight: 700,
                                fontSize: '14px',
                                lineHeight: '19px',
                                letterSpacing: '0.02em',
                                color: '#FFFFFF',
                                background: 'transparent',
                                border: 'none',
                                outline: 'none',
                              }}
                              placeholder="0.00954"
                            />
                          </div>
                        </div>
                      </div>

                      {/* 4. BTC Deposit Address */}
                      <div 
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          padding: '0px',
                          gap: '8px',
                          width: '428px',
                          height: '62px',
                        }}
                        className="relative shrink-0"
                      >
                        <span 
                          style={{
                            width: '100%',
                            height: '16px',
                            fontFamily: "'Manrope', sans-serif",
                            fontStyle: 'normal',
                            fontWeight: 600,
                            fontSize: '12px',
                            lineHeight: '16px',
                            letterSpacing: '0.02em',
                            color: '#BBCAF3',
                          }}
                        >
                          4.BTC Deposit Address
                        </span>
                        
                        <div 
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: '10px 16px',
                            gap: '12px',
                            width: '428px',
                            height: '40px',
                            background: '#112F82',
                            borderRadius: '8px',
                            boxSizing: 'border-box',
                            border: '1px solid rgba(255,255,255,0.05)',
                          }}
                        >
                          <span 
                            style={{
                              flex: 1,
                              height: '19px',
                              fontFamily: "'Manrope', sans-serif",
                              fontStyle: 'normal',
                              fontWeight: 600,
                              fontSize: '14px',
                              lineHeight: '19px',
                              letterSpacing: '0.02em',
                              color: '#7795E8',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                            className="select-all"
                          >
                            {btcAddress}
                          </span>
                          
                          <div 
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              padding: '0px',
                              gap: '12px',
                              width: '44px',
                              height: '16px',
                            }}
                            className="shrink-0"
                          >
                            {/* Copy button */}
                            <button 
                              onClick={copyAddress}
                              style={{ width: '16px', height: '16px', position: 'relative', border: 'none', background: 'transparent', padding: '0px', cursor: 'pointer' }}
                              className="text-[#BBCAF3] hover:text-white flex items-center justify-center"
                            >
                              {copied && (
                                <span className="absolute bottom-[24px] right-[-10px] bg-[#1463FF] text-white text-[10px] px-1.5 py-0.5 rounded shadow-lg font-sans font-bold">
                                  Copied!
                                </span>
                              )}
                              <img src="/images/paste.png" className="w-[16px] h-[16px] object-contain" alt="Copy" />
                            </button>

                            {/* QR button */}
                            <button 
                              onClick={() => setShowQrCode(!showQrCode)}
                              style={{ width: '16px', height: '16px', position: 'relative', border: 'none', background: 'transparent', padding: '0px', cursor: 'pointer' }}
                              className="text-[#BBCAF3] hover:text-white flex items-center justify-center"
                            >
                              <img src="/images/scan.png" className="w-[16px] h-[16px] object-contain" alt="Scan" />
                            </button>
                          </div>
                        </div>

                        {showQrCode && (
                          <div className="absolute bottom-[48px] right-0 bg-[#0C1F56] border border-white/10 rounded-[12px] p-4 flex flex-col items-center gap-2 shadow-2xl z-[100]">
                            <div className="w-[100px] h-[100px] bg-white p-2 rounded flex flex-wrap gap-[2.5px]">
                              {Array.from({ length: 64 }).map((_, i) => {
                                const isFilled = (i % 3 === 0 && i % 4 !== 0) || (i < 20 && i % 2 === 0) || (i > 50 && i % 5 === 0) || (i % 7 === 1);
                                return (
                                  <div 
                                    key={i} 
                                    style={{ background: isFilled ? '#091741' : '#FFFFFF' }}
                                    className="w-[8px] h-[8px]" 
                                  />
                                );
                              })}
                            </div>
                            <span className="font-sans text-[10px] text-[#BBCAF3]">Scan with crypto wallet</span>
                          </div>
                        )}
                      </div>
                    </>
                  ) : creditCardStep === 'address' ? (
                    /* CC Address step */
                    <div className="flex flex-col items-start gap-[12px] w-full shrink-0 select-none">
                      <span className="font-sans font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white">
                        Enter your address
                      </span>

                      {/* Street */}
                      <input 
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        className="w-[428px] h-[40px] px-[16px] bg-[#112F82] rounded-[8px] border border-white/5 font-sans font-semibold text-[14px] text-white placeholder-[#A5B8EF]/60 outline-none"
                        placeholder="Street"
                      />

                      {/* City & Zip */}
                      <div className="flex flex-row gap-[8px] w-[428px]">
                        <input 
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="flex-1 h-[40px] px-[16px] bg-[#112F82] rounded-[8px] border border-white/5 font-sans font-semibold text-[14px] text-white placeholder-[#A5B8EF]/60 outline-none"
                          placeholder="City"
                        />
                        <input 
                          type="text"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          className="flex-1 h-[40px] px-[16px] bg-[#112F82] rounded-[8px] border border-white/5 font-sans font-semibold text-[14px] text-white placeholder-[#A5B8EF]/60 outline-none"
                          placeholder="Postal Code"
                        />
                      </div>

                      {/* State & Country */}
                      <div className="flex flex-row gap-[8px] w-[428px] relative">
                        <input 
                          type="text"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          className="flex-1 h-[40px] px-[16px] bg-[#112F82] rounded-[8px] border border-white/5 font-sans font-semibold text-[14px] text-white placeholder-[#A5B8EF]/60 outline-none"
                          placeholder="State"
                        />
                        
                        <div className="flex-1 relative" ref={countryDropdownRef}>
                          <div 
                            onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                            className="flex flex-row items-center justify-between px-[16px] h-[40px] bg-[#112F82] rounded-[8px] cursor-pointer hover:bg-[#153a9e] transition-all duration-150 border border-white/5"
                          >
                            <div className="flex flex-row items-center gap-[8px] truncate">
                              {country === 'United States' && <USFlag />}
                              {country === 'Canada' && <CanadaFlag />}
                              {country === 'United Kingdom' && <UKFlag />}
                              <span className="font-sans font-semibold text-[13px] text-white truncate">
                                {country}
                              </span>
                            </div>
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className={`transform transition-transform shrink-0 ${isCountryDropdownOpen ? 'rotate-180' : ''}`}>
                              <path d="M1 1L5 5L9 1" stroke="#A5B8EF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>

                          {isCountryDropdownOpen && (
                            <div className="absolute bottom-[44px] left-0 right-0 bg-[#112F82] rounded-[8px] border border-white/10 shadow-xl z-50 overflow-hidden">
                              {[
                                { name: 'United States', flag: <USFlag /> },
                                { name: 'Canada', flag: <CanadaFlag /> },
                                { name: 'United Kingdom', flag: <UKFlag /> }
                              ].map((c, idx) => (
                                <div 
                                  key={idx}
                                  onClick={() => {
                                    setCountry(c.name);
                                    setIsCountryDropdownOpen(false);
                                  }}
                                  className="flex flex-row items-center gap-[8px] px-[16px] py-[8px] text-white font-sans text-[13px] hover:bg-[#1463FF] cursor-pointer transition-colors"
                                >
                                  {c.flag}
                                  <span>{c.name}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* CC Payment details step */
                    <div className="flex flex-col items-start gap-[12px] w-full shrink-0 select-none">
                      <div className="flex flex-row items-center justify-between w-[428px]">
                        <span className="font-sans font-semibold text-[12px] text-[#BBCAF3]">
                          Select an amount
                        </span>
                        <button 
                          onClick={() => setCreditCardStep('address')}
                          className="font-sans font-semibold text-[10px] text-[#7795E8] hover:text-white transition-colors cursor-pointer flex items-center gap-1 border-none bg-transparent p-0"
                        >
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 8L3 5L6 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Edit Address
                        </button>
                      </div>

                      <div className="flex flex-row items-center gap-[8px] w-[428px] h-[40px]">
                        {[20, 30, 100].map((amount) => {
                          const isActive = ccAmountOption === amount;
                          return (
                            <button
                              key={amount}
                              type="button"
                              onClick={() => setCcAmountOption(amount as any)}
                              style={{
                                background: isActive ? '#1463FF' : '#112F82',
                                color: isActive ? '#FFFFFF' : '#A5B8EF',
                              }}
                              className="flex-1 h-full rounded-[8px] flex items-center justify-center font-sans font-bold text-[14px] cursor-pointer border-none hover:bg-[#153a9e] transition-colors"
                            >
                              ${amount}
                            </button>
                          );
                        })}

                        <div className="flex-1 h-full relative">
                          {ccAmountOption === 'custom' ? (
                            <div className="flex flex-row items-center px-[12px] w-full h-full bg-[#112F82] border border-[#1463FF] rounded-[8px] box-sizing-border">
                              <span className="font-sans font-bold text-[14px] text-white mr-1">$</span>
                              <input 
                                type="number"
                                value={ccCustomAmount}
                                onChange={(e) => setCcCustomAmount(e.target.value)}
                                className="w-full bg-transparent border-none outline-none font-sans font-bold text-[14px] text-white placeholder-white/30"
                                placeholder="0"
                                autoFocus
                              />
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setCcAmountOption('custom')}
                              className="w-full h-full rounded-[8px] bg-[#112F82] text-[#A5B8EF] hover:bg-[#153a9e] flex items-center justify-center font-sans font-bold text-[14px] cursor-pointer border-none"
                            >
                              Custom...
                            </button>
                          )}
                        </div>
                      </div>

                      <span className="font-sans font-semibold text-[12px] text-[#BBCAF3] mt-[4px]">
                        Enter payment details
                      </span>

                      <input 
                        type="text"
                        value={creditCardNumber}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').substring(0, 16);
                          const match = val.match(/.{1,4}/g);
                          setCreditCardNumber(match ? match.join(' ') : val);
                        }}
                        className="w-[428px] h-[40px] px-[16px] bg-[#112F82] rounded-[8px] border border-white/5 font-sans font-semibold text-[14px] text-white placeholder-[#A5B8EF]/60 outline-none"
                        placeholder="Credit Card Number"
                      />

                      <div className="flex flex-row gap-[8px] w-[428px]">
                        <input 
                          type="text"
                          value={creditCardExp}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').substring(0, 4);
                            if (val.length >= 3) {
                              setCreditCardExp(`${val.slice(0, 2)}/${val.slice(2)}`);
                            } else {
                              setCreditCardExp(val);
                            }
                          }}
                          className="flex-1 h-[40px] px-[16px] bg-[#112F82] rounded-[8px] border border-white/5 font-sans font-semibold text-[14px] text-white placeholder-[#A5B8EF]/60 outline-none"
                          placeholder="Exp. (MM/YY)"
                        />
                        <input 
                          type="password"
                          value={creditCardCcv}
                          onChange={(e) => setCreditCardCcv(e.target.value.replace(/\D/g, '').substring(0, 4))}
                          className="flex-1 h-[40px] px-[16px] bg-[#112F82] rounded-[8px] border border-white/5 font-sans font-semibold text-[14px] text-white placeholder-[#A5B8EF]/60 outline-none"
                          placeholder="CCV"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

              {activeTab === 'bonuses' && (
                <div className="flex flex-col gap-[12px] w-full h-full select-none shrink-0">
                  <span className="font-sans font-medium text-[13px] text-white">
                    If you have a Bonus Code &ndash; enter it here
                  </span>
                  
                  <div className="flex flex-row items-center gap-[8px] w-[428px] h-[40px]">
                    <div className="flex flex-row items-center px-[16px] w-[320px] h-[40px] bg-[#112F82] rounded-[8px] border border-white/5 box-sizing-border">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Promo Code"
                        className="promo-input w-full bg-transparent border-none outline-none font-sans font-semibold text-[14px] text-white"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (!promoCode.trim()) return;
                        alert(`Promo code "${promoCode}" applied!`);
                        setPromoCode('');
                      }}
                      style={{
                        background: '#FFC83D',
                        borderRadius: '8px',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 700,
                        fontSize: '12px',
                        color: '#1A1404',
                      }}
                      className="w-[100px] h-[40px] flex items-center justify-center hover:bg-[#ffd362] active:scale-95 duration-100 font-sans"
                    >
                      Apply
                    </button>
                  </div>

                  <span className="font-sans font-medium text-[13px] text-white mt-[4px]">
                    Available bonuses for you
                  </span>

                  <div className="flex flex-row gap-[10px] overflow-x-auto scrollbar-none snap-x snap-mandatory w-[428px] h-[190px]">
                    {[
                      {
                        title: '150% Reload Bonus + 30 Free Spins',
                        minDeposit: '$30',
                        maxCashout: '40x',
                        maxAmount: '$30',
                        wager: '10x',
                      },
                      {
                        title: '350% Welcome Bonus',
                        minDeposit: '$20',
                        maxCashout: '45x',
                        maxAmount: '$50',
                        wager: '45x',
                      },
                      {
                        title: '500% Crypto Bonus',
                        minDeposit: '$20',
                        maxCashout: '50x',
                        maxAmount: '$100',
                        wager: '45x',
                      },
                    ].map((bonus, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          padding: '16px',
                          gap: '10px',
                          width: '260px',
                          height: '180px',
                          background: '#112F82',
                          borderRadius: '12px',
                          flexShrink: 0,
                          scrollSnapAlign: 'start',
                          boxSizing: 'border-box',
                        }}
                      >
                        <span className="font-jost font-bold text-[13px] text-white truncate w-full">{bonus.title}</span>
                        <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 w-full">
                          <div className="flex flex-col">
                            <span className="text-[9px] text-[#BBCAF3] font-sans font-medium">Min. Deposit</span>
                            <span className="text-[12px] text-white font-jost font-bold">{bonus.minDeposit}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[9px] text-[#BBCAF3] font-sans font-medium">Max. Cashout</span>
                            <span className="text-[12px] text-white font-jost font-bold">{bonus.maxCashout}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[9px] text-[#BBCAF3] font-sans font-medium">Max. Amount</span>
                            <span className="text-[12px] text-white font-jost font-bold">{bonus.maxAmount}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[9px] text-[#BBCAF3] font-sans font-medium">Wager</span>
                            <span className="text-[12px] text-white font-jost font-bold">{bonus.wager}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => alert(`"${bonus.title}" activated!`)}
                          className="w-full h-[32px] bg-[#FFC83D] hover:bg-[#ffd362] rounded-[6px] border-none text-[#1A1404] font-sans font-bold text-[11px] cursor-pointer mt-auto flex items-center justify-center"
                        >
                          Activate
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'withdraw' && (
                <div className="flex flex-col items-center justify-center w-full h-full gap-3 text-center py-4 shrink-0 select-none">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 12V16H11V12H8L12 8L16 12H13Z" fill="#A5B8EF" />
                  </svg>
                  <h4 className="font-jost font-bold text-white text-[15px]">Fast Withdrawals</h4>
                  <p className="font-sans text-[11px] text-[#A5B8EF] max-w-[260px]">
                    To request a withdrawal, please verify your email and complete your active bonus wagering requirements.
                  </p>
                </div>
              )}

              {activeTab === 'transactions' && (
                <div className="flex flex-col items-center justify-center w-full h-full gap-3 text-center py-4 shrink-0 select-none">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM7 10H17V12H7V10ZM7 14H14V16H7V14ZM7 6H17V8H7V6Z" fill="#A5B8EF" />
                  </svg>
                  <h4 className="font-jost font-bold text-white text-[15px]">Transaction Ledger</h4>
                  <p className="font-sans text-[11px] text-[#A5B8EF] max-w-[260px]">
                    No recent transactions found. All verified deposits and withdrawals will show here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Join CTA Frame (300px x 50px, background: #FFC83D, border-radius: 8px, order 2, z-index 2) */}
        {activeTab !== 'bonuses' && (
          <div 
            style={{
              width: '300px',
              height: '50px',
              zIndex: 2,
            }}
            className="flex items-center justify-center shrink-0 mt-auto"
          >
            {depositConfirmed ? (
              <button
                onClick={onClose}
                style={{
                  width: '300px',
                  height: '50px',
                  background: '#FFC83D',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 700,
                  fontSize: '14px',
                  lineHeight: '19px',
                  letterSpacing: '0.02em',
                  color: '#1A1404',
                }}
                className="hover:bg-[#ffd362] active:scale-95 duration-100"
              >
                Go to games
              </button>
            ) : selectedPayment === 'Bitcoin' ? (
              <button
                onClick={() => setDepositConfirmed(true)}
                style={{
                  width: '300px',
                  height: '50px',
                  background: '#FFC83D',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 700,
                  fontSize: '14px',
                  lineHeight: '19px',
                  letterSpacing: '0.02em',
                  color: '#1A1404',
                }}
                className="hover:bg-[#ffd362] active:scale-95 duration-100"
              >
                I&apos;ve completed my deposit
              </button>
            ) : creditCardStep === 'address' ? (
              <button
                onClick={() => {
                  if (!street || !city || !postalCode || !state) {
                    alert('Please fill out all address details.');
                    return;
                  }
                  setCreditCardStep('payment');
                }}
                style={{
                  width: '300px',
                  height: '50px',
                  background: '#FFC83D',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 700,
                  fontSize: '14px',
                  lineHeight: '19px',
                  letterSpacing: '0.02em',
                  color: '#1A1404',
                }}
                className="hover:bg-[#ffd362] active:scale-95 duration-100"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={() => {
                  if (!creditCardNumber || !creditCardExp || !creditCardCcv) {
                    alert('Please fill out all credit card details.');
                    return;
                  }
                  setDepositConfirmed(true);
                }}
                style={{
                  width: '300px',
                  height: '50px',
                  background: '#FFC83D',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 700,
                  fontSize: '14px',
                  lineHeight: '19px',
                  letterSpacing: '0.02em',
                  color: '#1A1404',
                }}
                className="hover:bg-[#ffd362] active:scale-95 duration-100"
              >
                Deposit ${getDepositAmount()}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
