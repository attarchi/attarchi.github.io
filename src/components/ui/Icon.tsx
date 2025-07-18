import Image from "next/image";

export interface IconProps {
  name: string;
  alt?: string;
  size?: number;
  className?: string;
}

const SVG_ICONS = ['mongodb', 'github-mark'];

export function Icon({ name, alt, size = 24, className = "" }: IconProps) {
  const isSvg = SVG_ICONS.includes(name);
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