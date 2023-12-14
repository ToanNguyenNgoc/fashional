import { NextPageWithLayout } from "@/common";
import { IForgot } from "@/interfaces/index.type";
import { AxiosCusError } from "@/interfaces/res.type";
import { SignLayout } from "@/layouts";
import { authApi } from "@/services";
import { validate } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Container, useMediaQuery } from "@mui/material";
import _ from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as Yup from "yup";
import style from "../style.module.css";
import { toast } from "react-toastify";

interface ResError {
  error: string;
  message: string[] | string;
  statusCode: number;
}

const ForgotPage: NextPageWithLayout = () => {
  const IS_MB = useMediaQuery("(max-width:767px)");
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  const router = useRouter();
  const [captcha, setCaptcha] = useState("");
  const queryTokenParams = router.query.token as string | undefined;
  const verifyRecaptchaCallback = useCallback((token: string) => {
    setCaptcha(token);
  }, []);

  const schemaForgot = Yup.object({
    email: queryTokenParams
      ? Yup.string()
      : Yup.string()
          .required("Vui lòng nhập email")
          .matches(validate.email, "Vui lòng nhập đúng định dạng"),
    password: !queryTokenParams
      ? Yup.string()
      : Yup.string().required("Vui lòng nhập mật khẩu"),
    rePassword: !queryTokenParams
      ? Yup.string()
      : Yup.string()
          .required("Vui lòng nhập mật khẩu")
          .oneOf([Yup.ref("password")], "Mật khẩu không khớp."),
  });

  type FormData = Yup.InferType<typeof schemaForgot>;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schemaForgot),
    defaultValues: { email: "", password: "", rePassword: "" },
  });

  const onSubmit = (data: FormData) => {
    if (captcha === "") {
      setRefreshReCaptcha((r) => !r);
    } else {
      const newData: IForgot = {
        ...data,
        recaptcha: captcha,
        platform: "CLIENT",
        token: queryTokenParams,
      };
      if (queryTokenParams) {
        mutate(_.omit(newData, "email"));
      } else {
        mutate(_.omit(newData, "password", "token"));
      }
    }
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: (body: IForgot) => authApi.forgot(body),
    onSuccess: () => {
      setRefreshReCaptcha((r) => !r);
      if (!queryTokenParams) {
        toast.info("Mã xác thực đã được gửi đến Email của bạn");
      } else {
        toast.success("Thay đổi mật khẩu thành công");
        setTimeout(() => {
          router.push("/auth/login");
        }, 1000);
      }
    },
    onError: (err: AxiosCusError<ResError>) => {
      setRefreshReCaptcha((r) => !r);
      toast.error(`
        ${
          Array.isArray(err.response.data.message)
            ? err.response.data.message[0]
            : err.response.data.message
        },
      `);
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
        <Container>
          <div className={style.loginWraper}>
            {/* <div className={style.loginLeft}></div> */}
            <div className={style.loginRight}>
              <form
                className={style.loginForm}
                onSubmit={handleSubmit(onSubmit)}
              >
                <p className={style.loginTitle}>
                  {queryTokenParams ? "Đổi mật khẩu" : "Lấy lại mật khẩu"}
                </p>

                {queryTokenParams ? (
                  <>
                    <div className={style.wrapInput}>
                      <input
                        {...register("password")}
                        type="password"
                        placeholder="Mật khẩu"
                        className={style.input}
                      />
                      {errors.password && (
                        <p className={style.textErr}>
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                    <div className={style.wrapInput}>
                      <input
                        {...register("rePassword")}
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        className={style.input}
                      />
                      {errors.rePassword && (
                        <p className={style.textErr}>
                          {errors.rePassword.message}
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <div className={style.wrapInput}>
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
                )}

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
                    {queryTokenParams ? "Đổi mật khẩu" : "Lấy lại mật khẩu"}
                  </LoadingButton>
                  <div className={style.wrapInput}>
                    <p className={style.formRegisText}>
                      Bạn đã có có tài khoản?{" "}
                      <Link href="/auth/login">Đăng nhập ngay</Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Container>
        <GoogleReCaptcha
          refreshReCaptcha={refreshReCaptcha}
          onVerify={verifyRecaptchaCallback}
        />
      </GoogleReCaptchaProvider>
    </>
  );
};
ForgotPage.Layout = SignLayout;
export default ForgotPage;
