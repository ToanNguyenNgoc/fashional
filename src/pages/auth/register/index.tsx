import { validate } from "@/utils";
import { Button, TextField } from "@mui/material";
import React from "react";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegister } from "@/interfaces/auth";
import { useMutation } from "react-query";
import { authApi } from "@/services";
import { useAlert } from "@/hooks/useAlert";

export default function Register() {
  const { resultLoad, onCloseNoti, noti } = useAlert();

  const validationSchema = Yup.object({
    fullname: Yup.string().required("Vui lòng nhập họ và tên"),
    telephone: Yup.string()
      .required("Vui lòng nhập số điện thoại")
      .matches(validate.phoneVn, {
        message: "Vui lòng nhập đúng định dạng",
      }),
    email: Yup.string()
      .required("Vui lòng nhập email")
      .matches(validate.email, { message: "Vui lòng nhập đúng định dạng" }),
    password: Yup.string().required("Vui lòng nhập mật khẩu"),
    // password: Yup.string()
    //   .required("Password is required")
    //   .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    //   .max(32, "Mật khẩu phải có nhiều nhất 32 ký tự")
    //   .matches(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~@$!%*?&^+#_=-])[A-Za-z\d~@$!%*?&^+#_=-]*$/,
    //     "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 kí tự"
    //   ),
  });

  const {
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { email: "", password: "", fullname: "", telephone: "" },
  });

  const onSubmit = (data: IRegister) => {
    mutate(data);
    console.log(data);
  };

  const { mutate } = useMutation({
    mutationFn: (body: IRegister) => authApi.register(body),
    onSuccess: async (res: any) => {
      reset();
      console.log(res);
    },
    onError: () => {},
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="fullname"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              label="Họ và tên"
              error={Boolean(errors.fullname)}
              helperText={errors.fullname?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              label="Email"
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              label="Mật khẩu"
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="telephone"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              label="Số điện thoại"
              error={Boolean(errors.telephone)}
              helperText={errors.telephone?.message}
              {...field}
            />
          )}
        />

        <Button type="submit" variant="contained">
          Đăng ký
        </Button>
      </form>
    </>
  );
}
