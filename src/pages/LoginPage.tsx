import Footer from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import type { LoginForm } from "@/types/shared/Auth";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { handleSignIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-4xl flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8">
              <div className="text-center mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  Welcome Back
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Sign in to continue to Foodieland
                </p>
              </div>
              <form
                onSubmit={handleSubmit(handleSignIn)}
                className="space-y-4 sm:space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm sm:text-base">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-9 sm:pl-10 rounded-xl h-11 sm:h-12 text-sm sm:text-base"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs sm:text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm sm:text-base">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-9 sm:pl-10 pr-10 rounded-xl h-11 sm:h-12 text-sm sm:text-base"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                      ) : (
                        <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs sm:text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 h-4 w-4"
                    />
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      Remember me
                    </span>
                  </label>
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 sm:h-12 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm sm:text-base"
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </Button>
              </form>
              <p className="text-center mt-4 sm:mt-6 text-xs sm:text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-orange-600 hover:text-orange-700 font-medium"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
