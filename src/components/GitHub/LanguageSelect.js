import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from '@atlaskit/select';
import { connect } from 'react-redux';
import { loadLanguages, changeLanguage } from '../../redux/github';
import { findLanguage } from '../../helpers/github';
import { shouldRefetchLanguages } from '../../helpers/localStorage';

const LanguageSelect = ({ fetchAll, handleChange, selected, languages }) => {
  useEffect(() => {
    if (shouldRefetchLanguages()) {
      fetchAll();
    }
  }, []);
  return (
    <Select
      value={selected}
      onChange={handleChange}
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
  handleChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};

LanguageSelect.defaultProps = {
  languages: [],
  isDisabled: false,
};

const mapStateToProps = ({ github }) => ({
  languages: github.allLanguages,
  selected: findLanguage(github.allLanguages, github.selectedLanguage),
  isDisabled: github.isLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchAll: () => dispatch(loadLanguages()),
  handleChange: lang => dispatch(changeLanguage(lang.value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageSelect);
