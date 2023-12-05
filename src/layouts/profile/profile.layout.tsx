import { LayoutProps } from "@/common";
import { AuthLayout } from "@/layouts";
import { IProfileState } from "@/store/zustand/type";
import { useProfileStore } from "@/store/zustand";
import { Avatar, Container, useMediaQuery } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { BiHistory, BiLogOut, BiSolidUser } from "react-icons/bi";
import { BsCameraFill } from "react-icons/bs";
import { IoMdHeart } from "react-icons/io";
import {
  MdLocationOn,
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import style from "./style.module.css";
import { useLogout } from "@/hooks/useLogout";

const tabItem = [
  {
    id: 1,
    title: "Thông tin tài khoản",
    href: "/profile/edit-profile",
    img: <BiSolidUser style={{ color: "var(--primary)" }} size={20} />,
  },
  {
    id: 2,
    title: "Địa chỉ giao hàng",
    href: "/profile/address",
    img: <MdLocationOn style={{ color: "var(--primary)" }} size={20} />,
  },
  {
    id: 3,
    title: "Danh sách yêu thích",
    href: "/profile/wish-list",
    img: <IoMdHeart style={{ color: "var(--primary)" }} size={20} />,
  },
  {
    id: 4,
    title: "Lịch sử mua hàng",
    href: "/profile/history",
    img: <BiHistory style={{ color: "var(--primary)" }} size={20} />,
  },
  // {
  //   id: 5,
  //   title: "Thông tin đơn hàng",
  //   href: "/profile/order",
  //   img: <RiInformationFill style={{ color: "var(--primary)" }} size={20} />,
  // },
];
export function ProfileLayout({ children }: LayoutProps) {
  const router = useRouter();
  const patchName = router.pathname.split("/").filter((item) => Boolean(item));
  const IS_MB = useMediaQuery("(max-width:767px)");
  const [profile] = useProfileStore((state: IProfileState) => [state.profile]);
  const refLeft = useRef<HTMLDivElement>(null);
  const refRight = useRef<HTMLDivElement>(null);
  const onLogout = useLogout();

  const handleStep2 = () => {
    refLeft?.current?.classList.add(style.profile_hidden_left);
    refRight?.current?.classList.add(style.profile_block);
  };
  const handleBackStep1 = () => {
    refRight?.current?.classList.remove(style.profile_block);
    refLeft?.current?.classList.remove(style.profile_hidden_left);
    router.push("/profile");
  };

  useEffect(() => {
    if (patchName && patchName.length > 1) {
      handleStep2();
    }
  }, [patchName]);

  return (
    <AuthLayout>
      <div className={style.profile_page}>
        <Container>
          <div className={style.profile}>
            <div ref={refLeft} className={style.profile_left}>
              {IS_MB && (
                <Link href={"/"} className={style.btnGoback}>
                  <MdOutlineArrowBackIosNew size={20} />
                  <p>Trang chủ</p>
                </Link>
              )}
              <div className={style.profile_wrap}>
                <div className={style.profile_left_head}>
                  <div className={style.profile_head_wrap}>
                    <form action="#">
                      <label style={{ pointerEvents: "fill" }} htmlFor="file">
                        <div className={style.form_ava_box}>
                          <input
                            autoComplete="off"
                            type="file"
                            id="file"
                            name="file"
                            hidden
                            accept="image/jpeg,image/png,img/jpg"
                          />
                          <div className={style.form_ava}>
                            <Avatar
                              sx={{
                                width: 128, height: 128
                              }}
                              alt={profile?.fullname}
                              src={profile?.avatar}
                            />
                            <div className={style.form_edit}>
                              <BsCameraFill
                                style={{ color: "#fff" }}
                                size={20}
                              />
                            </div>
                          </div>
                        </div>
                      </label>
                    </form>
                    <div className={style.form_name_box}>
                      <p>{profile?.fullname}</p>
                    </div>
                  </div>
                </div>
                <div className={style.profile_left_tablist}>
                  {tabItem.map((item, index: number) => (
                    <Link onClick={handleStep2} key={index} href={item.href}>
                      <div
                        className={`${style.profile_left_tabItem} ${
                          router.pathname === item.href && style.active_tab
                        }`}
                      >
                        <div className={style.tabItem_title}>
                          {item.img && item.img}
                          <span>{item.title}</span>
                        </div>
                        <MdOutlineArrowForwardIos
                          style={{ color: "var(--primary)" }}
                          size={14}
                        />
                      </div>
                    </Link>
                  ))}

                  <div className={style.profile_left_tabItem}>
                    <div className={style.tabItem_title}>
                      <BiLogOut style={{ color: "var(--primary)" }} size={20} />
                      <span onClick={onLogout}>Đăng xuất</span>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
            <div ref={refRight} className={style.profile_right}>
              {IS_MB && (
                <div onClick={handleBackStep1} className={style.btnGoback}>
                  <MdOutlineArrowBackIosNew size={20} />
                  <p>Quay lại</p>
                </div>
              )}
              {children}
            </div>
          </div>
        </Container>
      </div>
    </AuthLayout>
  );
}
