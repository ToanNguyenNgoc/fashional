import React, { useState } from "react";
import style from "./style.module.css";
import { NextPageWithLayout } from "@/common";
import { MainLayout } from "@/layouts";
import { IoOptions } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { useQuery } from "react-query";
import { productApi, tagApi } from "@/services";
import { IProduct, IQrProduct, IQrtag, ITag } from "@/interfaces/index.type";
import { ProductItem } from "@/components";
import { useRouter } from "next/router";
import Link from "next/link";
const Products: NextPageWithLayout = () => {
  const [hideCate, setHideCate] = useState(false);
  const router = useRouter();
  const {
    type: typeParamUrl,
    tag: tagParamUrl,
    category: categoryParamUrl,
  } = router.query;
  const [tagItem, setTagItem] = useState<ITag>();
  const paramsTags: IQrtag = {
    status: true,
    page: 1,
    limit: 15,
  };
  // console.log(tagParamUrl);

  // console.log(tagParamUrl && tagParamUrl?.split(".")[1]);
  const { data: dataTags } = useQuery({
    queryKey: ["TAGS_SHOP", typeParamUrl],
    queryFn: () =>
      tagApi.getTags({
        ...paramsTags,
        type: typeParamUrl && typeParamUrl?.toString().toUpperCase(),
      }),
  });
  const paramsProducts: IQrProduct = {
    page: 1,
    limit: 15,
    status: true,
    tag_id: tagItem && tagItem.id,
  };
  const { data: dataProducts, isFetching } = useQuery({
    queryKey: ["PRODUCTS", paramsProducts],
    queryFn: () => productApi.getProductArrivals(paramsProducts),
  });
  const productList = dataProducts?.context.data;

  const getContentToDisplay = () => {
    if (categoryParamUrl) {
      return categoryParamUrl;
    } else if (tagParamUrl) {
      return tagParamUrl;
    } else if (typeParamUrl) {
      return typeParamUrl;
    } else {
      return "Product";
    }
  };

  return (
    <div className={style.products}>
      {/* head products */}
      <div className={style.headProduct}>
        <h1 className={style.headTitle}>
          {`${getContentToDisplay()} (${
            productList ? productList?.length : 0
          })`}
        </h1>
        <div className={style.headRight}>
          <div
            onClick={() => {
              setHideCate(!hideCate);
            }}
            className={style.headRightRow}
          >
            <p>{hideCate ? "Hiện" : "Ẩn"} bộ lọc</p>
            <IoOptions size={24} />
          </div>
          <div className={style.headRightRow}>
            <p>Lọc</p>
            <IoIosArrowDown size={24} />
          </div>
        </div>
      </div>
      {/* close head products */}

      <div
        style={hideCate ? {} : { gap: "48px" }}
        className={style.productsWrap}
      >
        <div
          style={
            hideCate ? { width: "0px", opacity: 0, visibility: "visible" } : {}
          }
          className={style.productsLeft}
        >
          <ul className={style.productLeftCate}>
            {dataTags?.context?.data.map((item: ITag) => (
              <li onClick={() => setTagItem(item)} key={item.id}>
                <Link
                  style={
                    tagParamUrl === item.name_slugify
                      ? { textDecoration: "underline", fontWeight: "bold" }
                      : {}
                  }
                  href={`/danh-sach-san-pham?type=${typeParamUrl}&tag=${item.name_slugify}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div
          style={hideCate ? { gridTemplateColumns: "repeat(4, 1fr)" } : {}}
          className={style.productsRight}
        >
          {productList?.map((item: IProduct) => (
            <ProductItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Products;
Products.Layout = MainLayout;
