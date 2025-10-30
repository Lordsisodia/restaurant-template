'use client';

import { useMemo } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill, scale } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto as fmtAuto } from '@cloudinary/url-gen/qualifiers/format';
import { auto as qAuto } from '@cloudinary/url-gen/qualifiers/quality';

interface CloudinaryImageProps {
  publicId: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  aspectRatio?: 'square' | 'video' | '4:3' | '16:9';
  lazy?: boolean;
}

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dshngtiww',
  },
});

function buildUrl({ publicId, width = 800, height, aspectRatio }: CloudinaryImageProps) {
  let img = cld.image(publicId);
  img = img.delivery(format(fmtAuto())).delivery(quality(qAuto()));

  if (aspectRatio === 'square') {
    img = img.resize(fill().gravity(autoGravity()).width(width).height(width));
  } else if (aspectRatio === 'video' || aspectRatio === '16:9') {
    img = img.resize(fill().gravity(autoGravity()).width(width).height(Math.round((width * 9) / 16)));
  } else if (aspectRatio === '4:3') {
    img = img.resize(fill().gravity(autoGravity()).width(width).height(Math.round((width * 3) / 4)));
  } else if (height) {
    img = img.resize(fill().gravity(autoGravity()).width(width).height(height));
  } else {
    img = img.resize(scale().width(width));
  }

  return img.toURL();
}

export function CloudinaryImage(props: CloudinaryImageProps) {
  const { alt, className, lazy = true, width, height, aspectRatio } = props;
  const url = useMemo(() => buildUrl(props), [props.publicId, width, height, aspectRatio]);

  const computedHeight = useMemo(() => {
    if (height) return height;
    if (aspectRatio === 'square') return width ?? 800;
    if (aspectRatio === 'video' || aspectRatio === '16:9') return Math.round((width ?? 800) * 9 / 16);
    if (aspectRatio === '4:3') return Math.round((width ?? 800) * 3 / 4);
    return undefined;
  }, [height, aspectRatio, width]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={alt}
      className={className}
      loading={lazy ? 'lazy' : 'eager'}
      width={width}
      height={computedHeight}
    />
  );
}

export default CloudinaryImage;
