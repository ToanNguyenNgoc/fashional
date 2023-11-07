import React, { FC } from "react";
import style from "./style.module.css";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
interface IProps{
  id: number;
  title?: string;
  img?: string;
}
export const HomeCategoryImg = (props: IProps) => {
  const { fakeData } = props;
  const IS_MB = useMediaQuery("(max-width:1023px)");
  return (
    <div className={style.HomeCategoryImg}>
      <h2 className={style.homeCateTitle}>Shop By Style</h2>
      <div
        style={
          fakeData.length === 3 || (fakeData.length === 1 && IS_MB)
            ? { overflow: "unset" }
            : {}
        }
        className={`${style.homeCateList} ${
          fakeData.length === 2 ? style.homeCateListTrans : ""
        }`}
      >
        {fakeData.slice(0, 4).map((item:any, index:number) => (
          <div className={style.homeCateItem} key={index}>
            <Image
              fill={true}
              src={item?.img}
              alt=""
              className={style.homeCateItemImg}
            />
            <div className={style.homeCateItemTitle}>
              <span>Lorem, ipsum dolor.</span>
            </div>
            <div className={style.overlay_img}></div>
          </div>
        ))}
      </div>
    </div>
  );
};
