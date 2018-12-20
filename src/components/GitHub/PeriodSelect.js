import React from 'react';
import PropTypes from 'prop-types';
import Select from '@atlaskit/select';
import { connect } from 'react-redux';
import { changePeriod } from '../../redux/github';
import { periodOptions, findPeriod } from '../../helpers/github';

const PeriodSelect = ({ handleChange, selected }) => {
  return (
    <Select
      isSearchable={false}
      value={selected}
      onChange={handleChange}
      options={periodOptions.map(option => ({
        ...option,
        label: `Trending ${option.label}`,
      }))}
      placeholder="Select period"
    />
  );
};

PeriodSelect.propTypes = {
  selected: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
  handleChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};

PeriodSelect.defaultProps = {
  isDisabled: false,
};

const mapStateToProps = ({ github }) => {
  const selected = findPeriod(github.selectedPeriod);
  return {
    selected: {
      ...selected,
      label: `Trending ${selected.label}`,
    },
    isDisabled: github.isLoading,
  };
};

const mapDispatchToProps = dispatch => ({
  handleChange: period => dispatch(changePeriod(period.value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PeriodSelect);
