import { Language } from "@/components/content/select-language";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import dictionary from "@/lib/dictionary.json";

interface LanguageStore {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: "en",
      setLanguage: (language) => set({ language }),
    }),
    { name: "language" }
  )
);

// Type-safe dictionary structure
type Dictionary = typeof dictionary;
type TranslationKeys = Dictionary[Language];

// Helper function to get nested value from object using dot notation
function getNestedValue<T>(obj: any, path: string): T {
  return path.split(".").reduce((prev, curr) => prev?.[curr], obj);
}

/**
 * Hook to get translations based on current language
 * @returns Object with language, setLanguage, and t (translate) function
 *
 * @example
 * const { t, language, setLanguage } = useLanguage();
 *
 * // Usage:
 * t('common.search') // Returns "Search" in English
 * t('hero.title') // Returns "Travel Smarter, Not Harder" in English
 */
export function useLanguage() {
  const { language, setLanguage } = useLanguageStore();

  /**
   * Translate function - gets translation by key path
   * @param key - Dot-notation path to translation (e.g., "common.search")
   * @param fallback - Optional fallback text if translation not found
   * @returns Translated string
   */
  const t = (key: string, fallback?: string): string => {
    const translations = dictionary[language] as TranslationKeys;
    const value = getNestedValue<string>(translations, key);

    if (!value && fallback) {
      return fallback;
    }

    if (!value) {
      console.warn(
        `Translation key "${key}" not found for language "${language}"`
      );
      return key;
    }

    return value;
  };

  return {
    language,
    setLanguage,
    t,
    // Also expose raw translations for advanced usage
    translations: dictionary[language] as TranslationKeys,
  };
}
