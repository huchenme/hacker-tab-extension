import {
  fetchRepositories,
  fetchAllLanguages,
} from '@huchenme/github-trending';
import { differenceWith, isEqual } from 'lodash';
import { allLanguagesOption, allLanguagesValue } from '../helpers/github';
import { get, set, keys } from '../helpers/localStorage';

const LOAD_REPOSITORIES = 'github/LOAD_REPOSITORIES';
const REPOSITORIES_LOADED = 'github/REPOSITORIES_LOADED';
const REPOSITORIES_LOAD_ERROR = 'github/REPOSITORIES_LOAD_ERROR';
const LANGUAGES_LOADED = 'github/LANGUAGES_LOADED';
const LANGUAGES_LOAD_ERROR = 'github/LANGUAGES_LOAD_ERROR';
const CHANGE_LANGUAGE = 'github/CHANGE_LANGUAGE';
const CHANGE_PERIOD = 'github/CHANGE_PERIOD';

export default function reducer(
  state = {
    isLoading: false,
    isLoaded: false,
    error: null,
    repositories: get(keys.REPOSITORIES) || [],
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
      set(keys.REPOSITORIES, action.payload);
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        error: null,
        repositories: action.payload,
      };
    case REPOSITORIES_LOAD_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        error: Date.now(),
        repositories: [],
      };
    case LANGUAGES_LOADED:
      set(keys.ALL_LANGUAGES, action.payload);
      return {
        ...state,
        allLanguages: action.payload,
      };
    case LANGUAGES_LOAD_ERROR:
      return {
        ...state,
        allLanguages: [allLanguagesOption],
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
  return async (dispatch, getState) => {
    dispatch({ type: LOAD_REPOSITORIES });
    let options = { since };
    if (language !== allLanguagesValue) {
      options = { ...options, language };
    }
    try {
      const repositories = await fetchRepositories({
        ...options,
      });
      if (repositories || repositories.length === 0) {
        dispatch({ type: REPOSITORIES_LOADED, payload: repositories });
      } else {
        dispatch({ type: REPOSITORIES_LOAD_ERROR });
      }
    } catch (e) {
      dispatch({ type: REPOSITORIES_LOAD_ERROR, payload: e });
    }
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
  return async (dispatch, getState) => {
    const jsonResults = await fetchAllLanguages();
    if (jsonResults) {
      dispatch({
        type: LANGUAGES_LOADED,
        payload: transformLanguages(jsonResults),
      });
    } else {
      dispatch({ type: LANGUAGES_LOAD_ERROR });
    }
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
      options: differenceWith(allOptions, popularOptions, isEqual),
    },
  ];
}

function transformLanguage({ urlParam, name } = {}) {
  return {
    label: name,
    value: urlParam,
  };
}
