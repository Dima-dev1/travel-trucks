import Link from "next/link";
import type { ComponentProps, ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

type ButtonStyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-grey-green text-white hover:bg-green-hover",
  outline:
    "border border-gray-light bg-white text-main hover:border-grey-green",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 px-6 text-sm",
  md: "h-12 px-6 text-base",
  lg: "h-14 px-8 text-base",
};

function getButtonClassName({
  variant = "primary",
  size = "md",
  className,
}: ButtonStyleProps): string {
  return [
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grey-green disabled:cursor-wait disabled:opacity-60",
    sizeClasses[size],
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

type ButtonProps = Omit<ComponentPropsWithoutRef<"button">, "size"> &
  ButtonStyleProps;

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={getButtonClassName({ variant, size, className })}
      type={type}
      {...props}
    />
  );
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> &
  ButtonStyleProps;

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={getButtonClassName({ variant, size, className })}
      {...props}
    />
  );
}
