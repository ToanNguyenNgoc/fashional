import { NextPageWithLayout } from "@/common";
import { Seo } from "@/components";
import { HomeBanner, HomeNewArrivals } from "@/components/page/home";
import { MainLayout } from "@/layouts";
import style from "../styles/Home.module.css";
import { Container } from "@mui/material";

const Home: NextPageWithLayout = (props) => {
  return (
    <>
      <Seo
        title="LILSHOP Online Shop"
        description="Trang chủ Lil Shop"
        url=""
      />
      <main>
        <HomeBanner />
        <Container>
          <HomeNewArrivals />
        </Container>
      </main>
    </>
  );
};
export default Home;
Home.Layout = MainLayout;
