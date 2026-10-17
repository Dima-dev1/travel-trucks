import type { CSSProperties, ReactNode } from "react";

export interface BrandMarkProps {
  src?: string;
  size?: number;
  radius?: number | string;
  background?: string;
  fit?: "contain" | "cover";
  children?: ReactNode;
  style?: CSSProperties;
}

export const BrandMark = ({
  src,
  size = 40,
  radius = 8,
  background,
  fit = "contain",
  children,
  style,
}: BrandMarkProps) =>
  src ? (
    <img
      alt=""
      height={size}
      src={src}
      width={size}
      style={{ borderRadius: radius, flexShrink: 0, objectFit: fit, ...style }}
    />
  ) : (
    <div
      style={{
        alignItems: "center",
        ...(background && { background }),
        borderRadius: radius,
        display: "flex",
        flexShrink: 0,
        height: size,
        justifyContent: "center",
        width: size,
        ...style,
      }}
    >
      {children}
    </div>
  );
