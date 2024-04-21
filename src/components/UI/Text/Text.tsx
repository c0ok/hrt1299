import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import classNames from 'classnames';

import style from './index.module.scss';

interface TextProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
  mode: 'blue' | 'white';
}

export const Text: FC<TextProps> = (
  { className, mode, ...props }
) => {
  return (
    <p {...props} className={classNames(className, style.text, style[`text--${mode}`])} />
  );
};