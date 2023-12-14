import { AppPropsWithLayout } from "@/common";
import { queryClient } from "@/configs";
import { AppProvider } from "@/context";
import { EmptyLayout } from "@/layouts";
import "@/styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const theme = createTheme({
  typography: {
    fontFamily: [
      "Helvetica",
      "Courier",
      "monospace",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  palette: {
    primary: {
      main: "#12131a",
    },
    secondary: {
      main: "#fff",
    },
  },
});
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;
  return (
    <>
      <AppProvider>
        <ToastContainer autoClose={1500} />
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </QueryClientProvider>
      </AppProvider>
    </>
  );
}
