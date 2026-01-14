import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/mock';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Check URL path for language
    const path = window.location.pathname;
    if (path.startsWith('/id')) return 'id';
    return 'en';
  });

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'id' : 'en';
    setLanguage(newLang);
    
    // Update URL
    const currentPath = window.location.pathname;
    let newPath;
    if (newLang === 'id') {
      if (currentPath === '/' || currentPath === '/en') {
        newPath = '/id';
      } else if (currentPath.startsWith('/en/')) {
        newPath = currentPath.replace('/en/', '/id/');
      } else if (!currentPath.startsWith('/id')) {
        newPath = '/id' + currentPath;
      } else {
        newPath = currentPath;
      }
    } else {
      if (currentPath === '/id') {
        newPath = '/en';
      } else if (currentPath.startsWith('/id/')) {
        newPath = currentPath.replace('/id/', '/en/');
      } else {
        newPath = currentPath;
      }
    }
    window.history.pushState({}, '', newPath);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
