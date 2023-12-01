import { NextPageWithLayout } from "@/common";
import { Card, Seo } from "@/components";
import { ProfileLayout } from "@/layouts";
import { IProfileState } from "@/store/zustand/type";
import { useProfileStore } from "@/store/zustand";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import style from "./style.module.css";

interface FormData {
  name: string;
  email: string;
  phone: string;
}

const EditProfile: NextPageWithLayout = () => {
  const [isLoading, profile] = useProfileStore((state: IProfileState) => [
    state.isLoading,
    state.profile,
  ]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: profile?.fullname ?? '',
      email: profile?.email ?? '',
      phone: profile?.telephone ?? '',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <>
      <Seo title="Thông tin tài khoản" description="" url="" />
      {!isLoading && (
        <div className={style.account_page_body}>
          <Card title={"Thông tin tài khoản"}>
            <div className={style.edit_profile_body}>
              <form
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
                className={style.form_input}
              >
                <div className={style.rowInput}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="name"
                        label="Họ và tên"
                        variant="outlined"
                        fullWidth
                        error={!!errors.name}
                        helperText={errors?.name?.message}
                        size="medium"
                      />
                    )}
                  />
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="phone"
                        label="Số điện thoại"
                        variant="outlined"
                        fullWidth
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                        size="medium"
                      />
                    )}
                  />
                </div>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="email"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      size="medium"
                    />
                  )}
                />

                {!isLoading && (
                  <Button
                    className={style.button}
                    type="submit"
                    variant="contained"
                  >
                    Lưu
                  </Button>
                )}
              </form>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};
export default EditProfile;
EditProfile.Layout = ProfileLayout;
