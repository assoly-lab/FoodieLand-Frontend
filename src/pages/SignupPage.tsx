import Footer from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useAuthForm } from "@/hooks/useAuthForm";
import type { SignupForm } from "@/types/shared/Auth";
import { Camera, Eye, EyeOff, Lock, Mail, User, X } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>();
  const { handleAvatarChange, handleRemoveAvatar } = useAuthForm();
  const { handleRegister } = useAuth();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-4xl flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8">
              <div className="text-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  Create Account
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Join Foodieland and start cooking
                </p>
              </div>
              <form
                onSubmit={handleSubmit((data) =>
                  handleRegister(data, avatarFile),
                )}
                className="space-y-4 sm:space-y-5"
              >
                <div className="flex flex-col items-center mb-2">
                  <div className="relative">
                    <div
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden cursor-pointer hover:border-orange-400 transition-colors"
                      onClick={() => avatarInputRef.current?.click()}
                    >
                      {avatarPreview ? (
                        <img
                          src={avatarPreview || "/placeholder.svg"}
                          alt="Avatar preview"
                          className="w-24  h-24 object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center text-slate-400">
                          <Camera className="h-6 w-6 sm:h-8 sm:w-8" />
                          <span className="text-xs mt-1">Add Photo</span>
                        </div>
                      )}
                    </div>
                    {avatarPreview && (
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveAvatar(
                            avatarInputRef,
                            setAvatarFile,
                            setAvatarPreview,
                            setValue,
                          )
                        }
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleAvatarChange(
                        e,
                        setAvatarFile,
                        setAvatarPreview,
                        setValue,
                      )
                    }
                    className="hidden"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Profile photo (optional)
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm sm:text-base">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      className="pl-9 sm:pl-10 rounded-xl h-11 sm:h-12 text-sm sm:text-base"
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      })}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs sm:text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>
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
                      placeholder="Create a password"
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
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 sm:h-12 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm sm:text-base"
                >
                  {isSubmitting ? "Creating account..." : "Create Account"}
                </Button>
              </form>
              <p className="text-center mt-4 sm:mt-6 text-xs sm:text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-orange-600 hover:text-orange-700 font-medium"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
