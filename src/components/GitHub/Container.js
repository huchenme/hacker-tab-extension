import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Spinner from '@atlaskit/spinner';
import EmptyState from '@atlaskit/empty-state';
import Button from '@atlaskit/button';
import { AutoDismissFlag, FlagGroup } from '@atlaskit/flag';
import Warning from '@atlaskit/icon/glyph/warning';
import { colors } from '@atlaskit/theme';

import TopBar from './TopBar';
import Footer from './Footer';
import RepositoriesList from './RepositoriesList';
import { loadRepositories } from '../../redux/github';
import emptyImage from '../../images/empty.png';

import {
  loadLanguages,
  changeLanguage,
  changePeriod,
} from '../../redux/github';
import { findLanguage, findPeriod } from '../../helpers/github';

const GitHub = ({
  isLoading,
  isLoaded,
  error,
  repositories,
  currentLanguage,
  currentPeriod,
  fetchAll,
  onChangeLanguage,
  fetchAllLanguages,
  selectedLanguage,
  languages,
  onChangePeriod,
  selectedPeriod,
}) => {
  const [flags, setFlags] = useState([]);

  const dismissError = () => {
    setFlags([]);
  };

  const fetchRepositories = () => {
    fetchAll({ language: currentLanguage, since: currentPeriod });
    dismissError();
  };

  const displayError = () => {
    setFlags([
      {
        id: 'NETWORK_ERROR',
        appearance: 'warning',
        icon: <Warning label="Warning icon" secondaryColor={colors.Y200} />,
        title: (
          <span>
            Error loading content
            {!isLoading ? (
              <Button appearance="link" onClick={fetchRepositories}>
                Refresh
              </Button>
            ) : null}
          </span>
        ),
      },
    ]);
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  useEffect(() => {
    if (error) {
      displayError();
    } else {
      dismissError();
    }
  }, [error]);

  let shouldShowEmptyState = false;
  if (isLoaded && !isLoading) {
    shouldShowEmptyState = !repositories || repositories.length === 0;
  }

  return (
    <>
      <FlagGroup onDismissed={dismissError}>
        {flags.map(flag => (
          <AutoDismissFlag key={flag.id} {...flag} />
        ))}
      </FlagGroup>
      <TopBarContainer>
        <TopBar
          isLoading={isLoading}
          onChangeLanguage={onChangeLanguage}
          fetchAllLanguages={fetchAllLanguages}
          selectedLanguage={selectedLanguage}
          languages={languages}
          repositories={repositories}
          onChangePeriod={onChangePeriod}
          selectedPeriod={selectedPeriod}
        />
      </TopBarContainer>
      <ListContainer>
        <RepositoriesList
          repositories={repositories}
          currentPeriod={currentPeriod}
        />
        {shouldShowEmptyState ? (
          <EmptyState
            header="Nothing Here"
            description={`There are some issues loading data from GitHub, try again in a few minutes.`}
            imageUrl={emptyImage}
            secondaryAction={
              <Button href="https://github.com/huchenme/hacker-tab-extension">
                Raise GitHub issue
              </Button>
            }
          />
        ) : null}
      </ListContainer>
      <Footer />
      {isLoaded && isLoading ? (
        <SpinnerContainer>
          <Spinner size="large" />
        </SpinnerContainer>
      ) : null}
    </>
  );
};

GitHub.propTypes = {
  repositories: PropTypes.array,
  currentLanguage: PropTypes.string,
  fetchAll: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

const mapStateToProps = ({ github }) => ({
  repositories: github.repositories,
  currentLanguage: github.selectedLanguage,
  currentPeriod: github.selectedPeriod,
  isLoading: github.isLoading,
  isLoaded: github.isLoaded,
  error: github.error,
  languages: github.allLanguages,
  selectedLanguage: findLanguage(github.allLanguages, github.selectedLanguage),
  selectedPeriod: findPeriod(github.selectedPeriod),
});

const mapDispatchToProps = dispatch => ({
  fetchAll: params => dispatch(loadRepositories(params)),
  fetchAllLanguages: () => dispatch(loadLanguages()),
  onChangeLanguage: lang => dispatch(changeLanguage(lang.value)),
  onChangePeriod: period => dispatch(changePeriod(period.value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GitHub);

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
