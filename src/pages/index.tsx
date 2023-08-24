import { NextPageWithLayout } from "@/common";
import { Seo } from "@/components";
import { MainLayout } from "@/layouts";
import { IProfileState } from "@/store/zustand/type";
import { useProfileStore } from "@/store/zustand/useProfileStore";

const Home: NextPageWithLayout = (props) => {
  return (
    <>
      <Seo />
      <main>Home page</main>
    </>
  );
};
export default Home;
Home.Layout = MainLayout;
