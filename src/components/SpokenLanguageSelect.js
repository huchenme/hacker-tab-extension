import React from 'react';
import PropTypes from 'prop-types';
import { findSpokenLanguage, spokenLanguages } from '../helpers/github';
import Select from './Select';

const SpokenLanguageSelect = ({ onChange, selectedValue }) => (
  <div data-test-id="spoken-language-selector">
    <Select
      value={findSpokenLanguage(selectedValue)}
      onChange={({ value }) => onChange(value)}
      options={spokenLanguages}
      placeholder="No Preference"
    />
  </div>
);

SpokenLanguageSelect.propTypes = {
  selectedValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(SpokenLanguageSelect);
