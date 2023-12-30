import { imgs } from "@/assets/imgs";
import { MenuMB, Search } from "@/components";
import { useLogout } from "@/hooks";
import {
  ICategories,
  IQrtag,
  IResponseList,
  ITag,
} from "@/interfaces/index.type";
import { tagApi } from "@/services/tag.api";
import { useProfileStore } from "@/store/zustand";
import { IProfileState } from "@/store/zustand/type";
import Masonry from "@mui/lab/Masonry";
import { Avatar, Container, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { BiCart, BiHeart, BiSearch, BiUser } from "react-icons/bi";
import { useQuery } from "react-query";
import style from "./style.module.css";
import { QR_TIME_CACHE } from "@/constants";

export function Header() {
  const onLogout = useLogout();
  const IS_MB = useMediaQuery("(max-width:1023px)");
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [profile] = useProfileStore((state: IProfileState) => [state.profile]);
  const params: IQrtag = {
    includes: "categories",
    status: true,
    page: 1,
    limit: 15,
  };

  const { data: tagsShop } = useQuery({
    queryKey: ["TAGS_SHOP"],
    queryFn: () => tagApi.getTags({ ...params, type: "SHOP" }),
    staleTime: QR_TIME_CACHE,
  });

  const { data: tagsCollab } = useQuery({
    queryKey: ["TAGS_COLLAP"],
    queryFn: () => tagApi.getTags({ ...params, type: "COLLAB" }),
    staleTime: QR_TIME_CACHE,
  });

  return (
    <>
      {/* header */}
      <div className={style.header}>
        <div className={style.headerWrap}>
          <Container
            maxWidth={"xl"}
            sx={{height: "100%"}}
          >
            <div className={style.header_box}>
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
                    <SubMenu
                      menuType={"Shop"}
                      tags={tagsShop}
                      setIsOverlayActive={setIsOverlayActive}
                    />
                    <SubMenu
                      menuType={"Collab"}
                      tags={tagsCollab}
                      setIsOverlayActive={setIsOverlayActive}
                    />
                    <SubMenu menuType={"News"} />
                    <SubMenu menuType={"Contact"} />
                    <SubMenu menuType={"About"} />
                  </ul>
                </nav>
                {/* close menu */}
              </div>
              {/* close left */}

              {/* right */}
              <div className={style.headerRight}>
                <div
                  onClick={() => setOpenSearch(true)}
                  className={style.search}
                >
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
                        <Link
                          href="profile/edit-profile"
                          className={style.user}
                        >
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
                              <Link href="profile/edit-profile">Tài khoản</Link>
                            </li>

                            <li
                              onClick={onLogout}
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
            </div>
          </Container>
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

interface ISubMenu {
  setIsOverlayActive?: Dispatch<SetStateAction<boolean>>;
  menuType: string;
  tags?: IResponseList<ITag[]>;
}

export function SubMenu(props: ISubMenu) {
  const { setIsOverlayActive, menuType, tags } = props;
  const refMenu = useRef<any>(null);

  const handleMouseEnter = () => {
    setIsOverlayActive && setIsOverlayActive(true);
    refMenu?.current?.classList.add(style.act_subMenus);
  };
  const handleMouseLeave = () => {
    setIsOverlayActive && setIsOverlayActive(false);
    refMenu?.current?.classList.remove(style.act_subMenus);
  };
  return (
    <>
      <li
        ref={refMenu}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={style.menu}
      >
        <Link
          href={tags ? `/danh-sach-san-pham?type=${menuType}` : `${menuType}`}
        >
          {menuType}
        </Link>
        {tags && (
          <div className={style.subMenus}>
            <Container maxWidth={"xl"}>
              <ul className={style.subMenusWrap}>
                <Masonry columns={4} spacing={3}>
                  {tags?.context?.data.map((tag: ITag) => (
                    <li key={tag.id} className={style.subMenu}>
                      <Link
                        href={`/danh-sach-san-pham?type=${menuType}&tag=${tag.name_slugify}`}
                      >
                        {tag.name}
                      </Link>
                      <ul className={style.subMemuList}>
                        {tag?.categories?.map((category: ICategories) => (
                          <li className={style.subMemuItem} key={category.id}>
                            <Link
                              href={`/danh-sach-san-pham?type=${menuType}&tag=${tag.name_slugify}&category=${category.name}`}
                            >
                              {category.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </Masonry>
              </ul>
            </Container>
          </div>
        )}
      </li>
    </>
  );
}
