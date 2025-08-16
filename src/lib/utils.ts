/**
 * Utility function to safely combine Tailwind CSS class names.
 * - Uses `clsx` for conditional class handling.
 * - Uses `tailwind-merge` to resolve conflicting Tailwind classes.
 * 
 * Example:
 * cn("p-2", isActive && "bg-blue-500", "p-4")
 * -> "bg-blue-500 p-4"
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}