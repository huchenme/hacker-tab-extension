import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Spinner from '@atlaskit/spinner';
import TopBar from './TopBar';
import RepositoriesList from './RepositoriesList';
import { loadRepositories } from '../../redux/github';

const GitHub = ({
  isLoading,
  repositories,
  currentLanguage,
  currentPeriod,
  fetchAll,
}) => {
  useEffect(() => {
    fetchAll({ language: currentLanguage, since: currentPeriod });
  }, []);

  return (
    <Container>
      <TopBarContainer>
        <TopBar />
      </TopBarContainer>
      <ListContainer>
        <RepositoriesList
          repositories={repositories}
          currentPeriod={currentPeriod}
        />
      </ListContainer>
      {isLoading ? (
        <SpinnerContainer>
          <Spinner size="large" />
        </SpinnerContainer>
      ) : null}
    </Container>
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
});

const mapDispatchToProps = dispatch => ({
  fetchAll: params => dispatch(loadRepositories(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GitHub);

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  padding: 16px;
  max-width: 100vw;
  box-sizing: border-box;
`;

const TopBarContainer = styled.div`
  margin-bottom: 8px;
`;

const ListContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  position: relative;

  &::-webkit-scrollbar {
    -webkit-appearance: none;
  }

  &::-webkit-scrollbar:vertical {
    width: 6px;
  }

  &::-webkit-scrollbar:horizontal {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }
`;

const SpinnerContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.6);
`;
