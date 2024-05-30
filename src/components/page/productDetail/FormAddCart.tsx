import { ReactElement, useRef, useState } from "react";
import { IProductDetail, IProductSize } from "@/interfaces/product.type";
import { LoadingButton } from "@mui/lab";
import { FormHelperText, useMediaQuery } from "@mui/material";
import { Resolver, useForm } from "react-hook-form";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { toast } from "react-toastify";
import * as Yup from "yup";
import style from "./style.module.css";
import { productApi } from "@/services";
import { QR_KEY, QR_TIME_CACHE } from "@/constants";
import { useQuery } from "react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface FormData {
    size: string;
    product_size_id: number;
}
interface IProps {
    qrStr: string;
    dataPrDetail: IProductDetail;
}

export default function AddToCart(props: IProps) {
    const { qrStr, dataPrDetail } = props;
    const [sizePicker, setSizePicker] = useState<string>("");
    const sizePickerRef = useRef<HTMLUListElement>(null);
    const IS_MB = useMediaQuery("(max-width:1023px)");
    const { data, isLoading } = useQuery({
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
    const validationSchema = Yup.object().shape({
        size: Yup.string().required("Vui lòng chọn size"),
    });

    const dataProductSize = data?.context?.data;

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
    const defaultInputForm: FormData = {
        size: "",
        product_size_id: 0,
    };

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        clearErrors,
    } = useForm<FormData>({
        defaultValues: defaultInputForm,
        resolver: validationResolver,
    });

    const handleInputChange = (value: string, id: number) => {
        setValue("size", value);
        setValue("product_size_id", id);
        clearErrors("size");
        setSizePicker(id.toString());
    };

    const onSubmit = (data: FormData) => {
        const dataTrans = {
            product_size_id: data.product_size_id,
            product_id: dataPrDetail?.id,
        };
        if (data.size !== "") {
            console.log(dataTrans);
            toast.success(`Thêm sản phẩm ${dataPrDetail?.name} thành công`);
        }
    };

    const handleCheckSize = () => {
        const sizePickerElement = sizePickerRef.current;
        if (sizePickerElement) {
            const elementRect = sizePickerElement.getBoundingClientRect();
            const offsetPosition =
                elementRect.top + window.scrollY - window.innerHeight / 2;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    const handleFavorite = () => {
        toast.success(`Đã thêm ${dataPrDetail?.name} vào danh sách yêu thích`);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.productDT_size_picker}>
                    <h3 className={style.productDT_title}>Kích thước</h3>
                    {isLoading ? (
                        <SkeletonSize />
                    ) : (
                        <ul
                            ref={sizePickerRef}
                            className={style.productDT_sizes}
                        >
                            {dataProductSize?.map(
                                (item: IProductSize, index: number) => (
                                    <li key={index}>
                                        <input
                                            type="radio"
                                            value={item.name}
                                            name="size_picker"
                                            id={`size_picker_${index}`}
                                            {...register}
                                            className={style.hidden_input_radio}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    e.target.value,
                                                    item?.id
                                                )
                                            }
                                        />
                                        <label
                                            className={`${
                                                sizePicker ==
                                                    item.id.toString() &&
                                                style.productDT_size_active
                                            } ${
                                                errors.size &&
                                                style.error_border
                                            } ${style.size_picker_label}`}
                                            htmlFor={`size_picker_${index}`}
                                        >
                                            <p>{item?.name}</p>
                                        </label>
                                    </li>
                                )
                            )}
                        </ul>
                    )}

                    {errors.size && (
                        <FormHelperText error>
                            {errors.size.message}
                        </FormHelperText>
                    )}
                </div>

                <div className={style.add_cart_btn}>
                    {IS_MB ? (
                        sizePicker == "" ? (
                            <ButtonCustomCart
                                onClick={handleCheckSize}
                                name="Chọn size"
                            >
                                <IoIosArrowForward size={20} />
                            </ButtonCustomCart>
                        ) : (
                            <ButtonCustomCart name="Thêm vào giỏ hàng">
                                <IoMdCart size={18} />
                            </ButtonCustomCart>
                        )
                    ) : (
                        <ButtonCustomCart name="Thêm vào giỏ hàng">
                            <IoMdCart size={18} />
                        </ButtonCustomCart>
                    )}

                    <ButtonCustomCart
                        onClick={handleFavorite}
                        type={"button"}
                        name="Yêu thích"
                        variant="outlined"
                    >
                        <FaRegHeart size={18} />
                    </ButtonCustomCart>
                </div>
            </form>
        </>
    );
}

interface IPropsBtn {
    name: string;
    children: ReactElement;
    type?: string;
    onClick?: () => void;
    variant?: "text" | "outlined" | "contained";
}
export function ButtonCustomCart(props: IPropsBtn) {
    const {
        name,
        children,
        type = "submit",
        onClick,
        variant = "contained",
    } = props;
    return (
        <LoadingButton
            type={`${type}`}
            href=""
            fullWidth
            size="medium"
            variant={variant}
            onClick={onClick}
        >
            <span className={style.add_cart_btn_txt}>{name}</span>
            {children}
        </LoadingButton>
    );
}

export function SkeletonSize() {
    return (
        <div className={style.skeletonSizes}>
            <div className={style.skeletonSize}>
                <Skeleton height={46} />
            </div>
            <div className={style.skeletonSize}>
                <Skeleton height={46} />
            </div>
            <div className={style.skeletonSize}>
                <Skeleton height={46} />
            </div>
        </div>
    );
}
