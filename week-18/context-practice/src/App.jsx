import { Greeting } from "./components/Greeting";
import { LanguageSwitch } from "./components/LanguageSwitch";
import { Users } from "./components/Users";
import { UserProvider } from "./contexts/UserContext";
import { TranslationProvider } from "./contexts/TranslationContext";

import "./App.css";

export const App = () => {
  return (
    <UserProvider>
      <TranslationProvider>
        <main>
          <Users />
          <Greeting />
          <LanguageSwitch />
        </main>
      </TranslationProvider>
    </UserProvider>
  );
};
