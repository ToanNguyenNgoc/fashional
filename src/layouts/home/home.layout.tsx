import { LayoutProps } from "@/common";
import { Footer, Header } from "@/components";
import style from "./style.module.css";

export function HomeLayout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <div className={style.homeLayout}>{children}</div>
      <Footer />
    </>
  );
}
