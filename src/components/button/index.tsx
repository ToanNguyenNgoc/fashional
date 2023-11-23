import * as React from "react";
import { Button } from "@mui/material";
import style from "./style.module.css";

interface IButtonProp {
  title?: string | number;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  variant?: "contained" | "outlined" | "text";
  onClick: () => void;  
}

export const ButtonCustom = (props: IButtonProp) => {
  const {
    title = "Button",
    disabled = false,
    size = "small",
    variant = "outlined",
    onClick,
  } = props;

  return (
    <div className={style.buttonCustom}>
      <Button
        onClick={onClick}
        disabled={disabled}
        size={size}
        variant={variant}
      >
        {title}
      </Button>
    </div>
  );
}
