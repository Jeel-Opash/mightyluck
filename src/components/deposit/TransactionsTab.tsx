'use client';

import React, { useState } from 'react';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'bonus';
  title: string;
  subtitle: string;
  amount: number;
  status: 'confirming' | 'pending' | 'completed' | 'active';
  date: string;
  method: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'deposit',
    title: 'Deposit',
    subtitle: 'Bitcoin — Today, 14:32',
    amount: 100.00,
    status: 'confirming',
    date: 'Today, 14:32',
    method: 'Bitcoin',
  },
  {
    id: '2',
    type: 'withdraw',
    title: 'Wirhdrawal',
    subtitle: 'Bitcoin — Today, 10:12',
    amount: -250.00,
    status: 'pending',
    date: 'Today, 10:12',
    method: 'Bitcoin',
  },
  {
    id: '3',
    type: 'deposit',
    title: 'Deposit',
    subtitle: 'Bitcoin — Yesterday, 19:44',
    amount: 100.00,
    status: 'completed',
    date: 'Yesterday, 19:44',
    method: 'Bitcoin',
  },
  {
    id: '4',
    type: 'bonus',
    title: 'Bonus',
    subtitle: 'RELOAD150 — Yesterday, 19:45',
    amount: 75.00,
    status: 'active',
    date: 'Yesterday, 19:45',
    method: 'RELOAD150',
  },
  {
    id: '5',
    type: 'withdraw',
    title: 'Wirhdrawal',
    subtitle: 'Bank Transfer — May 12, 09:18',
    amount: -500.00,
    status: 'completed',
    date: 'May 12, 09:18',
    method: 'Bank Transfer',
  },
  {
    id: '6',
    type: 'deposit',
    title: 'Deposit',
    subtitle: 'Bitcoin — May 10, 16:20',
    amount: 100.00,
    status: 'completed',
    date: 'May 10, 16:20',
    method: 'Bitcoin',
  }
];

interface TransactionsTabProps {
  isMobile: boolean;
}

export default function TransactionsTab({ isMobile }: TransactionsTabProps) {
  const [filter, setFilter] = useState<'all' | 'deposit' | 'withdraw' | 'bonus'>('all');

  const filteredTransactions = mockTransactions.filter((tx) => {
    if (filter === 'all') return true;
    return tx.type === filter;
  });

  const renderIcon = (tx: Transaction) => {
    if (tx.type === 'bonus') {
      // Gift icon
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 6H17.82C18.69 4.88 18.96 3.31 17.83 2.17C17.07 1.41 16.03 1 15 1C13.26 1 11.96 2.16 11.24 3.23L12 4.02L12.76 3.23C13.48 2.16 14.78 1 16.5 1C17.03 1 17.57 1.21 17.97 1.61C18.45 2.09 18.57 2.87 18.06 3.65C17.57 4.39 16.54 5.37 15.06 6H20V6ZM4 6H9C7.5 5.37 6.5 4.39 6 3.65C5.5 2.87 5.6 2.09 6.1 1.61C6.5 1.21 7.1 1 7.6 1C9.3 1 10.6 2.16 11.3 3.23L12 4.02L11.3 4.81C10.6 5.88 9.3 7 7.6 7H4V6ZM2 8V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V8H2ZM20 20H4V10H20V20Z" fill="#1463FF" />
        </svg>
      );
    } else if (tx.method === 'Bank Transfer') {
      // Bank icon
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 10V18H7V10H4ZM10 10V18H13V10H10ZM2 22H22V20H2V22ZM16 10V18H19V10H16ZM12 2L2 7V9H22V7L12 2Z" fill="#1463FF" />
        </svg>
      );
    } else if (tx.method === 'Bitcoin') {
      // Bitcoin icon
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#1463FF" />
          <path d="M15.42 12.35c.37-.25.59-.65.59-1.2 0-1.07-.86-1.74-2.18-1.74H10.5V15.29H13.29c1.47 0 2.21-.76 2.21-1.89 0-.64-.32-1.05-.72-1.05zm-2.28-1.79h.56c.65 0 1.05.28 1.05.79s-.4.81-1.05.81h-.56V10.56zm.7 3.19h-.7v-1.35h.7c.73 0 1.12.33 1.12.87 0 .5-.38.83-1.12.83z" fill="white" />
        </svg>
      );
    } else {
      // Generic Dollar icon
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#1463FF" />
          <path d="M13.5 9.5H11.5V11H13.5C14.33 11 15 11.67 15 12.5C15 13.33 14.33 14 13.5 14H12.5V15.5H10.5V14H9V12H11V10.5H9V9H11V7.5H13V9H13.5C14.33 9 15 9.67 15 10.5C15 10.68 14.97 10.85 14.9 11H13.5V9.5Z" fill="white" />
        </svg>
      );
    }
  };

  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'confirming':
        return (
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '4px 8px', gap: '4px', width: '72px', height: '22px', background: '#3E2A09', borderRadius: '6px', boxSizing: 'border-box' }}>
            <span style={{ fontFamily: "var(--font-sans), sans-serif", fontWeight: 600, fontSize: '10px', lineHeight: '14px', letterSpacing: '0.02em', color: '#FFBF1F' }}>Confirming</span>
          </div>
        );
      case 'pending':
        return (
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '4px 8px', gap: '4px', width: '91px', height: '22px', background: '#3E2A09', borderRadius: '6px', boxSizing: 'border-box' }}>
            <span style={{ fontFamily: "var(--font-sans), sans-serif", fontWeight: 600, fontSize: '10px', lineHeight: '14px', letterSpacing: '0.02em', color: '#FFBF1F' }}>Pending review</span>
          </div>
        );
      case 'completed':
        return (
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '4px 8px', gap: '4px', width: '71px', height: '22px', background: '#073208', borderRadius: '4px', boxSizing: 'border-box' }}>
            <span style={{ fontFamily: "var(--font-sans), sans-serif", fontWeight: 600, fontSize: '10px', lineHeight: '14px', letterSpacing: '0.02em', color: '#00E806' }}>Completed</span>
          </div>
        );
      case 'active':
        return (
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '4px 8px', gap: '4px', width: '48px', height: '22px', background: '#1463FF', borderRadius: '4px', boxSizing: 'border-box' }}>
            <span style={{ fontFamily: "var(--font-sans), sans-serif", fontWeight: 600, fontSize: '10px', lineHeight: '14px', letterSpacing: '0.02em', color: '#FFFFFF' }}>Active</span>
          </div>
        );
      default:
        return null;
    }
  };

  const getAmountColor = (tx: Transaction) => {
    if (tx.type === 'withdraw') {
      return '#FFFFFF';
    }
    return '#00E806';
  };

  const formatAmount = (tx: Transaction) => {
    const sign = tx.amount > 0 ? '+' : '';
    return `${sign}$${Math.abs(tx.amount).toFixed(2)}`;
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0px',
        gap: '16px',
        width: isMobile ? '100%' : '428px',
        height: isMobile ? 'auto' : '474px',
        boxSizing: 'border-box',
      }}
    >
      {/* Header (428px x 39px) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '0px',
          gap: '4px',
          width: '100%',
          height: '39px',
          boxSizing: 'border-box',
        }}
      >
        <span
          style={{
            width: '92px',
            height: '19px',
            fontFamily: "var(--font-sans), sans-serif",
            fontWeight: 700,
            fontSize: '14px',
            lineHeight: '19px',
            letterSpacing: '0.02em',
            color: '#FFFFFF',
          }}
        >
          Transactions
        </span>
        <span
          style={{
            width: '336px',
            height: '16px',
            fontFamily: "var(--font-sans), sans-serif",
            fontWeight: 500,
            fontSize: '12px',
            lineHeight: '16px',
            letterSpacing: '0.02em',
            color: '#A5B8EF',
          }}
        >
          Recent wallet activity
        </span>
      </div>

      {/* Filter Tabs (428px x 30px) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '0px',
          gap: '8px',
          width: '100%',
          height: '30px',
          boxSizing: 'border-box',
        }}
      >
        {(['all', 'deposit', 'withdraw', 'bonus'] as const).map((tabId) => {
          const isActive = filter === tabId;
          const label = tabId.charAt(0).toUpperCase() + tabId.slice(1);
          return (
            <button
              key={tabId}
              onClick={() => setFilter(tabId)}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px 16px',
                gap: '8px',
                flex: 1,
                height: '30px',
                background: isActive ? '#1463FF' : '#112F82',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontWeight: 600,
                  fontSize: '12px',
                  lineHeight: '16px',
                  letterSpacing: '0.02em',
                  color: isActive ? '#FFFFFF' : '#A5B8EF',
                }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {/* List Container (428px x 373px) */}
      <div
        className="transactions-scroll-container"
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          padding: '0px',
          gap: '8px',
          width: '100%',
          height: isMobile ? 'auto' : '373px',
          maxHeight: isMobile ? '380px' : 'none',
          overflowY: 'auto',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '8px',
            width: isMobile ? '100%' : '412px',
            boxSizing: 'border-box',
          }}
        >
          {filteredTransactions.map((tx) => (
            <div
              key={tx.id}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '10px 16px 10px 10px',
                gap: '12px',
                width: '100%',
                height: '62px',
                background: '#112F82',
                borderRadius: '8px',
                boxSizing: 'border-box',
              }}
            >
              {/* Icon Frame */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '12px',
                  gap: '10px',
                  width: '40px',
                  height: '40px',
                  background: '#0C1F56',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                }}
              >
                {renderIcon(tx)}
              </div>

              {/* Title & Subtitle */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  padding: '0px',
                  gap: '4px',
                  flex: 1,
                  height: '37px',
                  boxSizing: 'border-box',
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans), sans-serif",
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: '19px',
                    letterSpacing: '0.02em',
                    color: '#FFFFFF',
                  }}
                >
                  {tx.title}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-sans), sans-serif",
                    fontWeight: 600,
                    fontSize: '10px',
                    lineHeight: '14px',
                    letterSpacing: '0.02em',
                    color: '#BBCAF3',
                  }}
                >
                  {tx.subtitle}
                </span>
              </div>

              {/* Amount & Status Badge */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  padding: '0px',
                  gap: '4px',
                  width: 'auto',
                  height: '42px',
                  boxSizing: 'border-box',
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans), sans-serif",
                    fontWeight: 700,
                    fontSize: '12px',
                    lineHeight: '16px',
                    textAlign: 'right',
                    letterSpacing: '0.02em',
                    color: getAmountColor(tx),
                  }}
                >
                  {formatAmount(tx)}
                </span>
                {getStatusBadge(tx.status)}
              </div>
            </div>
          ))}

          {filteredTransactions.length === 0 && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '200px',
                gap: '8px',
              }}
            >
              <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px', color: '#BBCAF3' }}>
                No records found
              </span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#7795E8' }}>
                There are no transactions for this filter.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
