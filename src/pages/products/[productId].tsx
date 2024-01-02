import { ProductDetail } from "@/components/page/productDetail";
import { MainLayout } from "@/layouts";

function ProductId() {
  return (
    <>
      <ProductDetail />
    </>
  );
}
export default ProductId;
ProductId.Layout = MainLayout;