/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { useTheme } from 'emotion-theming';
import LastUpdated from './LastUpdated';

import { ReactComponent as EmptyIcon } from '../images/empty.svg';

export default function EmptyState({ lastUpdatedTime, onReload }) {
  const theme = useTheme();

  return (
    <div data-test-id="empty-state">
      <div
        css={css`
          margin: auto;
          background-color: ${theme.emptyState.bg};
          border: 1px solid ${theme.emptyState.border};
          border-radius: 3px;
          box-shadow: ${theme.isDark
            ? 'none'
            : 'inset 0 0 10px rgba(27, 31, 35, 0.05)'};
          padding: 32px;
          padding-bottom: 48px;
          text-align: center;
          max-width: 900px;
        `}
      >
        <EmptyIcon
          css={css`
            color: ${theme.emptyState.icon};
            fill: currentColor;
            margin-left: 4px;
            margin-right: 4px;
          `}
          height={32}
          width={32}
        />
        <h3
          css={css`
            color: ${theme.emptyState.title};
            margin-top: 16px;
          `}
        >
          Trending repositories results are currently being dissected in{' '}
          <a
            href="https://github.com/trending"
            css={css`
              color: inherit;
            `}
          >
            GitHub
          </a>
          .
        </h3>
        <p
          css={css`
            color: ${theme.emptyState.text};
            margin-top: 8px;
          `}
        >
          This may be a few minutes. Now would be a great time to write that
          novel you have always been talking about.
        </p>
      </div>
      <LastUpdated
        css={css`
          margin-top: 32px;
        `}
        lastUpdatedTime={lastUpdatedTime}
        onReload={onReload}
      />
    </div>
  );
}

EmptyState.propTypes = {
  lastUpdatedTime: PropTypes.number,
  onReload: PropTypes.func,
};
