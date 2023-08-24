import { imgs } from "@/assets/imgs";
import { IProfileState } from "@/store/zustand/type";
import { useProfileStore } from "@/store/zustand/useProfileStore";
// import Masonry from "@mui/lab/Masonry";
import { Avatar } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { BiCart, BiSearch } from "react-icons/bi";
import style from "./style.module.css";
import { useMutation } from "react-query";
import { tagApi } from "@/services/tag.api";

const heights = [
  132131250, 312312312310, 1231321290, 7123120, 1123123123110, 150, 1331230,
  8123120, 513120, 931230, 131200, 150, 30, 50, 80,
];

export default function Header() {
  const [profile, logoutProfile] = useProfileStore((state: IProfileState) => [
    state.profile,
    state.logoutProfile,
  ]);

  const { mutate: tags, isLoading } = useMutation({
    mutationKey: ["TAGS"],
    mutationFn: () =>
      tagApi.getTags({ includes: "categories", status: "true" }),
    onSuccess: () => {},
    onError: () => {},
  });
  console.log(tags);
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
                    {/* <Masonry columns={5} spacing={2}>
                      {heights.map((height, index) => (
                        <li className={style.subMenu} key={index}>
                          {height}
                        </li>
                      ))}
                    </Masonry> */}
                    <li className={style.subMenu}>cate 1</li>
                    <li className={style.subMenu}>cate 2</li>
                    <li className={style.subMenu}>cate 3</li>
                    <li className={style.subMenu}>cate 4</li>
                  </ul>
                </div>
              </li>
              <li className={style.menu}>
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
