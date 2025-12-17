
export interface User {
  _id: string,
  name: string,
  email: string,
  avatar: string;
  role: SystemRoleType,
  createdAt: Date,
  updatedAt: Date
}

export interface AuthState {
  token: string | null,
  user: User | null,
  isAuthenticated: boolean,
  isAdmin: boolean,
  isLoading: boolean,
  error: string | null
}

export interface SignInCredentials {
  email: string,
  password: string
}

export interface SignupForm {
  name: string
  email: string
  password: string
  avatar: string
}

export interface LoginForm {
  email: string
  password: string
}

export interface AuthResponse {
  success: boolean;
  data:{
    token: string;
    user: User;
  }
}

export interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export const SystemRole = {
  ADMIN: "ADMIN",
  USER: "USER",
} as const;

export type SystemRoleType = typeof SystemRole[keyof typeof SystemRole];