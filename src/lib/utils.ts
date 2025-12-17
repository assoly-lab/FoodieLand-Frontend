import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { type FilterOptions } from "@/types/shared/Api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const sanitizeQueryParams = (filters: FilterOptions) => {
  return Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== '' && value !== null && value !== undefined),
  );
};
