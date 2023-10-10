import SimpleBottomNavigation from "./components/bottomNavigation";
import Routes from "./components/routes";
import { GlobalProvider } from "./contexts/global";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export const App = () => (
  <ThemeProvider theme={darkTheme}>
    <GlobalProvider>
      <Routes />
      <SimpleBottomNavigation />
    </GlobalProvider>
  </ThemeProvider>
);
