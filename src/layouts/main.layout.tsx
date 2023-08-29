import { LayoutProps } from "@/common";
import Footer from "@/components/footer";
import Header from "@/components/header";

export function MainLayout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
}
