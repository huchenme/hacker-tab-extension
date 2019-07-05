/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import { ReactComponent as Warning } from '../images/warning.svg';
import { ReactComponent as Close } from '../images/cross.svg';
import Icon from './Icon';

export default function NetworkError({ onReload, onClose }) {
  return (
    <div
      css={css`
        background-color: #ffa000;
        border-radius: 5px;
        overflow: hidden;
        padding: 20px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
        color: rgba(255, 255, 255);
        display: flex;
        align-items: center;
        line-height: 1;
      `}
    >
      <div
        css={css`
          margin-right: 16px;
        `}
      >
        <Icon glyph={Warning} label="Warning" secondaryColor="#ffa000" />
      </div>
      <div
        css={css`
          flex: 1;
        `}
      >
        It seems there are some issues while loading data
      </div>
      <div
        css={css`
          margin-left: 16px;
        `}
      >
        <button
          css={css`
            padding: 4px 8px;
            font-size: 0.8125rem;
            color: rgb(220, 0, 78);
            font-weight: 500;
            line-height: 1.75;
            border-radius: 4px;
            letter-spacing: 0.02857em;
            text-transform: uppercase;
            min-width: 64px;
            ${buttonReset};

            &:hover {
              color: rgba(255, 255, 255);
            }
          `}
          onClick={onReload}
        >
          Retry
        </button>
      </div>
      <div
        css={css`
          margin-left: 16px;
          cursor: pointer;
        `}
        onClick={onClose}
      >
        <Icon glyph={Close} label="Close" size="small" />
      </div>
    </div>
  );
}

const buttonReset = css`
  margin: 0;
  cursor: pointer;
  display: inline-flex;
  outline: none;
  padding: 0;
  position: relative;
  align-items: center;
  border-radius: 0;
  vertical-align: middle;
  appearance: none;
  justify-content: center;
  text-decoration: none;
  user-select: none;
  background-color: transparent;
  box-sizing: border-box;
  border: 0;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
`;
