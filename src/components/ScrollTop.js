/** @jsx jsx */
import { useState, useEffect } from 'react';
import { jsx, css } from '@emotion/core';
import { useSpring } from 'react-spring';
import useWindowScroll from '../hooks/useWindowScroll';
import Fade from './Fade';

import { ReactComponent as TopIcon } from '../images/top.svg';
import Icon from './Icon';

export default function ScrollTop(props) {
  const [, setY] = useSpring(() => ({ y: 0 }));
  const { y } = useWindowScroll();
  const [show, setShow] = useState(false);

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
      <button onClick={scrollTop} {...props}>
        <Icon glyph={TopIcon} />
      </button>
    </Fade>
  );
}
