import React from 'react';
import PropTypes from 'prop-types';
import Select from '@atlaskit/select';
import { languages, findLanguage } from '../helpers/github';

const LanguageSelect = ({ onChange, selectedValue }) => (
  <Select
    styles={{
      control: base => ({ ...base, backgroundColor: '#eeeeee', borderColor: '#393e46', borderRadius: '5px' }),
    }}
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
