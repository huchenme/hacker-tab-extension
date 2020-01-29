/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { ReactComponent as MoonIcon } from '../images/moon.svg';
import { ReactComponent as SunIcon } from '../images/sun.svg';
import { ReactComponent as SettingIcon } from '../images/setting.svg';

import ScrollTop from './ScrollTop';

export default function BottomIcons({ isDark = false, setIsDark }) {
  const showSetting = false;
  return (
    <React.Fragment>
      <div
        css={css`
          position: fixed;
          right: 40px;
          bottom: 40px;
          display: flex;
        `}
      >
        <ScrollTop aria-label="Scroll to Top Button" />
        <ActionButton
          onClick={() => {
            setIsDark(!isDark);
          }}
          isRotate={isDark}
          aria-label="Toggle Dark Mode Button"
        >
          {isDark ? (
            <SunIcon
              aria-label="Sun Icon"
              css={css`
                fill: currentColor;
              `}
            />
          ) : (
            <MoonIcon
              aria-label="Moon Icon"
              css={css`
                fill: currentColor;
              `}
            />
          )}
        </ActionButton>
      </div>
      {showSetting ? (
        <div
          css={css`
            position: fixed;
            left: 40px;
            bottom: 40px;
            display: flex;
          `}
        >
          <ActionButton
            isRotate
            onClick={() => {
              console.log('setting');
            }}
          >
            <SettingIcon
              css={css`
                fill: currentColor;
              `}
            />
          </ActionButton>
        </div>
      ) : null}
    </React.Fragment>
  );
}

BottomIcons.propTypes = {
  isDark: PropTypes.bool,
  setIsDark: PropTypes.func.isRequired,
};

const ActionButton = styled.button`
  background-color: transparent;
  transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: none;
  height: 40px;
  width: 40px;
  outline: none;
  color: ${props => props.theme.icon.color};

  svg {
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    color: ${props => props.theme.icon.hoverColor};

    svg {
      transform: ${props => (props.isRotate ? 'rotate(45deg)' : 'none')};
    }
  }
`;
