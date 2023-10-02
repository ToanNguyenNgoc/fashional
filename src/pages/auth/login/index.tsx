import { NextPageWithLayout } from "@/common";
import { AlertNoti } from "@/components";
import { baseURL } from "@/configs";
import { useAlert } from "@/hooks/useAlert";
import { ILogin } from "@/interfaces/index.type";
import { MainLayout, SignLayout } from "@/layouts";
import { authApi } from "@/services";
import { IProfileState } from "@/store/zustand/type";
import { useProfileStore } from "@/store/zustand/useProfileStore";
import { validate } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Container, useMediaQuery } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useMutation } from "react-query";
import * as Yup from "yup";
import style from "../style.module.css";

const LoginPage: NextPageWithLayout = () => {
  const router = useRouter();
  const IS_MB = useMediaQuery("(max-width:767px)");
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
    //   .max(32, "Mật khẩu nhiều nhất 32 ký tự")
    //   .matches(validate.password, {
    //     message:
    //       "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 kí tự",
    //   }),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (body: ILogin) => authApi.login(body),
    onSuccess: async (res: any) => {
      Cookies.set("token_expired_at", res.context.token_expired_at, {
        secure: true,
      });
      Cookies.set("accessToken", res.context.accessToken, {
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

  const onLoginSocial = (path: string) => {
    if (typeof window !== "undefined") {
      window.location.assign(`${baseURL}${path}`);
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
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

      <Container>
        <div className={style.loginWraper}>
          {/* <div className={style.loginLeft}>
            <div className={style.banner}>
              <Image
                src={imgs.imgBanner}
                width={800}
                height={400}
                alt="Picture of the author"
              />
            </div>
          </div> */}
          <div className={style.loginRight}>
            <form className={style.loginForm} onSubmit={handleSubmit(onSubmit)}>
              <p className={style.loginTitle}>Đăng nhập</p>
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

              <div className={style.formRow}>
                <div className={style.formCheckbox}>
                  <Checkbox />
                  <p>Ghi nhớ đăng nhập</p>
                </div>
                <div className={style.formFogot}>
                  <Link href="/auth/forgot">Quên mật khẩu</Link>
                </div>
              </div>

              <div className={style.wrapInput}>
                <LoadingButton
                  type="submit"
                  style={{
                    backgroundColor: "var(--primary)",
                    padding: IS_MB ? "13px 20px" : "20px 14px",
                    width: "100%",
                    borderRadius: "8px",
                    fontWeight: "bold",
                  }}
                  loading={isLoading}
                  variant="contained"
                >
                  Đăng nhập
                </LoadingButton>
              </div>

              <div className={style.wrapInput}>
                <LoadingButton
                  style={{
                    border: "2px solid var(--primary)",
                    padding: IS_MB ? "10px 20px" : "14px 14px",
                    width: "100%",
                    backgroundColor: "transparent",
                    borderRadius: "8px",
                    color: "var(--primary)",
                    fontWeight: "bold",
                  }}
                  loading={isLoading}
                  variant="contained"
                  onClick={() => onLoginSocial("/auth/login/google")}
                >
                  <FcGoogle
                    style={{ marginRight: "8px" }}
                    size={IS_MB ? 24 : 30}
                  />
                  Đăng nhập với Google
                </LoadingButton>
              </div>
              <div className={style.wrapInput}>
                <p className={style.formRegisText}>
                  Bạn chưa có tài khoản?{" "}
                  <Link href="/auth/register">Đăng ký ngay</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};
LoginPage.Layout = SignLayout;
export default LoginPage;
