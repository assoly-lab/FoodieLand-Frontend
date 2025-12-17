import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { ProtectedRoutes } from './ProtectedRoutes';
import { PublicRoutes } from './PublicRoutes';

const HomePage = lazy(() => import('@/pages/HomePage'));
const RecipesListPage = lazy(() => import('@/pages/RecipesListPage'));
const CategoriesListPage = lazy(() => import('@/pages/CategoriesListPage'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const RecipeDetailsPage = lazy(() => import('@/pages/RecipeDetailsPage'));
const SignupPage = lazy(() => import('@/pages/SignupPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
        <Route path="/recipes" element={<RecipesListPage />} />
        <Route path="/categories" element={<CategoriesListPage />} />
        {/* Public Routes */}
        <Route element={<PublicRoutes />}>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
        {/* Catch all unmatched routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};
