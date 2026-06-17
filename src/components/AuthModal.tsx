'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { closeAuthModal, openAuthModal } from '@/redux/features/uiSlice';
import { loginSuccess } from '@/redux/features/authSlice';

const COUNTRY_CODES = [
  { code: '+380', flag: '🇺🇦', name: 'Ukraine',        image: null },
  { code: '+1',   flag: '🇺🇸', name: 'United States',  image: '/images/america.svg' },
  { code: '+44',  flag: '🇬🇧', name: 'United Kingdom', image: null },
  { code: '+49',  flag: '🇩🇪', name: 'Germany',        image: null },
  { code: '+91',  flag: '🇮🇳', name: 'India',          image: null },
];

function FlagIcon({ c, size = 20 }: { c: typeof COUNTRY_CODES[0]; size?: number }) {
  if (c.image) {
    return (
      <img src={c.image} alt={c.name} width={size} height={size}
        style={{ width: `${size}px`, height: `${size}px`, objectFit: 'cover', borderRadius: '50%', flexShrink: 0, display: 'block' }} />
    );
  }
  return <span style={{ fontSize: `${size}px`, lineHeight: 1, flexShrink: 0 }}>{c.flag}</span>;
}

const inputStyle: React.CSSProperties = {
  fontFamily: "'Manrope', sans-serif", fontWeight: 600,
  fontSize: '14px', lineHeight: '19px', letterSpacing: '0.02em',
  color: '#A5B8EF', background: 'transparent',
  border: 'none', outline: 'none', flexGrow: 1, width: '100%',
};

export default function AuthModal() {
  const dispatch = useAppDispatch();
  const isOpen   = useAppSelector((s) => s.ui.authModalOpen);
  const type     = useAppSelector((s) => s.ui.authModalType);

  const [username,  setUsername]  = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName,  setLastName]  = useState('');
  const [email,     setEmail]     = useState('');
  const [password,  setPassword]  = useState('');
  const [phone,     setPhone]     = useState('');
  const [country,   setCountry]   = useState(COUNTRY_CODES[0]);
  const [dropOpen,  setDropOpen]  = useState(false);
  const [showPwd,   setShowPwd]   = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState<string | null>(null);
  const [success,   setSuccess]   = useState<string | null>(null);

  if (!isOpen) return null;

  const close  = () => dispatch(closeAuthModal());
  const setTab = (t: 'login' | 'join') => { dispatch(openAuthModal(t)); setError(null); setSuccess(null); };

  const onSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    setError(null); setSuccess(null); setLoading(true);
    try {
      if (type === 'join') {
        const res = await fetch('/api/auth/register', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, firstName, lastName, email, password, phone: `${country.code}${phone}` }),
        });
        const data = await res.json();
        if (!res.ok) { setError(data.error || 'Registration failed.'); return; }
        setSuccess('Account created! You can now log in.');
        dispatch(loginSuccess(data.user));
        setTimeout(close, 1200);
      } else {
        const res = await fetch('/api/auth/login', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) { setError(data.error || 'Login failed.'); return; }
        setSuccess('Welcome back!');
        dispatch(loginSuccess(data.user));
        setTimeout(close, 800);
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fieldCls = 'flex flex-row items-center px-4 gap-3 w-full h-10 bg-[#112F82] rounded-lg flex-shrink-0 box-border';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div onClick={close} className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal — stacks vertically on mobile, side-by-side on sm+ */}
      <div className="relative z-10 flex flex-col sm:flex-row w-full max-w-[730px] max-h-[95vh] overflow-y-auto rounded-2xl shadow-2xl">

        {/* LEFT PANEL — hidden on mobile */}
        <div className="hidden sm:block relative w-[340px] min-h-[546px] flex-shrink-0 overflow-hidden bg-[#000C24] rounded-tl-2xl rounded-bl-2xl">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/games/lion.png')" }} />
          <div className="absolute inset-x-0 bottom-0 h-[219px]" style={{ background: 'linear-gradient(180deg, rgba(0,12,36,0) 6.85%, #000C24 45.66%)' }} />
          <div className="absolute w-[173px] h-[173px] rounded-full bg-[#1463FF] bottom-[-129px] left-1/2 -translate-x-1/2" style={{ filter: 'blur(40px)' }} />
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-5 w-[300px]">
            <div className="flex flex-col items-center">
              <span className="font-jost font-extrabold text-[52px] leading-none text-white">350%</span>
              <div className="flex items-center justify-center px-5 py-2 bg-[#2BEA51] rounded-full shadow-[0_4px_14px_rgba(43,234,81,0.35)] mt-1">
                <span className="font-jost font-extrabold text-[12px] text-[#051D09] whitespace-nowrap">WELCOME PACKAGE</span>
              </div>
            </div>
            <p className="font-sans font-bold text-[10px] leading-[14px] text-center text-white max-w-[200px]">
              Boost your deposits with 350% in Bonus and 200 Free Spins
            </p>
          </div>
        </div>

        {/* RIGHT PANEL — full width on mobile, fixed width on sm+ */}
        <div className="relative flex flex-col items-start p-5 sm:p-6 gap-6 w-full sm:w-[390px] bg-[#091741] rounded-2xl sm:rounded-tl-none sm:rounded-bl-none sm:rounded-tr-2xl sm:rounded-br-2xl flex-shrink-0 overflow-hidden">
          {/* Top glow */}
          <div className="absolute w-[173px] h-[173px] rounded-full bg-[#1463FF] top-[-145px] left-1/2 -translate-x-1/2 z-0" style={{ filter: 'blur(40px)' }} />

          {/* Close button */}
          <button onClick={close} aria-label="Close"
            className="absolute right-3 top-3 w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#A5B8EF] hover:text-white transition-colors z-30 cursor-pointer border-0">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          <form onSubmit={onSubmit} className="flex flex-col items-start gap-4 w-full z-10">
            {/* Logo */}
            <div className="flex items-center justify-center w-full">
              <div className="flex items-center gap-1.5">
                <svg width="20" height="15" viewBox="0 0 34 25" fill="none">
                  <path d="M33.1198 7.41853L24.191 11.0541C23.9175 11.1662 23.6056 11.0595 23.4552 10.8051L17.478 0.292432C17.2455 -0.104222 16.6655 -0.0960149 16.4467 0.308846L10.1796 10.8325C10.0346 11.1006 9.70631 11.2155 9.42455 11.0951L0.826733 7.41853C0.36169 7.21883 -0.122501 7.65925 0.027954 8.14071L5.1106 24.3269C5.18719 24.5731 5.41698 24.7427 5.67685 24.7427L27.4354 24.7482C27.6843 24.7482 27.9059 24.5923 27.9934 24.3598L33.9022 8.1708C34.0773 7.68661 33.5986 7.2243 33.1226 7.41853H33.1198Z" fill="url(#cg)"/>
                  <defs><linearGradient id="cg" x1="4" y1="12" x2="30" y2="12" gradientUnits="userSpaceOnUse"><stop stopColor="#FFD85A"/><stop offset="1" stopColor="#FFB800"/></linearGradient></defs>
                </svg>
                <span className="font-sans font-black text-white text-sm tracking-[0.02em]">MIGHTY <span className="text-[#FFC83D]">LUCK</span></span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex flex-row items-center gap-2 w-full h-10">
              <button type="button" onClick={() => setTab('join')}
                className="flex-1 h-10 rounded-lg font-sans font-bold text-sm cursor-pointer border-0 transition-opacity"
                style={{ background: '#FFC83D', color: '#000', opacity: type === 'join' ? 1 : 0.45 }}>
                Join Now
              </button>
              <button type="button" onClick={() => setTab('login')}
                className="flex-1 h-10 rounded-lg font-sans font-bold text-sm cursor-pointer border-0 transition-opacity"
                style={{ background: '#1463FF', color: '#fff', opacity: type === 'login' ? 1 : 0.45 }}>
                Log In
              </button>
            </div>

            {/* Fields */}
            <div className="flex flex-col gap-3 w-full">
              {type === 'join' ? (
                <>
                  <div className={fieldCls}><input placeholder="User name" value={username} onChange={e => setUsername(e.target.value)} style={inputStyle} /></div>
                  <div className="flex flex-row gap-2 w-full">
                    <div className="flex flex-row items-center px-4 gap-3 flex-1 h-10 bg-[#112F82] rounded-lg box-border">
                      <input placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} style={inputStyle} />
                    </div>
                    <div className="flex flex-row items-center px-4 gap-3 flex-1 h-10 bg-[#112F82] rounded-lg box-border">
                      <input placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} style={inputStyle} />
                    </div>
                  </div>
                  <div className={fieldCls}><input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} /></div>
                </>
              ) : (
                <div className={fieldCls}><input placeholder="User name or Email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} /></div>
              )}

              {/* Password */}
              <div className={`${fieldCls} justify-between`}>
                <input type={showPwd ? 'text' : 'password'} placeholder="Password"
                  value={password} onChange={e => setPassword(e.target.value)}
                  style={{ ...inputStyle, width: 'auto' }} />
                <button type="button" onClick={() => setShowPwd(!showPwd)}
                  className="w-5 h-5 bg-transparent border-0 cursor-pointer text-[#A5B8EF] flex items-center flex-shrink-0 p-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {showPwd
                      ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></>
                      : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
                  </svg>
                </button>
              </div>

              {/* Phone (join only) */}
              {type === 'join' && (
                <div className="relative flex flex-row gap-2 w-full">
                  <div className="relative flex-shrink-0">
                    <button type="button" onClick={() => setDropOpen(!dropOpen)}
                      className="flex flex-row items-center px-4 gap-2 h-10 bg-[#112F82] rounded-lg border-0 cursor-pointer box-border min-w-[100px]">
                      <FlagIcon c={country} size={20} />
                      <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 600, fontSize: '13px', color: '#fff' }}>{country.code}</span>
                      <svg width="7" height="4" viewBox="0 0 7 4" fill="none" style={{ transform: dropOpen ? 'rotate(180deg)' : 'none', transition: '.2s' }}>
                        <path d="M1 1L3.5 3L6 1" stroke="#A5B8EF" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </button>
                    {dropOpen && (
                      <>
                        <div onClick={() => setDropOpen(false)} className="fixed inset-0 z-20" />
                        <div className="absolute left-0 bottom-11 w-44 bg-[#0C1F56] rounded-lg border border-white/10 p-1.5 z-30 flex flex-col gap-0.5">
                          {COUNTRY_CODES.map(c => (
                            <button key={c.code} type="button" onClick={() => { setCountry(c); setDropOpen(false); }}
                              className="flex items-center gap-2 px-2 py-1.5 bg-transparent border-0 rounded cursor-pointer text-white hover:bg-white/5 text-xs font-sans">
                              <FlagIcon c={c} size={16} />
                              <span className="font-bold">{c.code}</span>
                              <span className="text-[#A5B8EF] truncate">{c.name}</span>
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex flex-row items-center px-4 gap-3 flex-1 h-10 bg-[#112F82] rounded-lg box-border">
                    <input type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} style={inputStyle} />
                  </div>
                </div>
              )}

              {type === 'join' && (
                <p className="font-sans font-medium text-[10px] leading-[14px] text-[#BBCAF3] text-justify m-0">
                  By clicking &quot;Join Now&quot; I confirm that I&apos;m over 18 years old and agree to Mighty Luck&apos; T&amp;C along with the Privacy Policy
                </p>
              )}
            </div>
          </form>

          {/* CTA block */}
          <div className="flex flex-col gap-2.5 w-full z-10 flex-shrink-0">
            {error && (
              <div className="w-full px-3.5 py-2 rounded-lg bg-[rgba(237,76,92,0.15)] border border-[rgba(237,76,92,0.4)] flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ED4C5C" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <span className="font-sans text-[11px] font-semibold text-[#ED4C5C]">{error}</span>
              </div>
            )}
            {success && (
              <div className="w-full px-3.5 py-2 rounded-lg bg-[rgba(43,234,81,0.12)] border border-[rgba(43,234,81,0.35)] flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2BEA51" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span className="font-sans text-[11px] font-semibold text-[#2BEA51]">{success}</span>
              </div>
            )}

            <button onClick={onSubmit as React.MouseEventHandler} disabled={loading}
              className="w-full h-12 rounded-lg flex items-center justify-center font-sans font-bold text-sm text-[#1A1404] cursor-pointer border-0 transition-all active:scale-95"
              style={{ background: loading ? 'rgba(255,200,61,0.6)' : '#FFC83D', boxShadow: loading ? 'none' : '0 4px 16px rgba(255,200,61,0.25)' }}>
              {loading
                ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1404" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite' }}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                : <span>{type === 'join' ? 'Join with a 350% Bonus' : 'Log In to Mighty Luck'}</span>
              }
            </button>

            <div className="flex items-center gap-2 h-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7795E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <a href="#" onClick={e => e.preventDefault()} className="font-sans font-medium text-[10px] text-[#7795E8] no-underline whitespace-nowrap hover:text-white transition-colors">
                Having problems? Contact support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
