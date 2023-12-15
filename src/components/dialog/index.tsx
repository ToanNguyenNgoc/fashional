import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import { SetStateAction } from "react";
import { BsXLg } from "react-icons/bs";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface IPropsDialog {
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  open: boolean;
  title?: string | number;
  txtBtnCancer?: string | number;
  txtBtnAgree?: string | number;
  children?: any;
  handleAgree?: () => void;
  type?: "submit | button";
  action?: boolean;
  isLoading?: boolean;
}

export const DialogCustom = (props: IPropsDialog) => {
  const {
    open,
    setOpen,
    title = "Modal title",
    txtBtnCancer = "Đóng",
    txtBtnAgree = "Lưu",
    children,
    handleAgree,
    type,
    action = false,
    isLoading = false,
  } = props;
  const router = useRouter()
  const handleClose = () => {
    setOpen(false);
    router.push(`${router.pathname}`)
  };

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <div style={{ position: "relative" }}>
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {title}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <BsXLg size={20} />
          </IconButton>
        </div>
        {/* dividers (line) */}
        <DialogContent>{children}</DialogContent>
        {action && (
          <DialogActions>
            <Button size="small" variant="outlined" onClick={handleClose}>
              {txtBtnCancer}
            </Button>
            {isLoading ? (
              <LoadingButton loading={isLoading} variant="contained">
                <span>{txtBtnAgree}</span>
              </LoadingButton>
            ) : (
              <Button size="small" variant="contained" onClick={handleAgree}>
                {txtBtnAgree}
              </Button>
            )}
          </DialogActions>
        )}
      </BootstrapDialog>
    </>
  );
};
