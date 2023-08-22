import { AlertNoti } from "@/components";
import { useAlert } from "@/hooks/useAlert";
import { authApi } from "@/services";
import { validate } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Container } from "@mui/material";
import { AxiosError } from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as Yup from "yup";
import style from "../style.module.css";
import { IRegister } from "@/interfaces";

export default function RegisterPage() {
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
    //   .matches(validate.password, {
    //     message:
    //       "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 kí tự",
    //   }),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { email: "", password: "", fullname: "", telephone: "" },
  });

  const onSubmit = (data: IRegister) => {
    mutate(data);
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: (body: IRegister) => authApi.register(body),
    onSuccess: async () => {
      reset();
      resultLoad({
        message: "Đăng ký thành công",
        color: "success",
      });
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>;
      resultLoad({
        message: err.response?.data?.message ?? "",
        color: "error",
      });
    },
  });

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
              <p className={style.loginTitle}>Đăng ký</p>
              <div className={style.formRow}>
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
                    <p className={style.textErr}>{errors.telephone.message}</p>
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
                    padding: "18px 14px",
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
    </>
  );
}
