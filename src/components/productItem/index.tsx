import { IProduct } from "@/interfaces/index.type";
import React from "react";
import style from "./style.module.css";
import Image from "next/image";
import { formatMoney } from "@/utils";
interface IProps {
  item: IProduct;
}
export const ProductItem = (props: IProps) => {
  const { item } = props;
  return (
    <div key={item.id} className={style.proItem}>
      <div className={style.proItemTags}>
        <p className={style.proItemTag}>{item.tag.name}</p>
        <p className={style.proItemTag}>{item.category.name}</p>
      </div>
      <div className={style.proItemImg}>
        <Image
          height={390}
          width={150}
          alt={item.name_slugify}
          src={item.thumbnail_url}
        />
      </div>
      <div className={style.proItemContent}>
        <div className={style.proItemName}>{item.name}</div>
        <div className={style.proItemPrice}>
          {item.price_special < item.price ? (
            <div className={style.proItemWrapPrice}>
              <p className={style.proItemPriceActive}>
                {formatMoney(item.price_special)}
              </p>
              <p>{formatMoney(item.price)}</p>
            </div>
          ) : (
            <p className={style.proItemPriceActive}>
              {formatMoney(item.price)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
