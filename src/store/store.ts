import authReducer from '@/store/auth/AuthSlice';
import categoryReducer from '@/store/category/CategorySlice';
import dashboardReducer from '@/store/dashboard/DashboardSlice';
import recipeReducer from '@/store/recipe/RecipeSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    dashboard: dashboardReducer,
    recipe: recipeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;