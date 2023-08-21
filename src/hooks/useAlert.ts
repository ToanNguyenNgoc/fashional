import { AlertColor } from "@mui/material";
import { useState } from "react";

interface Noti {
  load: boolean;
  message: string;
  openAlert: boolean;
  element?: React.ReactElement;
  color?: AlertColor;
}

interface ResultOptions {
  message?: string;
  element?: React.ReactElement;
  color?: AlertColor;
}

export function useAlert() {
  const [noti, setNoti] = useState<Noti>({
    load: false,
    message: "",
    openAlert: false,
    color: "info",
  });
  const firstLoad = () => setNoti({ ...noti, load: true });
  const resultLoad = (options: ResultOptions) => {
    setNoti({
      load: false,
      message: options.message ?? "",
      openAlert: true,
      element: options.element,
      color: options.color,
    });
  };
  const onCloseNoti = () => setNoti({ ...noti, openAlert: false });
  return { noti, firstLoad, resultLoad, onCloseNoti };
}
