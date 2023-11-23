import React, { FC } from "react";
import style from "./style.module.css";
import { Button, Container, useMediaQuery } from "@mui/material";
import Image from "next/image";
export const HomeBanner: FC = () => {
  const IS_MB = useMediaQuery("(max-width:767px)");
  const videoPC =
    "https://cdn.sanity.io/files/qa41whrn/staging/e6635050c203121d99e30992b34e935397bdb266.mp4";
  const videoMB =
    "https://cdn.sanity.io/files/qa41whrn/staging/95e1b29be20ab4a06ecc4ff2f2161b773f7e2af4.mp4";
  const imgMB =
    "https://cdn.sanity.io/images/qa41whrn/staging/b1f7fba06b787b90126b20830ee0d67aa897da70-1536x1536.png?w=720&q=80&auto=format";
  const imgPC =
    "https://cdn.sanity.io/images/qa41whrn/staging/0f05c5685c5f70bab563287fb7b183261d3fc07d-1440x350.png?w=2160&q=80&auto=format";
  const videoSource = IS_MB ? videoMB : videoPC;
  return (
    <div className={style.homeBanner}>
      {/* <video
          autoPlay
          controlsList="nodownload nofullscreen"
          disablePictureInPicture
          disableRemotePlayback
          playsInline
          muted
          loop
        >
          <source src={videoSource} media="(max-width: 539px)" />
      </video> */}
      <Image
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        src={IS_MB ? imgMB : imgPC}
        alt="..."
      />
      <div className={style.banner_contents}>
        <div className={style.banner_content_text}>
          <h1>LOREM X LILSHOP</h1>
          <h2>Lorem ipsum dolor sit amet.</h2>
        </div>
        <div className={style.banner_content_btn}>
          <Button color="secondary" size="large" variant="contained">
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  );
};
