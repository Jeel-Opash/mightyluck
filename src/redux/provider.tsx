'use client';

import { ReactNode, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store, useAppDispatch } from './store';
import { loginSuccess, logout } from './features/authSlice';

interface ReduxProviderProps {
  children: ReactNode;
}

function SessionInitializer({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // 1. Instantly restore session from localStorage to prevent flicker on refresh
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      const storedAuth = localStorage.getItem('isAuthenticated');
      if (storedUser && storedAuth === 'true') {
        try {
          dispatch(loginSuccess(JSON.parse(storedUser)));
        } catch {
          // ignore
        }
      }
    }

    // 2. Validate/sync with server session in the background
    async function checkSession() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated && data.user) {
            dispatch(loginSuccess(data.user));
          } else {
            dispatch(logout());
          }
        } else {
          dispatch(logout());
        }
      } catch (err) {
        console.error('Failed to initialize session:', err);
      }
    }
    checkSession();
  }, [dispatch]);

  return <>{children}</>;
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  return (
    <Provider store={store}>
      <SessionInitializer>{children}</SessionInitializer>
    </Provider>
  );
}
