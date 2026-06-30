import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  sidebarOpen: boolean;
  searchQuery: string;
  authModalOpen: boolean;
  authModalType: 'login' | 'join';
  depositModalOpen: boolean;
  allGamesOpen: boolean;
  selectedCategory: string;
}

const initialState: UIState = {
  sidebarOpen: false,
  searchQuery: '',
  authModalOpen: false,
  authModalType: 'login',
  depositModalOpen: false,
  allGamesOpen: false,
  selectedCategory: 'All Games',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    openAuthModal: (state, action: PayloadAction<'login' | 'join'>) => {
      state.authModalOpen = true;
      state.authModalType = action.payload;
    },
    closeAuthModal: (state) => {
      state.authModalOpen = false;
    },
    openDepositModal: (state) => {
      state.depositModalOpen = true;
    },
    closeDepositModal: (state) => {
      state.depositModalOpen = false;
    },
    openAllGamesModal: (state, action: PayloadAction<string | undefined>) => {
      state.allGamesOpen = true;
      state.selectedCategory = action.payload || 'All Games';
    },
    closeAllGamesModal: (state) => {
      state.allGamesOpen = false;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setSearchQuery,
  openAuthModal,
  closeAuthModal,
  openDepositModal,
  closeDepositModal,
  openAllGamesModal,
  closeAllGamesModal,
} = uiSlice.actions;
export default uiSlice.reducer;
