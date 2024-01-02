import { LayoutProps } from "@/common";
import { Footer, Header } from "@/components";
import style from "./style.module.css";
import { Container } from "@mui/material";

export function MainLayout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <Container maxWidth={"xl"}>
        <div className={style.mainLayout}>{children}</div>
      </Container>
      <Footer />
    </>
  );
}
