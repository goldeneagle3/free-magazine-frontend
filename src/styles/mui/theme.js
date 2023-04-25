import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6e10cc",
      light: "#af70ee",
      dark: "#350664",
      contrastText: "#0b065a",
    },
    secondary: {
      main: "#DA1B44",
      light: "#FBE8EC",
      dark: "#ED8DA2",
      contrastText: "#6D0E22",
    },
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      // most basic recommended timing
      standard: 300,
      // this is to be used in complex animations
      complex: 375,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195,
    },
  },
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    fontSize: 15,
    // so a smaller fontsize may be appropriate.
    h6: {
      fontSize: "1.8rem",
    },
  },
});

export { theme };
