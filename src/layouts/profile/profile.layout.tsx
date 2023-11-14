import { LayoutProps } from "@/common";
import { AuthLayout } from "@/layouts";
import { IProfileState } from "@/store/zustand/type";
import { useProfileStore } from "@/store/zustand/useProfileStore";
import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import { BsCameraFill } from "react-icons/bs";
import Link from "next/link";
import style from "./style.module.css";

const tabItem = [
  { id: 1, title: "Thông tin tài khoản", href: "/profile/edit-profile" },
  { id: 2, title: "Lịch sử mua hàng", href: "/profile/history" },
  { id: 3, title: "Danh sách yêu thích", href: "/profile/wish-list" },
  { id: 4, title: "Thông tin đơn hàng", href: "/profile/order" },
  { id: 5, title: "Phương thức thanh toán", href: "/profile/payment-method" },
];
export function ProfileLayout({ children }: LayoutProps) {
  const router = useRouter();
  const IS_MB = useMediaQuery("(max-width:767px)");
  const [profile, logoutProfile] = useProfileStore((state: IProfileState) => [
    state.profile,
    state.logoutProfile,
  ]);

  const onLogout = async () => {
    await logoutProfile();
    router.push("/");
  };

  return (
    <AuthLayout>
      <div className={style.profile_page}>
        <div className={style.profile}>
          <div className={style.profile_left}>
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
                        <Image
                          width={IS_MB ? 30 : 128}
                          height={IS_MB ? 30 : 128}
                          src={
                            profile?.avatar
                              ? profile?.avatar
                              : "https://source.unsplash.com/random"
                          }
                          alt=""
                        />
                        <div className={style.form_edit}>
                          <BsCameraFill style={{ color: "#fff" }} size={20} />
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
                <Link key={index} href={item.href}>
                  <div
                    className={
                      router.pathname === item.href
                        ? style.active_tab
                        : style.profile_left_tabItem
                    }
                  >
                    <span>{item.title}</span>
                  </div>
                </Link>
              ))}

              <div className={style.profile_left_tabItem}>
                <span onClick={onLogout}>Đăng xuất</span>
              </div>
            </div>
          </div>
          <div className={style.profile_right}>
            {children}
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
