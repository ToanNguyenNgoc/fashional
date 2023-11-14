import React from "react";
import style from "./style.module.css";
import { LayoutProps } from "@/common";

interface IProps {
  title?: string;
}

export function Card({ title, children }: IProps & LayoutProps) {
  return (
    <div className={style.card}>
      <div className={style.card_head}>
        <p>{title}</p>
      </div>
      <div className={style.card_body}>{children}</div>
    </div>
  );
}
