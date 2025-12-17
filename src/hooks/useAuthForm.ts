import type { SignupForm } from "@/types/shared/Auth"
import type { Dispatch, RefObject, SetStateAction } from "react"
import type { UseFormSetValue } from "react-hook-form"



export function useAuthForm() {
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>, setAvatarFile:  Dispatch<SetStateAction<File | null>>, setAvatarPreview: Dispatch<SetStateAction<string | null>>, setValue: UseFormSetValue<SignupForm> ) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
      setValue("avatar", url);
    }
  }

  const handleRemoveAvatar = (avatarInputRef: RefObject<HTMLInputElement | null>, setAvatarFile:  Dispatch<SetStateAction<File | null>>, setAvatarPreview: Dispatch<SetStateAction<string | null>>, setValue: UseFormSetValue<SignupForm>) => {
    setAvatarFile(null);
    setAvatarPreview(null);
    setValue("avatar", "")
    if (avatarInputRef.current) {
      avatarInputRef.current.value = "";
    }
  }
  return {
    handleAvatarChange,
    handleRemoveAvatar
  }
}