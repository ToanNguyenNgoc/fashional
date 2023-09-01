import { imgs } from "@/assets/imgs";
import { IProfileState } from "@/store/zustand/type";
import { useProfileStore } from "@/store/zustand/useProfileStore";
import Masonry from "@mui/lab/Masonry";
import { Avatar, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { BiCart, BiSearch, BiUser, BiHeart } from "react-icons/bi";
import style from "./style.module.css";
import { useQuery } from "react-query";
import { tagApi } from "@/services/tag.api";

import { useState } from "react";
import Search from "@/components/search";
import MenuMB from "@/components/menuMb";
import { ICategories, IQrtag, ITag } from "@/interfaces/index.type";

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
      {/* header */}
      <div className={style.header}>
        <div className={style.headerWrap}>
          {/* left */}
          <div className={style.headerLeft}>
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
                                  <li
                                    className={style.subMemuItem}
                                    key={item.id}
                                  >
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
                                  <li
                                    className={style.subMemuItem}
                                    key={item.id}
                                  >
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
          </div>
          {/* close left */}

          {/* right */}
          <div className={style.headerRight}>
            <div onClick={() => setOpenSearch(true)} className={style.search}>
              <div className={style.searchIcon}>
                <BiSearch size={24} />
              </div>
              <input readOnly type="text" placeholder="Tìm kiếm" />
            </div>
            <div className={style.iconCustom}>
              <BiHeart size={24} />
            </div>
            <div className={style.iconCustom}>
              <BiCart size={24} />
            </div>
            {IS_MB ? (
              <MenuMB />
            ) : (
              <>
                {!profile ? (
                  <Link href="auth/login">
                    <div className={style.iconCustom}>
                      <BiUser size={24} />
                    </div>
                  </Link>
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
