import { AlertNoti } from "@/components";
import { useAlert } from "@/hooks/useAlert";
import { ILogin } from "@/interfaces/auth";
import { authApi } from "@/services";
import { IProfileState } from "@/store/zustand/type";
import { useProfileStore } from "@/store/zustand/useProfileStore";
import { validate } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as Yup from "yup";
import style from "../style.module.css";
import { LoadingButton } from "@mui/lab";
import { Container } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";
import { baseURL } from "@/configs";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
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

      <Container>
        <div className={style.loginWraper}>
          <div className={style.loginLeft}></div>
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
                    padding: "18px 14px",
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
                    padding: "16px 14px",
                    width: "100%",
                    backgroundColor: "transparent",
                    borderRadius: "8px",
                    color: "var(--primary)",
                    fontWeight: "bold",
                  }}
                  loading={isLoading}
                  variant="contained"
                  onClick={() => onLoginSocial("auth/login/google")}
                >
                  <FcGoogle style={{ marginRight: "8px" }} size={29} />
                  Đăng nhập với google
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
}