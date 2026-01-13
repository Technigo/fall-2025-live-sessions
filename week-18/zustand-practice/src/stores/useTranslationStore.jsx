import { create } from "zustand"

const translations = {
  en: {
    greeting: "Hello!",
    welcome: "Welcome!"
  },
  es: {
    greeting: "¡Hola!",
    welcome: "¡Bienvenido!"
  },
  fr: {
    greeting: "Bonjour!",
    welcome: "Bienvenue!"
  },
  de: {
    greeting: "Hallo!",
    welcome: "Willkommen!"
  },
  se: {
    greeting: "Hej!",
    welcome: "Välkommen!"
  }
}

export const useTranslationStore = create(() => ({
  language: "en"
}))
