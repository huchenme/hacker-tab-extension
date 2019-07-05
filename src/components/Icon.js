/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const sizes = {
  small: '16px',
  medium: '24px',
  large: '32px',
  xlarge: '48px',
};

export default function Icon({
  glyph: Glyph,
  primaryColor = 'currentColor',
  secondaryColor = '#fff',
  label,
  size = 'medium',
}) {
  const getSize = size
    ? css`
        height: ${sizes[size]};
        width: ${sizes[size]};
      `
    : null;

  return (
    <Glyph
      aria-label={label}
      css={css`
        ${getSize};
        color: ${primaryColor};
        display: inline-block;
        fill: ${secondaryColor};
        flex-shrink: 0;
        line-height: 1;
      `}
    />
  );
}
