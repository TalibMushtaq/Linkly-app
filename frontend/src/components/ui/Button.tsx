import type { ReactElement } from "react";

export interface ButtonProps {
  variant: "Primary" | "Secondary";
  size: "sm" | "md" | "lg" | "xl";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
}

const variantStyles = {
  Primary: "bg-purple-700 text-white hover:bg-purple-600",
  Secondary:
    "bg-purple-300 text-purple-700 hover:bg-purple-500 hover:text-white",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-2.5 text-base",
  xl: "px-9 py-3 text-lg",
};

const defaultStyle =
  "rounded-md flex items-center gap-2 font-medium transition-all shadow-sm";

export const Button = ({
  variant,
  size,
  text,
  startIcon,
  endIcon,
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${variantStyles[variant]} ${defaultStyle} ${sizeStyles[size]}`}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      <span className="leading-none">{text}</span>
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
};
