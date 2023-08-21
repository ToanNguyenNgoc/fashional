import { AlertNoti } from "@/components";
import { useAlert } from "@/hooks/useAlert";
import { ILogin } from "@/interfaces/auth";
import { authApi } from "@/services";
import { IProfileState } from "@/store/zustand/type";
import { useProfileStore } from "@/store/zustand/useProfileStore";
import { validate } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as Yup from "yup";

export default function Login() {
  const router = useRouter();

  const { resultLoad, onCloseNoti, noti } = useAlert();

  const getProfile = useProfileStore(
    (state: IProfileState) => state.getProfile
  );

  const validationSchema = Yup.object({
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

  const { mutate } = useMutation({
    mutationFn: (body: ILogin) => authApi.login(body),
    onSuccess: async (res: any) => {
      Cookies.set("token_expired_at", res.context.token_expired_at, {
        secure: true,
      });
      Cookies.set("access_token", res.context.accessToken, {
        secure: true,
      });
      getProfile();
      reset();
      router.push("/");
    },
    onError: () => {
      resultLoad({
        message: "Email hoặc mật khẩu không đúng! Vui lòng thử lại",
        color: "error",
      });
    },
  });

  const {
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: ILogin) => {
    mutate(data);
  };

  return (
    <>
      <AlertNoti
        open={noti.openAlert}
        close={onCloseNoti}
        severity={noti.color}
        message={noti.message}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              label="email"
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
              label="password"
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              {...field}
            />
          )}
        />
        <Button type="submit" variant="contained">
          Đăng nhập
        </Button>
      </form>
    </>
  );
}
