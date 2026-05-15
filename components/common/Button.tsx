import { ButtonHTMLAttributes, ReactNode } from "react";

const buttonVariants = {
  primary: `bg-blue-900 text-white font-semibold hover:bg-blue-950`,
  secondary: `bg-primary text-white font-semibold hover:bg-blue-950`,
} as const;

const buttonSizes = {
  sm: `px-4 py-2 text-sm`,
  md: `px-6 py-2.5`,
  lg: `px-8 py-3`,
} as const;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  fullWidth?: boolean;
}

export const Button = ({
  type = "button",
  children,
  className = "",
  variant = "primary",
  size = "md",
  disabled,
  fullWidth,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`
        relative rounded-md transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        ${buttonVariants[variant]}
        ${buttonSizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
