"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { translations, type Language } from "@/lib/data";

interface LanguageContextType {
  language: Language;
  t: (key: string) => string;
  basePath: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
  lang: Language;
}

export const LanguageProvider = ({ children, lang }: LanguageProviderProps) => {
  const t = (key: string): string => {
    const keys = key.split(".");
    let value: unknown = translations[lang];
    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k];
    }
    return (value as string) || key;
  };

  const basePath = `/${lang}`;

  return (
    <LanguageContext.Provider value={{ language: lang, t, basePath }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
