/** @jsx jsx */
import { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { useTheme } from 'emotion-theming';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

function formatTime(time) {
  return time
    ? formatDistanceToNow(new Date(time), {
        addSuffix: true,
      })
    : undefined;
}

const LastUpdated = ({ lastUpdatedTime, onReload, ...otherProps }) => {
  const theme = useTheme();

  const [lastUpdatedString, setLastUpdatedString] = useState(
    formatTime(lastUpdatedTime)
  );

  useEffect(() => {
    setLastUpdatedString(formatTime(lastUpdatedTime));
    const intervalId = setInterval(() => {
      setLastUpdatedString(formatTime(lastUpdatedTime));
    }, 1000 * 10);

    return () => {
      clearInterval(intervalId);
    };
  }, [lastUpdatedTime]);

  if (!lastUpdatedString) {
    return null;
  }

  return (
    <div
      css={css`
        text-align: center;
        cursor: default;
        color: ${theme.footer.link};
      `}
      {...otherProps}
    >
      Last updated
      <span
        css={css`
          cursor: pointer;
          transition: color 0.2s;
          margin-left: 5px;
          text-decoration: underline;

          :hover {
            color: ${theme.footer.linkHover};
          }
        `}
        onClick={onReload}
      >
        {lastUpdatedString}
      </span>
    </div>
  );
};

LastUpdated.propTypes = {
  lastUpdatedTime: PropTypes.number,
  onReload: PropTypes.func,
};

export default LastUpdated;
