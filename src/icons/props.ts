import React from 'react';
import { IconName } from './Icons';

export type IconProps = React.SVGProps<SVGSVGElement> & {
  // Add your custom props here
};

export type IconsProps = IconProps & {
  name: IconName | string;
};
