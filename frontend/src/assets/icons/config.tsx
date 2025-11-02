import React from 'react';

export type IconSize = 'sm' | 'md' | 'lg';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: IconSize; 
}

export const iconSizeVariants: Record<IconSize, string> = {
    'sm': 'size-2',
    'md': 'size-4',
    'lg': 'size-6',
};