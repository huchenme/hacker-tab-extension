/** @jsx jsx */
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import Spinner from '@atlaskit/spinner';
import Button from '@atlaskit/button';
import { AutoDismissFlag, FlagGroup } from '@atlaskit/flag';
import Warning from '@atlaskit/icon/glyph/warning';
import { colors } from '@atlaskit/theme';
import { get } from 'lodash';

import { TopBar, Footer, RepositoriesList, EmptyState } from './components';

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
      <div
        css={css`
          position: relative;
          padding-top: 56px;
          min-height: calc(100vh - 161px - 56px);
        `}
      >
        {isEmptyState ? (
          <div
            css={css`
              padding-top: 96px;
            `}
          >
            <EmptyState />
          </div>
        ) : (
          <div
            css={css`
              margin: 0 auto;
              max-width: 720px;
            `}
          >
            <Title>{selectedLanguageOption.label || 'All languages'}</Title>
            <RepositoriesList repositories={repositories} />
          </div>
        )}
      </div>
      <Footer />
      {isLoading ? (
        <SpinnerContainer>
          <Spinner size="large" />
        </SpinnerContainer>
      ) : null}
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
  font-size: 40px;
  line-height: 1.4;
  font-weight: 600;
  margin-top: 64px;
  margin-bottom: 16px;
  color: rgba(0, 0, 0, 0.6);
  font-family: 'Futura PT';
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
