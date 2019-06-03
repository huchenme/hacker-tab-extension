import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from '@atlaskit/select';

const LanguageSelect = ({ fetchAll, onChange, selected, languages }) => {
  useEffect(() => {
    fetchAll();
  }, []);
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
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string,
        })
      ),
    })
  ),
  selected: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
  fetchAll: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

LanguageSelect.defaultProps = {
  languages: [],
};

export default React.memo(LanguageSelect);
