import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Web3Provider } from "../src/context/Web3Context";
import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import Head from "next/head";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: 1000 * 60 * 60 * 24,
    },
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#462396",
    },
    secondary: {
      main: "#fff",
    },

    action: {
      focus: "#462396",

      selected: "#28155545",
      selectedOpacity: 0.5,
      disabled: "#281357",

      // change color of checkbox when hover
      hover: "#2e1e5a45",

      // change color of checkbox when hover
      hoverOpacity: 0.2,

      // change color of checkbox when checked
      active: "#351b74",

      // change color of checkbox when disabled
      disabledBackground: "#462396",

      // change color of checkbox when disabled
      disabledOpacity: 0.5,

      // change color of checkbox when disabled
    },
  },
  typography: {
    fontFamily: "Poppins",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Web3Provider>
          <Component {...pageProps} />
        </Web3Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
