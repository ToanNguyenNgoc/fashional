import { IProductSize } from "@/interfaces/product.type";
import { LoadingButton } from "@mui/lab";
import { FormHelperText } from "@mui/material";
import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { FaRegHeart } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { toast } from "react-toastify";
import * as Yup from "yup";
import style from "./style.module.css";
interface FormData {
  size: string;
  id: number;
}
interface IProps {
  dataProductSize: IProductSize[];
}

export default function AddToCart(props: IProps) {
  const { dataProductSize } = props;
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
  const defaultInputForm: FormData = {
    size: "",
    id: 0,
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

  const handleInputChange = (value: number| string, id: number) => {
    setValue("size", value.toString());
    setValue("id", id);
    clearErrors("size");
    setSizePicker(id);
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
    toast.success(`Thêm sản phẩm thành công`);
  };
  return (
    <>
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
            {dataProductSize?.map((item: IProductSize, index: number) => (
              <div className={``} key={index}>
                <input
                  type="radio"
                  value={Number(item.name)}
                  name="size_picker"
                  id={`size_picker_${index}`}
                  {...register}
                  className={style.hidden_input_radio}
                  onChange={(e) =>
                    handleInputChange(item?.name, item?.id)
                  }
                />
                <label
                  className={`${
                    sizePicker == item.id && style.productDT_size_active
                  } ${errors.size && style.error_border} ${
                    style.size_picker_label
                  }`}
                  htmlFor={`size_picker_${index}`}
                >
                  <p>{item?.name}</p>
                </label>
              </div>
            ))}
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
            <span className={style.add_cart_btn_txt}>Thêm vào giỏ hàng</span>
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
    </>
  );
}
