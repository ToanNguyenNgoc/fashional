import React from "react";
import style from "./style.module.css";
import Image from "next/image";
import { imgs } from "@/assets/imgs";
import { BiSolidUser, BiSearch, BiCart } from "react-icons/bi";
import Link from "next/link";
import Masonry from "@mui/lab/Masonry";
import { useQuery } from "react-query";

const heights = [
  132131250, 312312312310, 1231321290, 7123120, 1123123123110, 150, 1331230,
  8123120, 513120, 931230, 131200, 150, 30, 50, 80,
];

// const { query, isLoading } = useQuery({

// });

export default function Header() {
  return (
    <div className={style.header}>
      <div className={style.headerWrap}>
        <div className={style.logoWrap}>
          <Link href="/" className={style.logo}>
            <Image
              src={imgs.logoBlack}
              width={40}
              height={40}
              alt="Picture of the author"
            />
          </Link>
        </div>
        <nav>
          <ul className={style.menuMB}></ul>
          <ul className={style.menus}>
            <li className={style.menu}>
              <Link href="#">Shop</Link>
              <div className={style.subMenus}>
                <ul className={style.subMenusWrap}>
                  <Masonry columns={5} spacing={2}>
                    {heights.map((height, index) => (
                      <li className={style.subMenu} key={index}>
                        {height}
                      </li>
                    ))}
                  </Masonry>
                </ul>
              </div>
            </li>
            <li className={style.menu}>
              {" "}
              <Link href="#">Collaps</Link>
              <div className={style.subMenus}>
                <ul className={style.subMenusWrap}>
                  <li className={style.subMenu}>cate 1</li>
                  <li className={style.subMenu}>cate 2</li>
                </ul>
              </div>
            </li>
            <li className={style.menu}>News</li>
            <li className={style.menu}>Contact</li>
            <li className={style.menu}>About</li>
          </ul>
        </nav>

        <div className={style.right}>
          <div className={style.search}>
            <div className={style.searchIcon}>
              <BiSearch size={24} />
            </div>
            <input type="text" placeholder="Tìm kiếm" />
          </div>
          <div className={style.user}>
            <BiCart size={24} />
          </div>
          <Link href="auth/login" className={style.cart}>
            <BiSolidUser size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
}
