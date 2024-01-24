import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const shortAddress = (address: string | null): string => {
  if (address === null) return "";
  return `${address.slice(0, 14)}.....${address.slice(-7)}`;
};
