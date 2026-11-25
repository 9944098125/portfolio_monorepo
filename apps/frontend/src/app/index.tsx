/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from "react";
import { Helmet } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "./components/ui/theme-provider";
import { Layout } from "./components/Layout/Loadable";
import { Home } from "./pages/Home/Loadable";
import { Toaster } from "./components/ui/toaster";
import { Login } from "./pages/Login/Loadable";
import { User } from "./pages/User/Loadable";
import EmojiMemoryGame from "./pages/Emojis/emojiMemoryGame";
import { Portfolio } from "./pages/Portfolio/Loadable";
import { Settings } from "./pages/Settings/Loadable";

export function App() {
  const { i18n } = useTranslation();

  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="asp-portfolios-theme">
        <Helmet
          titleTemplate="%s - ASP Portfolios"
          defaultTitle="ASP Portfolios"
          htmlAttributes={{ lang: i18n.language }}
        >
          <meta name="description" content="VLE Mobile" />
        </Helmet>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/:userId" element={<User />} />
            <Route
              path="/:userId/emoji-memory-game"
              element={<EmojiMemoryGame />}
            />
            <Route path="/:userId/settings" element={<Settings />} />
          </Route>
          <Route path="/:userId/portfolio" element={<Portfolio />} />
        </Routes>
        <Toaster />
      </ThemeProvider>
    </BrowserRouter>
  );
}
