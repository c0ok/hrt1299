import { useEffect, useRef, useState } from 'react';
import { Button, Container, Input, Text, Textarea } from 'components/UI';
import { calcIsMobile } from 'shared/utils';
import { Outputbox } from 'components';

import style from './index.module.scss';

export const Tool = () => {
  const [isMobile, setIsMobile] = useState(calcIsMobile());
  const textField0 = useRef<HTMLTextAreaElement>(null);
  const textField1 = useRef<HTMLDivElement>(null);
  const name = useRef<string>('');
  const inputText = useRef<string>('');

  const setTextFieldHeight = () => {
    if (textField0.current && textField1.current) {
      if (calcIsMobile()) {
        textField0.current.style.height = `${textField0.current.scrollHeight}px`;
        textField1.current.style.height = `${textField1.current.scrollHeight}px`;
        return;
      }

      const height = window.innerHeight - textField0.current.offsetTop - 30;
      textField0.current.style.height = `${height}px`;
      textField1.current.style.height = `${height}px`;
    }
  };

  const highlight = () => {
    const cName = name.current;
    if (!cName || !inputText.current || !textField0.current || !textField1.current) {
      return;
    }

    // prepare text
    inputText.current = inputText.current.replaceAll(new RegExp(`${cName}:`, 'gi'), `${cName.toUpperCase()}:`);
    textField0.current.value = inputText.current;

    const regexp = new RegExp(`${cName}:.*\n((.*)\n)?.+\n`, 'g');
    const result = (`${inputText.current}\n`).replace(regexp, (text) => {
      let firstPart = '';
      let secondPart = '';

      const regexp = new RegExp(`${cName}:.*\n`);
      text.replace(regexp, (text) => {
        firstPart = text;
        return text;
      });

      text.replace(/\(.*\)\n/, (text) => {
        secondPart = text;
        return text;
      });

      // eslint-disable-next-line max-len
      const thirdPart = `<span style='background-color: rgb(255, 255, 0); color: #000'>${text.slice(
        firstPart.length + secondPart.length
      )}</span>`;

      return firstPart + secondPart + thirdPart;
    })
      .replaceAll('\n', '<br>');

    // eslint-disable-next-line max-len
    textField1.current.innerHTML = `<span style="font-family: 'Courier New', Courier, monospace; font-size: 16px; line-height: 17px">${result}</span>`;
  };

  const copy = () => {
    if (!textField1.current) {
      return;
    }

    const text = textField1.current.innerHTML;
    // @ts-ignore
    const listener = (event) => {
      event.clipboardData.setData('text/html', text);
      event.clipboardData.setData('text/plain', text);
      event.preventDefault();
    };
    document.addEventListener('copy', listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);
  };

  const highlightAndCopy = () => {
    highlight();
    copy();
  };

  const onReset = () => {
    inputText.current = '';
    if (textField0.current) {
      textField0.current.value = '';
    }
    if (textField1.current) {
      textField1.current.innerHTML = '';
    }
  };

  useEffect(() => {
    window.addEventListener('resize', () => {
      setIsMobile(calcIsMobile());
      setTextFieldHeight();
    });

    setTextFieldHeight();
  }, []);

  return (
    <Container className={style.tool}>
      <div className={style['tool__name-container']}>
        <Input
          placeholder='Enter name of character'
          onChange={(event) => name.current = event.target.value.toUpperCase()}
          onKeyDown={(event) => (event.key === 'Enter' ? highlight() : null)}
        />
        <Button onClick={isMobile ? highlightAndCopy : highlight}>{isMobile ? 'highlight & copy' : 'highlight'}</Button>
      </div>
      <div className={style['tool__text-wrapper']}>
        <div className={style['tool__text-container']}>
          <div className={style.tool__head}>
            <Text mode='blue'>Put original here</Text>
            <Button onClick={onReset}>reset</Button>
          </div>
          <Textarea
            nodeRef={textField0}
            className={style['tool__text-field']}
            onChange={(event) => {
              inputText.current = event.target.value;
              if (isMobile) {
                const element = event.target as HTMLTextAreaElement;
                element.style.height = '0';
                element.style.height = `${element.scrollHeight}px`;
              }
            }}
            onScroll={(event) => {
              const syncField = textField1.current;
              if (syncField) {
                syncField.scrollTop = (event.target as HTMLDivElement).scrollTop;
              }
            }}
          />
        </div>
        <div className={style['tool__text-container']}>
          <div className={style.tool__head}>
            <Text mode='blue'>Take highlighted here</Text>
            <Button onClick={copy}>copy</Button>
          </div>
          <Outputbox
            nodeRef={textField1}
            className={style['tool__text-field']}
            onScroll={(event) => {
              const syncField = textField0.current;
              if (syncField) {
                syncField.scrollTop = (event.target as HTMLDivElement).scrollTop;
              }
            }}
          />
        </div>
      </div>
    </Container>
  );
};