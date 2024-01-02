import AddToCart from "@/components/page/productDetail/AddToCart";
import LightGalleryImg from "@/components/page/productDetail/LightGalleryImg";
import { baseURL, serverSideCache } from "@/configs";
import { QR_KEY, QR_TIME_CACHE } from "@/constants";
import {
  IProductDetail
} from "@/interfaces/product.type";
import { productApi } from "@/services";
import { formatMoney } from "@/utils";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography
} from "@mui/material";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import queryString from "query-string";
import { IoIosArrowDown } from "react-icons/io";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import style from "./style.module.css";


export function ProductDetail() {
  const router = useRouter();
  const qrStr = router?.query?.productId as string;

  const { data: dataProduct, isLoading } = useQuery({
    queryKey: [QR_KEY.GET_PRODUCT_DETAIL, qrStr],
    enabled: !!qrStr,
    queryFn: () =>
      productApi.getProductById(
        { includes: "created_by|category|sizes" },
        qrStr
      ),
    onError: (error) => {
      toast.error(`Có lỗi sảy ra vui lòng thử lại sau (${error})`);
    },
    staleTime: QR_TIME_CACHE,
  });
  const dataPrDetail = dataProduct && dataProduct?.context;

  const percent =
    dataPrDetail &&
    Math.round(
      ((dataPrDetail.price - dataPrDetail.price_special) / dataPrDetail.price) *
        100
    );

  const { data: dataProductSize, isLoading: isLoadingProductSize } = useQuery({
    queryKey: [QR_KEY.GET_PRODUCT_SIZE, qrStr],
    enabled: !!dataPrDetail,
    queryFn: () => productApi.getProductSizeById(Number(dataPrDetail?.id)),
    staleTime: QR_TIME_CACHE,
    onError: () => {
      toast.error(
        `Có lỗi sảy ra vui lòng thử lại sau (code_error: size_error)`
      );
    },
  });



  return (
    <>
      {isLoading && <p>Loading...</p>}
      <div className={style.productDT}>
        <div className={style.productDT_left}>
          {dataPrDetail &&
            <LightGalleryImg dataPrDetail={dataPrDetail}/>
          }
        </div>

        <div className={style.productDT_right}>
          <div className={style.productDT_info}>
            <h1 className={style.productDT_name}>{dataPrDetail?.name}</h1>
            <h2 className={style.productDT_category}>
              {dataPrDetail?.category?.name}
            </h2>

            {dataPrDetail && (
              <div className={style.productDT_prices}>
                {dataPrDetail?.price_special < dataPrDetail.price ? (
                  <div className={style.productDT_special}>
                    <p className={style.productDT_price_active}>
                      {formatMoney(dataPrDetail.price_special)}
                    </p>
                    <p className={style.productDT_price}>
                      {formatMoney(dataPrDetail.price)}
                    </p>
                    <p
                      className={style.productDT_percent}
                    >{`Giảm ${percent}%`}</p>
                  </div>
                ) : (
                  <p className={style.productDT_price_active}>
                    {formatMoney(dataPrDetail.price)}
                  </p>
                )}
              </div>
            )}


            {dataProductSize && (
              <AddToCart dataProductSize={dataProductSize?.context?.data} />
            )}

            <div className={style.productDT_desc}>
              <h3 className={style.productDT_title}>Mô tả</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: dataProduct?.context?.short_content
                    ? dataProduct.context.short_content
                    : "Đang cập nhật",
                }}
                className={style.productDT_desc_text}
              ></div>
            </div>

            <div className={style.productDT_Accordion}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<IoIosArrowDown size="20" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Hình thức đổi trả</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Đơn hàng từ 1.000.000₫ trở lên của bạn sẽ được miễn phí
                    ship.
                  </Typography>
                  <br />
                  <Typography>
                    Giao hàng tiêu chuẩn từ 4-5 ngày, chuyển phát nhanh 2-4 từ
                    ngày đơn hàng được xử lý và giao từ Thứ Hai đến Thứ Sáu (trừ
                    ngày lễ)
                  </Typography>
                  <br />
                  <Typography>
                    Thành viên LIL SHOP được trả lại hàng miễn phí.
                  </Typography>
                  <br />
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<IoIosArrowDown size="20" />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>Thông tin thêm</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Vui lòng quay lại video khi mở hàng để được đổi trả sản phẩm
                    khi bị lỗi từ nhà sản xuất hoặc trong quá trình giao hàng.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  serverSideCache(context);
  const { params } = context;
  const queryParams = queryString.parse(params?.productID as string);
  let productDetail: IProductDetail | null;
  try {
    const response = await axios.get(`${baseURL}products/${queryParams.id}`, {
      params: { includes: "created_by|category|sizes" },
    });
    productDetail = response.data.data;
  } catch (error) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  return {
    props: { productDetail: productDetail, product_Id: queryParams.id },
  };
}
