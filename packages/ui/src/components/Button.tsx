import { ComponentPropsWithoutRef } from "react";
import { ColorConstantsKeyType } from "../types/tailwindColor";

const buttonStyleMap = {
  L: "h-48",
  M: "h-42",
  S: "h-40",
};

type ButtonSize = keyof typeof buttonStyleMap;

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  color: ColorConstantsKeyType;
  size?: ButtonSize;
  outlined?: boolean;
}

function getColorClasses(color: ColorConstantsKeyType, isOutlined: boolean): string {
  const [baseColor, shade] = color.split("-");

  if (isOutlined) {
    return `bg-transparent border-${baseColor}-${shade || "500"} text-${baseColor}-${shade || "500"}`;
  }
  return `bg-${baseColor}-${shade || "500"} border-${baseColor}-${shade || "500"} text-white`;
}

export default function Button({
  children,
  color,
  size = "L",
  outlined = false,
  type = "button",
  disabled,
  className,
  ...rest
}: ButtonProps) {
  const baseClasses =
    "flex justify-center items-center px-5 border border-solid rounded-md disabled:bg-gray-300 disabled:border-gray-300 disabled:text-gray-500 w-full";
  const sizeClasses = buttonStyleMap[size];

  const colorClasses = getColorClasses(color, outlined);

  const classes = `${baseClasses} ${sizeClasses} ${colorClasses} ${className || ""}`;

  return (
    <button type={type} disabled={disabled} className={classes} {...rest}>
      {children}
    </button>
  );
}
