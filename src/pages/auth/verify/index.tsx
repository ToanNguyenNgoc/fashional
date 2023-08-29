import { NextPageWithLayout } from "@/common";
import { SignLayout } from "@/layouts";
import style from "../style.module.css";
import React from "react";
import Image from "next/image";
import { imgs } from "@/assets/imgs";
import Link from "next/link";
import { useRouter } from "next/router";
const VerifyPage: NextPageWithLayout = () => {
  const router = useRouter();
  const queryParams = router.query;
  return (
    <>
      <div className={style.verify}>
        {queryParams.code !== undefined ? (
          <>
            <div className={style.verifyImg}>
              <Image width={200} alt="verify" src={imgs.accessDenied} />
            </div>
            <div className={style.verifyTitle}>
              <p>Xác minh thất bại, vui lòng thử lại</p>
            </div>
            <div className={style.verifyDesc}>
              <p>
                <Link href="/"> Quay về trang chủ</Link>
              </p>
            </div>
          </>
        ) : (
          <>
            <div className={style.verifyImg}>
              <Image width={200} alt="verify" src={imgs.secureLogin} />
            </div>
            <div className={style.verifyTitle}>
              <p>Xác minh thành công</p>
            </div>
            <div className={style.verifyDesc}>
              <p>
                Vui lòng đăng nhập để tiếp tục{" "}
                <Link href="/auth/login">Đăng nhập ngay</Link>
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};
VerifyPage.Layout = SignLayout;
export default VerifyPage;
