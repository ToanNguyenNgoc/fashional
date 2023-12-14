import { IQrtag, ITag } from "@/interfaces/tags.type";
import { tagApi } from "@/services";
import { IProfileState } from "@/store/zustand/type";
import { useProfileStore } from "@/store/zustand";
import { Avatar, Drawer } from "@mui/material";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { GrClose, GrMenu, GrLogin } from "react-icons/gr";
import { BiHelpCircle } from "react-icons/bi";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { useQuery } from "react-query";
import style from "./style.module.css";
import { useLogout } from "@/hooks";


export const MenuMB: React.FC = () => {
  const [profile] = useProfileStore((state: IProfileState) => [state.profile]);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [categories, setCategories] = useState<ITag>();
  const [tags, setTags] = useState<ITag[]>([]);
  const refStep1 = useRef<HTMLDivElement>(null);
  const refStep2 = useRef<HTMLDivElement>(null);
  const refStep3 = useRef<HTMLDivElement>(null);
  const onLogout = useLogout();

  const handleNextStep2 = (item?: ITag[] | undefined) => {
    refStep1?.current?.classList.add(style.preHideLeft);
    refStep2?.current?.classList.add(style.preHideright);
    if (item) {
      setTags(item);
    } else {
      setTags([]);
    }
  };

  const handleNextStep3 = (item: ITag) => {
    refStep2?.current?.classList.add(style.preHideLeft);
    refStep3?.current?.classList.add(style.preHideright);
    refStep2?.current?.classList.remove(style.preHideright);
    if (item) setCategories(item);
  };

  const handleBackStep1 = () => {
    refStep1?.current?.classList.remove(style.preHideLeft);
    refStep2?.current?.classList.remove(style.preHideright);
  };

  const handleBackStep2 = () => {
    refStep2?.current?.classList.remove(style.preHideLeft);
    refStep2?.current?.classList.add(style.preHideright);
    refStep3?.current?.classList.remove(style.preHideright);
  };

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
      <div onClick={() => setOpenMenu(true)} className={style.menuIcon}>
        <GrMenu size={24} />
      </div>
      <Drawer
        anchor={"right"}
        open={openMenu}
        onClose={() => setOpenMenu(false)}
      >
        <div className={style.menuMB}>
          {/* level 1 */}
          <div ref={refStep1} className={style.menuListStep1}>
            <div onClick={() => setOpenMenu(false)} className={style.closeItem}>
              <GrClose size={24} />
            </div>
            <ul className={style.menuMBList}>
              {profile && (
                <li
                  onClick={() => handleNextStep2()}
                  className={style.menuMBItem}
                >
                  <div className={style.userImage}>
                    <Avatar
                      alt={profile?.fullname}
                      sx={{ width: 30, height: 30 }}
                      src={profile?.avatar}
                    ></Avatar>
                    <p className={style.userName}>Hi, {profile?.fullname}</p>
                  </div>
                  <div className={style.arrIcon}>
                    <MdOutlineArrowForwardIos size={18} />
                  </div>
                </li>
              )}

              <li
                onClick={() => handleNextStep2(tagsShop?.context?.data)}
                className={style.menuMBItem}
              >
                <p className={style.menuItemTitle}>Shop</p>
                <div className={style.arrIcon}>
                  <MdOutlineArrowForwardIos size={18} />
                </div>
              </li>
              <li
                onClick={() => handleNextStep2(tagsCollab?.context?.data)}
                className={style.menuMBItem}
              >
                <p className={style.menuItemTitle}>Collabs</p>
                <div className={style.arrIcon}>
                  <MdOutlineArrowForwardIos size={18} />
                </div>
              </li>
              <Link href="#" className={style.menuMBItem}>
                <p className={style.menuItemTitle}>News</p>
              </Link>
              <Link href="#" className={style.menuMBItem}>
                <p className={style.menuItemTitle}>Contact</p>
              </Link>
              <Link href="#" className={style.menuMBItem}>
                <p className={style.menuItemTitle}>About</p>
              </Link>
              <hr />
              {profile ? (
                <div
                  onClick={() => {
                    onLogout(), setOpenMenu(false);
                  }}
                  className={style.menuMBItemRow}
                >
                  <GrLogin style={{ transform: "rotate(180deg)" }} size={20} />
                  <p className={style.menuItemTitle}>Logout</p>
                </div>
              ) : (
                <Link
                  onClick={() => setOpenMenu(false)}
                  href="auth/login"
                  className={style.menuMBItemRow}
                >
                  <GrLogin size={20} />
                  <p className={style.menuItemTitle}>Login</p>
                </Link>
              )}
              <Link
                onClick={() => setOpenMenu(false)}
                href="#"
                className={style.menuMBItemRow}
              >
                <BiHelpCircle size={24} />
                <p className={style.menuItemTitle}>Help</p>
              </Link>
            </ul>
          </div>
          {/* close level 1 */}

          {/* level 2 */}
          <div ref={refStep2} className={style.menuListStep2}>
            <div onClick={handleBackStep1} className={style.menuBack}>
              <MdOutlineArrowBackIosNew size={20} />
              <p>All</p>
            </div>
            <ul className={style.menuMBList}>
              {tags.length === 0 ? (
                <>
                  <li className={style.menuMBItem}>
                    <div className={style.userImage}>
                      <Avatar
                        alt={profile?.fullname}
                        sx={{ width: 36, height: 36 }}
                        src={profile?.avatar}
                      ></Avatar>
                      <p className={style.userName}>Hi, {profile?.fullname}</p>
                    </div>
                  </li>
                  <li className={style.menuMBItem}>
                    <Link href="profile" className={style.menuItemTitle}>
                      Profile
                    </Link>
                  </li>
                  <li
                    onClick={() => {
                      onLogout(), setOpenMenu(false);
                    }}
                    className={style.menuMBItem}
                  >
                    <p className={style.menuItemTitle}>Logout</p>
                  </li>
                </>
              ) : (
                <>
                  <li className={style.menuMBItem}>{tags[0]?.type}</li>
                  {tags?.map((item: ITag) => (
                    <li
                      onClick={() =>
                        item?.categories.length > 0 && handleNextStep3(item)
                      }
                      key={item.id}
                      className={style.menuMBItem}
                    >
                      <p className={style.menuItemTitle}>{item?.name}</p>
                      {item?.categories.length > 0 && (
                        <div className={style.arrIcon}>
                          <MdOutlineArrowForwardIos size={18} />
                        </div>
                      )}
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
          {/* close level 2 */}

          {/* level 3 */}
          <div ref={refStep3} className={style.menuListStep3}>
            <div onClick={handleBackStep2} className={style.menuBack}>
              <MdOutlineArrowBackIosNew size={20} />
              <p>{categories?.name}</p>
            </div>
            <ul className={style.menuMBList}>
              <li className={style.menuMBItem}>{categories?.name}</li>
              {categories?.categories?.map((items: any) => (
                <li key={items.id} className={style.menuMBItem}>
                  <p className={style.menuItemTitle}>{items?.name}</p>
                </li>
              ))}
            </ul>
          </div>
          {/* close level 3 */}
        </div>
      </Drawer>
    </>
  );
};
