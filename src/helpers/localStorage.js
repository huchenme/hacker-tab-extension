import { isNil } from 'lodash';

export const keys = {
  ALL_LANGUAGES: 'allLanguages',
  REPOSITORIES: 'repositories',
  SELECTED_LANGUAGE: 'selectedLanguage',
  SELECTED_PERIOD: 'selectedPeriod',
};

export const getItem = key => window.localStorage.getItem(key);
export const setItem = (key, value) => window.localStorage.setItem(key, value);

export const getObject = key => {
  const result = getItem(key);
  try {
    return JSON.parse(result);
  } catch (e) {
    return result;
  }
};

export const setObject = (key, object) => {
  const value = JSON.stringify(object);
  setItem(key, value);
};

export const get = key => {
  const result = getObject(key);
  if (result) {
    return result.data;
  }
  return result;
};

export const getLastUpdated = key => {
  const result = getObject(key);
  if (result) {
    return result.lastUpdated;
  }
  return result;
};

export const set = (key, data) =>
  setObject(key, {
    data,
    lastUpdated: new Date(),
  });

export const hasKey = key => !isNil(getItem(key));
