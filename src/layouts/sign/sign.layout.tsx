import { LayoutProps } from "@/common";
import { Footer, Seo } from "@/components";
import { Container, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import Link from "next/link";
import Image from "next/image";
import { imgs } from "@/assets/imgs";

interface ISignLayoutProps extends LayoutProps {
  isForgot?: boolean;
}

export const SignLayout = ({ children }: ISignLayoutProps) => {
  const router = useRouter();
  const IS_MB = useMediaQuery("(max-width:767px)");
  const patchName = router.pathname;
  const [title, setTitle] = useState<string>("");
  useEffect(() => {
    switch (patchName) {
      case "/auth/login":
        setTitle("Đăng nhập");
        break;
      case "/auth/register":
        setTitle("Đăng ký");
        break;
      case "/auth/verify":
        setTitle("Xác minh email");
        break;
      case "/auth/forgot":
        setTitle("Lấy lại mật khẩu");
        break;
      default:
        break;
    }
  }, [patchName]);

  return (
    <>
      <Seo title={title} description={title} url={router.pathname} />

      {/* header */}
      <div className={style.signHeader}>
        <div className={style.signHeaderWrap}>
          <div className={style.signLogoWrap}>
            <Link href="/" className={style.logo}>
              <Image
                src={imgs.logoBlack}
                width={IS_MB ? 30 : 40}
                height={IS_MB ? 30 : 40}
                alt="Logo"
              />
            </Link>
          </div>
          <div className={style.signTitle}>{title}</div>
        </div>
      </div>
      {/* close header */}

      <Container>{children}</Container>

      <Footer />
    </>
  );
};
