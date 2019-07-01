/** @jsx jsx */
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import Button from '@atlaskit/button';
import { AutoDismissFlag, FlagGroup } from '@atlaskit/flag';
import Warning from '@atlaskit/icon/glyph/warning';

import {
  TopBar,
  Footer,
  RepositoriesList,
  EmptyState,
  ContentPlaceholder,
} from './components';

import { getRandomRepositories, findLanguage } from './helpers/github';

import {
  useCheckLocalStorageSchema,
  useRepositories,
  useSelectedLanguage,
  useSelectedPeriod,
} from './hooks';

const App = () => {
  // Clear local storage is schema version not match
  useCheckLocalStorageSchema();

  const [selectedLanguage, setSelectedLanguage] = useSelectedLanguage();

  const [selectedPeriod, setSelectedPeriod] = useSelectedPeriod();

  const { isLoading, isEmpty, repositories, error, reload } = useRepositories({
    selectedLanguage,
    selectedPeriod,
  });

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
          luckyRepository={getRandomRepositories(repositories)}
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
        {isLoading ? (
          <Center>
            <div
              css={css`
                margin-top: 88px;
              `}
            >
              <ContentPlaceholder size={10} />
            </div>
          </Center>
        ) : isEmpty ? (
          <div
            css={css`
              padding-top: 96px;
            `}
          >
            <EmptyState />
          </div>
        ) : (
          <Center>
            <Title>{findLanguage(selectedLanguage).label}</Title>
            <RepositoriesList repositories={repositories} />
          </Center>
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

const Title = styled.h1`
  text-align: center;
  font-size: 32px;
  line-height: 1.4;
  font-weight: 600;
  margin-top: 48px;
  margin-bottom: 8px;
  color: rgba(0, 0, 0, 0.54);
  font-family: 'Futura PT';
`;

const Center = styled.div`
  margin: 0 auto;
  width: 720px;
`;
