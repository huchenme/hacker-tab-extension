export const CURRENT_SCHEMA_VERSION = '2';

export const KEY_ALL_LANGUAGES = 'allLanguages';
export const KEY_REPOSITORIES = 'repositories';
export const KEY_SELECTED_LANGUAGE = 'selectedLanguage';
export const KEY_SELECTED_PERIOD = 'selectedPeriod';
export const KEY_SCHEMA_VERSION = 'schemaVersion';

export const getObject = key => JSON.parse(localStorage.getItem(key));
export const setObject = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));
