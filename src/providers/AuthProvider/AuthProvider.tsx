import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { refreshToken } from '@/store/auth/AuthThunk';
import { AuthContext } from '@/providers/AuthProvider/AuthContext';


interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user, isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  
  useEffect(()=>{
    const initializeAuth = async ()=>{
      await dispatch(refreshToken()).unwrap()
    }
    initializeAuth()
  },[dispatch])
  

  const contextValue = {
    user,
    isAuthenticated,
    isLoading,
    error,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
