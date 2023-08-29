import { NextPageWithLayout } from "@/common";
import { Seo } from "@/components";
import { HomeBanner } from "@/components/page/home";
import { MainLayout } from "@/layouts";

const Home: NextPageWithLayout = (props) => {
  return (
    <>
      <Seo
        title="Lil shop online fashional"
        description="Trang chủ Lil Shop"
        url=""
      />
      <main>
        <HomeBanner />
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis harum
          voluptatum ab est, dignissimos odio laborum minima tempora
          voluptatibus incidunt sint non sed molestiae ipsum tempore, totam
          voluptate aspernatur praesentium?*300
        </div>
      </main>
    </>
  );
};
export default Home;
Home.Layout = MainLayout;
