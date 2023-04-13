export interface IconProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const getSize = (size: IconProps["size"]) => {
  switch (size) {
    case "xs":
      return "0.5rem";
    case "sm":
      return "1rem";
    case "md":
      return "1.5rem";
    case "lg":
      return "2rem";
    case "xl":
      return "2.5rem";
    default:
      return "1rem";
  }
};
