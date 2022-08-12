import { PaletteMode } from "@mui/material";
import { zhCN } from "@mui/material/locale";

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: "#101920",
            light: "#101920",
            dark: "#8b989ede",
            contrastText: "",
          },
          background: {
            main: "#ffffff",
            light: "#f4f6f8",
          },
          secondary: {
            main: "#e39d34",
            light: "#4c545f",
            dark: "",
            contrastText: "#191b1d",
          },
          disabled: {
            main: "#4c545f",
          },
          error: {
            main: "#d5443b",
          },
          warning: {
            main: "#71787f",
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: "#ffffff",
            light: "#101920",
            dark: "#8b989ede",
            contrastText: "",
          },
          background: {
            main: "#161b25",
            dark: "#212b35",
            light: "#3e4651",
          },
          secondary: {
            main: "#e39d34",
            light: "#4c545f",
            dark: "",
            contrastText: "#191b1d",
          },
          disabled: {
            main: "#4c545f",
          },
          error: {
            main: "#d5443b",
          },
          warning: {
            main: "#71787f",
          },
        }),
  },
  zhCN,
});
export default getDesignTokens;

// const palette = {
//   primary: {
//     main: "#ffffff",
//     light: "#101920",
//     dark: "#8b989ede",
//     contrastText: "",
//   },
//   secondary: {
//     main: "#e39d34",
//     light: "#4c545f",
//     dark: "",
//     contrastText: "#191b1d",
//   },
//   disabled: {
//     main: "#4c545f",
//   },
//   error: {
//     main: "#d5443b",
//   },
//   warning: {
//     main: "#71787f",
//   },
//   background: {
//     main: "#161b25",
//   },
// };
// export default palette;
