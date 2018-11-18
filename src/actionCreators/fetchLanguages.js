export default function fetchLanguages() {
  return async (dispatch, getState) => {
    const response = await fetch(
      'https://github-trending-api.now.sh/languages'
    );
    const jsonResults = await response.json();
    const languages = transformLanguages(jsonResults);
    dispatch({ type: 'LANGUAGES_LOADED', payload: languages });
  };
}

function transformLanguages({ popular, all } = {}) {
  return [
    {
      label: 'Popular',
      options: popular.map(transformLanguage),
    },
    {
      label: 'All Languages',
      options: all.map(transformLanguage),
    },
  ];
}

function transformLanguage({ urlParam, name } = {}) {
  return {
    label: name,
    value: urlParam,
  };
}
