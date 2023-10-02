import React from "react";
import style from "./style.module.css";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import Image from "next/image";
import { imgs } from "@/assets/imgs";

export default function Footer() {
  return (
    <>
      <div className={style.footer}>
        <div className={style.footer_wrap}>
          <div className={style.footer_left}>
            <div className={style.footer_logos}>
              <Link href="/" className={style.footer_logo}>
                <Image src={imgs.logoWhite} width={24} height={24} alt="Logo" />
              </Link>
              <p>Lil Shop</p>
            </div>
            <p className={style.footer_left_title}>Liên hệ với chúng tôi</p>
            <div className={style.footer_left_socials}>
              <FcGoogle size={24} />
              <FcGoogle size={24} />
              <FcGoogle size={24} />
              <FcGoogle size={24} />
            </div>
          </div>
          <div className={style.footer_right}>
            <div className={style.footer_right_lists}>
              <ul className={style.footer_right_list}>
                <li className={style.footer_right_item}>Product</li>
                <li className={style.footer_right_item}>Overview</li>
                <li className={style.footer_right_item}>Pricing</li>
                <li className={style.footer_right_item}>Custom stories</li>
              </ul>
            </div>
            <div className={style.footer_right_lists}>
              <ul className={style.footer_right_list}>
                <li className={style.footer_right_item}>Templates</li>
                <li className={style.footer_right_item}>Landing</li>
                <li className={style.footer_right_item}>Dashboard</li>
                <li className={style.footer_right_item}>Security</li>
              </ul>
            </div>
            <div className={style.footer_right_lists}>
              <ul className={style.footer_right_list}>
                <li className={style.footer_right_item}>Resources</li>
                <li className={style.footer_right_item}>Blog</li>
                <li className={style.footer_right_item}>Help center</li>
                <li className={style.footer_right_item}>What news</li>
              </ul>
            </div>
            <div className={style.footer_right_lists}>
              <ul className={style.footer_right_list}>
                <li className={style.footer_right_item}>Company</li>
                <li className={style.footer_right_item}>About us</li>
                <li className={style.footer_right_item}>Contact support</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={style.footer_hr}></div>
        <div className={style.footer_bottom}>
          <p>Copyright © 2023 | FutureDev. All right reserved.</p>
        </div>
      </div>
    </>
  );
}
