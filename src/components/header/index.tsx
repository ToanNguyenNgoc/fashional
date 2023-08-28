import { imgs } from "@/assets/imgs";
import Head from "next/head";
import { IProfileState } from "@/store/zustand/type";
import { useProfileStore } from "@/store/zustand/useProfileStore";
import Masonry from "@mui/lab/Masonry";
import { Avatar, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { BiCart, BiSearch } from "react-icons/bi";
import style from "./style.module.css";
import { useQuery } from "react-query";
import { tagApi } from "@/services/tag.api";
import { IQrtag, ITag } from "@/interfaces/tags.type";
import { ICategories } from "@/interfaces/categories.type";
import { useState } from "react";
import Search from "@/components/search";
import MenuMB from "@/components/menuMb";

export default function Header() {
  const IS_MB = useMediaQuery("(max-width:767px)");
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const handleMouseEnter = () => {
    setIsOverlayActive(true);
  };
  const handleMouseLeave = () => {
    setIsOverlayActive(false);
  };

  const [profile, logoutProfile] = useProfileStore((state: IProfileState) => [
    state.profile,
    state.logoutProfile,
  ]);

  const params: IQrtag = {
    includes: "categories",
    status: true,
    page: 1,
    limit: 15,
  };

  const { data: tagsShop } = useQuery({
    queryKey: ["TAGS_SHOP"],
    queryFn: () => tagApi.getTags({ ...params, type: "SHOP" }),
    onSuccess: () => {},
    onError: () => {},
  });

  const { data: tagsCollab } = useQuery({
    queryKey: ["TAGS_COLLAP"],
    queryFn: () => tagApi.getTags({ ...params, type: "COLLAB" }),
    onSuccess: () => {},
    onError: () => {},
  });

  return (
    <>
      <Head>
        <title>Lil Shop</title>
        <meta name="description" content="Lil Shop" />
        <meta name="keywords" content="Lil Shop" />
        <meta name="author" content="Lil Shop" />
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      {/* header */}
      <div className={style.header}>
        <div className={style.headerWrap}>
          {/* left */}
          <div className={style.logoWrap}>
            <Link href="/" className={style.logo}>
              <Image
                src={imgs.logoBlack}
                width={IS_MB ? 30 : 40}
                height={IS_MB ? 30 : 40}
                alt="Logo"
              />
            </Link>
          </div>
          {/* close left */}

          {/* menu */}
          <nav>
            <ul className={style.menuDesktop}>
              <li
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={style.menu}
              >
                <Link href="#">Shop</Link>
                <div className={style.subMenus}>
                  <ul className={style.subMenusWrap}>
                    {tagsShop && (
                      <Masonry columns={4} spacing={3}>
                        {tagsShop?.context?.data?.map((item: ITag) => (
                          <li key={item.id} className={style.subMenu}>
                            {item.name}
                            <ul className={style.subMemuList}>
                              {item?.categories?.map((item: ICategories) => (
                                <li className={style.subMemuItem} key={item.id}>
                                  {item?.name}
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </Masonry>
                    )}
                  </ul>
                </div>
              </li>
              <li
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={style.menu}
              >
                <Link href="#">Collabs</Link>
                <div className={style.subMenus}>
                  <ul className={style.subMenusWrap}>
                    {tagsCollab && (
                      <Masonry columns={4} spacing={2}>
                        {tagsCollab?.context?.data?.map((item: ITag) => (
                          <li key={item.id} className={style.subMenu}>
                            {item.name}
                            <ul className={style.subMemuList}>
                              {item?.categories?.map((item: ICategories) => (
                                <li className={style.subMemuItem} key={item.id}>
                                  {item?.name}
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </Masonry>
                    )}
                  </ul>
                </div>
              </li>
              <li
                // onMouseEnter={handleMouseEnter}
                // onMouseLeave={handleMouseLeave}
                className={style.menu}
              >
                News
              </li>
              <li className={style.menu}>Contact</li>
              <li className={style.menu}>About</li>
            </ul>
          </nav>
          {/* close menu */}

          {/* right */}
          <div className={style.right}>
            <div onClick={() => setOpenSearch(true)} className={style.search}>
              <div className={style.searchIcon}>
                <BiSearch size={24} />
              </div>
              <input readOnly type="text" placeholder="Tìm kiếm" />
            </div>
            <div className={style.cart}>
              <BiCart size={24} />
            </div>
            {IS_MB ? (
              <MenuMB />
            ) : (
              <>
                {!profile ? (
                  <Link href="auth/login">Đăng nhập</Link>
                ) : (
                  <div className={style.userWrap}>
                    <Link href="profile" className={style.user}>
                      Hi, {profile?.fullname}
                      <Avatar
                        alt={profile?.fullname}
                        sx={{ width: 24, height: 24 }}
                        src={profile?.avatar}
                      ></Avatar>
                    </Link>
                    <div className={style.userDropWrap}>
                      <ul className={style.userDrop}>
                        <li className={style.userDropItem}>
                          <Link href="profile">Tài khoản</Link>
                        </li>

                        <li
                          onClick={() => logoutProfile()}
                          className={style.userDropItem}
                        >
                          Đăng xuất
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          {/* close right */}
        </div>
      </div>
      {/* close header */}

      {/* search */}
      <Search open={openSearch} setOpen={setOpenSearch} />
      {/* close search */}

      {/* overlay */}
      <div
        className={`${style.overlay} ${isOverlayActive ? style.isOpen : ""}`}
      ></div>
      {/* close overlay */}
    </>
  );
}
