"use client";

import Image, { type ImageProps } from "next/image";
import { useMemo, useState } from "react";

interface Props extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
}

export default function ImageWithFallback({ fallbackSrc = "/images/shared/defaults/dish-placeholder.jpg", alt, src, ...rest }: Props) {
  const [imgSrc, setImgSrc] = useState(src);
  const autoSizes = useMemo(() => {
    // Ensure sizes is provided when using fill to satisfy Next.js perf warning
    const anyRest = rest as any;
    if (anyRest.fill && !anyRest.sizes) {
      return "100vw";
    }
    return undefined;
  }, [rest]);
  return (
    <Image
      {...rest}
      alt={alt}
      src={imgSrc}
      sizes={autoSizes ?? (rest as any).sizes}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
}
