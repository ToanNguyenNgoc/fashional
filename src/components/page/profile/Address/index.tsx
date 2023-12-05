import { AlertNoti, DialogCustom } from "@/components";
import { QR_KEY } from "@/constants";
import { useAlert } from "@/hooks";
import { IParamsPostAddressUser } from "@/interfaces/index.type";
import { IDistricts, IProvinces, IWards } from "@/interfaces/provinces.type";
import { addressUserApi, provincesApi } from "@/services";
import { useProfileStore } from "@/store/zustand";
import { IProfileState } from "@/store/zustand/type";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Button, Checkbox, FormHelperText, TextField, Tooltip } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as Yup from "yup";
import style from "./style.module.css";
interface IFormData extends IParamsPostAddressUser {}
interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const ProfileAddForm = (props: IProps) => {
  const router = useRouter();
  const idAddressUrl = Number(router?.query?.id);
  const queryClient = useQueryClient();
  const { open, setOpen } = props;
  const [profile] = useProfileStore((state: IProfileState) => [state.profile]);
  const { resultLoad, onCloseNoti, noti } = useAlert();
  const [provinceID, setProvinceID] = useState<number>(0);
  const [districtID, setDistrictID] = useState<number>(0);

  const validationSchema: any = Yup.object().shape({
    consignee_s_name: Yup.string()
      .required("Vui lòng nhập tên")
      .min(2, "Họ tên phải có ít nhất 2 ký tự")
      .max(50, "Họ tên không được vượt quá 50 ký tự")
      .matches(
        /^[^<>]+$/,
        "Tên không được chứa các ký tự đặc biệt như < hoặc >"
      ),
    consignee_s_telephone: Yup.string()
      .required("Vui lòng nhập số điện thoại")
      .matches(
        /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
        "Số điện thoại sai định dạng"
      ),
    province_code: Yup.string().required("Vui lòng chọn Tỉnh/Thành phố"),
    district_code: Yup.string().required("Vui lòng chọn Phường/Xã"),
    ward_code: Yup.string().required("Vui lòng chọn Quận/Huyện"),
    short_address: Yup.string().required("Vui lòng nhập địa chỉ đầy đủ"),
  });

  const defaultInputForm = {
    consignee_s_name: profile?.fullname || "",
    consignee_s_telephone: profile?.telephone || "",
    short_address: "",
    province_code: "",
    district_code: "",
    ward_code: "",
    is_default: false,
    lat: 0,
    long: 0,
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<IFormData>({
    defaultValues: defaultInputForm,
    resolver: yupResolver(validationSchema),
  });

  const { mutate: postAddress, isLoading: isLoadingAddAddress } = useMutation({
    mutationFn: (data: IFormData) => addressUserApi.postAddress(data),
    onSuccess: async () => {
      reset(defaultInputForm);
      setOpen(false);
      setProvinceID(0);
      setDistrictID(0);
      resultLoad({
        message: "Thêm địa chỉ thành công",
        color: "success",
      });
      await queryClient.invalidateQueries([QR_KEY.GET_ADDRESS]);
    },
    onError: () => {
      resultLoad({
        message: "Có lỗi xảy ra vui lòng thử lại!",
        color: "error",
      });
    },
  });

  const { mutate: updateAddress, isLoading: isLoadingUpateAddress } =
    useMutation({
      mutationFn: (data: IFormData) =>
        addressUserApi.putAddress(data, idAddressUrl),
      onSuccess: async() => {
        setOpen(false);
        router.push(router.pathname);
        resultLoad({
          message: "Cập nhật địa chỉ thành công",
          color: "success",
        });
      await queryClient.invalidateQueries([QR_KEY.GET_ADDRESS]);
      },
      onError: () => {
        resultLoad({
          message: "Có lỗi xảy ra vui lòng thử lại!",
          color: "error",
        });
      },
    });

  const onSubmit = async (data: IFormData) => {
    if (data) {
      const transData = {
        ...data,
        province_code: data.province_code && +data.province_code,
        ward_code: data.ward_code && +data.ward_code,
        district_code: data.district_code && +data.district_code,
      };
      (await !!idAddressUrl)
        ? updateAddress(transData)
        : postAddress(transData);
    }
  };

  const handleSelectProvinceId = (id: number) => {
    setProvinceID(id);
  };

  const handleSelectDistricts = (id: number) => {
    setDistrictID(id);
  };

  const handleProvinceChange = async (selectedProvinceId: any) => {
    setValue("province_code", selectedProvinceId);
    setDistrictID(0);
    setValue("district_code", "");
    setValue("ward_code", "");
    clearErrors([
      "province_code",
      "district_code",
      "ward_code",
      "short_address",
    ]);
  };

  const handleDistrictChange = async (selectedDistrictId: any) => {
    setValue("district_code", selectedDistrictId);
    setValue("ward_code", "");
    clearErrors([
      "province_code",
      "district_code",
      "ward_code",
      "short_address",
    ]);
  };

  const { data: dataGetAddressById } = useQuery({
    queryKey: [QR_KEY.GET_ADDRESS_BY_ID],
    enabled: !!idAddressUrl,
    queryFn: () => addressUserApi.getAddressById(idAddressUrl),
    onSuccess: (data) => {
      console.log('data :>> ', data?.context?.is_default);
      setProvinceID(data.context.province_code);
      setDistrictID(data.context.district_code);
      setValue("consignee_s_name", data.context.consignee_s_name);
      setValue("consignee_s_telephone", data.context.consignee_s_telephone);
      setValue("province_code", data.context.province_code);
      setValue("district_code", data.context.district_code);
      setValue("ward_code", data.context.ward_code);
      setValue("short_address", data.context.short_address);
      setValue("is_default", data.context.is_default);
    },
    onError: () => {
      resultLoad({
        message: "Có lỗi xảy ra vui lòng thử lại!",
        color: "error",
      });
    },
  });

  const { data: provincesData } = useQuery({
    queryKey: ["PROVINCES"],
    queryFn: () => provincesApi.getProvinces(),
    enabled: !!open,
    staleTime: 60 * 12,
    onError: () => {
      resultLoad({
        message: "Có lỗi xảy ra vui lòng thử lại!",
        color: "error",
      });
    },
  });

  const { data: districtsData } = useQuery({
    queryKey: ["DISTRICTS", provinceID],
    enabled: provinceID > 0,
    staleTime: 60 * 12,
    queryFn: () => provincesApi.getDistricts(provinceID),
    onError: () => {
      resultLoad({
        message: "Có lỗi xảy ra vui lòng thử lại!",
        color: "error",
      });
    },
  });

  const { data: wardsData } = useQuery({
    queryKey: ["WARDS", districtID],
    enabled: districtID > 0,
    staleTime: 60 * 12,
    queryFn: () => provincesApi.getWards(districtID),
    onError: () => {
      resultLoad({
        message: "Có lỗi xảy ra vui lòng thử lại!",
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
        horizontal="center"
        vertical="bottom"
      />

      <DialogCustom
        setOpen={setOpen}
        open={open}
        title={idAddressUrl ? "Thay đổi địa chỉ" : "Thêm địa chỉ mới"}
      >
        <form
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          className={style.wrap_form}
        >
          <div className={style.rowInput}>
            {/* field address */}
            <Controller
              name="consignee_s_name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Họ và tên"
                  variant="outlined"
                  fullWidth
                  error={!!errors.consignee_s_name}
                  helperText={
                    errors.consignee_s_name && errors.consignee_s_name.message
                  }
                  size="medium"
                />
              )}
            />
            {/* close field address */}
            {/* field address */}
            <Controller
              name="consignee_s_telephone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Số điện thoại"
                  variant="outlined"
                  fullWidth
                  error={!!errors.consignee_s_telephone}
                  helperText={
                    errors.consignee_s_telephone &&
                    errors.consignee_s_telephone.message
                  }
                  size="medium"
                />
              )}
            />
            {/* close field address */}
          </div>
          {/* field provinces */}
          <FormControl fullWidth error={!!errors.province_code}>
            <InputLabel>Tỉnh/Thành phố *</InputLabel>
            <Controller
              name="province_code"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Tỉnh/Thành phố *"
                  value={field.value || ""}
                  onChange={(e) => handleProvinceChange(e.target.value)}
                >
                  {provincesData?.context?.data.map(
                    (item: IProvinces, index: number) => (
                      <MenuItem
                        onClick={() => handleSelectProvinceId(item.code)}
                        key={index}
                        value={item.code}
                      >
                        {item.name}
                      </MenuItem>
                    )
                  )}
                </Select>
              )}
            />
            {errors.province_code && (
              <FormHelperText>{errors.province_code.message}</FormHelperText>
            )}
          </FormControl>
          {/* close field provinces */}
          {/* field districts */}
          <FormControl
            disabled={provinceID && provinceID > 0 ? false : true}
            fullWidth
            error={
              (provinceID && provinceID > 0 ? true : false) &&
              !!errors.district_code
            }
          >
            <InputLabel>Phường/Xã *</InputLabel>
            <Controller
              name="district_code"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => handleDistrictChange(e.target.value)}
                  label="Phường/Xã *"
                >
                  {districtsData?.context?.data.map(
                    (item: IDistricts, index: number) => (
                      <MenuItem
                        onClick={() => handleSelectDistricts(item.code)}
                        key={index}
                        value={item.code}
                      >
                        {item.name}
                      </MenuItem>
                    )
                  )}
                </Select>
              )}
            />
            {errors.district_code && provinceID > 0 && (
              <FormHelperText>{errors.district_code.message}</FormHelperText>
            )}
          </FormControl>
          {/* close field district */}
          {/* field wards */}
          <FormControl
            disabled={districtID && districtID > 0 ? false : true}
            fullWidth
            error={
              (districtID && districtID > 0 ? true : false) &&
              !!errors.ward_code
            }
          >
            <InputLabel>Quận/Huyện *</InputLabel>
            <Controller
              name="ward_code"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  label="Quận/Huyện *"
                >
                  {wardsData?.context?.data.map(
                    (item: IWards, index: number) => (
                      <MenuItem key={index} value={item.code}>
                        {item.name}
                      </MenuItem>
                    )
                  )}
                </Select>
              )}
            />
            {errors.ward_code && districtID > 0 && (
              <FormHelperText>{errors.ward_code.message}</FormHelperText>
            )}
          </FormControl>
          {/* close field wards */}
          {/* field address */}
          <Controller
            name="short_address"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Địa chỉ đầy đủ"
                variant="outlined"
                fullWidth
                error={!!errors.short_address}
                helperText={
                  errors.short_address && errors.short_address.message
                }
                size="medium"
              />
            )}
          />
          {/* close field address */}
          {/* field  switch*/}
          <Tooltip
            title={
              dataGetAddressById && dataGetAddressById?.context?.is_default
                ? "Vui lòng chọn địa chỉ khác để đặt mặc định"
                : ""
            }
            placement="top-start"
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Controller
                name="is_default"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    disabled={
                      dataGetAddressById &&
                      dataGetAddressById?.context?.is_default
                    }
                    checked={value}
                    onChange={onChange}
                  />
                )}
              />
              <label>Đặt làm địa chỉ mặc định</label>
            </div>
          </Tooltip>
          {/* close field  switch*/}

          {/* action btns */}
          <div className={style.wrap_btn}>
            <Button
              type="button"
              size="medium"
              variant="outlined"
              onClick={() => {
                setOpen(false), router.push(`${router.pathname}`);
              }}
            >
              Đóng
            </Button>
            <LoadingButton
              type="submit"
              size="medium"
              loading={isLoadingAddAddress || isLoadingUpateAddress}
              variant="contained"
            >
              <span>Lưu</span>
            </LoadingButton>
          </div>
          {/* close actions */}
        </form>
      </DialogCustom>
    </>
  );
};
