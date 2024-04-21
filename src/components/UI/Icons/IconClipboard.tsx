import { FC } from 'react';

import type { IconProps } from 'shared/types';

/* eslint-disable max-len */
export const IconClipboard: FC<IconProps> = ({ size, ...props }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 49 49"
  >
    <path
      fill="#E2E2E2"
      d="M18.5 36.5c-1.1 0-2.042-.392-2.825-1.175-.783-.783-1.175-1.725-1.175-2.825v-24c0-1.1.392-2.042 1.175-2.825C16.458 4.892 17.4 4.5 18.5 4.5h18c1.1 0 2.042.392 2.825 1.175C40.108 6.458 40.5 7.4 40.5 8.5v24c0 1.1-.392 2.042-1.175 2.825-.783.783-1.725 1.175-2.825 1.175h-18zm0-4h18v-24h-18v24zm-8 12c-1.1 0-2.042-.392-2.825-1.175C6.892 42.542 6.5 41.6 6.5 40.5v-28h4v28h22v4h-22z"
    ></path>
  </svg>
);