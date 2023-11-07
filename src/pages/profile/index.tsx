import React from "react";
import style from "./style.module.css";
import { NextPageWithLayout } from "@/common";
import { MainLayout } from "@/layouts";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
import { BsCameraFill } from "react-icons/bs";
import Link from "next/link";
import { useProfileStore } from "@/store/zustand/useProfileStore";
import { IProfileState } from "@/store/zustand/type";

const Profile: NextPageWithLayout = () => {
  const IS_MB = useMediaQuery("(max-width:767px)");
  const [profile, logoutProfile] = useProfileStore((state: IProfileState) => [
    state.profile,
    state.logoutProfile,
  ]);
  return (
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
                <Link href={"/edit"}>Edit</Link>
              </div>
            </div>
          </div>
        </div>
        <div className={style.profile_right}></div>
      </div>
    </div>
  );
};
export default Profile;
Profile.Layout = MainLayout;
