import {
  fetchRepositories,
  fetchAllLanguages,
} from '@huchenme/github-trending';
import { differenceBy, isEqual } from 'lodash';
import { allLanguagesOption, allLanguagesValue } from '../helpers/github';
import { get, set, keys } from '../helpers/localStorage';

const LOAD_REPOSITORIES = 'github/LOAD_REPOSITORIES';
const REPOSITORIES_LOADED = 'github/REPOSITORIES_LOADED';
const LANGUAGES_LOADED = 'github/LANGUAGES_LOADED';
const CHANGE_LANGUAGE = 'github/CHANGE_LANGUAGE';
const CHANGE_PERIOD = 'github/CHANGE_PERIOD';

export default function reducer(
  state = {
    isLoading: false,
    repositories: [],
    allLanguages: get(keys.ALL_LANGUAGES) || [allLanguagesOption],
    selectedLanguage: get(keys.SELECTED_LANGUAGE) || allLanguagesValue,
    selectedPeriod: get(keys.SELECTED_PERIOD) || 'daily',
  },
  action
) {
  switch (action.type) {
    case LOAD_REPOSITORIES:
      return {
        ...state,
        isLoading: true,
      };
    case REPOSITORIES_LOADED:
      return {
        ...state,
        isLoading: false,
        repositories: action.payload,
      };
    case LANGUAGES_LOADED:
      set(keys.ALL_LANGUAGES, action.payload);
      return {
        ...state,
        allLanguages: action.payload,
      };
    case CHANGE_LANGUAGE:
      set(keys.SELECTED_LANGUAGE, action.payload);
      return {
        ...state,
        selectedLanguage: action.payload,
      };
    case CHANGE_PERIOD:
      set(keys.SELECTED_PERIOD, action.payload);
      return {
        ...state,
        selectedPeriod: action.payload,
      };
    default:
      return state;
  }
}

export function loadRepositories({ language, since }) {
  console.log(`loadRepositories ${language} ${since}`);
  return async (dispatch, getState) => {
    dispatch({ type: LOAD_REPOSITORIES });
    let options = { since };
    if (language !== allLanguagesValue) {
      options = { ...options, language };
    }
    const repositories = await fetchRepositories({
      ...options,
    });
    dispatch({ type: REPOSITORIES_LOADED, payload: repositories });
  };
}

export function changeLanguage(language) {
  return async (dispatch, getState) => {
    const { github } = getState();
    dispatch({ type: CHANGE_LANGUAGE, payload: language });
    return dispatch(
      loadRepositories({ language, since: github.selectedPeriod })
    );
  };
}

export function changePeriod(period) {
  return async (dispatch, getState) => {
    const { github } = getState();
    dispatch({ type: CHANGE_PERIOD, payload: period });
    return dispatch(
      loadRepositories({ since: period, language: github.selectedLanguage })
    );
  };
}

export function loadLanguages() {
  console.log('loadLanguages');
  return async (dispatch, getState) => {
    const jsonResults = await fetchAllLanguages();
    const languages = transformLanguages(jsonResults);
    dispatch({ type: LANGUAGES_LOADED, payload: languages });
  };
}

function transformLanguages({ popular, all } = {}) {
  const popularOptions = popular.map(transformLanguage);
  const allOptions = all.map(transformLanguage);
  return [
    allLanguagesOption,
    {
      label: 'Popular',
      options: popularOptions,
    },
    {
      label: 'All Languages',
      options: differenceBy(allOptions, popularOptions, isEqual),
    },
  ];
}

function transformLanguage({ urlParam, name } = {}) {
  return {
    label: name,
    value: urlParam,
  };
}
