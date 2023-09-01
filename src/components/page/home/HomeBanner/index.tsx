import React, { FC } from "react";
import style from "./style.module.css";
import Image from "next/image";
import { imgs } from "@/assets/imgs";

export const HomeBanner: FC = () => {
  return (
    <div className={style.homeBanner}>
      {/* <div className={style.HomeBannerImg}>
        <Image objectFit="cover" fill alt="banner" src={imgs.bannerHome} />
      </div> */}
    </div>
  );
};
