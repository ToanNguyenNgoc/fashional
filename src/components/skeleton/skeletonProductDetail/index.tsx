import * as React from "react";
import Skeleton from "react-loading-skeleton";
import style from "./style.module.css";

export function SkeletonProductDetail() {
  return (
    <div className={style.skeletonProDT}>
      <div className={style.left}>
        <Skeleton className={style.item} width="100%" height="100%" />
        <Skeleton className={style.item} width="100%" height="100%" />
        <Skeleton className={style.item} width="100%" height="100%" />
        <Skeleton className={style.item} width="100%" height="100%" />
      </div>
      <div className={style.right}>
        <h1 className={style.name}>
          <Skeleton width="100%" height="32px" />
          <Skeleton width="50%" height="32px" />
        </h1>
        <Skeleton className={style.tag} width="30%" height="24px" />
        <Skeleton className={style.price} width="70%" height="32px" />
        <h2 className={style.title}>
          <Skeleton width="30%" height="16px" />
        </h2>
      </div>
    </div>
  );
}
