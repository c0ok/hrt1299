import { DetailedHTMLProps, FC, LegacyRef, TextareaHTMLAttributes } from 'react';
import classNames from 'classnames';

import style from './index.module.scss';

interface TextareaProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  nodeRef?: LegacyRef<HTMLTextAreaElement>;
}

export const Textarea: FC<TextareaProps> = (
  { nodeRef, className, ...props }
) => {
  return (
    <textarea {...props} ref={nodeRef} className={classNames(style.textarea, className)} />
  );
};