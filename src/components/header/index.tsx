import { imgs } from "@/assets/imgs";
import { IProfileState } from "@/store/zustand/type";
import { useProfileStore } from "@/store/zustand/useProfileStore";
import Masonry from "@mui/lab/Masonry";
import { Avatar } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { BiCart, BiSearch } from "react-icons/bi";
import style from "./style.module.css";
import { useQuery } from "react-query";
import { tagApi } from "@/services/tag.api";
import { ITag } from "@/interfaces/tags.type";
import { ICategories } from "@/interfaces/categories.type";

export default function Header() {
  const [profile, logoutProfile] = useProfileStore((state: IProfileState) => [
    state.profile,
    state.logoutProfile,
  ]);

  const params = {
    includes: "categories",
    status: true,
    page: 1,
    limit: 15,
  };

  const { data: tags, isLoading } = useQuery({
    queryKey: ["TAGS"],
    queryFn: () => tagApi.getTags(params),
    onSuccess: () => {},
    onError: () => {},
  });
  const tagsShop = tags?.context?.data.filter((item: ITag) => {
    return item.type === "SHOP";
  });
  const tagsCollab = tags?.context?.data.filter((item: ITag) => {
    return item.type === "COLLAB";
  });
  return (
    <>
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
                    {tagsShop && (
                      <Masonry columns={4} spacing={3}>
                        {tagsShop?.map((item: ITag) => (
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
              <li className={style.menu}>
                <Link href="#">Collaps</Link>
                <div className={style.subMenus}>
                  <ul className={style.subMenusWrap}>
                    {tagsCollab && (
                      <Masonry columns={4} spacing={2}>
                        {tagsCollab?.map((item: ITag) => (
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
            <div className={style.cart}>
              <BiCart size={24} />
            </div>
            {!profile ? (
              <Link href="auth/login">Đăng nhập</Link>
            ) : (
              <div className={style.userWrap}>
                <Link href="profile" className={style.user}>
                  Hi, {profile?.fullname}
                  <Avatar
                    alt={profile?.fullname}
                    sx={{ width: 24, height: 24 }}
                    src=""
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
          </div>
        </div>
      </div>
    </>
  );
}
