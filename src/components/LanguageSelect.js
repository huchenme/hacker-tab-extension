import React from 'react';
import PropTypes from 'prop-types';
import Select from '@atlaskit/select';
import { useAllLanguages } from '../hooks';

const LanguageSelect = ({ onChange, selectedOption }) => {
  const languages = useAllLanguages();

  return (
    <Select
      styles={{
        control: base => ({ ...base, backgroundColor: '#EBECF0' }),
      }}
      value={selectedOption}
      onChange={onChange}
      options={languages}
      placeholder="All languages"
    />
  );
};

LanguageSelect.propTypes = {
  selectedOption: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
};

LanguageSelect.defaultProps = {
  languages: [],
};

export default React.memo(LanguageSelect);
