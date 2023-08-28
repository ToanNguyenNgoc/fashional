import { imgs } from "@/assets/imgs";
import Image from "next/image";
import { BiSearch } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import style from "./style.module.css";
import Drawer from "@mui/material/Drawer";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Search(props: IProps) {
  const { open, setOpen } = props;
  const [value, setValue] = useState<string>("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <>
      <Drawer anchor={"top"} open={open} onClose={() => setOpen(false)}>
        <div className={style.searchBox}>
          <div className={style.searchWrap}>
            <div className={style.searchLogo}>
              <Image
                src={imgs.logoBlack}
                width={40}
                height={40}
                alt="Picture of the author"
              />
            </div>

            <div className={style.searchField}>
              <div className={style.searchIcon}>
                <BiSearch size={24} />
              </div>
              <input
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
              <p>Cancel</p>
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
