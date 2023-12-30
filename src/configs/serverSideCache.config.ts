import { GetServerSidePropsContext } from "next";

export const serverSideCache = (
  ctx: GetServerSidePropsContext,
  time: number = 1000000
) => {
  return ctx.res.setHeader(
    "Cache-Control",
    `s-maxage=${time}, stale-while-revalidate=${time}`
  );
};
