/** @jsx jsx */
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';

import {
  TopBar,
  Footer,
  RepositoriesList,
  EmptyState,
  NetworkError,
  BottomIcons,
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

  const [isDark, setIsDark] = useDarkMode();

  const {
    isLoading,
    isEmpty,
    repositories,
    error,
    reload,
    lastUpdatedTime,
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
              <EmptyState onReload={reload} lastUpdatedTime={lastUpdatedTime} />
            </div>
          ) : (
            <RepositoriesList
              isLoading={isLoading}
              repositories={repositories}
              onReload={reload}
              lastUpdatedTime={lastUpdatedTime}
            />
          )}
        </div>
        <Footer />
        <BottomIcons isDark={isDark} setIsDark={setIsDark} />
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
