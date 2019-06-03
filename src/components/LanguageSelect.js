import React from 'react';
import PropTypes from 'prop-types';
import Select from '@atlaskit/select';
import { fetchAllLanguages } from '@huchenme/github-trending';
import useAsync from 'react-use/lib/useAsync';

import {
  defaultLanguagesOptions,
  transformLanguages,
} from '../helpers/language';

const LanguageSelect = ({ onChange, selected }) => {
  const { value } = useAsync(fetchAllLanguages);
  const languages = value ? transformLanguages(value) : defaultLanguagesOptions;

  return (
    <Select
      styles={{
        control: base => ({ ...base, backgroundColor: '#EBECF0' }),
      }}
      value={selected}
      onChange={onChange}
      options={languages}
      placeholder="All languages"
    />
  );
};

LanguageSelect.propTypes = {
  selected: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
};

LanguageSelect.defaultProps = {
  languages: [],
};

export default React.memo(LanguageSelect);
