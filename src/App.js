/** @jsx jsx */
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { ReactQueryConfigProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';

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

const queryConfig = {
  retry: 2,
  staleTime: 5 * 60 * 1000,
  cacheTime: 15 * 60 * 1000,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
};

const App = () => {
  // Clear local storage is schema version not match
  useCheckLocalStorageSchema();

  const [isDark, setIsDark] = useDarkMode();

  const {
    isLoading,
    isEmpty,
    repositories,
    error,
    refetch,
    lastUpdatedTime,
    selectedLanguage,
    selectedPeriod,
    selectedSpokenLanguage,
    setSelectedLanguage,
    setSelectedPeriod,
    setSelectedSpokenLanguage,
  } = useRepositories();

  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setShowError(Boolean(error));
  }, [error]);

  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <ThemeProvider theme={isDark ? themeDark : themeLight}>
        <div
          css={(theme) => css`
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
              onChangeSpokenLanguage={setSelectedSpokenLanguage}
              selectedSpokenLanguage={selectedSpokenLanguage}
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
                    refetch();
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
                <EmptyState
                  onReload={refetch}
                  lastUpdatedTime={lastUpdatedTime}
                />
              </div>
            ) : (
              <RepositoriesList
                isLoading={isLoading}
                repositories={repositories}
                onReload={refetch}
                lastUpdatedTime={lastUpdatedTime}
              />
            )}
          </div>
          <Footer />
          <BottomIcons isDark={isDark} setIsDark={setIsDark} />
        </div>
        <ReactQueryDevtools
          toggleButtonProps={{ style: { bottom: 40, right: 10 } }}
        />
      </ThemeProvider>
    </ReactQueryConfigProvider>
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
