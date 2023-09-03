import { LayoutProps } from "@/common";
import Footer from "@/components/footer";
import Header from "@/components/header";
import style from "./style.module.css";

export function MainLayout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <div className={style.mainLayout}>{children}</div>
      <Footer />
    </>
  );
}
