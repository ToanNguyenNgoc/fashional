import { NextPageWithLayout } from "@/common";
import { Card, DialogCustom, Seo } from "@/components";
import { IProfileState } from "@/store/zustand/type";
import { useProfileStore } from "@/store/zustand/useProfileStore";
import { ProfileLayout } from "@/layouts";
import { BsPlusCircle, BsXLg } from "react-icons/bs";
import style from "./style.module.css";
import { useState } from "react";

const History: NextPageWithLayout = () => {
  const [isLoading] = useProfileStore((state: IProfileState) => [
    state.isLoading,
  ]);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Seo title="Địa chỉ giao hàng" description="" url="" />
      {!isLoading && (
        <Card title={"Địa chỉ giao hàng"}>
          <div className={style.address}>
            <div onClick={() => setOpen(true)} className={style.address_create}>
              <BsPlusCircle size={20} />
              <p>Thêm mới địa chỉ</p>
            </div>
          </div>
        </Card>
      )}
      <DialogCustom setOpen={setOpen} open={open} title={"Thêm mới địa chỉ"}>
        <div style={{ width: "500px"}}>ok</div>
      </DialogCustom>
    </>
  );
};
export default History;
History.Layout = ProfileLayout;
