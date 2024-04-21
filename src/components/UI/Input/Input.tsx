import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import classNames from 'classnames';

import style from './index.module.scss';

export const Input: FC<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> = (
  { className, ...props }
) => {
  return (
    <input {...props} type='text' className={classNames(style.input, className)} />
  );
};