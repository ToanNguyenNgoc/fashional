import { NextPageWithLayout } from "@/common";
import { Seo } from "@/components";
import {
  HomeBanner,
  HomeNewArrivals,
  HomeCategoryImg,
} from "@/components/page/home";
import { MainLayout } from "@/layouts";
import { Container } from "@mui/material";

const Home: NextPageWithLayout = (props) => {
  const fakeData1 = [
    {
      id: 1,
      img: "https://cdn.sanity.io/images/qa41whrn/staging/3b2fb14fbec392c58367fee310e7e9654a192769-1536x1536.jpg",
    },
    {
      id: 2,
      img: "https://cdn.sanity.io/images/qa41whrn/staging/21911d9d6ed46058e1bc6513c1daa9bba78bc818-1536x1536.jpg",
    },
    {
      id: 3,
      img: "https://cdn.sanity.io/images/qa41whrn/staging/6e97461448e44217b30f6df37c59224c178759b3-1536x1536.jpg",
    },
    {
      id: 4,
      img: "https://cdn.sanity.io/images/qa41whrn/staging/fb5f6315d798c25397cecc0acfc7149365be5726-1536x1536.jpg",
    },
  ] as any;
  const fakeData2 = [
    {
      id: 1,
      img: "https://cdn.sanity.io/images/qa41whrn/staging/302bdcfc50ad3400ce09381065e9754722d32c8c-1536x1536.jpg",
    },
    {
      id: 2,
      img: "https://cdn.sanity.io/images/qa41whrn/staging/78f5a314417409769381ca41efab48442ec9439f-1536x1536.jpg",
    },
  ] as any;
  return (
    <>
      <Seo
        title="LILSHOP Online Shop"
        description="Trang chủ Lil Shop"
        url=""
      />
      <main>
        <HomeBanner />
        <Container maxWidth={false} sx={{ maxWidth: "1440px" }}>
          <HomeCategoryImg fakeData={fakeData2} />
          <HomeCategoryImg fakeData={fakeData1} />
          <HomeNewArrivals />
        </Container>
      </main>
    </>
  );
};
export default Home;
Home.Layout = MainLayout;
