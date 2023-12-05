import { Alert, AlertColor, Snackbar } from "@mui/material";
import { ReactNode } from "react";

interface AlertProps {
  open?: boolean;
  close?: () => void;
  severity?: AlertColor;
  children?: ReactNode;
  message?: string;
  variant?: "filled" | "standard" | "outlined";
  vertical?: "bottom" | "top";
  horizontal?: "center" | "left" | "right";
}

export function AlertNoti(props: AlertProps) {
  const { open = false, close, severity = "info", children, message, vertical = "top", horizontal = "right" } = props;
  const handleClose = () => {
    if (close) {
      close();
    }
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert
        variant="filled"
        onClose={handleClose}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {message || children}
      </Alert>
    </Snackbar>
  );
}
