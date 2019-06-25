/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';

export default function InfoItem({ children, icon }) {
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
            primaryColor: '#757575',
          })}
        </div>
      ) : null}
      {children}
    </div>
  );
}
