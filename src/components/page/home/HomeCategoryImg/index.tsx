import { useMediaQuery } from "@mui/material";
import Image from "next/image";
import style from "./style.module.css";
interface IProps {
  id?: number;
  title?: string;
  img?: string;
  fakeData: any;
}
export const HomeCategoryImg = (props: IProps) => {
  const { fakeData } = props;
  const IS_MB = useMediaQuery("(max-width:1023px)");
  return (
    <div className={style.HomeCategoryImg}>
      <h2 className={style.homeCateTitle}>Shop By Style</h2>
      <ul
        style={
          fakeData.length === 3 || (fakeData.length === 1 && IS_MB)
            ? { overflow: "unset" }
            : {}
        }
        className={`${style.homeCateList} ${
          fakeData.length === 2 ? style.homeCateListTrans : ""
        }`}
      >
        {fakeData.slice(0, 4).map((item: any, index: number) => (
          <li className={style.homeCateItem} key={index}>
            <Image
              fill={true}
              src={item?.img}
              alt={`category-${index}`}
              className={style.homeCateItemImg}
              sizes="100%"
              priority
            />
            <div className={style.homeCateItemTitle}>
              <span>Lorem, ipsum dolor.</span>
            </div>
            <div className={style.overlay_img}></div>
          </li>
        ))}
      </ul>
    </div>
  );
};
