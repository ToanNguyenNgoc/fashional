import React from "react";
import style from "./style.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function SkeletonProducts() {
  return (
    <div className={style.skeletons}>
      {Array(8)
        .fill(1)
        .map((_, index) => (
          <div key={index} className={style.skeleton}>
            <div className={style.skeletonImg}>
              <Skeleton width="100%" height="100%" />
            </div>

            <div className={style.skeletonContent}>
              <div className={style.skeletonName}>
                <Skeleton width="100%" height="100%" />
              </div>
              <div className={style.skeletonPrice}>
                <Skeleton width="30%" height="100%" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
