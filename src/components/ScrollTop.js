/** @jsx jsx */
import { useState, useEffect } from 'react';
import { jsx, css } from '@emotion/core';
import { useSpring } from 'react-spring';
import useWindowScroll from '../hooks/useWindowScroll';
import Fade from './Fade';

import { ReactComponent as TopIcon } from '../images/top.svg';
import Icon from './Icon';
import { useTheme } from 'emotion-theming';

export default function ScrollTop(props) {
  const [, setY] = useSpring(() => ({ y: 0 }));
  const { y } = useWindowScroll();
  const [show, setShow] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (y > 200) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [y]);

  const scrollTop = () => {
    setY({
      y: 0,
      reset: true,
      from: { y: window.scrollY },
      onFrame: props => window.scroll(0, props.y),
    });
  };

  return (
    <Fade
      show={show}
      css={css`
        font-size: 0;
      `}
    >
      <button
        css={css`
          background-color: transparent;
          transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          border: none;
          height: 20px;
          width: 20px;
          padding: 0;
          margin: 0;
          line-height: 1;
          outline: none;
          color: ${theme.icon.color};
          opacity: 0.5;

          &:hover {
            color: ${theme.icon.hoverColor};
          }
        `}
        onClick={scrollTop}
        {...props}
      >
        <Icon
          css={css`
            height: 20px;
            width: 20px;
          `}
          glyph={TopIcon}
        />
      </button>
    </Fade>
  );
}
