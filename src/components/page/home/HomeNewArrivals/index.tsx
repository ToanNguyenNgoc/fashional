import { ProductItem } from "@/components";
import { SkeletonProducts } from "@/components/skeleton/skeletonProducts";
import { IProduct, IQrProduct } from "@/interfaces/index.type";
import { FC } from "react";
import { useQuery } from "react-query";
import style from "./style.module.css";
import { productApi } from "@/services";

export const HomeNewArrivals: FC = () => {
  const params: IQrProduct = {
    page: 1,
    limit: 15,
    sort: "-created_at",
    status: true,
  };
  const { data, isFetching } = useQuery({
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
            <ProductItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
