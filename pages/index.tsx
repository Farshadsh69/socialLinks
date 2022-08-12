import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { Box, Container, PaletteMode } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { jssPreset, StylesProvider } from "@mui/styles";
import { create } from "jss";
import rtl from "jss-rtl";
import type { NextPage } from "next";
import React from "react";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import Main from "../src/sections/socialLinks/Main";
import getDesignTokens from "../src/theme/palette";
import * as locales from "@mui/material/locale";

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
});
//....
type SupportedLocales = keyof typeof locales;
//....
const Home: NextPage = () => {
  ///...........................
  const [mode, setMode] = React.useState<"light" | "dark">("dark");
  const theme = React.useMemo(
    () => createTheme(getDesignTokens(mode) as any),
    [mode]
  );

  //......

  const [locale, setLocale] = React.useState<SupportedLocales>("enUS");

  const themeWithLocale = React.useMemo(
    () => createTheme(theme, locales[locale]),
    [locale, theme]
  );

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <StylesProvider jss={jss}>
          <Box
            sx={{
              bgcolor: "background.main",
              height: "100vh",
            }}
          >
            <Container maxWidth="lg" dir="rtl">
              <Main mode={mode} setMode={setMode} />
            </Container>
          </Box>
        </StylesProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default Home;
