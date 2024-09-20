import Image, { ImageProps } from 'next/image';
import { icons } from './chains';

export type ChainIconProps = Omit<
  ImageProps,
  'src' | 'alt' | 'width' | 'height'
> & {
  chainId?: string | number;
  alt?: string;
  width?: number;
  height?: number;
};

export default function ChainIcon({
  chainId,
  alt = 'chain icon',
  width = 24,
  height = 24,
  ...props
}: Readonly<ChainIconProps>) {
  const url = icons[chainId as string];
  return <Image src={url} alt={alt} width={width} height={height} {...props} />;
}
