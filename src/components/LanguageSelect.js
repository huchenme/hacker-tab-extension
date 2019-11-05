import React from 'react';
import PropTypes from 'prop-types';
import { languages, findLanguage } from '../helpers/github';
import Select from './Select';

const LanguageSelect = ({ onChange, selectedValue }) => (
  <Select
    value={findLanguage(selectedValue)}
    onChange={({ value }) => onChange(value)}
    options={languages}
    placeholder="All languages"
  />
);

LanguageSelect.propTypes = {
  selectedValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(LanguageSelect);
