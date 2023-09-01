import { AlertNoti } from "@/components";
import { useAlert } from "@/hooks/useAlert";
import { authApi } from "@/services";
import { validate } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Container, useMediaQuery } from "@mui/material";
import { AxiosError } from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as Yup from "yup";
import style from "../style.module.css";
import { IRegister } from "@/interfaces/index.type";
import { useCallback, useState } from "react";
import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from "react-google-recaptcha-v3";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "@/common";
import { SignLayout } from "@/layouts";

const RegisterPage: NextPageWithLayout = () => {
  const { resultLoad, onCloseNoti, noti } = useAlert();
  const [token, setToken] = useState<string>("");
  const IS_MB = useMediaQuery("(max-width:767px)");
  const router = useRouter();
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  const onVerify = useCallback((token: string) => {
    setToken(token);
  }, []);

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
    //   .max(32, "Mật khẩu nhiều nhất 32 ký tự")
    //   .matches(validate.password, {
    //     message:
    //       "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 kí tự",
    //   }),
  });

  type FormData = Yup.InferType<typeof validationSchema>;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { email: "", password: "", fullname: "", telephone: "" },
  });

  const onSubmit = (data: FormData) => {
    if (token === "") {
      setRefreshReCaptcha((r) => !r);
    } else {
      const newData: IRegister = {
        ...data,
        recaptcha: token,
      };
      mutate(newData);
    }
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: (body: IRegister) => authApi.register(body),
    onSuccess: async () => {
      setRefreshReCaptcha((r) => !r);
      reset();
      resultLoad({
        message: "Vui lòng kiểm tra gmail để xác thực tài khoản!",
        color: "success",
      });
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    },
    onError: (error) => {
      setRefreshReCaptcha((r) => !r);
      const err = error as AxiosError<{ message: string }>;
      resultLoad({
        message: err.response?.data?.message ?? "",
        color: "error",
      });
    },
  });

  return (
    <>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_KEY_CAPTCHA || ""}
        scriptProps={{
          async: true,
          defer: true,
          appendTo: "head",
          nonce: undefined,
        }}
      >
        <AlertNoti
          open={noti.openAlert}
          close={onCloseNoti}
          severity={noti.color}
          message={noti.message}
        />

        <Container>
          <div className={style.loginWraper}>
            {/* <div className={style.loginLeft}></div> */}
            <div className={style.loginRight}>
              <form
                className={style.loginForm}
                onSubmit={handleSubmit(onSubmit)}
              >
                <p className={style.loginTitle}>Đăng ký</p>
                <div className={IS_MB ? undefined : style.formRow}>
                  <div className={style.wrapInput}>
                    <input
                      {...register("fullname", { required: true })}
                      type="text"
                      placeholder="Họ và tên"
                      className={style.input}
                    />
                    {errors.fullname && (
                      <p className={style.textErr}>{errors.fullname.message}</p>
                    )}
                  </div>
                  <div className={style.wrapInput}>
                    <input
                      {...register("telephone", { required: true })}
                      type="number"
                      placeholder="Số điện thoại"
                      className={style.input}
                    />
                    {errors.telephone && (
                      <p className={style.textErr}>
                        {errors.telephone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div style={{ margin: "0" }} className={style.wrapInput}>
                  <input
                    {...register("email", { required: true })}
                    type="text"
                    placeholder="Email"
                    className={style.input}
                  />
                  {errors.email && (
                    <p className={style.textErr}>{errors.email.message}</p>
                  )}
                </div>

                <div className={style.wrapInput}>
                  <input
                    {...register("password", { required: true })}
                    type="password"
                    placeholder="Mật khẩu"
                    className={style.input}
                  />
                  {errors.password && (
                    <p className={style.textErr}>{errors.password.message}</p>
                  )}
                </div>

                <div className={style.wrapInput}>
                  <LoadingButton
                    type="submit"
                    style={{
                      backgroundColor: "var(--primary)",
                      padding: IS_MB ? "12px 20px" : "20px 14px",
                      width: "100%",
                      borderRadius: "8px",
                      fontWeight: "bold",
                    }}
                    loading={isLoading}
                    variant="contained"
                  >
                    Đăng ký
                  </LoadingButton>
                </div>

                <div className={style.wrapInput}>
                  <p className={style.formRegisText}>
                    Bạn đã có có tài khoản?{" "}
                    <Link href="/auth/login">Đăng nhập ngay</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </Container>
        <GoogleReCaptcha
          onVerify={onVerify}
          refreshReCaptcha={refreshReCaptcha}
        />
      </GoogleReCaptchaProvider>
    </>
  );
};
RegisterPage.Layout = SignLayout;
export default RegisterPage;
