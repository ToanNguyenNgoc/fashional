import { useRouter } from "next/router";
import { useQuery } from "react-query";
import queryString from "query-string";
import { QR_KEY, QR_TIME_CACHE } from "@/constants";
import {
  IMedia,
  IProductDetail,
  IProductSize,
} from "@/interfaces/product.type";
import { productApi } from "@/services";
import dynamic from "next/dynamic";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import { baseURL, serverSideCache } from "@/configs";
import axios from "axios";
import { Resolver, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormHelperText,
} from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lightgallery.css";
import style from "./style.module.css";
import { toast } from "react-toastify";
import { formatMoney } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
interface FormData {
  // color: string;
  size: string;
  id: number;
}

const LightGallery = dynamic(() => import("lightgallery/react"), {
  ssr: false,
});

const dataFake = [
  { id: 1, color: "black" },
  { id: 2, color: "red" },
  { id: 3, color: "blue" },
  { id: 4, color: "green" },
  { id: 5, color: "gray" },
];

export function ProductDetail() {
  const router = useRouter();
  const qrStr = router?.query?.productId as string;
  // const [colorPicker, setColorPicker] = useState("black");
  const [sizePicker, setSizePicker] = useState<number | string>();

  const validationSchema = Yup.object().shape({
    size: Yup.string().required("Vui lòng chọn size"),
  });

  const validationResolver: Resolver<FormData, any> = async (values) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
      return { values, errors: {} };
    } catch (validationErrors: any) {
      const errors = validationErrors.inner.reduce(
        (allErrors: Record<string, string>, error: any) => ({
          ...allErrors,
          [error.path]: {
            type: error.type ?? "validation",
            message: error.message,
          },
        }),
        {}
      );
      return {
        values: {},
        errors,
      };
    }
  };

  const { data: dataProduct, isLoading } = useQuery({
    queryKey: [QR_KEY.GET_PRODUCT_DETAIL, qrStr],
    enabled: !!qrStr,
    queryFn: () =>
      productApi.getProductById(
        { includes: "created_by|category|sizes" },
        qrStr
      ),
    onError: () => {
      toast.error(
        `Có lỗi sảy ra vui lòng thử lại sau (code_error: product_detail_error)`
      );
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

  const defaultInputForm: FormData = {
    // color: "black",
    size: "",
    id: 0,
  };

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    clearErrors,
  } = useForm<FormData>({
    defaultValues: defaultInputForm,
    resolver: validationResolver,
  });

  const handleInputChange = (type: "size", value: number) => {
    setValue(type, value.toString());
    clearErrors("size");
    
    // if (type === 'color') {
    // setColorPicker(value);
    // } else if (type === 'size') {
    setSizePicker(value);
    // }s
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
    toast.success(`Thêm sản phẩm thành công`);
  };

  const galleryOptions: any = {
    plugins: [lgThumbnail, lgZoom],
    zoomFromOrigin: true,
    hideBarsDelay: 1000,
    speed: 500,
    mode: "lg-fade",
    elementClassNames:
      dataPrDetail && dataPrDetail?.media?.length > 0 && style.productDT_list,
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      <div className={style.productDT}>
        <div className={style.productDT_left}>
          <LightGallery {...galleryOptions}>
            {dataPrDetail && dataPrDetail?.media?.length > 0 ? (
              dataPrDetail.media.map((item: IMedia, index: number) => (
                <Link
                  data-sub-html={`${dataPrDetail?.name} - ${index + 1}`}
                  className={style.productDT_item}
                  key={index}
                  href={item?.media.original_url}
                >
                  <Image
                    fill
                    src={item?.media.original_url}
                    alt={`${item?.media?.name}`}
                    className={style.productDT_img}
                    sizes="100%"
                    priority
                  />
                </Link>
              ))
            ) : dataPrDetail?.thumbnail_url ? (
              <Link
                className={style.productDT_item}
                href={dataPrDetail.thumbnail_url}
              >
                <Image
                  width={500}
                  height={500}
                  loading="lazy"
                  style={{ margin: "0 auto" }}
                  src={dataPrDetail?.thumbnail_url}
                  alt={`${dataPrDetail?.name}`}
                  className={style.productDT_img}
                />
              </Link>
            ) : null}
          </LightGallery>
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

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* <div className={style.productDT_color_picker}>
                <h3 className={style.productDT_title}>Màu sắc</h3>
                <h4 className={style.productDT_color_name}>{colorPicker}</h4>
                <div className={style.productDT_colors}>
                  {dataFake.map((item: any, index) => (
                    <div
                      className={`${
                        getValues("color") == item.color &&
                        style.productDT_color_active
                      } ${style.productDT_color}`}
                      key={index}
                    >
                      <input
                        type="radio"
                        value={item.color}
                        name="color_picker"
                        id={`color_picker_${index}`}
                        {...register}
                        className={style.hidden_input_radio}
                        onChange={(e) => handleInputChange('color', e.target.value)}
                      />
                      <label
                        className={style.color_picker_label}
                        htmlFor={`color_picker_${index}`}
                      >
                        <div className={style.color_picker_img_wrap}>
                          <Image
                            fill={true}
                            alt={`color_picker-${index}`}
                            className={style.color_picker_img}
                            sizes="100%"
                            priority
                            src="https://source.unsplash.com/random"
                          />
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div> */}

              <div className={style.productDT_size_picker}>
                <h3 className={style.productDT_title}>Kích thước</h3>
                <div className={style.productDT_sizes}>
                  {dataProductSize &&
                    dataProductSize?.context?.data.map(
                      (item: IProductSize, index: number) => (
                        <div
                          className={`${
                            sizePicker == item.id && style.productDT_size_active
                          } ${style.productDT_size}`}
                          key={index}
                        >
                          <input
                            type="radio"
                            value={Number(item.id)}
                            name="size_picker"
                            id={`size_picker_${index}`}
                            {...register}
                            className={style.hidden_input_radio}
                            onChange={(e) =>
                              handleInputChange("size", Number(e.target.value))
                            }
                          />
                          <label
                            className={`${errors.size && style.error_border} ${
                              style.size_picker_label
                            }`}
                            htmlFor={`size_picker_${index}`}
                          >
                            <p>{item?.name}</p>
                          </label>
                        </div>
                      )
                    )}
                </div>
                {errors.size && (
                  <FormHelperText error>{errors.size.message}</FormHelperText>
                )}
              </div>

              <div className={style.add_cart_btn}>
                <LoadingButton
                  type="submit"
                  fullWidth
                  size="medium"
                  variant="contained"
                >
                  <span className={style.add_cart_btn_txt}>
                    Thêm vào giỏ hàng
                  </span>
                  <IoMdCart size={20} />
                </LoadingButton>
                <LoadingButton
                  type="submit"
                  fullWidth
                  size="medium"
                  variant="outlined"
                >
                  <span className={style.add_cart_btn_txt}>Yêu thích</span>
                  <FaRegHeart size={18} />
                </LoadingButton>
              </div>
            </form>

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
