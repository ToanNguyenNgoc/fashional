import { IMedia, IProductDetail } from "@/interfaces/product.type";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import style from "./style.module.css";
const LightGallery = dynamic(() => import("lightgallery/react"), {
  ssr: false,
});
interface IProps {
  dataPrDetail: IProductDetail;
}
export default function LightGalleryImg(props: IProps) {
  const { dataPrDetail } = props;

  const galleryOptions: any = {
    plugins: [lgThumbnail, lgZoom],
    zoomFromOrigin: true,
    hideBarsDelay: 1000,
    speed: 500,
    mode: "lg-fade",
    elementClassNames: dataPrDetail?.media?.length > 0 && style.productDT_list,
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
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
    </Slider>
  );
}
