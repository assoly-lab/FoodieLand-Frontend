import { register, signIn, signOut } from "@/store/auth/AuthThunk";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import type { LoginForm, SignupForm } from "@/types/shared/Auth";
import { useNavigate } from "react-router";

export function useAuth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, token, isAuthenticated, isLoading, isAdmin, error } =
    useAppSelector((state) => state.auth);
  
  async function handleSignIn (loginData: LoginForm) {
    try {
      const resultAction = await dispatch(signIn(loginData));
      if (signIn.fulfilled.match(resultAction)) {
        return { success: true };
      }
      return { success: false };
    } catch {
      return { success: false };
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(signOut()).unwrap();
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  
  const handleRegister = async (data: SignupForm, avatarFile: File | null) => {
      const formData = new FormData()
      formData.append("name", data.name)
      formData.append("email", data.email)
      formData.append("password", data.password)
      if (avatarFile) {
        formData.append("avatar", avatarFile)
      }
      await dispatch(register(formData)).unwrap().then(()=> {
        navigate("/login")
      })
  }

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    isAdmin,
    error,
    handleSignIn,
    handleLogout,
    handleRegister
  };
}
