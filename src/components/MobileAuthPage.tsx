'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/store';
import { loginSuccess } from '@/redux/features/authSlice';

const COUNTRY_CODES = [
  { code: '+380', flag: '🇺🇦', name: 'Ukraine' },
  { code: '+1',   flag: '🇺🇸', name: 'United States' },
  { code: '+44',  flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+49',  flag: '🇩🇪', name: 'Germany' },
  { code: '+91',  flag: '🇮🇳', name: 'India' },
];

const inputStyle: React.CSSProperties = {
  fontFamily: "'Manrope', sans-serif",
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '19px',
  letterSpacing: '0.02em',
  color: '#A5B8EF',
  background: 'transparent',
  border: 'none',
  outline: 'none',
  width: '100%',
};

export default function MobileAuthPage({ defaultTab }: { defaultTab: 'join' | 'login' }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [tab, setTab] = useState<'join' | 'login'>(defaultTab);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState(COUNTRY_CODES[0]);
  const [dropOpen, setDropOpen] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const switchTab = (t: 'join' | 'login') => {
    setTab(t);
    setError(null);
    setSuccess(null);
    router.push(t === 'join' ? '/auth/register' : '/auth/login');
  };

  const onSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    setError(null); setSuccess(null); setLoading(true);
    try {
      if (tab === 'join') {
        const res = await fetch('/api/auth/register', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, firstName, lastName, email, password, phone: `${country.code}${phone}` }),
        });
        const data = await res.json();
        if (!res.ok) { setError(data.error || 'Registration failed.'); return; }
        setSuccess('Account created!');
        dispatch(loginSuccess(data.user));
        setTimeout(() => router.push('/'), 1200);
      } else {
        const res = await fetch('/api/auth/login', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) { setError(data.error || 'Login failed.'); return; }
        setSuccess('Welcome back!');
        dispatch(loginSuccess(data.user));
        setTimeout(() => router.push('/'), 800);
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100svh', background: '#091741', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '414px', margin: '0 auto' }}>

      {/* ── Row 1: Back + Tabs  (h=92, px=20, pt=12, pb=30) ── */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '12px 20px 30px', gap: '20px', width: '100%', flexShrink: 0 }}>

        {/* Back arrow  30×30 */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '30px', height: '30px', flexShrink: 0 }}>
          <button
            onClick={() => router.push('/')}
            style={{ width: '30px', height: '30px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
          >
            {/* Vector: 20×15.77, color #D2DCF7 */}
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
              <path d="M19 8H1M8 1L1 8L8 15" stroke="#D2DCF7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Tabs row  gap=8, h=50, flex-grow=1 */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 0, gap: '8px', flex: 1, height: '50px' }}>

          {/* Join Now  158×50 */}
          <button
            type="button"
            onClick={() => switchTab('join')}
            style={{
              display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
              padding: '10px 30px', gap: '10px', flex: 1, height: '50px',
              background: tab === 'join' ? '#FFC83D' : '#112F82',
              borderRadius: '8px', border: 'none', cursor: 'pointer',
              fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '14px',
              lineHeight: '19px', letterSpacing: '0.02em',
              color: tab === 'join' ? '#000000' : '#A5B8EF',
              transition: 'background .2s',
            }}
          >
            Join Now
          </button>

          {/* Log In  158×50 */}
          <button
            type="button"
            onClick={() => switchTab('login')}
            style={{
              display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
              padding: '10px 30px', gap: '10px', flex: 1, height: '50px',
              background: tab === 'login' ? '#1463FF' : '#112F82',
              borderRadius: '8px', border: 'none', cursor: 'pointer',
              fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '14px',
              lineHeight: '19px', letterSpacing: '0.02em',
              color: '#FFFFFF',
              transition: 'background .2s',
            }}
          >
            Log In
          </button>
        </div>
      </div>

      {/* ── Row 2: Banner  414×170, border-radius 12 12 0 0 ── */}
      <div style={{ width: '100%', height: '170px', borderRadius: '12px 12px 0px 0px', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        {/* Background image */}
        <img src="/mobile/login/login.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />

        {/* Blue glow ellipse: 281×281, centered */}
        <div style={{ position: 'absolute', width: '281px', height: '281px', left: 'calc(50% - 140.5px)', top: 'calc(50% - 133.5px)', background: '#0051F1', filter: 'blur(62.39px)', borderRadius: '50%' }} />

        {/* Content stack: 220.13×119, centered */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 0, gap: '12px', position: 'absolute', width: '220.13px', height: '119px', left: 'calc(50% - 110.065px)', top: 'calc(50% - 59.5px)' }}>

          {/* 350% text */}
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 0, gap: '10px', width: '132px', height: '31px' }}>
            <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 800, fontSize: '44px', lineHeight: '64px', textAlign: 'center', letterSpacing: '0.01em', color: '#FFFFFF', display: 'block', height: '31px', overflow: 'visible' }}>350%</span>
          </div>

          {/* WELCOME PACKAGE pill: 140.59×32 */}
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '8.65px 17.3px', gap: '8.65px', width: '140.59px', height: '32px', background: '#2BEA51', borderRadius: '86.49px', flexShrink: 0 }}>
            <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 800, fontSize: '10px', lineHeight: '14px', textAlign: 'center', color: '#051D09', whiteSpace: 'nowrap' }}>WELCOME PACKAGE</span>
          </div>

          {/* Subtitle */}
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', padding: 0, gap: '10px', width: '220.13px', height: '32px' }}>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '12px', lineHeight: '16px', textAlign: 'center', letterSpacing: '0.01em', color: '#FFFFFF', width: '200px' }}>
              Boost your deposits with 350% in Bonus and 200 Free Spins
            </span>
          </div>
        </div>
      </div>

      {/* ── Row 3: Form area  px=20, pt=20, pb=40, gap=60 ── */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '20px 20px 40px', gap: '60px', width: '100%', flexShrink: 0 }}>

        {/* Inner wrapper: gap=32 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 0, gap: '32px', width: '100%' }}>

          {/* Logo */}
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', gap: '8px', marginBottom: '-10px' }}>
            <img src="/images/logo.svg" style={{ width: '24.48px', height: '18px', objectFit: 'contain' }} alt="Mighty Luck" />
            <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 900, fontSize: '18px', lineHeight: '24px', letterSpacing: '0.02em', color: '#FFFFFF' }}>
              MIGHTY <span style={{ color: '#FFC83D' }}>LUCK</span>
            </span>
          </div>

          {/* Fields + disclaimer  gap=16 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 0, gap: '16px', width: '100%' }}>

            {/* Fields  gap=12 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 0, gap: '12px', width: '100%' }}>

              {tab === 'join' ? (
                <>
                  {/* Username: 374×50 */}
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px 16px', gap: '12px', width: '100%', height: '50px', background: '#112F82', borderRadius: '8px' }}>
                    <input placeholder="User name" value={username} onChange={e => setUsername(e.target.value)} style={inputStyle} />
                  </div>

                  {/* First + Last row: gap=8, h=50 */}
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', padding: 0, gap: '8px', width: '100%', height: '50px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px 16px', gap: '12px', flex: 1, height: '50px', background: '#112F82', borderRadius: '8px' }}>
                      <input placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} style={inputStyle} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px 16px', gap: '12px', flex: 1, height: '50px', background: '#112F82', borderRadius: '8px' }}>
                      <input placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} style={inputStyle} />
                    </div>
                  </div>

                  {/* Email: 374×50 */}
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px 16px', gap: '12px', width: '100%', height: '50px', background: '#112F82', borderRadius: '8px' }}>
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
                  </div>
                </>
              ) : (
                /* Login: email/username field */
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px 16px', gap: '12px', width: '100%', height: '50px', background: '#112F82', borderRadius: '8px' }}>
                  <input placeholder="User name or Email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
                </div>
              )}

              {/* Password: 374×50, justify-between */}
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', gap: '10px', width: '100%', height: '50px', background: '#112F82', borderRadius: '8px' }}>
                <input
                  type={showPwd ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ ...inputStyle, width: 'auto', flexGrow: 1 }}
                />
                {/* Eye icon: 20×20 */}
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  style={{ width: '20px', height: '20px', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#A5B8EF' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A5B8EF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {showPwd
                      ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></>
                      : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>
                    }
                  </svg>
                </button>
              </div>

              {/* Phone row (join only): gap=8, h=50 */}
              {tab === 'join' && (
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', padding: 0, gap: '8px', width: '100%', height: '50px', position: 'relative' }}>

                  {/* Country picker: 121×50 */}
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <button
                      type="button"
                      onClick={() => setDropOpen(!dropOpen)}
                      style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px 16px', gap: '10px', width: '121px', height: '50px', background: '#112F82', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                    >
                      {/* Flag: 20×20 */}
                      <span style={{ fontSize: '20px', lineHeight: '20px', width: '20px', height: '20px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>{country.flag}</span>
                      {/* +380: 35×19 */}
                      <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 600, fontSize: '14px', lineHeight: '19px', letterSpacing: '0.02em', color: '#FFFFFF', width: '35px', flexShrink: 0 }}>{country.code}</span>
                      {/* Chevron: 14×14 container, Vector2 7×3.5 */}
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '14px', height: '14px', flexShrink: 0 }}>
                        <svg width="7" height="4" viewBox="0 0 7 4" fill="none" style={{ transform: dropOpen ? 'rotate(180deg)' : 'none', transition: '.2s' }}>
                          <path d="M1 1L3.5 3.5L6 1" stroke="#A5B8EF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </button>

                    {dropOpen && (
                      <>
                        <div onClick={() => setDropOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 20 }} />
                        <div style={{ position: 'absolute', left: 0, bottom: '54px', width: '176px', background: '#0C1F56', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', padding: '6px', zIndex: 30, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          {COUNTRY_CODES.map(c => (
                            <button key={c.code} type="button" onClick={() => { setCountry(c); setDropOpen(false); }}
                              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', background: 'transparent', border: 'none', borderRadius: '6px', cursor: 'pointer', color: '#fff', fontSize: '12px', fontFamily: "'Manrope', sans-serif" }}>
                              <span style={{ fontSize: '16px' }}>{c.flag}</span>
                              <span style={{ fontWeight: 700 }}>{c.code}</span>
                              <span style={{ color: '#A5B8EF' }}>{c.name}</span>
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Phone input: flex-grow=1, h=50 */}
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px 16px', gap: '12px', flex: 1, height: '50px', background: '#112F82', borderRadius: '8px' }}>
                    <input type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} style={inputStyle} />
                  </div>
                </div>
              )}
            </div>

            {/* Disclaimer (join only): 374×28 */}
            {tab === 'join' && (
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', padding: 0, gap: '10px', width: '100%', height: '28px' }}>
                <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 500, fontSize: '10px', lineHeight: '14px', textAlign: 'center', letterSpacing: '0.01em', color: '#BBCAF3', margin: 0, width: '100%' }}>
                  By clicking &quot;Join Now&quot; I confirm that I&apos;m over 18 years old and agree to Mighty Luck&apos; T&amp;C along with the Privacy Policy
                </p>
              </div>
            )}
          </div>

          {/* CTA block: gap=12 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 0, gap: '12px', width: '100%' }}>

            {error && (
              <div style={{ width: '100%', padding: '8px 14px', borderRadius: '8px', background: 'rgba(237,76,92,0.15)', border: '1px solid rgba(237,76,92,0.4)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ED4C5C" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '11px', fontWeight: 600, color: '#ED4C5C' }}>{error}</span>
              </div>
            )}
            {success && (
              <div style={{ width: '100%', padding: '8px 14px', borderRadius: '8px', background: 'rgba(43,234,81,0.12)', border: '1px solid rgba(43,234,81,0.35)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2BEA51" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '11px', fontWeight: 600, color: '#2BEA51' }}>{success}</span>
              </div>
            )}

            {/* CTA button: 374×60 */}
            <button
              onClick={onSubmit as React.MouseEventHandler}
              disabled={loading}
              style={{
                display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                padding: '10px 30px', gap: '10px', width: '100%', height: '60px',
                background: loading ? 'rgba(255,200,61,0.6)' : '#FFC83D',
                borderRadius: '8px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '16px',
                lineHeight: '22px', letterSpacing: '0.02em', color: '#1A1404',
                transition: 'transform .1s',
              }}
            >
              {loading
                ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A1404" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite' }}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
                : <span>{tab === 'join' ? 'Join with a 350% Bonus' : 'Log In to Mighty Luck'}</span>
              }
            </button>

            {/* Support row: 374×16, gap=8 */}
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', padding: 0, gap: '8px', width: '100%', height: '16px' }}>
              {/* Question icon: 16×16 */}
              <div style={{ width: '16px', height: '16px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7795E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              {/* Text: 205×16 */}
              <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 500, fontSize: '12px', lineHeight: '16px', letterSpacing: '0.02em', color: '#7795E8', whiteSpace: 'nowrap' }}>
                Having problems?{' '}
                <span style={{ color: '#FFBF1F', cursor: 'pointer', fontWeight: 600 }}>Contact support</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
