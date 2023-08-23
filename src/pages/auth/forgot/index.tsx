import { AlertNoti } from "@/components";
import { useAlert } from "@/hooks/useAlert";
import { authApi } from "@/services";
import { validate } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Container } from "@mui/material";
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
import { IForgot } from "@/interfaces";
import { AxiosCusError } from "@/interfaces/res";
import _ from "lodash";

interface ResError {
  error: string;
  message: string[] | string;
  statusCode: number;
}
const ForgotPage = () => {
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  const { resultLoad, onCloseNoti, noti } = useAlert();
  const router = useRouter();
  const [captcha, setCaptcha] = useState("");
  const queryTokenParams = router.query.token as string | undefined;
  const verifyRecaptchaCallback = useCallback((token: string) => {
    setCaptcha(token);
  }, []);

  const validationSchema = Yup.object({
    email: queryTokenParams
      ? Yup.string()
      : Yup.string()
          .required("Vui lòng nhập email")
          .matches(validate.email, { message: "Vui lòng nhập đúng định dạng" }),
    password: !queryTokenParams
      ? Yup.string()
      : Yup.string().required("Vui lòng nhập mật khẩu"),
    rePassword: !queryTokenParams
      ? Yup.string()
      : Yup.string()
          .required("Vui lòng nhập mật khẩu")
          .oneOf([Yup.ref("password")], "Your passwords do not match."),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { email: "", password: "", rePassword: "" },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (body: IForgot) => authApi.forgot(body),
    onSuccess: () => {
      setRefreshReCaptcha((r) => !r);
      if (!queryTokenParams) {
        resultLoad({
          message: "Mã xác thực đã được gửi đến Email của bạn",
          color: "success",
        });
      }
      if (queryTokenParams) {
        resultLoad({
          message: "Thay đổi mật khẩu thành công",
          color: "success",
        });
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      }
    },
    onError: (err: AxiosCusError<ResError>) => {
      setRefreshReCaptcha((r) => !r);
      resultLoad({
        message: Array.isArray(err.response.data.message)
          ? err.response.data.message[0]
          : err.response.data.message,
        color: "error",
      });
    },
  });

  const onSubmit = (data: IForgot) => {
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
        mutate(_.omit(newData, "rePassword", "email"));
      } else {
        mutate(_.omit(newData, "password", "rePassword", "token"));
      }
    }
  };

  return (
    <>
      <AlertNoti
        open={noti.openAlert}
        close={onCloseNoti}
        severity={noti.color}
        message={noti.message}
      />
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
            <div className={style.loginLeft}></div>
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
                        {...register("password", { required: true })}
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
                        {...register("rePassword", { required: true })}
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
                      padding: "18px 14px",
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
export default ForgotPage;
