import React, { FC } from "react";
import style from "./style.module.css";
import Image from "next/image";
import { formatMoney } from "@/utils";
import { useQuery } from "react-query";
import { axiosConfig } from "@/configs";
import { IProduct, IQrProduct } from "@/interfaces/index.type";
import axios from "axios";
import { productApi } from "@/services/product.api";
import { SkeletonProducts } from "@/components/skeleton/skeletonProducts";

export const HomeNewArrivals: FC = () => {
  const params: IQrProduct = {
    page: 1,
    limit: 15,
    sort: "-created_at",
    status: true,
  };
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["ARRIVALS"],
    queryFn: () => productApi.getProductArrivals(params),
    onSuccess: () => {},
    onError: () => {},
  });
  const arrivalsList = data?.context.data;

  return (
    <div className={style.arrivals}>
      <h2 className={style.arrivalsTitle}>New Arrivals</h2>
      {isFetching ? (
        <SkeletonProducts />
      ) : (
        <div className={style.proList}>
          {arrivalsList?.map((item: IProduct) => (
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
          ))}
        </div>
      )}
    </div>
  );
};
