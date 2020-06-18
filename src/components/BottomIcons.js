/** @jsx jsx */
import React, { useState } from 'react';
import { css, jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import featureToggles from '../feature-toggles';
import { ReactComponent as MoonIcon } from '../images/moon.svg';
import { ReactComponent as SunIcon } from '../images/sun.svg';
import { ReactComponent as SettingIcon } from '../images/setting.svg';

import ScrollTop from './ScrollTop';

const margin = '20px';

export default function BottomIcons({ isDark = false, setIsDark }) {
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  return (
    <React.Fragment>
      <div
        css={css`
          position: fixed;
          right: ${margin};
          bottom: ${margin};
          display: flex;
        `}
      >
        <ScrollTop
          css={css`
            margin-right: 16px;
          `}
          aria-label="Scroll to Top Button"
        />
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
                height: 20px;
                width: 20px;
              `}
            />
          ) : (
            <MoonIcon
              aria-label="Moon Icon"
              css={css`
                fill: currentColor;
                height: 20px;
                width: 20px;
              `}
            />
          )}
        </ActionButton>
      </div>

      {Boolean(featureToggles.settings) && (
        <div
          css={css`
            position: fixed;
            left: ${margin};
            bottom: ${margin};
            display: flex;
          `}
        >
          <ActionButton
            isRotate
            isRotated={isSettingOpen}
            onClick={() => {
              setIsSettingOpen(!isSettingOpen);
            }}
          >
            <SettingIcon
              css={css`
                fill: currentColor;
                height: 20px;
                width: 20px;
              `}
            />
            <div
              css={css`
                width: 200px;
                height: 200px;
                background: white;
                position: absolute;
                bottom: 50px;
                left: 0;
                border-radius: 5px;
                color: black;
              `}
            >
              test
            </div>
          </ActionButton>
        </div>
      )}
    </React.Fragment>
  );
}

BottomIcons.propTypes = {
  isDark: PropTypes.bool,
  setIsDark: PropTypes.func.isRequired,
};

const ActionButton = styled.button`
  background-color: transparent;
  margin: 0;
  padding: 0;
  line-height: 1;
  transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: none;
  height: 20px;
  width: 20px;
  outline: none;
  color: ${(props) => props.theme.icon.color};

  svg {
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    transform: ${(props) => (props.isRotated ? 'rotate(45deg)' : 'none')};
  }

  &:hover {
    color: ${(props) => props.theme.icon.hoverColor};

    svg {
      transform: ${(props) => (props.isRotate ? 'rotate(45deg)' : 'none')};
    }
  }
`;
