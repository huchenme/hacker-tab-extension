import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Spinner from '@atlaskit/spinner';
import EmptyState from '@atlaskit/empty-state';
import Button from '@atlaskit/button';

import TopBar from './TopBar';
import RepositoriesList from './RepositoriesList';
import { loadRepositories } from '../../redux/github';
import emptyImage from '../../images/empty.png';

const GitHub = ({
  isLoading,
  isLoaded,
  repositories,
  currentLanguage,
  currentPeriod,
  fetchAll,
}) => {
  useEffect(() => {
    fetchAll({ language: currentLanguage, since: currentPeriod });
  }, []);

  let shouldShowEmptyState = false;
  if (isLoaded && !isLoading) {
    shouldShowEmptyState = !repositories || repositories.length === 0;
  }

  return (
    <>
      <TopBarContainer>
        <TopBar
          isLoading={isLoading}
          onRefresh={() =>
            fetchAll({ language: currentLanguage, since: currentPeriod })
          }
        />
      </TopBarContainer>
      <ListContainer>
        <RepositoriesList
          repositories={repositories}
          currentPeriod={currentPeriod}
        />
        {shouldShowEmptyState ? (
          <EmptyState
            header="No data available"
            description={`There are some issues loading data from GitHub, try again in a few minutes.`}
            imageUrl={emptyImage}
            secondaryAction={
              <Button href="https://github.com/huchenme/hacker-bar-extension">
                Raise GitHub issue
              </Button>
            }
          />
        ) : null}
      </ListContainer>
      {isLoading ? (
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
});

const mapDispatchToProps = dispatch => ({
  fetchAll: params => dispatch(loadRepositories(params)),
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
