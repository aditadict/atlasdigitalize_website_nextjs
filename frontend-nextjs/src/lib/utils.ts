import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Helper function to construct image URLs from backend
 */
export function getImageUrl(
  imagePath: string | null | undefined
): string | null {
  if (!imagePath) return null;

  // Handle absolute URLs
  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  // For Filament uploads like "insights/filename.png"
  const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

  return `${backendUrl}/storage/${cleanPath}`;
}

/**
 * Format date for display
 */
export function formatDate(date: string | Date, locale: string = "en"): string {
  const d = new Date(date);
  return d.toLocaleDateString(locale === "id" ? "id-ID" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
