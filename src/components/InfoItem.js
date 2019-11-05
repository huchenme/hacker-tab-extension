/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';

export default function InfoItem({ children, icon }) {
  const theme = useTheme();
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
      `}
    >
      {icon ? (
        <div
          css={css`
            margin-right: 3px;
            display: flex;
            align-items: center;
          `}
        >
          {React.cloneElement(icon, {
            size: 'small',
            primaryColor: theme.card.additional,
          })}
        </div>
      ) : null}
      {children}
    </div>
  );
}
