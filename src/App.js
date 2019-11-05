/** @jsx jsx */
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { ReactComponent as MoonIcon } from './images/moon.svg';
import { ReactComponent as SunIcon } from './images/sun.svg';

import {
  TopBar,
  Footer,
  RepositoriesList,
  EmptyState,
  NetworkError,
  ScrollTop,
  Fade,
} from './components';

import {
  useCheckLocalStorageSchema,
  useRepositories,
  useDarkMode,
} from './hooks';
import { themeLight, themeDark } from './theme';

const App = () => {
  // Clear local storage is schema version not match
  useCheckLocalStorageSchema();

  const [isDark, setIsDark] = useDarkMode(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  const {
    isLoading,
    isEmpty,
    repositories,
    error,
    reload,
    selectedLanguage,
    selectedPeriod,
    setSelectedLanguage,
    setSelectedPeriod,
  } = useRepositories();

  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setShowError(!!error);
  }, [error]);

  return (
    <ThemeProvider theme={isDark ? themeDark : themeLight}>
      <div
        css={theme => css`
          background-color: ${theme.bg};
          transition: background-color ${theme.transition};
          position: relative;
          min-height: 100vh;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
        `}
      >
        <TopBarContainer>
          <TopBar
            onChangeLanguage={setSelectedLanguage}
            selectedLanguage={selectedLanguage}
            onChangePeriod={setSelectedPeriod}
            selectedPeriod={selectedPeriod}
          />
        </TopBarContainer>
        <div
          css={css`
            position: relative;
            padding-top: 56px;
            min-height: calc(100vh - 161px - 56px);
          `}
        >
          <Fade show={showError}>
            <div
              css={css`
                margin: 0 auto;
                width: 720px;
                padding-top: 16px;
              `}
            >
              <NetworkError
                onClose={() => setShowError(false)}
                onReload={() => {
                  setShowError(false);
                  reload();
                }}
              />
            </div>
          </Fade>
          {!isLoading && isEmpty ? (
            <div
              css={css`
                padding-top: 96px;
              `}
            >
              <EmptyState />
            </div>
          ) : (
            <RepositoriesList
              isLoading={isLoading}
              repositories={repositories}
            />
          )}
        </div>
        <Footer />
        <div
          css={css`
            position: fixed;
            right: 40px;
            bottom: 40px;
            display: flex;
          `}
        >
          <div
            css={css`
              opacity: 0.5;
            `}
          >
            <ScrollTop
              css={actionButtonStyle}
              aria-label="Scroll to Top Button"
            />
          </div>
          <button
            css={actionButtonStyle}
            onClick={() => {
              setIsDark(!isDark);
            }}
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
          </button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;

const TopBarContainer = styled.div`
  position: fixed;
  box-sizing: border-box;
  top: 0;
  width: 100%;
  z-index: 20;
`;

const actionButtonStyle = theme => css`
  background-color: transparent;
  transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: none;
  height: 40px;
  width: 40px;
  outline: none;
  color: ${theme.icon.color};
  &:hover {
    color: ${theme.icon.hoverColor};
  }
`;
