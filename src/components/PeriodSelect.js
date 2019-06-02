import React from 'react';
import PropTypes from 'prop-types';
import Select from '@atlaskit/select';
import { periodOptions } from '../helpers/github';

const changeLabel = option => ({
  ...option,
  label: `Trending ${option.label}`,
});

const PeriodSelect = ({ onChange, selected }) => {
  return (
    <Select
      styles={{
        control: base => ({ ...base, backgroundColor: '#EBECF0' }),
      }}
      isSearchable={false}
      value={changeLabel(selected)}
      onChange={onChange}
      options={periodOptions.map(changeLabel)}
      placeholder="Select period"
    />
  );
};

PeriodSelect.propTypes = {
  selected: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
};

export default React.memo(PeriodSelect);
