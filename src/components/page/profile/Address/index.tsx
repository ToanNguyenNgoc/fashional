import { DialogCustom } from "@/components";
import AddressForm from "@/components/page/profile/Address/AddressForm";
import {
  IAddressUserDetail
} from "@/interfaces/index.type";
import { Drawer, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  addressData: IAddressUserDetail[] | undefined;
}

export const ProfileAddForm = (props: IProps) => {
  const { open, setOpen, addressData } = props;
  const router = useRouter();
  const idAddressUrl = Number(router?.query?.id);
  const IS_MB = useMediaQuery("(max-width:767px)");

  return (
    <>
      {IS_MB ? (
        <Drawer
          anchor={"bottom"}
          open={open}
          onClose={() => {
            setOpen(false);
            router.push(`${router.pathname}`);
          }}
        >
          <AddressForm
            open={open}
            setOpen={setOpen}
            idAddressUrl={idAddressUrl}
            addressData={addressData}
          />
        </Drawer>
      ) : (
        <DialogCustom
          setOpen={setOpen}
          open={open}
          title={idAddressUrl ? "Thay đổi địa chỉ" : "Thêm địa chỉ mới"}
        >
          <AddressForm
            open={open}
            setOpen={setOpen}
            idAddressUrl={idAddressUrl}
            addressData={addressData}
          />
        </DialogCustom>
      )}
    </>
  );
};
