import "@/styles/globals.css";
import { AppPropsWithLayout } from "@/common";
import { queryClient } from "@/configs";
import { EmptyLayout } from "@/layouts";
import { QueryClientProvider } from "react-query";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </>
  );
}
