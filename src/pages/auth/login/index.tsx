import { NextPageWithLayout } from "@/common";
import { baseURL } from "@/configs";
import { ILogin } from "@/interfaces/index.type";
import { SignLayout } from "@/layouts";
import { authApi } from "@/services";
import { IProfileState } from "@/store/zustand/type";
import { useProfileStore } from "@/store/zustand";
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
import { toast } from "react-toastify";
import Image from "next/image";
import { imgs } from "@/assets/imgs";

const LoginPage: NextPageWithLayout = () => {
  const router = useRouter();
  const IS_MB = useMediaQuery("(max-width:767px)");
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
      toast.error("Email hoặc mật khẩu không đúng! Vui lòng thử lại");
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
      <Container>
        <div className={style.loginWraper}>
          <div className={style.loginLeft}>
            <div  className={style.banner}>
              <Image
                src={imgs.imgBanner}
                alt="Picture of the author"
                sizes="500px"
                fill
                style={{
                  objectFit: 'contain',
                }}
              />
            </div>
          </div>
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
                    padding: IS_MB ? "13px 20px" : "20px 14px",
                    borderRadius: "8px",
                  }}
                  fullWidth
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
                    padding: IS_MB ? "10px 20px" : "14px",
                    backgroundColor: "transparent",
                    borderRadius: "8px",
                    color: "var(--primary)",
                  }}
                  startIcon={<FcGoogle size={IS_MB ? 24 : 30} />}
                  fullWidth
                  loading={isLoading}
                  variant="contained"
                  onClick={() => onLoginSocial("/auth/login/google")}
                >
                  Đăng nhập với Google
                </LoadingButton>
              </div>
              <div className={style.wrapInput}>
                <p className={style.formRegisText}>
                  Bạn chưa có tài khoản?
                  <Link style={{marginLeft: "6px"}} href="/auth/register">Đăng ký ngay</Link>
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
