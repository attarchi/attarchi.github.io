import Image from "next/image";
import { iconConfig } from "@/content/icon";

export interface IconProps {
  name: string;
  alt?: string;
  size?: number;
  className?: string;
}

export function Icon({ 
  name, 
  alt, 
  size = iconConfig.defaultSize, 
  className = iconConfig.defaultClassName 
}: IconProps) {
  const isSvg = iconConfig.svgIcons.includes(name);
  const extension = isSvg ? 'svg' : 'png';
  const src = `/icons/${name}.${extension}`;
  const altText = alt || name;

  return (
    <Image
      src={src}
      alt={altText}
      width={size}
      height={size}
      className={className}
    />
  );
} 