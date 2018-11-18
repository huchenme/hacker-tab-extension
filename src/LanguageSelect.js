import React, { useState, useEffect } from 'react';
import Select from '@atlaskit/select';
import { connect } from 'react-redux';
import fetchLanguages from './actionCreators/fetchLanguages';

const LanguageSelect = ({ fetchLanguages, languages }) => {
  const [selected, setSelected] = useState();
  useEffect(() => {
    fetchLanguages();
  }, []);
  return (
    <Select
      value={selected}
      onChange={setSelected}
      options={languages}
      placeholder="Choose a Language"
    />
  );
};

const mapStateToProps = ({ languages }) => ({
  languages,
});

const mapDispatchToProps = dispatch => ({
  fetchLanguages: () => dispatch(fetchLanguages()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageSelect);
