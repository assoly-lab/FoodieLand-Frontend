import { createContext } from 'react';
import type { AuthContextProps } from '@/types/shared/Auth';

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);
