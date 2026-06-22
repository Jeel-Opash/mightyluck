'use client';

import { useState, useEffect, useRef } from 'react';
import { useAppSelector } from '@/redux/store';


const YellowWalletIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <path fillRule="evenodd" clipRule="evenodd" d="M9.17969 1.25C9.98438 1.25 10.8828 1.26562 11.1719 1.28906C11.4609 1.3125 12.0469 1.36328 12.4727 1.40625C13.0312 1.46094 13.3281 1.50781 13.5664 1.58203C13.7422 1.64063 13.9922 1.73828 14.1211 1.80078C14.25 1.86719 14.4766 2 14.6289 2.10156C14.7773 2.19922 15.0391 2.42188 15.2109 2.59375C15.3789 2.76563 15.6211 3.0625 15.75 3.25781C15.875 3.45313 16.0273 3.71875 16.0859 3.85156C16.1445 3.98828 16.1836 4.10547 16.1719 4.11719C16.1602 4.12891 15.7578 4.11328 15.2734 4.07813C14.7891 4.04688 14.0156 4 13.5547 3.98047C13.0938 3.95703 11.8438 3.92969 10.7812 3.91406C9.58594 3.90234 8.39062 3.91016 7.65625 3.9375C7 3.96094 6.12109 4 5.70312 4.02344C5.28516 4.04297 4.60938 4.08594 4.19922 4.12109C3.79297 4.15234 3.34375 4.19531 3.20312 4.21875C3.0625 4.23828 2.84375 4.28516 2.71484 4.31641C2.58594 4.35156 2.40234 4.40625 2.30469 4.4375C2.20703 4.46875 1.97266 4.57422 1.77734 4.67188C1.58203 4.76953 1.33984 4.91016 1.23047 4.98047C1.125 5.05469 1.03125 5.10156 1.02344 5.08594C1.01562 5.06641 1.04297 4.91406 1.08594 4.74219C1.12891 4.57031 1.21484 4.29688 1.28516 4.13672C1.35156 3.97656 1.50781 3.6875 1.63281 3.49219C1.76172 3.29688 2.00781 2.99609 2.18359 2.81641C2.35547 2.64063 2.62891 2.40625 2.78516 2.29688C2.9375 2.1875 3.19141 2.03516 3.33984 1.96094C3.48828 1.88281 3.73828 1.77734 3.88672 1.72656C4.03516 1.67578 4.44922 1.58984 4.80469 1.53906C5.16016 1.48438 5.80078 1.41406 6.23047 1.38281C6.66016 1.34766 7.17188 1.30469 7.36328 1.28906C7.55469 1.26953 8.375 1.25391 9.17969 1.25V1.25ZM9.76562 4.92578C10.6562 4.92188 11.9062 4.9375 12.5391 4.95703C13.1719 4.97656 14.043 5.01563 14.4727 5.03516C14.9023 5.05859 15.5977 5.10156 16.0156 5.13672C16.4336 5.16797 16.8906 5.21875 17.0312 5.24609C17.1719 5.27734 17.4258 5.35547 17.5977 5.41797C17.7695 5.48438 18.0508 5.62891 18.2227 5.74219C18.3945 5.85547 18.6562 6.0625 18.8047 6.20313C18.9492 6.34375 19.1484 6.56641 19.2383 6.69531C19.332 6.82422 19.4766 7.07813 19.5625 7.26172C19.6484 7.44531 19.7461 7.71875 19.7773 7.86719C19.8125 8.01953 19.8594 8.35156 19.8828 8.60938C19.9062 8.86719 19.9414 9.25 19.9609 9.46094C19.9844 9.66797 20 10.3984 20 11.082C20 11.9609 19.9766 12.5977 19.9219 13.2773C19.8789 13.8047 19.8164 14.4453 19.7852 14.7031C19.75 14.9609 19.6992 15.332 19.668 15.5234C19.6367 15.7148 19.5742 15.9961 19.5273 16.1484C19.4844 16.3008 19.3672 16.5703 19.2734 16.7539C19.1797 16.9375 18.9844 17.2344 18.8359 17.418C18.6875 17.6016 18.4219 17.8711 18.2383 18.0156C18.0586 18.1602 17.7617 18.3555 17.5781 18.4531C17.3945 18.5469 17.1367 18.6602 17 18.7031C16.8672 18.75 16.5938 18.8125 16.3984 18.8438C16.1992 18.875 15.7383 18.9258 15.3711 18.957C15.0039 18.9883 14.2773 19.043 13.75 19.0742C13.2227 19.1055 12.4414 19.1523 12.0117 19.1797C11.5195 19.207 10.6211 19.2188 9.58984 19.2031C8.6875 19.1953 7.49219 19.1563 6.93359 19.1211C6.375 19.0898 5.56641 19.0313 5.13672 18.9961C4.70703 18.9648 4.16406 18.9141 3.92578 18.8828C3.69141 18.8555 3.37109 18.8008 3.22266 18.7656C3.07422 18.7266 2.80078 18.6289 2.61719 18.543C2.43359 18.457 2.16406 18.3086 2.01172 18.207C1.86328 18.1055 1.60938 17.8906 1.44531 17.7305C1.28516 17.5703 1.07031 17.3164 0.972656 17.1641C0.871094 17.0117 0.734375 16.7813 0.667969 16.6484C0.601562 16.5117 0.503906 16.25 0.449219 16.0625C0.398438 15.8711 0.320312 15.4727 0.277344 15.1719C0.234375 14.8711 0.171875 14.3359 0.140625 13.9805C0.105469 13.625 0.0625 13.1211 0.0390625 12.8594C0.0195312 12.5938 0 11.8203 0 11.1406C0 10.457 0.015625 9.70703 0.0390625 9.46875C0.0625 9.23047 0.0976562 8.83594 0.121094 8.58984C0.144531 8.34375 0.1875 8.02734 0.21875 7.88672C0.25 7.74609 0.320312 7.51953 0.378906 7.37891C0.433594 7.23828 0.5625 7 0.65625 6.85156C0.753906 6.70313 0.9375 6.46484 1.07031 6.32813C1.20312 6.19141 1.40625 6.00781 1.52344 5.91406C1.64062 5.82422 1.83594 5.69531 1.95312 5.62891C2.07031 5.5625 2.3125 5.45313 2.49219 5.38672C2.66797 5.32422 2.97656 5.24609 3.17578 5.21484C3.37109 5.18359 3.80078 5.14063 4.12109 5.11719C4.44531 5.09375 5.09375 5.05469 5.56641 5.03125C6.03906 5.00781 6.8125 4.97656 7.28516 4.96094C7.75781 4.94531 8.875 4.92578 9.76562 4.92578ZM15.8789 10.832C15.7734 10.8867 15.6055 11.0117 15.5078 11.1172C15.4141 11.2188 15.2969 11.3945 15.2461 11.5C15.1992 11.6094 15.1484 11.793 15.1328 11.9102C15.1172 12.0586 15.1289 12.207 15.1719 12.3789C15.207 12.5195 15.2969 12.7266 15.3711 12.8398C15.4453 12.9492 15.582 13.0977 15.6758 13.1602C15.7656 13.2266 15.9375 13.3164 16.0547 13.3594C16.2266 13.4258 16.332 13.4375 16.582 13.4258C16.7891 13.4141 16.9531 13.3789 17.0703 13.3242C17.168 13.2773 17.332 13.168 17.4375 13.0742C17.5547 12.9688 17.6719 12.8125 17.75 12.6523C17.8594 12.4258 17.8711 12.3633 17.8711 12.0469C17.8672 11.7695 17.8477 11.6563 17.7812 11.5117C17.7344 11.4063 17.6133 11.2344 17.5117 11.125C17.4062 11.0156 17.2461 10.8828 17.1484 10.8359C17.0508 10.7852 16.8672 10.7266 16.7383 10.7031C16.6094 10.6797 16.4883 10.6602 16.4648 10.6641C16.4414 10.668 16.3477 10.6836 16.25 10.7031C16.1523 10.7227 15.9883 10.7813 15.8789 10.832Z" fill="#FFC83D" />
  </svg>
);

const CreditCardLogos = () => (
  <div className="flex flex-row items-center gap-[2px] w-[42px] h-[20px] shrink-0">
    <img src="/images/visa.svg" className="w-[20px] h-[12px] object-contain" alt="Visa" />
    <svg width="20" height="12" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="rounded-[1px] shrink-0">
      <rect width="24" height="15" fill="#0A0915" rx="2" />
      <circle cx="9" cy="7.5" r="4.5" fill="#EB001B" />
      <circle cx="15" cy="7.5" r="4.5" fill="#F79E1B" fillOpacity="0.8" />
    </svg>
  </div>
);

const DollarCircleIcon = () => (
  <div className="w-5 h-5 rounded-full bg-[#FFC83D] flex items-center justify-center shrink-0 shadow-sm">
    <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 1V9M2 2.5H5.5C6.328 2.5 7 3.172 7 4C7 4.828 6.328 5.5 5.5 5.5H2.5C1.672 5.5 1 6.172 1 7C1 7.828 1.672 8.5 2.5 8.5H6" stroke="#1A1404" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const BitcoinCircleIcon = () => (
  <div className="w-5 h-5 rounded-full bg-[#FFC83D] flex items-center justify-center shrink-0 shadow-sm">
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.5 2.5H5.5C6.052 2.5 6.5 2.948 6.5 3.5C6.5 4.052 6.052 4.5 5.5 4.5M3.5 4.5H6C6.552 4.5 7 4.948 7 5.5C7 6.052 6.552 6.5 6 6.5H3.5M3.5 1.5V8.5M5 1.5V2.5M5 7.5V8.5M2.5 2.5H3.5M2.5 6.5H3.5" stroke="#1A1404" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const SwapIcon = () => (
  <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <path d="M1 4H14.5M14.5 4L11 1M14.5 4L11 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17 10H3.5M3.5 10L7 7M3.5 10L7 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

  const bonusDropdownRefMobile = useRef<HTMLDivElement>(null);
  const paymentDropdownRefMobile = useRef<HTMLDivElement>(null);
  const countryDropdownRefMobile = useRef<HTMLDivElement>(null);

  const bonusDropdownRefDesktop = useRef<HTMLDivElement>(null);
  const paymentDropdownRefDesktop = useRef<HTMLDivElement>(null);
  const countryDropdownRefDesktop = useRef<HTMLDivElement>(null);

  // Mock BTC to USD rate: 1 BTC = $65,000 USD
  const btcRate = 65000;

  useEffect(() => {
    // Handle click outside to close dropdowns
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      const isOutsideBonusMobile = bonusDropdownRefMobile.current ? !bonusDropdownRefMobile.current.contains(target) : true;
      const isOutsideBonusDesktop = bonusDropdownRefDesktop.current ? !bonusDropdownRefDesktop.current.contains(target) : true;
      if (isOutsideBonusMobile && isOutsideBonusDesktop) {
        setIsBonusDropdownOpen(false);
      }

      const isOutsidePaymentMobile = paymentDropdownRefMobile.current ? !paymentDropdownRefMobile.current.contains(target) : true;
      const isOutsidePaymentDesktop = paymentDropdownRefDesktop.current ? !paymentDropdownRefDesktop.current.contains(target) : true;
      if (isOutsidePaymentMobile && isOutsidePaymentDesktop) {
        setIsPaymentDropdownOpen(false);
      }

      const isOutsideCountryMobile = countryDropdownRefMobile.current ? !countryDropdownRefMobile.current.contains(target) : true;
      const isOutsideCountryDesktop = countryDropdownRefDesktop.current ? !countryDropdownRefDesktop.current.contains(target) : true;
      if (isOutsideCountryMobile && isOutsideCountryDesktop) {
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
    <img src="/images/america.svg" className="w-[20px] h-[20px] object-cover rounded-full shrink-0" alt="US" />
  );

  const CanadaFlag = () => (
    <div className="w-[20px] h-[20px] rounded-full overflow-hidden shrink-0 flex items-center justify-center">
      <svg width="20" height="20" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover">
        <rect width="18" height="12" fill="#D80621" />
        <rect x="4.5" width="9" height="12" fill="#FFFFFF" />
        <path d="M9 3L10 5.5L12 5L10.5 7L11 9.5L9 8L7 9.5L7.5 7L6 5L8 5.5L9 3Z" fill="#D80621" />
      </svg>
    </div>
  );

  const UKFlag = () => (
    <div className="w-[20px] h-[20px] rounded-full overflow-hidden shrink-0 flex items-center justify-center">
      <svg width="20" height="20" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover">
        <rect width="18" height="12" fill="#012169" />
        <path d="M0 0L18 12M18 0L0 12" stroke="#FFFFFF" strokeWidth="2" />
        <path d="M0 0L18 12M18 0L0 12" stroke="#C8102E" strokeWidth="1" />
        <path d="M9 0V12M0 6H18" stroke="#FFFFFF" strokeWidth="3" />
        <path d="M9 0V12M0 6H18" stroke="#C8102E" strokeWidth="2" />
      </svg>
    </div>
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
          <img src="/games/deposite-cashback/150.svg" className={`${className} object-contain`} alt="Reload Bonus" />
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

        {/* Ellipse 6 (Aura) */}
        <div className="absolute w-[71.5px] h-[71.5px] left-[6px] top-[32px] bg-[#1463FF] rounded-full filter blur-[12.5px] pointer-events-none z-0" />

        {/* Header - height: 50px */}
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
                d="M33.1198 7.41853L24.191 11.0541C23.9175 11.1662 23.6056 11.0595 23.4552 10.8051L17.478 0.292432C17.2455 -0.104222 16.6655 -0.0960149 16.4467 0.308846L10.1796 10.8325C10.0346 11.1006 9.70631 11.2155 9.42455 11.0951L0.826733 7.41853C0.36169 7.21883 -0.122501 7.65925 0.027954 8.14071L5.1106 24.3269C5.18719 24.5731 5.41698 24.7427 5.67685 24.7427L27.4354 24.7482C27.6843 24.7482 27.9059 24.5923 27.9934 24.3598L33.9022 8.1708C34.0773 7.68661 33.5986 7.2243 33.1226 7.41853H33.1198ZM20.602 15.2668L16.351 22.7896C16.2908 22.8962 16.1321 22.8552 16.1266 22.7348L15.9543 18.1802H14.4689V18.1637C14.4306 18.1692 14.3923 18.1802H11.2683C11.178 18.1802 11.1206 18.0817 11.1616 18.0023L15.7437 9.51395C15.9051 9.23493 16.2005 9.06532 16.5206 9.06532H19.6035C19.6938 9.06532 19.7512 9.1638 19.7102 9.24313L16.5534 15.089H20.4953C20.5883 15.089 20.6458 15.1875 20.5993 15.2695L20.602 15.2668Z"
                fill="url(#crown-gradient-modal)"
              />
            </svg>
          </div>

          <div className="flex flex-row items-center gap-[16px] h-[30px] shrink-0">
            <div className="flex flex-row justify-center items-center px-[20px] h-[30px] bg-[#112F82] rounded-[6px] shrink-0">
              <span className="font-manrope font-bold text-[10.5px] leading-[14px] tracking-[0.02em] text-white">
                ${user ? user.balance.toLocaleString('en-US', { minimumFractionDigits: 2 }).replace('.', ',') : '105,98'}
              </span>
            </div>

            {/* Wallet Button */}
            <div className="w-[30px] h-[30px] bg-[#FFC83D] rounded-[6px] flex items-center justify-center shrink-0 shadow-sm cursor-pointer hover:bg-[#ffd362] active:scale-95 transition-all">
              <img src="/mobile/navbar/wallet.svg" className="w-[12px] h-[12px] object-contain shrink-0" alt="Wallet" />
            </div>

            {/* Notification Icon */}
            <button className="flex flex-row justify-center items-center w-[30px] h-[30px] p-[7.5px_9px] bg-[#173EAD] rounded-[6px] border-none relative cursor-pointer hover:bg-[#2051db] transition-colors shrink-0">
              <img src="/mobile/navbar/bell.png" className="w-[12px] h-[12px] object-contain shrink-0" alt="Notifications" />
              {/* Red dot badge */}
              <div className="absolute w-[8px] h-[8px] left-[22px] top-0 bg-[#FF0E0E] rounded-[50px]" />
            </button>

            {/* Gift/Offer Icon */}
            <button className="flex flex-row justify-center items-center w-[30px] h-[30px] p-[7.5px_9px] bg-[#173EAD] rounded-[6px] border-none relative cursor-pointer hover:bg-[#2051db] transition-colors shrink-0">
              <img src="/mobile/navbar/gift.png" className="w-[12px] h-[12px] object-contain shrink-0" alt="Gift" />
              {/* Red dot badge */}
              <div className="absolute w-[8px] h-[8px] left-[22px] top-0 bg-[#FF0E0E] rounded-[50px]" />
            </button>

            {/* Avatar image */}
            <img src="/image.png" alt="Avatar" className="w-[30px] h-[30px] rounded-full object-cover shrink-0 cursor-pointer border border-[#FFD85A]/50" />
          </div>
        </div>

        {/* Gap of 30px between Header and Body Panel */}
        <div className="w-full h-[30px] bg-[#0C1F56] shrink-0" />

        {/* Main Wallet Panel (Figma specified: background: #091741, border-radius: 30px 30px 0px 0px) */}
        <div className="flex-1 w-full bg-[#091741] rounded-t-[30px] flex flex-col items-center p-[16px_20px_40px] relative overflow-hidden select-none">

          {/* Glowing Aura inside Modal Body (Ellipse 7) */}
          <div className="absolute w-[174px] h-[176px] left-[calc(50%-174px/2-165px)] top-[-125px] bg-[#1463FF] filter blur-[40px] pointer-events-none z-0" />

          {/* Drag handle/indicator (Rectangle 226) */}
          <div
            onClick={onClose}
            className="w-[70px] h-[6px] bg-[#112F82] rounded-[100px] shrink-0 cursor-pointer z-10 hover:bg-[#1a44bb] transition-colors"
            title="Dismiss Wallet"
          />

          {/* Main Layout Frame (height: 579px equivalent with gap: 24px) */}
          <div className="flex-1 w-full flex flex-col items-start gap-[24px] z-10 min-h-0 mt-[16px]">

            {/* Title Bar: Wallet title + Close button */}
            <div className="flex flex-row justify-between items-center w-full h-[29px] shrink-0">
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
                  <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Tab+Card Frame (containing Tab Buttons + Content Card) */}
            <div className="w-full flex flex-col gap-[16px] flex-1 min-h-0">
              {/* Tab Buttons bar (Deposit, Bonuses, Withdraw, Transactions) */}
              <div className="flex flex-row items-center gap-[8px] w-full h-[30px] shrink-0">
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

              {/* Scrollable Content Card Wrapper */}
              <div className="flex-1 w-full overflow-y-auto scrollbar-none pr-[1px] min-h-0">
                {/* Inner Content Card (bg-[#0C1F56], rounded-[16px]) */}
                <div className="w-full bg-[#0C1F56] rounded-[16px] p-[16px] gap-[16px] flex flex-col border border-white/5 shadow-md">
                  {activeTab === 'deposit' && depositConfirmed ? (
                    <div className="flex flex-col items-center justify-center w-full h-full gap-[20px] text-center select-none py-4">
                      <p className="font-sans font-semibold text-[14px] leading-[22px] tracking-[0.01em] text-white max-w-[320px]">
                        Your transaction in progress and pending confirmation from the blockchain.
                      </p>

                      <div className="flex flex-row items-center justify-center gap-[12px] my-[16px]">
                        <svg width="42" height="32" viewBox="0 0 34 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M33.1198 7.41853L24.191 11.0541C23.9175 11.1662 23.6056 11.0595 23.4552 10.8051L17.478 0.292432C17.2455 -0.104222 16.6655 -0.0960149 16.4467 0.308846L10.1796 10.8325C10.0346 11.1006 9.70631 11.2155 9.42455 11.0951L0.826733 7.41853C0.36169 7.21883 -0.122501 7.65925 0.027954 8.14071L5.1106 24.3269C5.18719 24.5731 5.41698 24.7427 5.67685 24.7427L27.4354 24.7482C27.6843 24.7482 27.9059 24.5923 27.9934 24.3598L33.9022 8.1708C34.0773 7.68661 33.5986 7.2243 33.1226 7.41853H33.1198ZM20.602 15.2668L16.351 22.7896C16.2908 22.8962 16.1321 22.8552 16.1266 22.7348L15.9543 18.1802H14.4689V18.1637C14.4306 18.1692 14.3923 18.1802 14.3513 18.1802H11.2683C11.178 18.1802 11.1206 18.0817 11.1616 18.0023L15.7437 9.51395C15.9051 9.23493 16.2005 9.06532 16.5206 9.06532H19.6035C19.6938 9.06532 19.7512 9.1638 19.7102 9.24313L16.5534 15.089H20.4953C20.5883 15.089 20.6458 15.1875 20.5993 15.2695L20.602 15.2668Z" fill="#A5B8EF" />
                        </svg>
                        <svg width="42" height="32" viewBox="0 0 34 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M33.1198 7.41853L24.191 11.0541C23.9175 11.1662 23.6056 11.0595 23.4552 10.8051L17.478 0.292432C17.2455 -0.104222 16.6655 -0.0960149 16.4467 0.308846L10.1796 10.8325C10.0346 11.1006 9.70631 11.2155 9.42455 11.0951L0.826733 7.41853C0.36169 7.21883 -0.122501 7.65925 0.027954 8.14071L5.1106 24.3269C5.18719 24.5731 5.41698 24.7427 5.67685 24.7427L27.4354 24.7482C27.6843 24.7482 27.9059 24.5923 27.9934 24.3598L33.9022 8.1708C34.0773 7.68661 33.5986 7.2243 33.1226 7.41853H33.1198ZM20.602 15.2668L16.351 22.7896C16.2908 22.8962 16.1321 22.8552 16.1266 22.7348L15.9543 18.1802H14.4689V18.1637C14.4306 18.1692 14.3923 18.1802 14.3513 18.1802H11.2683C11.178 18.1802 11.1206 18.0817 11.1616 18.0023L15.7437 9.51395C15.9051 9.23493 16.2005 9.06532 16.5206 9.06532H19.6035C19.6938 9.06532 19.7512 9.1638 19.7102 9.24313L16.5534 15.089H20.4953C20.5883 15.089 20.6458 15.1875 20.5993 15.2695L20.602 15.2668Z" fill="#A5B8EF" />
                        </svg>
                        <svg width="42" height="32" viewBox="0 0 34 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M33.1198 7.41853L24.191 11.0541C23.9175 11.1662 23.6056 11.0595 23.4552 10.8051L17.478 0.292432C17.2455 -0.104222 16.6655 -0.0960149 16.4467 0.308846L10.1796 10.8325C10.0346 11.1006 9.70631 11.2155 9.42455 11.0951L0.826733 7.41853C0.36169 7.21883 -0.122501 7.65925 0.027954 8.14071L5.1106 24.3269C5.18719 24.5731 5.41698 24.7427 5.67685 24.7427L27.4354 24.7482C27.6843 24.7482 27.9059 24.5923 27.9934 24.3598L33.9022 8.1708C34.0773 7.68661 33.5986 7.2243 33.1226 7.41853H33.1198ZM20.602 15.2668L16.351 22.7896C16.2908 22.8962 16.1321 22.8552 16.1266 22.7348L15.9543 18.1802H14.4689V18.1637C14.4306 18.1692 14.3923 18.1802 14.3513 18.1802H11.2683C11.178 18.1802 11.1206 18.0817 11.1616 18.0023L15.7437 9.51395C15.9051 9.23493 16.2005 9.06532 16.5206 9.06532H19.6035C19.6938 9.06532 19.7512 9.1638 19.7102 9.24313L16.5534 15.089H20.4953C20.5883 15.089 20.6458 15.1875 20.5993 15.2695L20.602 15.2668Z" fill="#112F82" />
                        </svg>
                      </div>

                      <p className="font-sans font-medium text-[13px] leading-[21px] tracking-[0.01em] text-[#BBCAF3] max-w-[320px]">
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
                  ) : activeTab === 'deposit' ? (
                    <>
                      {/* Select a Bonus */}
                      <div className="flex flex-col items-start gap-[8px] w-full relative shrink-0" ref={bonusDropdownRefMobile}>
                        <span className="font-sans font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3]">
                          {selectedPayment === 'Bitcoin' ? '1.Select a Bonus' : 'Select a Bonus'}
                        </span>

                        <div className={`relative w-full transition-all duration-200 ${isBonusDropdownOpen ? 'border border-[#1463FF] rounded-[8px]' : 'border border-white/5 rounded-[8px]'}`}>
                          <div
                            onClick={() => setIsBonusDropdownOpen(!isBonusDropdownOpen)}
                            className={`flex flex-row items-center justify-between px-[16px] w-full h-[50px] bg-[#112F82] cursor-pointer hover:bg-[#153a9e] transition-all duration-150 ${isBonusDropdownOpen ? 'rounded-t-[8px]' : 'rounded-[8px]'}`}
                          >
                            <div className="flex flex-row items-center gap-[8px] truncate flex-1">
                              <div className="text-[#FFC83D] flex items-center justify-center shrink-0">
                                {renderBonusIcon(getSelectedBonusIcon(), 'w-[16px] h-[16px]')}
                              </div>
                              <span className="font-sans font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white truncate max-w-[245px]">
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
                              <path d="M1 1L5 5L9 1" stroke="#A5B8EF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>

                          {isBonusDropdownOpen && (
                            <div className="absolute top-[49px] left-[-1px] right-[-1px] bg-[#0C1F56] rounded-b-[8px] border-x border-b border-[#1463FF] shadow-2xl z-[9999] overflow-hidden flex flex-col">
                              <div className="px-[16px] py-[10px] border-b border-white/5 font-sans font-bold text-[12px] text-[#A5B8EF] bg-[#091741]">
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
                                      className={`flex flex-row items-center gap-[12px] px-[16px] py-[10px] cursor-pointer transition-colors ${isSelected ? 'bg-[#1463FF]' : 'hover:bg-[#1463FF]/20 bg-transparent'
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
                                          <span className={`font-sans font-semibold text-[10px] ${isSelected ? 'text-white/80' : 'text-[#7795E8]'
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
                      </div>

                      {/* Select a Payment Method */}
                      <div className="flex flex-col items-start gap-[8px] w-full relative shrink-0" ref={paymentDropdownRefMobile}>
                        <span className="font-sans font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3]">
                          {selectedPayment === 'Bitcoin' ? '2.Select a payment method' : 'Select a payment method'}
                        </span>

                        <div className={`relative w-full transition-all duration-200 ${isPaymentDropdownOpen ? 'border border-[#1463FF] rounded-[8px]' : 'border border-white/5 rounded-[8px]'}`}>
                          <div
                            onClick={() => setIsPaymentDropdownOpen(!isPaymentDropdownOpen)}
                            className={`flex flex-row items-center justify-between px-[16px] w-full min-h-[50px] py-[8px] bg-[#112F82] cursor-pointer hover:bg-[#153a9e] transition-all duration-150 ${isPaymentDropdownOpen ? 'rounded-t-[8px]' : 'rounded-[8px]'}`}
                          >
                            <div className="flex flex-col items-start gap-[2px] flex-1">
                              {selectedPayment === 'Bitcoin' ? (
                                <>
                                  <div className="flex flex-row items-center gap-[8px]">
                                    <BitcoinCircleIcon />
                                    <span className="font-sans font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white">
                                      Bitcoin
                                    </span>
                                  </div>
                                  <span className="font-sans font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#7795E8]">
                                    (Min. Deposit $10)
                                  </span>
                                </>
                              ) : (
                                <>
                                  <div className="flex flex-row items-center gap-[8px]">
                                    <img src="/images/visa.svg" className="w-[42px] h-[20px] object-contain" alt="Visa" />

                                    <span className="font-sans font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white">
                                      Credit Card
                                    </span>
                                  </div>
                                  <span className="font-sans font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#7795E8]">
                                    (Min. Deposit $30 - Max. Deposit $2,500)
                                  </span>
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
                              <path d="M1 1L5 5L9 1" stroke="#A5B8EF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>

                          {isPaymentDropdownOpen && (
                            <div className="absolute top-[49px] left-[-1px] right-[-1px] bg-[#112F82] rounded-b-[8px] border-x border-b border-[#1463FF] shadow-xl z-50 overflow-hidden">
                              {/* Option 1: Credit Card */}
                              <div
                                onClick={() => {
                                  setSelectedPayment('Credit Card');
                                  setIsPaymentDropdownOpen(false);
                                }}
                                className="flex flex-row items-center justify-between px-[16px] py-[12px] text-white font-sans text-[13px] hover:bg-[#1463FF] cursor-pointer transition-colors"
                              >
                                <div className="flex flex-row items-center gap-[8px]">
                                  <img src="/images/visa.svg" className="w-[42px] h-[20px] object-contain" alt="Visa" />
                                  <span>Credit Card (Min. $30 - Max. $2,500)</span>
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
                      </div>

                      {/* Conditional Sub-form Rendering based on selected payment method */}
                      {selectedPayment === 'Bitcoin' ? (
                        <>
                          {/* WARNING NOTE */}
                          <div className="flex flex-row items-start gap-[8px] w-full shrink-0">
                            <div className="w-[12px] h-[12px] mt-[2px] flex items-center justify-center shrink-0">
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 1C3.24 1 1 3.24 1 6C1 8.76 3.24 11 6 11C8.76 11 11 8.76 11 6C11 3.24 8.76 1 6 1ZM6 8.5C5.72 8.5 5.5 8.28 5.5 8V6C5.5 5.72 5.72 5.5 6 5.5C6.28 5.5 6.5 5.72 6.5 6V8C6.5 8.28 6.28 8.5 6 8.5ZM6 4.5C5.72 4.5 5.5 4.28 5.5 4C5.5 3.72 5.72 3.5 6 3.5C6.28 3.5 6.5 3.72 6.5 4C6.5 4.28 6.28 4.5 6 4.5Z" fill="#7795E8" />
                              </svg>
                            </div>
                            <span className="font-sans font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#7795E8] select-none">
                              Only deposit BC via the Bitcoin network. Deposit of other assets or from other networks will be lost.
                            </span>
                          </div>

                          {/* Calculate amount */}
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
                                  className="w-full bg-transparent border-none outline-none font-sans font-bold text-[14px] leading-[19px] text-[#A5B8EF] placeholder-white/30"
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
                                  className="w-full bg-transparent border-none outline-none font-sans font-bold text-[14px] leading-[19px] text-[#A5B8EF] placeholder-white/30"
                                  placeholder="0.000000"
                                />
                              </div>
                            </div>
                          </div>

                          {/* BTC Deposit Address */}
                          <div className="flex flex-col items-start gap-[8px] w-full shrink-0 relative">
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
                                  <img src="/images/paste.png" className="w-[16px] h-[16px] object-contain" alt="Copy" />
                                </button>

                                <button
                                  onClick={() => setShowQrCode(!showQrCode)}
                                  className="w-[16px] h-[16px] text-[#BBCAF3] hover:text-white transition-colors cursor-pointer border-none bg-transparent p-0 flex items-center justify-center"
                                  title="Show QR Code"
                                >
                                  <img src="/images/scan.png" className="w-[16px] h-[16px] object-contain" alt="Scan" />
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
                                  <path d="M6 1C3.24 1 1 3.24 1 6C1 8.76 3.24 11 6 11C8.76 11 11 8.76 11 6C11 3.24 8.76 1 6 1ZM6 8.5C5.72 8.5 5.5 8.28 5.5 8V6C5.5 5.72 5.72 5.5 6 5.5C6.28 5.5 6.5 5.72 6.5 6V8C6.5 8.28 6.28 8.5 6 8.5ZM6 4.5C5.72 4.5 5.5 4.28 5.5 4C5.5 3.72 5.72 3.5 6 3.5C6.28 3.5 6.5 3.72 6.5 4C6.5 4.28 6.28 4.5 6 4.5Z" fill="#7795E8" />
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
                            className="w-full h-[50px] px-[16px] bg-[#112F82] rounded-[8px] border border-white/5 font-sans font-semibold text-[14px] leading-[19px] text-[#A5B8EF] placeholder-[#A5B8EF]/60 outline-none focus:border-white/10"
                            placeholder="Street"
                          />

                          {/* City & Postal Code */}
                          <div className="flex flex-row gap-[8px] w-full">
                            <input
                              type="text"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              className="flex-1 h-[50px] px-[16px] bg-[#112F82] rounded-[8px] border border-white/5 font-sans font-semibold text-[14px] leading-[19px] text-[#A5B8EF] placeholder-[#A5B8EF]/60 outline-none focus:border-white/10"
                              placeholder="City"
                            />
                            <input
                              type="text"
                              value={postalCode}
                              onChange={(e) => setPostalCode(e.target.value)}
                              className="flex-1 h-[50px] px-[16px] bg-[#112F82] rounded-[8px] border border-white/5 font-sans font-semibold text-[14px] leading-[19px] text-[#A5B8EF] placeholder-[#A5B8EF]/60 outline-none focus:border-white/10"
                              placeholder="Postal Code"
                            />
                          </div>

                          {/* State & Country */}
                          <div className="flex flex-row gap-[8px] w-full relative">
                            <input
                              type="text"
                              value={state}
                              onChange={(e) => setState(e.target.value)}
                              className="flex-1 h-[50px] px-[16px] bg-[#112F82] rounded-[8px] border border-white/5 font-sans font-semibold text-[14px] leading-[19px] text-[#A5B8EF] placeholder-[#A5B8EF]/60 outline-none focus:border-white/10"
                              placeholder="State"
                            />

                            {/* Country dropdown */}
                            <div className="flex-1 relative" ref={countryDropdownRefMobile}>
                              <div
                                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                                className="flex flex-row items-center justify-between px-[16px] h-[50px] bg-[#112F82] rounded-[8px] cursor-pointer hover:bg-[#153a9e] transition-all duration-150 border border-white/5"
                              >
                                <div className="flex flex-row items-center gap-[10px] truncate">
                                  {country === 'United States' && <USFlag />}
                                  {country === 'Canada' && <CanadaFlag />}
                                  {country === 'United Kingdom' && <UKFlag />}
                                  <span className="font-manrope font-bold text-[12px] leading-[16px] tracking-[0.02em] text-[#A5B8EF] truncate">
                                    {country}
                                  </span>
                                </div>
                                <div className="shrink-0 flex items-center justify-center w-[14px] h-[14px]">
                                  <div
                                    style={{
                                      width: '6px',
                                      height: '6px',
                                      borderLeft: '1.5px solid #A5B8EF',
                                      borderBottom: '1.5px solid #A5B8EF',
                                      transform: isCountryDropdownOpen ? 'rotate(135deg)' : 'rotate(-45deg)',
                                      transition: 'transform 0.2s ease-in-out',
                                    }}
                                    className="shrink-0"
                                  />
                                </div>
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
                                      className="flex flex-row items-center gap-[8px] px-[16px] py-[10px] text-white font-manrope font-bold text-[12px] leading-[16px] tracking-[0.02em] hover:bg-[#1463FF] cursor-pointer transition-colors"
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
                                    <path d="M6 8L3 5L6 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
                                    className={`flex-1 h-full rounded-[8px] flex items-center justify-center font-sans font-bold text-[14px] leading-[19px] transition-all cursor-pointer border-none ${isActive
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
                                      className="w-full bg-transparent border-none outline-none font-sans font-bold text-[14px] text-[#A5B8EF] placeholder-white/30"
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
                              className="w-full h-[50px] px-[16px] bg-[#112F82] rounded-[8px] border border-white/5 font-sans font-semibold text-[14px] leading-[19px] text-[#A5B8EF] placeholder-[#A5B8EF]/60 outline-none focus:border-white/10"
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
                                className="flex-1 h-[50px] px-[16px] bg-[#112F82] rounded-[8px] border border-white/5 font-sans font-semibold text-[14px] leading-[19px] text-[#A5B8EF] placeholder-[#A5B8EF]/60 outline-none focus:border-white/10"
                                placeholder="Exp."
                              />
                              <input
                                type="password"
                                value={creditCardCcv}
                                onChange={(e) => setCreditCardCcv(e.target.value.replace(/\D/g, '').substring(0, 4))}
                                className="flex-1 h-[50px] px-[16px] bg-[#112F82] rounded-[8px] border border-white/5 font-sans font-semibold text-[14px] leading-[19px] text-[#A5B8EF] placeholder-[#A5B8EF]/60 outline-none focus:border-white/10"
                                placeholder="CCV"
                              />
                            </div>
                          </div>

                          {/* Info note */}
                          <div className="flex flex-row items-start gap-[8px] w-full mt-[2px]">
                            <div className="w-[12px] h-[12px] mt-[2px] flex items-center justify-center shrink-0">
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 1C3.24 1 1 3.24 1 6C1 8.76 3.24 11 6 11C8.76 11 11 8.76 11 6C11 3.24 8.76 1 6 1ZM6 8.5C5.72 8.5 5.5 8.28 5.5 8V6C5.5 5.72 5.72 5.5 6 5.5C6.28 5.5 6.5 5.72 6.5 6V8C6.5 8.28 6.28 8.5 6 8.5ZM6 4.5C5.72 4.5 5.5 4.28 5.5 4C5.5 3.72 5.72 3.5 6 3.5C6.28 3.5 6.5 3.72 6.5 4C6.5 4.28 6.28 4.5 6 4.5Z" fill="#7795E8" />
                              </svg>
                            </div>
                            <span className="font-sans font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#7795E8] select-none">
                              Warning message about fees or anything else relevant at this stage.
                            </span>
                          </div>
                        </div>
                      )}
                    </>
                  ) : null}

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
              </div>
            </div>

            {/* Bottom CTA Button — hidden on bonuses tab */}
            {activeTab !== 'bonuses' && (depositConfirmed ? (
              /* ── Confirmed state CTA ── */
              <div className="flex flex-col items-center gap-[12px] w-full z-10 shrink-0 pb-4">
                <button
                  onClick={onClose}
                  className="w-full h-[60px] max-w-[374px] bg-[#FFC83D] hover:bg-[#ffd362] rounded-[8px] flex items-center justify-center font-sans font-bold text-[15px] leading-[19px] text-[#1A1404] tracking-[0.02em] cursor-pointer active:scale-95 transition-all duration-150 shadow-[0_4px_16px_rgba(255,200,61,0.35)] border-none"
                >
                  Go to games
                </button>
                <div className="flex flex-row items-center gap-[6px]">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7" cy="7" r="6" stroke="#A5B8EF" strokeWidth="1.5" />
                    <path d="M7 4V7.5" stroke="#A5B8EF" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="7" cy="10" r="0.75" fill="#A5B8EF" />
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
              <div className="w-full flex justify-center shrink-0 z-10 pb-4">
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
              <div className="w-full flex justify-center shrink-0 z-10 pb-4">
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
              <div className="w-full flex justify-center shrink-0 z-10 pb-4">
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
          </div>        </div>
      </div>

      {/* ──────────────────────────────────────────────────────── */}
      {/* DESKTOP CONTAINER (hidden on mobile, visible on sm+) */}
      {/* ──────────────────────────────────────────────────────── */}
      <div
        style={{
          width: '500px',
          height: activeTab === 'bonuses' ? '518px' : (activeTab === 'deposit' && depositConfirmed ? '532px' : '604px'),
          padding: '24px 20px 32px',
          gap: '24px',
          background: '#091741',
          borderRadius: '16px',
          isolation: 'isolate',
        }}
        className="hidden sm:flex relative flex-col items-center z-10 border border-white/10 shadow-2xl overflow-visible animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close Button on the top-right outside the modal wrapper */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            right: '-36px',
            top: '0px',
            width: '24px',
            height: '24px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0px',
            zIndex: 100,
          }}
          className="text-white hover:text-white/80 transition-colors"
          title="Close Modal"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
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
            height: activeTab === 'bonuses' ? '462px' : (activeTab === 'deposit' && depositConfirmed ? '386px' : '474px'),
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
              height: activeTab === 'bonuses' ? '409px' : (activeTab === 'deposit' && depositConfirmed ? '333px' : '421px'),
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
                padding: activeTab === 'deposit' && depositConfirmed ? '20px 16px' : '16px',
                gap: '16px',
                width: '460px',
                height: activeTab === 'bonuses' ? '363px' : (activeTab === 'deposit' && depositConfirmed ? '287px' : '375px'),
                background: '#0C1F56',
                borderRadius: '16px',
                boxSizing: 'border-box',
              }}
              className="overflow-y-auto scrollbar-none"
            >
              {activeTab === 'deposit' && depositConfirmed ? (
                /* Confirmed/Pending Screen */
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '0px',
                    gap: '16px',
                    width: '428px',
                    height: '247px',
                  }}
                  className="select-none"
                >
                  <p
                    style={{
                      width: '428px',
                      height: '38px',
                      fontFamily: "'Manrope', sans-serif",
                      fontStyle: 'normal',
                      fontWeight: 600,
                      fontSize: '14px',
                      lineHeight: '19px',
                      textAlign: 'center',
                      letterSpacing: '0.02em',
                      color: '#A5B8EF',
                    }}
                    className="m-0"
                  >
                    Your transaction in progress and pending confirmation from the blockchain.
                  </p>

                  {/* Confirmation Indicators Row */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '0px',
                      gap: '10px',
                      width: '428px',
                      height: '120px',
                    }}
                  >
                    {/* Crown 1 */}
                    <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="29" height="21" viewBox="0 0 34 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M33.1198 7.41853L24.191 11.0541C23.9175 11.1662 23.6056 11.0595 23.4552 10.8051L17.478 0.292432C17.2455 -0.104222 16.6655 -0.0960149 16.4467 0.308846L10.1796 10.8325C10.0346 11.1006 9.70631 11.2155 9.42455 11.0951L0.826733 7.41853C0.36169 7.21883 -0.122501 7.65925 0.027954 8.14071L5.1106 24.3269C5.18719 24.5731 5.41698 24.7427 5.67685 24.7427L27.4354 24.7482C27.6843 24.7482 27.9059 24.5923 27.9934 24.3598L33.9022 8.1708C34.0773 7.68661 33.5986 7.2243 33.1226 7.41853H33.1198ZM20.602 15.2668L16.351 22.7896C16.2908 22.8962 16.1321 22.8552 16.1266 22.7348L15.9543 18.1802H14.4689V18.1637C14.4306 18.1692 14.3923 18.1802 14.3513 18.1802H11.2683C11.178 18.1802 11.1206 18.0817 11.1616 18.0023L15.7437 9.51395C15.9051 9.23493 16.2005 9.06532 16.5206 9.06532H19.6035C19.6938 9.06532 19.7512 9.1638 19.7102 9.24313L16.5534 15.089H20.4953C20.5883 15.089 20.6458 15.1875 20.5993 15.2695L20.602 15.2668Z" fill="#A5B8EF" />
                      </svg>
                    </div>

                    {/* Crown 2 */}
                    <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="29" height="21" viewBox="0 0 34 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M33.1198 7.41853L24.191 11.0541C23.9175 11.1662 23.6056 11.0595 23.4552 10.8051L17.478 0.292432C17.2455 -0.104222 16.6655 -0.0960149 16.4467 0.308846L10.1796 10.8325C10.0346 11.1006 9.70631 11.2155 9.42455 11.0951L0.826733 7.41853C0.36169 7.21883 -0.122501 7.65925 0.027954 8.14071L5.1106 24.3269C5.18719 24.5731 5.41698 24.7427 5.67685 24.7427L27.4354 24.7482C27.6843 24.7482 27.9059 24.5923 27.9934 24.3598L33.9022 8.1708C34.0773 7.68661 33.5986 7.2243 33.1226 7.41853H33.1198ZM20.602 15.2668L16.351 22.7896C16.2908 22.8962 16.1321 22.8552 16.1266 22.7348L15.9543 18.1802H14.4689V18.1637C14.4306 18.1692 14.3923 18.1802 14.3513 18.1802H11.2683C11.178 18.1802 11.1206 18.0817 11.1616 18.0023L15.7437 9.51395C15.9051 9.23493 16.2005 9.06532 16.5206 9.06532H19.6035C19.6938 9.06532 19.7512 9.1638 19.7102 9.24313L16.5534 15.089H20.4953C20.5883 15.089 20.6458 15.1875 20.5993 15.2695L20.602 15.2668Z" fill="#A5B8EF" />
                      </svg>
                    </div>

                    {/* Crown 3 */}
                    <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="29" height="21" viewBox="0 0 34 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M33.1198 7.41853L24.191 11.0541C23.9175 11.1662 23.6056 11.0595 23.4552 10.8051L17.478 0.292432C17.2455 -0.104222 16.6655 -0.0960149 16.4467 0.308846L10.1796 10.8325C10.0346 11.1006 9.70631 11.2155 9.42455 11.0951L0.826733 7.41853C0.36169 7.21883 -0.122501 7.65925 0.027954 8.14071L5.1106 24.3269C5.18719 24.5731 5.41698 24.7427 5.67685 24.7427L27.4354 24.7482C27.6843 24.7482 27.9059 24.5923 27.9934 24.3598L33.9022 8.1708C34.0773 7.68661 33.5986 7.2243 33.1226 7.41853H33.1198ZM20.602 15.2668L16.351 22.7896C16.2908 22.8962 16.1321 22.8552 16.1266 22.7348L15.9543 18.1802H14.4689V18.1637C14.4306 18.1692 14.3923 18.1802 14.3513 18.1802H11.2683C11.178 18.1802 11.1206 18.0817 11.1616 18.0023L15.7437 9.51395C15.9051 9.23493 16.2005 9.06532 16.5206 9.06532H19.6035C19.6938 9.06532 19.7512 9.1638 19.7102 9.24313L16.5534 15.089H20.4953C20.5883 15.089 20.6458 15.1875 20.5993 15.2695L20.602 15.2668Z" fill="#112F82" />
                      </svg>
                    </div>
                  </div>

                  {/* Text 2 */}
                  <p
                    style={{
                      width: '428px',
                      height: '57px',
                      fontFamily: "'Manrope', sans-serif",
                      fontStyle: 'normal',
                      fontWeight: 600,
                      fontSize: '14px',
                      lineHeight: '19px',
                      textAlign: 'center',
                      letterSpacing: '0.02em',
                      color: '#A5B8EF',
                    }}
                    className="m-0"
                  >
                    1 confirmation is required for deposits to be credited.
                    <br />
                    Want to know how many confirmations this transaction has?
                    <br />
                    Please{' '}
                    <a
                      href="https://www.blockchain.com/explorer"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#FFC83D', textDecoration: 'none' }}
                      className="hover:underline font-bold"
                    >
                      click here
                    </a>
                    .
                  </p>
                </div>
              ) : activeTab === 'deposit' ? (
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
                    ref={bonusDropdownRefDesktop}
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
                            height: '16px',
                            fontFamily: "'Manrope', sans-serif",
                            fontStyle: 'normal',
                            fontWeight: 700,
                            fontSize: '12px',
                            lineHeight: '16px',
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
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '14px',
                          height: '14px',
                        }}
                        className="shrink-0"
                      >
                        <div
                          style={{
                            width: '6px',
                            height: '6px',
                            borderLeft: '1.5px solid #A5B8EF',
                            borderBottom: '1.5px solid #A5B8EF',
                            transform: isBonusDropdownOpen ? 'rotate(135deg)' : 'rotate(-45deg)',
                            transition: 'transform 0.2s ease-in-out',
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
                                className={`flex flex-row items-center gap-[12px] px-[16px] py-[10px] cursor-pointer transition-colors ${isSelected ? 'bg-[#1463FF]' : 'hover:bg-[#112F82]'
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
                                    <span className={`font-sans font-semibold text-[10px] ${isSelected ? 'text-white/80' : 'text-[#7795E8]'
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
                    ref={paymentDropdownRefDesktop}
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
                                gap: '4px',
                                width: '346px',
                                height: '16px',
                              }}
                            >
                              <span
                                style={{
                                  width: '43px',
                                  height: '16px',
                                  fontFamily: "'Manrope', sans-serif",
                                  fontStyle: 'normal',
                                  fontWeight: 700,
                                  fontSize: '12px',
                                  lineHeight: '16px',
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
                                  color: '#BBCAF3',
                                }}
                              >
                                (Min. Deposit $10)
                              </span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex flex-row items-center gap-[4px] shrink-0">
                              <img src="/images/visa.svg" className="w-[42px] h-[20px] object-contain" alt="Visa" />
                            </div>
                            <div className="flex flex-row items-center gap-[8px]">
                              <span className="font-sans font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white">
                                Credit Card
                              </span>
                              <span className="font-sans font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#7795E8]">
                                (Min.Deposite $30 - Max.Deposite $2500)
                              </span>
                            </div>
                          </>
                        )}
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '14px',
                          height: '14px',
                        }}
                        className="shrink-0"
                      >
                        <div
                          style={{
                            width: '6px',
                            height: '6px',
                            borderLeft: '1.5px solid #A5B8EF',
                            borderBottom: '1.5px solid #A5B8EF',
                            transform: isPaymentDropdownOpen ? 'rotate(135deg)' : 'rotate(-45deg)',
                            transition: 'transform 0.2s ease-in-out',
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
                              <img src="/images/visa.svg" className="w-[42px] h-[20px] object-contain" alt="Visa" />
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

                  {selectedPayment === 'Bitcoin' ? (
                    <>
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
                            <circle cx="7" cy="7" r="6" stroke="#7795E8" strokeWidth="1.5" />
                            <path d="M7 4V4.5" stroke="#7795E8" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M7 6V10" stroke="#7795E8" strokeWidth="1.5" strokeLinecap="round" />
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
                                height: '16px',
                                fontFamily: "'Manrope', sans-serif",
                                fontStyle: 'normal',
                                fontWeight: 700,
                                fontSize: '12px',
                                lineHeight: '16px',
                                letterSpacing: '0.02em',
                                color: '#FFFFFF',
                                background: 'transparent',
                                border: 'none',
                                outline: 'none',
                              }}
                              placeholder="100"
                            />
                          </div>

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
                              background: '#112F82',
                              borderRadius: '8px',
                              border: 'none',
                              cursor: 'pointer',
                            }}
                            className="hover:bg-[#153a9e] transition-colors shrink-0 active:scale-95 duration-100 border border-white/5"
                          >
                            <div style={{ width: '14px', height: '8px', position: 'relative' }}>
                              <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-0 top-0">
                                <path d="M12.5 4H1.5M12.5 4L9.5 1M12.5 4L9.5 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                            <div style={{ width: '14px', height: '8px', position: 'relative', transform: 'matrix(-1, 0, 0, 1, 0, 0)' }}>
                              <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-0 top-0">
                                <path d="M12.5 4H1.5M12.5 4L9.5 1M12.5 4L9.5 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                          </button>

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
                                height: '16px',
                                fontFamily: "'Manrope', sans-serif",
                                fontStyle: 'normal',
                                fontWeight: 700,
                                fontSize: '12px',
                                lineHeight: '16px',
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
                              height: '16px',
                              fontFamily: "'Manrope', sans-serif",
                              fontStyle: 'normal',
                              fontWeight: 700,
                              fontSize: '12px',
                              lineHeight: '16px',
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
                    <div className="flex flex-col items-start gap-[12px] w-full shrink-0 select-none">
                      <span className="font-manrope font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white">
                        Enter your address
                      </span>

                      <input
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        className="w-[428px] h-[40px] px-[16px] bg-[#112F82] rounded-[8px] border border-white/5 font-manrope font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder-[#A5B8EF] outline-none"
                        placeholder="Street"
                      />

                      <div className="flex flex-row gap-[8px] w-[428px]">
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="flex-1 w-[210px] h-[40px] px-[16px] bg-[#112F82] rounded-[8px] border border-white/5 font-manrope font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder-[#A5B8EF] outline-none"
                          placeholder="City"
                        />
                        <input
                          type="text"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          className="flex-1 w-[210px] h-[40px] px-[16px] bg-[#112F82] rounded-[8px] border border-white/5 font-manrope font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder-[#A5B8EF] outline-none"
                          placeholder="Postal Code"
                        />
                      </div>

                      <div className="flex flex-row gap-[8px] w-[428px] relative">
                        <input
                          type="text"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          className="flex-1 w-[210px] h-[40px] px-[16px] bg-[#112F82] rounded-[8px] border border-white/5 font-manrope font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder-[#A5B8EF] outline-none"
                          placeholder="State"
                        />

                        <div className="flex-1 w-[210px] relative" ref={countryDropdownRefDesktop}>
                          <div
                            onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                            className="flex flex-row items-center justify-between px-[16px] h-[40px] bg-[#112F82] rounded-[8px] cursor-pointer hover:bg-[#153a9e] transition-all duration-150 border border-white/5"
                          >
                            <div className="flex flex-row items-center gap-[10px] truncate">
                              {country === 'United States' && <USFlag />}
                              {country === 'Canada' && <CanadaFlag />}
                              {country === 'United Kingdom' && <UKFlag />}
                              <span className="font-manrope font-bold text-[12px] leading-[16px] tracking-[0.02em] text-white truncate">
                                {country}
                              </span>
                            </div>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '14px',
                                height: '14px',
                              }}
                              className="shrink-0"
                            >
                              <div
                                style={{
                                  width: '6px',
                                  height: '6px',
                                  borderLeft: '1.5px solid #A5B8EF',
                                  borderBottom: '1.5px solid #A5B8EF',
                                  transform: isCountryDropdownOpen ? 'rotate(135deg)' : 'rotate(-45deg)',
                                  transition: 'transform 0.2s ease-in-out',
                                }}
                                className="shrink-0"
                              />
                            </div>
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
                                  className="flex flex-row items-center gap-[8px] px-[16px] py-[8px] text-white font-manrope font-bold text-[12px] leading-[16px] tracking-[0.02em] hover:bg-[#1463FF] cursor-pointer transition-colors"
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
                            <path d="M6 8L3 5L6 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
              ) : null}

              {activeTab === 'bonuses' && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '0px',
                    gap: '16px',
                    width: '460px',
                    height: '331px',
                  }}
                  className="select-none shrink-0"
                >
                  {/* Promo Code section */}
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
                  >
                    <span
                      style={{
                        width: '236px',
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
                      If you have a Bonus Code &mdash; enter it here
                    </span>

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
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: '10px 16px',
                          gap: '12px',
                          width: '320px',
                          height: '40px',
                          background: '#112F82',
                          borderRadius: '8px',
                          boxSizing: 'border-box',
                        }}
                      >
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Promo Code"
                          style={{
                            width: '288px',
                            height: '19px',
                            fontFamily: "'Manrope', sans-serif",
                            fontStyle: 'normal',
                            fontWeight: 600,
                            fontSize: '14px',
                            lineHeight: '19px',
                            letterSpacing: '0.02em',
                            color: '#FFFFFF',
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                          }}
                          className="placeholder-[#7795E8]"
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
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: '10px 30px',
                          gap: '10px',
                          width: '100px',
                          height: '40px',
                          background: '#FFC83D',
                          borderRadius: '8px',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                        className="hover:bg-[#ffd362] active:scale-95 duration-100"
                      >
                        <span
                          style={{
                            width: '40px',
                            height: '19px',
                            fontFamily: "'Manrope', sans-serif",
                            fontStyle: 'normal',
                            fontWeight: 700,
                            fontSize: '14px',
                            lineHeight: '19px',
                            letterSpacing: '0.02em',
                            color: '#1A1404',
                          }}
                        >
                          Join
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Available bonuses section */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      padding: '0px',
                      gap: '12px',
                      width: '428px',
                      height: '251px',
                    }}
                  >
                    <span
                      style={{
                        width: '151px',
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
                      Available bonuses for you
                    </span>

                    {/* Bonus Card slider/carousel */}
                    <div
                      ref={bonusScrollRef}
                      onScroll={() => {
                        if (bonusScrollRef.current) {
                          const scrollLeft = bonusScrollRef.current.scrollLeft;
                          // card width 300px + gap 8px = 308px
                          const index = Math.round(scrollLeft / 308);
                          if (index !== activeBonusCard) {
                            setActiveBonusCard(index);
                          }
                        }
                      }}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        padding: '0px',
                        gap: '8px',
                        width: '428px',
                        height: '205px',
                      }}
                      className="overflow-x-auto scrollbar-none snap-x snap-mandatory"
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
                      ].map((bonus, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            padding: '20px',
                            gap: '12px',
                            width: '300px',
                            height: '205px',
                            background: '#112F82',
                            borderRadius: '12px',
                            flexShrink: 0,
                            scrollSnapAlign: 'start',
                            boxSizing: 'border-box',
                          }}
                        >
                          {/* Bonus title */}
                          <span
                            style={{
                              width: '260px',
                              height: '20px',
                              fontFamily: "'Jost', sans-serif",
                              fontStyle: 'normal',
                              fontWeight: 700,
                              fontSize: '14px',
                              lineHeight: '20px',
                              letterSpacing: '0.02em',
                              color: '#FFFFFF',
                            }}
                            className="truncate block"
                          >
                            {bonus.title}
                          </span>

                          {/* Info Grid (260px x 81px, gap 9px) */}
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'flex-start',
                              padding: '0px',
                              gap: '9px',
                              width: '260px',
                              height: '81px',
                            }}
                          >
                            {/* Row 1 */}
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                padding: '0px',
                                gap: '12px',
                                width: '260px',
                                height: '36px',
                              }}
                            >
                              {/* Min. Deposit */}
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'flex-start',
                                  padding: '0px',
                                  gap: '2px',
                                  width: '124px',
                                  height: '36px',
                                  flexGrow: 1,
                                }}
                              >
                                <span
                                  style={{
                                    width: '124px',
                                    height: '14px',
                                    fontFamily: "'Manrope', sans-serif",
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    fontSize: '10px',
                                    lineHeight: '14px',
                                    letterSpacing: '0.02em',
                                    color: '#BBCAF3',
                                  }}
                                  className="truncate"
                                >
                                  Min. Deposit
                                </span>
                                <span
                                  style={{
                                    width: '124px',
                                    height: '20px',
                                    fontFamily: "'Jost', sans-serif",
                                    fontStyle: 'normal',
                                    fontWeight: 700,
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                    letterSpacing: '0.02em',
                                    color: '#FFFFFF',
                                  }}
                                  className="truncate"
                                >
                                  {bonus.minDeposit}
                                </span>
                              </div>

                              {/* Max. Cashout */}
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'flex-start',
                                  padding: '0px',
                                  gap: '2px',
                                  width: '124px',
                                  height: '36px',
                                  flexGrow: 1,
                                }}
                              >
                                <span
                                  style={{
                                    width: '124px',
                                    height: '14px',
                                    fontFamily: "'Manrope', sans-serif",
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    fontSize: '10px',
                                    lineHeight: '14px',
                                    letterSpacing: '0.02em',
                                    color: '#BBCAF3',
                                  }}
                                  className="truncate"
                                >
                                  Max. Cashout
                                </span>
                                <span
                                  style={{
                                    width: '124px',
                                    height: '20px',
                                    fontFamily: "'Jost', sans-serif",
                                    fontStyle: 'normal',
                                    fontWeight: 700,
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                    letterSpacing: '0.02em',
                                    color: '#FFFFFF',
                                  }}
                                  className="truncate"
                                >
                                  {bonus.maxCashout}
                                </span>
                              </div>
                            </div>

                            {/* Row 2 */}
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                padding: '0px',
                                gap: '12px',
                                width: '260px',
                                height: '36px',
                              }}
                            >
                              {/* Max. Amount */}
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'flex-start',
                                  padding: '0px',
                                  gap: '2px',
                                  width: '124px',
                                  height: '36px',
                                  flexGrow: 1,
                                }}
                              >
                                <span
                                  style={{
                                    width: '124px',
                                    height: '14px',
                                    fontFamily: "'Manrope', sans-serif",
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    fontSize: '10px',
                                    lineHeight: '14px',
                                    letterSpacing: '0.02em',
                                    color: '#BBCAF3',
                                  }}
                                  className="truncate"
                                >
                                  Max. Amount
                                </span>
                                <span
                                  style={{
                                    width: '124px',
                                    height: '20px',
                                    fontFamily: "'Jost', sans-serif",
                                    fontStyle: 'normal',
                                    fontWeight: 700,
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                    letterSpacing: '0.02em',
                                    color: '#FFFFFF',
                                  }}
                                  className="truncate"
                                >
                                  {bonus.maxAmount}
                                </span>
                              </div>

                              {/* Wager */}
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'flex-start',
                                  padding: '0px',
                                  gap: '2px',
                                  width: '124px',
                                  height: '36px',
                                  flexGrow: 1,
                                }}
                              >
                                <span
                                  style={{
                                    width: '124px',
                                    height: '14px',
                                    fontFamily: "'Manrope', sans-serif",
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    fontSize: '10px',
                                    lineHeight: '14px',
                                    letterSpacing: '0.02em',
                                    color: '#BBCAF3',
                                  }}
                                  className="truncate"
                                >
                                  Wager (dep. + bonus)
                                </span>
                                <span
                                  style={{
                                    width: '124px',
                                    height: '20px',
                                    fontFamily: "'Jost', sans-serif",
                                    fontStyle: 'normal',
                                    fontWeight: 700,
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                    letterSpacing: '0.02em',
                                    color: '#FFFFFF',
                                  }}
                                  className="truncate"
                                >
                                  {bonus.wager}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Join / Activate Button */}
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
                              width: '260px',
                              height: '40px',
                              background: '#FFC83D',
                              borderRadius: '6px',
                              border: 'none',
                              cursor: 'pointer',
                            }}
                            className="hover:bg-[#ffd362] active:scale-95 duration-100"
                          >
                            <span
                              style={{
                                width: '51px',
                                height: '16px',
                                fontFamily: "'Manrope', sans-serif",
                                fontStyle: 'normal',
                                fontWeight: 700,
                                fontSize: '12px',
                                lineHeight: '16px',
                                letterSpacing: '0.02em',
                                color: '#1A1404',
                              }}
                            >
                              Join
                            </span>
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Pagination indicators frame */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '0px',
                        width: '428px',
                        height: '6px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: '0px',
                          gap: '4px',
                          width: '32px',
                          height: '6px',
                        }}
                      >
                        {[0, 1, 2].map((idx) => {
                          const isDotActive = idx === activeBonusCard;
                          return (
                            <div
                              key={idx}
                              style={{
                                width: isDotActive ? '12px' : '6px',
                                height: '6px',
                                background: '#BBCAF3',
                                borderRadius: '150px',
                                opacity: isDotActive ? 1 : 0.35,
                                transition: 'all 0.2s ease',
                                cursor: 'pointer',
                              }}
                              onClick={() => {
                                if (bonusScrollRef.current) {
                                  bonusScrollRef.current.scrollTo({
                                    left: idx * 308,
                                    behavior: 'smooth',
                                  });
                                  setActiveBonusCard(idx);
                                }
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
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
          depositConfirmed ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '0px',
                gap: '12px',
                width: '460px',
                height: '66px',
                zIndex: 2,
              }}
              className="shrink-0 mt-auto"
            >
              {/* Go to games button */}
              <button
                onClick={onClose}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '10px 30px',
                  gap: '10px',
                  width: '350px',
                  height: '40px',
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
                className="hover:bg-[#ffd362] active:scale-95 duration-100 font-sans"
              >
                Go to games
              </button>

              {/* Support frame */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '0px',
                  gap: '8px',
                  width: '460px',
                  height: '14px',
                }}
              >
                {/* Question Icon */}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                  <circle cx="6" cy="6" r="5" stroke="#7795E8" strokeWidth="1.25" />
                  <path d="M6 8V7.5" stroke="#7795E8" strokeWidth="1.25" strokeLinecap="round" />
                  <path d="M6 6C6.5 5.5 7 5.25 7 4.5C7 3.67 6.33 3 5.5 3C4.67 3 4.25 3.67 4.25 3.67" stroke="#7795E8" strokeWidth="1.25" strokeLinecap="round" />
                </svg>

                <span
                  style={{
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
                  Having problems?{' '}
                  <a
                    href="/support"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Contact support triggered!');
                    }}
                    style={{
                      color: '#FFC83D',
                      textDecoration: 'none',
                      fontWeight: 700,
                    }}
                    className="hover:underline"
                  >
                    Contact support
                  </a>
                </span>
              </div>
            </div>
          ) : (
            <div
              style={{
                width: '300px',
                height: '50px',
                zIndex: 2,
              }}
              className="flex items-center justify-center shrink-0 mt-auto"
            >
              {selectedPayment === 'Bitcoin' ? (
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
          )
        )}
      </div>
    </div>
  );
}
