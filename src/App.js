import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Spinner from '@atlaskit/spinner';
import Button from '@atlaskit/button';
import { AutoDismissFlag, FlagGroup } from '@atlaskit/flag';
import Warning from '@atlaskit/icon/glyph/warning';
import { colors } from '@atlaskit/theme';
import { get } from 'lodash';

import TopBar from './components/TopBar';
import Footer from './components/Footer';
import RepositoriesList from './components/RepositoriesList';
import EmptyState from './components/EmptyState';

import { getRandomRepositories } from './helpers/github';

import {
  useCheckLocalStorageSchema,
  useRepositories,
  useSelectedLanguageOption,
  useSelectedPeriodValue,
} from './hooks';

const App = () => {
  // Clear local storage is schema version not match
  useCheckLocalStorageSchema();

  const [
    selectedLanguageOption,
    setSelectedLanguageOption,
  ] = useSelectedLanguageOption();
  const [
    selectedPeriodValue,
    setSelectedPeriodValue,
  ] = useSelectedPeriodValue();

  const {
    isLoading,
    isEmptyState,
    repositories,
    error,
    reload,
  } = useRepositories({
    selectedLanguageValue: get(selectedLanguageOption, 'value'),
    selectedPeriodValue,
  });

  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setShowError(!!error);
  }, [error]);

  return (
    <Container>
      <FlagGroup onDismissed={() => setShowError(false)}>
        {showError ? (
          <AutoDismissFlag
            id="NETWORK_ERROR"
            appearance="warning"
            icon={<Warning label="Warning icon" secondaryColor={colors.Y200} />}
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
          onChangeLanguageOption={setSelectedLanguageOption}
          selectedLanguageOption={selectedLanguageOption}
          onChangePeriodValue={setSelectedPeriodValue}
          selectedPeriodValue={selectedPeriodValue}
        />
      </TopBarContainer>
      <ListContainer>
        {isEmptyState ? (
          <EmptyState />
        ) : (
          <RepositoriesList repositories={repositories} />
        )}
      </ListContainer>
      <Footer />
      {isLoading ? (
        <SpinnerContainer>
          <Spinner size="large" />
        </SpinnerContainer>
      ) : null}
    </Container>
  );
};

export default App;

const Container = styled.div`
  background-color: #eee;
  position: relative;
  padding-top: 56px;
  min-height: 100vh;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
`;

const TopBarContainer = styled.div`
  position: fixed;
  box-sizing: border-box;
  top: 0;
  width: 100%;
  z-index: 20;
`;

const ListContainer = styled.div`
  position: relative;
  padding: 16px;
  max-width: 1366px;
  margin: auto;
  min-height: calc(100vh - 161px - 56px);
`;

const SpinnerContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.6);
`;
