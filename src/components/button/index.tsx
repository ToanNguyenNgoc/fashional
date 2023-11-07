import React, { useRef } from "react";
import style from "./style.module.css";
interface IButtonProp {
  border?: number | string;
  borderRadius?: number | string;
  width?: number | string;
  height?: number | string;
  text?: string | number;
  isLoading?: boolean;
  hover?: boolean;
  color?: string;
  colorHover?: string;
  backgroundColor?: string;
  backgroundHover?: string;
  icon?: string;
  children?: React.ReactNode;
  size?: "SMALL" | "MEDIUM" | "LARGE";
  fontSize?: number | string;
  fontWeight?: number | string;
  handler?: () => void;
}
export default function ButtonCustom(props: IButtonProp) {
  const {
    border,
    borderRadius,
    width,
    height,
    text,
    isLoading = false,
    hover,
    color,
    colorHover,
    backgroundColor,
    backgroundHover = "white",
    icon,
    children,
    size = "MEDIUM",
    fontSize = "16",
    fontWeight,
    handler,
  } = props;

  const buttonRef = useRef<any>(null);

  let sizeClass = "";

  switch (size) {
    case "SMALL":
      sizeClass = style.smallButton;
      break;
    case "MEDIUM":
      sizeClass = style.mediumButton;
      break;
    case "LARGE":
      sizeClass = style.largeButton;
      break;
    default:
      break;
  }

  // const handleOnMouseEnter = () => {
  //   if (backgroundHover) {
  //     buttonRef?.current?.style?.backgroundColor = backgroundHover;
  //   }
  // }

  return (
    <button
      ref={buttonRef}
      disabled={isLoading}
      style={{
        width: width,
        height: height,
        border: border,
        borderRadius: borderRadius,
        color: color,
        backgroundColor: backgroundColor,
        opacity: isLoading ? 0.7 : 1,
        fontWeight: fontWeight,
        fontSize: `${fontSize}px`,
        cursor: isLoading ? "wait" : "pointer",
      }}
      // onMouseEnter={handleOnMouseEnter}
      // onMouseLeave={() => {
      //   if (backgroundHover) {
      //     buttonRef?.current?.style?.backgroundColor = backgroundColor;
      //   }
      // }}
      onClick={handler}
      className={`${style.buttonCustom} ${sizeClass}`}
    >
      {isLoading ? <p>Loading ...</p> : <p>{text}</p>}
    </button>
  );
}
