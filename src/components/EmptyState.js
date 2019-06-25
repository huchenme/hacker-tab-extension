/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { ReactComponent as EmptyIcon } from '../images/empty.svg';

export default function InfoItem({ children, icon }) {
  return (
    <div
      css={css`
        margin: auto;
        background-color: #fafbfc;
        border: 1px solid #e1e4e8;
        border-radius: 3px;
        box-shadow: inset 0 0 10px rgba(27, 31, 35, 0.05);
        padding: 32px;
        padding-bottom: 48px;
        text-align: center;
        max-width: 900px;
      `}
    >
      <EmptyIcon
        css={css`
          color: #a3aab1;
          fill: currentColor;
          margin-left: 4px;
          margin-right: 4px;
        `}
        height={32}
        width={32}
      />
      <h3>
        Trending repositories results are currently being dissected in{' '}
        <a href="https://github.com/trending">GitHub</a>.
      </h3>
      <p>
        This may be a few minutes. Now would be a great time to write that novel
        you have always been talking about.
      </p>
    </div>
  );
}
