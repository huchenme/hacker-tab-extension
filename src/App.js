/** @jsx jsx */
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';

import {
  TopBar,
  Footer,
  RepositoriesList,
  EmptyState,
  NetworkError,
  ScrollTop,
  Fade,
} from './components';

import { useCheckLocalStorageSchema, useRepositories } from './hooks';

const App = () => {
  // Clear local storage is schema version not match
  useCheckLocalStorageSchema();

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
    <div
      css={css`
        background-color: #eee;
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
          <RepositoriesList isLoading={isLoading} repositories={repositories} />
        )}
      </div>
      <Footer />
      <div
        css={css`
          position: fixed;
          right: 40px;
          bottom: 40px;
          opacity: 0.5;
          height: 24px;
          width: 24px;
        `}
      >
        <ScrollTop />
      </div>
    </div>
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
