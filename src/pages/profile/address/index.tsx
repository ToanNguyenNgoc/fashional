import { NextPageWithLayout } from "@/common";
import { AlertNoti, Card, DialogCustom, Seo } from "@/components";
import { ProfileAddForm } from "@/components/page/profile";
import { QR_KEY } from "@/constants";
import { useAlert } from "@/hooks/useAlert";
import { IAddressUser, IAddressUserDetail } from "@/interfaces/index.type";
import { ProfileLayout } from "@/layouts";
import { addressUserApi } from "@/services";
import { Button, Chip } from "@mui/material";
import { useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import style from "./style.module.css";
import { useRouter } from "next/router";
import { useProfileStore } from "@/store/zustand";
import { IProfileState } from "@/store/zustand/type";
const Address: NextPageWithLayout = () => {
  const invalidateQueries = useQueryClient();
  const router = useRouter()
  const [open, setOpen] = useState<boolean>(false);
  const [ profile] = useProfileStore((state: IProfileState) => [
    state.profile,
  ]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [itemAddress, setItemAddress] = useState<IAddressUser>();
  const { resultLoad, onCloseNoti, noti } = useAlert();
  const { data: addressData } = useQuery({
    queryKey: [QR_KEY.GET_ADDRESS],
    enabled: !!profile,
    queryFn: () =>
      addressUserApi.getAddress({
        page: 1,
        limit: 15,
        status: true,
        is_default: true,
      }),
    onSuccess: (res) => {
      const findItem = res?.context?.data?.find(
        (item: IAddressUserDetail) => item?.id === Number(router?.query?.id)
      );
      if (findItem) {
        setOpen(true);
      } else {
        router.push(`${router.pathname}`);
      }
    },
    onError: () => {
      resultLoad({
        message: "Có lỗi xảy ra vui lòng thử lại!",
        color: "error",
      });
    },
  });

  const { mutate: deleteAddress, isLoading:isLoadingDeleteAddress } = useMutation({
    mutationFn: (id: number) => addressUserApi.deleteAddress(id),
    onSuccess: () => {
      resultLoad({
        message: "Xóa địa chỉ thành công",
        color: "success",
      });
      invalidateQueries.invalidateQueries([QR_KEY.GET_ADDRESS]);
      setOpenConfirmDialog(false);
    },
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

      <Seo title="Địa chỉ giao hàng" description="" url="" />

      <Card title={"Địa chỉ giao hàng"}>
        <ul className={style.address_list}>
          {addressData &&
            addressData?.context?.data?.map(
              (item: IAddressUserDetail, index: number) => (
                <li
                  key={index}
                  style={
                    item?.is_default === true
                      ? { borderBottom: "1px solid var(--green)" }
                      : {}
                  }
                  className={style.address_item}
                >
                  <div className={style.address_item_left}>
                    <div className={style.address_item_name_tele}>
                      <span style={{ minWidth: "0" }}>
                        <div className={style.address_item_name}>
                          {item?.consignee_s_name}
                        </div>
                      </span>
                      <div
                        className={style.lineHorizontal}
                        style={{ color: "grey", padding: "0 8px" }}
                      >
                        |
                      </div>
                      <span className={style.address_item_tele}>
                        {item?.consignee_s_telephone}
                      </span>
                    </div>
                    <p className={style.address_item_detail}>
                      {item?.short_address}
                    </p>
                    <p className={style.address_item_detail}>
                      <span>{item?.ward?.name}</span>,{" "}
                      <span>{item?.province?.name}</span>,{" "}
                      <span>{item?.district?.name}</span>.
                    </p>

                    {item.is_default !== true ? (
                      <div className={style.address_right_default}>
                        <Chip
                          size="small"
                          label={"Đặt làm mặc định"}
                          color={"default"}
                          variant="filled"
                        />
                      </div>
                    ) : (
                      <div className={style.address_item_chip}>
                        <Chip
                          size="small"
                          label={"Mặc định"}
                          color={"success"}
                          variant="filled"
                        />
                      </div>
                    )}
                  </div>
                  <div className={style.address_item_right}>
                    <div className={style.address_right_btns}>
                      <Button
                        onClick={() => {
                          setOpen(true),
                            router.push(`${router.pathname}/${item.id}`);
                        }}
                        size="medium"
                        variant="text"
                        sx={{
                          textTransform: "capitalize",
                          minWidth: "unset",
                        }}
                      >
                        Sửa
                      </Button>

                      {(addressData.context.data.length === 1 && (
                        <Button
                          sx={{
                            textTransform: "capitalize",
                            minWidth: "unset",
                          }}
                          size="medium"
                          onClick={() => {
                            setOpenConfirmDialog(true);
                            setItemAddress(item);
                          }}
                          variant="text"
                          color="error"
                        >
                          Xoá
                        </Button>
                      )) ||
                        (addressData.context.data.length > 1 &&
                          !item.is_default && (
                            <Button
                              sx={{
                                textTransform: "capitalize",
                                minWidth: "unset",
                              }}
                              size="medium"
                              onClick={() => {
                                setOpenConfirmDialog(true);
                                setItemAddress(item);
                              }}
                              variant="text"
                              color="error"
                            >
                              Xoá
                            </Button>
                          ))}
                    </div>
                  </div>
                </li>
              )
            )}
        </ul>
        <div onClick={() => setOpen(true)} className={style.address_create}>
          <BsPlusCircle size={20} />
          <p>Thêm địa chỉ mới</p>
        </div>
      </Card>

      {open && <ProfileAddForm open={open} setOpen={setOpen} />}

      <DialogCustom
        handleAgree={() => itemAddress && deleteAddress(itemAddress.id)}
        open={openConfirmDialog}
        setOpen={setOpenConfirmDialog}
        action={true}
        title={"Xác nhận xóa"}
        txtBtnCancer={"Hủy"}
        txtBtnAgree={"Xóa"}
        isLoading={isLoadingDeleteAddress}
      >
        <p>Bạn có muốn xóa địa chỉ này!</p>
      </DialogCustom>
    </>
  );
};

export default Address;
Address.Layout = ProfileLayout;
