import { imgs } from "@/assets/imgs";
import Image from "next/image";
import { BiSearch } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import style from "./style.module.css";
import Drawer from "@mui/material/Drawer";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";
import { useMediaQuery } from "@mui/material";

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Search(props: IProps) {
  const { open, setOpen } = props;
  const [value, setValue] = useState<string>("");
  const IS_MB = useMediaQuery("(max-width:767px)");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <>
      <Drawer
        anchor={IS_MB ? "right" : "top"}
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className={style.searchBox}>
          <div className={style.searchWrap}>
            <div className={style.searchLogo}>
              <Image
                src={imgs.logoBlack}
                width={IS_MB ? 30 : 40}
                height={IS_MB ? 30 : 40}
                alt="Logo"
              />
            </div>

            <div className={style.searchField}>
              <div className={style.searchIcon}>
                <BiSearch size={24} />
              </div>
              <input
                autoFocus
                value={value}
                onChange={handleChange}
                type="text"
                placeholder="Tìm kiếm"
              />
              {value && (
                <div onClick={() => setValue("")} className={style.closeIcon}>
                  <GrClose size={20} />
                </div>
              )}
            </div>

            <div onClick={() => setOpen(false)} className={style.searchClose}>
              <div className={style.icon}>
                <GrClose size={24} />
              </div>
            </div>
          </div>
          {/* result */}
          <div className={style.searchResult}>
            <div className={style.searchResultRecomment}>
              <p className={style.searchRerultTitle}>Tìm kiếm phổ biến</p>
              <ul className={style.searchResultList}>
                <li className={style.searchResultItem}>
                  <Link href="#">T Shirt</Link>
                </li>
                <li className={style.searchResultItem}>
                  <Link href="#">Cap</Link>
                </li>
                <li className={style.searchResultItem}>
                  <Link href="#">Sweater</Link>
                </li>
                <li className={style.searchResultItem}>
                  <Link href="#">Outerwear</Link>
                </li>
              </ul>
            </div>
          </div>
          {/* close result */}
        </div>
      </Drawer>
    </>
  );
}
