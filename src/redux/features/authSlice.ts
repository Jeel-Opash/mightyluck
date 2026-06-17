import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  username: string;
  email: string;
  balance: number;
  level: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(action.payload));
        localStorage.setItem('isAuthenticated', 'true');
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
      }
    },
    updateBalance: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.balance += action.payload;
      }
    },
  },
});

export const { loginStart, loginSuccess, logout, updateBalance } = authSlice.actions;
export default authSlice.reducer;
