import { NextPageWithLayout } from "@/common";
import { AlertNoti, Card, Seo } from "@/components";
import { ProfileLayout } from "@/layouts";
// import { useProfileStore } from "@/store/zustand";
// import { IProfileState } from "@/store/zustand/type";
import { useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import style from "./style.module.css";
import { ProfileAddForm } from "@/components/page/profile";
import { useQuery } from "react-query";
import { addressUserApi } from "@/services";
import { Button, Chip, IconButton } from "@mui/material";
import { IAddressUser } from "@/interfaces/index.type";
import { QR_KEY } from "@/constants";
import { useAlert } from "@/hooks/useAlert";
import { BiSolidEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
const Address: NextPageWithLayout = () => {
  const [open, setOpen] = useState<boolean>(false);
  // const [isLoading] = useProfileStore((state: IProfileState) => [
  //   state.isLoading,
  // ]);
  const { resultLoad, onCloseNoti, noti } = useAlert();

  const { data: addressData } = useQuery({
    queryKey: [QR_KEY.GET_ADDRESS],
    queryFn: () =>
      addressUserApi.getAddress({
        page: 1,
        limit: 15,
        status: true,
        is_default: true,
      }),
    onError: () => {
      resultLoad({
        message: "Có lỗi xảy ra vui lòng thử lại!",
        color: "error",
      });
    },
  });

  console.log("addressData :>> ", addressData?.context.data);

  return (
    <>
      <AlertNoti
        open={noti.openAlert}
        close={onCloseNoti}
        severity={noti.color}
        message={noti.message}
      />
      <Seo title="Địa chỉ giao hàng" description="" url="" />

      <Card title={"Địa chỉ giao hàng"}>
        <div className={style.address}>
          <ul className={style.address_list}>
            {addressData &&
              addressData?.context?.data?.map(
                (item: IAddressUser, index: number) => (
                  <li key={index} className={style.address_item}>
                    <div className={style.address_item_left}>
                      <div className={style.address_item_name_tele}>
                        <span style={{ minWidth: "0" }}>
                          <div className={style.address_item_name}>
                            {item?.consignee_s_name}
                          </div>
                        </span>
                        <div style={{ color: "grey", padding: "0 8px" }}>|</div>
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
                      {item.is_default && (
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
                        <IconButton color="primary">
                          <BiSolidEdit size={22} />
                        </IconButton>
                        <IconButton color="primary">
                          <MdDeleteForever size={22} />
                        </IconButton>
                      </div>
                      <div className={style.address_right_default}>
                        <Chip
                          size="small"
                          label={"Đặt làm mặc định"}
                          color={"default"}
                          variant="filled"
                          />
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
        </div>
      </Card>
      {open && <ProfileAddForm open={open} setOpen={setOpen} />}
    </>
  );
};
export default Address;
Address.Layout = ProfileLayout;