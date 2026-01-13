import { createContext, useContext, useState } from "react";

const translations = {
  en: {
    greeting: "Hello!",
    welcome: "Welcome!",
  },
  es: {
    greeting: "¡Hola!",
    welcome: "¡Bienvenido!",
  },
  fr: {
    greeting: "Bonjour!",
    welcome: "Bienvenue!",
  },
  de: {
    greeting: "Hallo!",
    welcome: "Willkommen!",
  },
  se: {
    greeting: "Hej!",
    welcome: "Välkommen!",
  },
};

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  return (
    <TranslationContext.Provider
      value={{ language, setLanguage, translations }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslationContext = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error(
      "useTranslationContext must be used within a TranslationProvider"
    );
  }
  return context;
};
