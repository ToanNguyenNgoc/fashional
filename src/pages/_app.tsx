import "@/styles/globals.css";
import { AppPropsWithLayout } from "@/common";
import { queryClient } from "@/configs";
import { EmptyLayout } from "@/layouts";
import { QueryClientProvider } from "react-query";
import { AppProvider } from "@/context";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
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
