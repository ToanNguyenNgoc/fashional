import { QueryClient } from "react-query";
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // cacheTime: 3600 * 10,
    },
  },
});
export const STALE_TIME = 3600 * 10 * 5;
