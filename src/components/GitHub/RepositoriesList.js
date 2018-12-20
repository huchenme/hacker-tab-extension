import React from 'react';
import PropTypes from 'prop-types';

import RepositoryCard from './RepositoryCard';

const RepositoriesList = ({ repositories, currentPeriod }) => (
  <>
    {repositories.map(rep => (
      <RepositoryCard key={rep.url} {...rep} period={currentPeriod} />
    ))}
  </>
);

RepositoriesList.propTypes = {
  repositories: PropTypes.array,
  currentPeriod: PropTypes.string,
};

export default RepositoriesList;
