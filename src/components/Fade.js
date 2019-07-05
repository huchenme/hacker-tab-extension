/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import { useTransition, animated } from 'react-spring';

export default function Fade({ show, children, ...otherProps }) {
  const transitions = useTransition(show, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <animated.div
          key={key}
          css={css`
            line-height: 1;
          `}
          style={props}
          {...otherProps}
        >
          {children}
        </animated.div>
      )
  );
}
