import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { DashboardState } from '@/types/shared/dashboard';

const initialState: DashboardState = {
  isSidebarOpen: false,
  activeSection: "categories"
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setIsSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
    setActiveSection: (state, action: PayloadAction<"categories" | "recipes">) => {
      state.activeSection = action.payload;
  }
  },
});

export const { setIsSidebarOpen, setActiveSection } = dashboardSlice.actions;

export default dashboardSlice.reducer;
