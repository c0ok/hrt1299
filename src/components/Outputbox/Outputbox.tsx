import { FC, DetailedHTMLProps, HTMLAttributes, RefObject } from 'react';
import classNames from 'classnames';

import style from './index.module.scss';

interface OutputboxProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  nodeRef: RefObject<HTMLDivElement> ;
}

export const Outputbox: FC<OutputboxProps> = ({ nodeRef, className, ...props }) => {
  return (
    <div className={style.wrapper}>
      <div
        {...props}
        ref={nodeRef} role='button'
        className={classNames(style.outputbox, className)}
      />
    </div>
  );
};