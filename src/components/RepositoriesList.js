import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import RepositoryCard from './RepositoryCard';

const RepositoriesList = ({ repositories, currentPeriod }) => (
  <Grid container spacing={2}>
    {repositories.map(rep => (
      <Grid key={rep.url} item xs={12} md={6}>
        <RepositoryCard {...rep} />
      </Grid>
    ))}
  </Grid>
);

RepositoriesList.propTypes = {
  repositories: PropTypes.array,
};

RepositoriesList.defaultProps = {
  repositories: [],
};

export default RepositoriesList;
