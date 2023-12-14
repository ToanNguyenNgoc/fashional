import { QR_KEY } from "@/constants";
import {
  IAddressUserDetail,
  IParamsPostAddressUser,
} from "@/interfaces/index.type";
import { IDistricts, IProvinces, IWards } from "@/interfaces/provinces.type";
import { addressUserApi, provincesApi } from "@/services";
import { useProfileStore } from "@/store/zustand";
import { IProfileState } from "@/store/zustand/type";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import * as Yup from "yup";
import style from "./style.module.css";

interface IFormData extends IParamsPostAddressUser {}

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  addressData: IAddressUserDetail[] | undefined;
	idAddressUrl: number;
}

export default function AddressForm(props:IProps) {
  const { open, setOpen, addressData, idAddressUrl } = props;
  const router = useRouter();
	const queryClient = useQueryClient();
  const [profile] = useProfileStore((state: IProfileState) => [state.profile]);

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

  const defaultInputForm: IFormData = {
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
    getValues,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<IFormData>({
    defaultValues: defaultInputForm,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: IFormData) => {
    if (data) {
      const transData = {
        ...data,
        province_code: Number(data.province_code),
        ward_code: Number(data.ward_code),
        district_code: Number(data.district_code),
        is_default:
          !!idAddressUrl === false && addressData && addressData.length === 0
            ? true
            : data.is_default,
        id: idAddressUrl,
      };
      !!idAddressUrl
        ? await updateAddress(transData)
        : await postAddress(transData);
    }
  };

  const handleProvinceChange = async (selectedProvinceId: any) => {
    setValue("province_code", selectedProvinceId);
    setValue("district_code", defaultInputForm.district_code);
    setValue("ward_code", defaultInputForm.ward_code);
    clearErrors([
      "province_code",
      "district_code",
      "ward_code",
      "short_address",
    ]);
  };

  const handleDistrictChange = async (selectedDistrictId: any) => {
    setValue("district_code", selectedDistrictId);
    setValue("ward_code", defaultInputForm.ward_code);
    clearErrors([
      "province_code",
      "district_code",
      "ward_code",
      "short_address",
    ]);
  };

  const { mutate: postAddress, isLoading: isLoadingAddAddress } = useMutation({
    mutationFn: (data: IFormData) => addressUserApi.postAddress(data),
    onSuccess: () => {
      reset(defaultInputForm);
      setOpen(false);
      toast.success("Thêm địa chỉ thành công");
      router.push(`${router.pathname}`);
      queryClient.invalidateQueries([QR_KEY.GET_ADDRESS]);
    },
    onError: () => {
      toast.error("Có lỗi xảy ra vui lòng thử lại sau");
    },
  });

  const { mutate: updateAddress, isLoading: isLoadingUpateAddress } = useMutation({
    mutationFn: (data: IFormData) => addressUserApi.putAddress(data),
    onSuccess: () => {
      setOpen(false);
      router.push(router.pathname);
      toast.success("Thay đổi thành công");
      queryClient.invalidateQueries([QR_KEY.GET_ADDRESS]);
    },
    onError: () => {
      toast.error("Có lỗi xảy ra vui lòng thử lại sau");
    },
  });

  const { data: dataGetAddressById } = useQuery({
    queryKey: [QR_KEY.GET_ADDRESS_BY_ID],
    enabled: !!idAddressUrl,
    queryFn: () => addressUserApi.getAddressById(idAddressUrl),
    onSuccess: (data) => {
      setValue("consignee_s_name", data.context.consignee_s_name);
      setValue("consignee_s_telephone", data.context.consignee_s_telephone);
      setValue("province_code", data.context.province_code);
      setValue("district_code", data.context.district_code);
      setValue("ward_code", data.context.ward_code);
      setValue("short_address", data.context.short_address);
      setValue("is_default", data.context.is_default);
    },
    onError: () => {
      toast.error("Có lỗi xảy ra vui lòng thử lại sau");
    },
  });

  const { data: provincesData } = useQuery({
    queryKey: ["PROVINCES"],
    queryFn: () => provincesApi.getProvinces(),
    enabled: !!open,
    onError: () => {
      toast.error("Có lỗi xảy ra vui lòng thử lại sau");
    },
  });

  const { data: districtsData } = useQuery({
    queryKey: ["DISTRICTS", Number(getValues("province_code")) ],
    enabled: !!Number(getValues("province_code")),
    queryFn: () => provincesApi.getDistricts(Number(getValues("province_code"))),
    onError: () => {
      toast.error("Có lỗi xảy ra vui lòng thử lại sau");
    },
  });

  const { data: wardsData } = useQuery({
    queryKey: ["WARDS", Number(getValues("district_code"))],
    enabled: !!Number(getValues("district_code")),
    queryFn: () => provincesApi.getWards(Number(getValues("district_code"))),
    onError: () => {
      toast.error("Có lỗi xảy ra vui lòng thử lại sau");
    },
  });

  return (
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
                  <MenuItem key={index} value={item.code}>
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
        disabled={!!Number(getValues("province_code")) ? false : true}
        fullWidth
        error={
          (!!Number(getValues("province_code")) ? true : false) &&
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
                  <MenuItem key={index} value={item.code}>
                    {item.name}
                  </MenuItem>
                )
              )}
            </Select>
          )}
        />
        {errors.district_code && !!Number(getValues("province_code")) && (
          <FormHelperText>{errors.district_code.message}</FormHelperText>
        )}
      </FormControl>
      {/* close field district */}
      {/* field wards */}
      <FormControl
        disabled={!!Number(getValues("district_code")) ? false : true}
        fullWidth
        error={
          (!!Number(getValues("district_code")) ? true : false) && !!errors.ward_code
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
              {wardsData?.context?.data.map((item: IWards, index: number) => (
                <MenuItem key={index} value={item.code}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {errors.ward_code && !!Number(getValues("district_code")) && (
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
            helperText={errors.short_address && errors.short_address.message}
            size="medium"
          />
        )}
      />
      {/* close field address */}
      {/* field  switch*/}
      <Tooltip
        title={
          !!idAddressUrl && dataGetAddressById?.context.is_default
            ? "Vui lòng chọn địa chỉ khác để đặt làm địa chỉ mặc định"
            : ""
        }
        placement="top-start"
      >
        <div className={style.form_checkbox}>
          <Controller
            name="is_default"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                disabled={
                  !!idAddressUrl && dataGetAddressById?.context.is_default
                    ? true
                    : false
                }
                checked={
                  addressData && addressData?.length === 0 ? true : value
                }
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
  );
}
