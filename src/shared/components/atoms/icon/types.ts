import { SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const baseIconStyles = 'inline-block select-none align-middle';
