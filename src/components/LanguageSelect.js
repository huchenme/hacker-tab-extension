import React from 'react';
import PropTypes from 'prop-types';
import { languages, findLanguage } from '../helpers/github';
import Select from './Select';

const LanguageSelect = ({ onChange, selectedValue }) => (
  <div data-test-id="language-selector">
    <Select
      value={findLanguage(selectedValue)}
      onChange={({ value }) => onChange(value)}
      options={languages}
      placeholder="Programming Language"
    />
  </div>
);

LanguageSelect.propTypes = {
  selectedValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(LanguageSelect);
