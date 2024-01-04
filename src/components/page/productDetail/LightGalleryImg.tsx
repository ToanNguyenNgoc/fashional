import { IMedia, IProductDetail } from "@/interfaces/product.type";
import { useMediaQuery } from "@mui/material";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import Slider from "react-slick";
import style from "./style.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const LightGallery = dynamic(() => import("lightgallery/react"), {
  ssr: false,
});
interface IProps {
  dataPrDetail: IProductDetail;
}

export default function LightGalleryImg(props: IProps) {
  const { dataPrDetail } = props;
  const IS_MB = useMediaQuery("(max-width:767px)");
  const [activeIndex, setActiveIndex] = useState(1);
  const sliderRef: any = useRef();
  const sliderRef2: any = useRef();
  const galleryOptions: any = {
    plugins: [lgThumbnail, lgZoom],
    zoomFromOrigin: true,
    hideBarsDelay: 1000,
    speed: 500,
    mode: "lg-fade",
    elementClassNames: dataPrDetail?.media?.length > 0 && style.productDT_list,
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (curent: number, next: number) => {
      setActiveIndex(next + 1), sliderRef2.current.slickGoTo(next);
    },
  };

  return (
    <>
      {IS_MB ? (
        <>
          <Slider className={style.sliderSingle} {...settings} ref={sliderRef}>
            {dataPrDetail?.media?.length > 0 ? (
              dataPrDetail.media.map((item: IMedia) => (
                <div key={item?.media?.id} className={style.productDT_item}>
                  <Image
                    fill
                    src={item?.media.original_url}
                    alt={`${item?.media?.name}`}
                    className={style.productDT_img}
                    sizes="100%"
                    priority
                  />
                </div>
              ))
            ) : dataPrDetail?.thumbnail_url ? (
              <Link
                className={style.productDT_item}
                href={dataPrDetail.thumbnail_url}
              >
                <Image
                  fill
                  sizes="100%"
                  loading="lazy"
                  style={{ margin: "0 auto" }}
                  src={dataPrDetail?.thumbnail_url}
                  alt={`${dataPrDetail?.name}`}
                  className={style.productDT_img}
                />
              </Link>
            ) : null}
          </Slider>
          <Slider
            nextArrow={<SampleNextArrow />}
            prevArrow={<SamplePrevArrow />}
            className={`${
              dataPrDetail?.media?.length < 1 ? style.disable_slider : ""
            } ${style.sliderMulti}`}
            ref={sliderRef2}
            slidesToShow={5}
            slidesToScroll={5}
            infinite={false}
            speed= {300}
          >
            {dataPrDetail?.media?.length > 0 ? (
              dataPrDetail.media.map((item: IMedia, index: number) => (
                <div
                  onClick={() => {
                    setActiveIndex(index + 1),
                      sliderRef.current.slickGoTo(index);
                  }}
                  key={item?.media?.id}
                  className={`${style.productDT_item} ${
                    activeIndex && activeIndex === index + 1
                      ? style.activeItem
                      : ""
                  }`}
                >
                  <Image
                    fill
                    src={item?.media.original_url}
                    alt={`${item?.media?.name}`}
                    className={style.productDT_img}
                    sizes="100%"
                    priority
                  />
                </div>
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
          </Slider>
        </>
      ) : (
        <LightGallery {...galleryOptions}>
          {dataPrDetail?.media?.length > 0 ? (
            dataPrDetail.media.map((item: IMedia, index: number) => (
              <Link
                key={index}
                data-sub-html={`${dataPrDetail?.name} - ${index + 1}`}
                className={style.productDT_item}
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
      )}
    </>
  );
}

function SampleNextArrow(props: any) {
  const { onClick } = props;
  return (
    <div className={style.arrNext} onClick={onClick}>
      <IoIosArrowForward size={24} />
    </div>
  );
}

function SamplePrevArrow(props: any) {
  const { onClick } = props;
  return (
    <div className={style.arrPrev} onClick={onClick}>
      <IoIosArrowBack size={24} />
    </div>
  );
}
