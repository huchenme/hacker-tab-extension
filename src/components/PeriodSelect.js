import React from 'react';
import PropTypes from 'prop-types';
import Select from './Select';
import { periodOptions, findPeriod } from '../helpers/github';

const PeriodSelect = ({ onChange, selectedValue }) => {
  return (
    <div data-test-id="period-selector">
      <Select
        isSearchable={false}
        value={findPeriod(selectedValue)}
        onChange={({ value }) => onChange(value)}
        options={periodOptions}
        placeholder="Select period"
      />
    </div>
  );
};

PeriodSelect.propTypes = {
  selectedValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(PeriodSelect);
