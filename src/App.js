/** @jsx jsx */
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import Button from '@atlaskit/button';
import { AutoDismissFlag, FlagGroup } from '@atlaskit/flag';
import Warning from '@atlaskit/icon/glyph/warning';

import { TopBar, Footer, RepositoriesList, EmptyState } from './components';

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
      <FlagGroup onDismissed={() => setShowError(false)}>
        {showError ? (
          <AutoDismissFlag
            id="NETWORK_ERROR"
            appearance="warning"
            icon={<Warning label="Warning icon" secondaryColor="#FFC400" />}
            title={
              <span>
                Error loading content
                {!isLoading ? (
                  <Button
                    appearance="link"
                    onClick={() => {
                      setShowError(false);
                      reload();
                    }}
                  >
                    Refresh
                  </Button>
                ) : null}
              </span>
            }
          />
        ) : null}
      </FlagGroup>
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
            selectedLanguage={selectedLanguage}
          />
        )}
      </div>
      <Footer />
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
