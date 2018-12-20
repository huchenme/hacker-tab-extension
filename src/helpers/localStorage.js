import isPast from 'date-fns/is_past';
import addMinutes from 'date-fns/add_minutes';
import { isNil } from 'lodash';

export const keys = {
  ALL_LANGUAGES: 'allLanguages',
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

export const set = (key, data) =>
  setObject(key, {
    data,
    lastUpdated: new Date(),
  });

export const has = key => !isNil(getItem(key));

export const isDataExpired = (key, maxCacheInMinutes) => {
  const result = getObject(key);
  if (!result) {
    return true;
  }
  const lastUpdated = result.lastUpdated;
  return isPast(addMinutes(lastUpdated, maxCacheInMinutes));
};

const WEEK = 7 * 24 * 60;

export const shouldRefetchLanguages = () =>
  isDataExpired(keys.ALL_LANGUAGES, WEEK);
