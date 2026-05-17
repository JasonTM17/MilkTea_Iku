"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

const FALLBACK_PLACEHOLDER =
  "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20400%20400%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23fdf9f0%22/%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23f2d7b0%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width%3D%22400%22%20height%3D%22400%22%20fill%3D%22url(%23g)%22/%3E%3Cg%20transform%3D%22translate(150%2C140)%22%20fill%3D%22%23d4792a%22%20opacity%3D%220.65%22%3E%3Cpath%20d%3D%22M10%2C24h80l-11%2C66a8%2C8%200%200%201-8%2C7H29a8%2C8%200%200%201-8-7Z%22/%3E%3Cellipse%20cx%3D%2250%22%20cy%3D%2224%22%20rx%3D%2240%22%20ry%3D%229%22%20fill%3D%22%23faf0dc%22/%3E%3Crect%20x%3D%2260%22%20y%3D%221%22%20width%3D%228%22%20height%3D%2235%22%20rx%3D%224%22%20fill%3D%22%233a170c%22%20opacity%3D%220.55%22/%3E%3Ccircle%20cx%3D%2236%22%20cy%3D%2270%22%20r%3D%226%22%20fill%3D%22%233a170c%22%20opacity%3D%220.6%22/%3E%3Ccircle%20cx%3D%2255%22%20cy%3D%2280%22%20r%3D%226%22%20fill%3D%22%233a170c%22%20opacity%3D%220.6%22/%3E%3Ccircle%20cx%3D%2270%22%20cy%3D%2270%22%20r%3D%226%22%20fill%3D%22%233a170c%22%20opacity%3D%220.6%22/%3E%3C/g%3E%3Ctext%20x%3D%22200%22%20y%3D%22320%22%20fill%3D%22%23a1471d%22%20font-family%3D%22sans-serif%22%20font-size%3D%2222%22%20font-weight%3D%22600%22%20text-anchor%3D%22middle%22%3EMilkTea%20Iku%3C/text%3E%3C/svg%3E";

type SafeImageProps = Omit<ImageProps, "src"> & {
  src: string | null | undefined;
  fallbackSrc?: string;
};

export default function SafeImage({
  src,
  fallbackSrc = FALLBACK_PLACEHOLDER,
  alt,
  ...rest
}: SafeImageProps) {
  const initialSrc = src && src.trim().length > 0 ? src : fallbackSrc;
  const [currentSrc, setCurrentSrc] = useState<string>(initialSrc);

  const isDataUri = currentSrc.startsWith("data:");

  return (
    <Image
      {...rest}
      src={currentSrc}
      alt={alt}
      unoptimized={isDataUri}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}

export { FALLBACK_PLACEHOLDER };
