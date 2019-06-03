import { fetchRepositories } from '@huchenme/github-trending';
import { allLanguagesOption, allLanguagesValue } from './helpers/language';
import { get, set, keys } from './helpers/localStorage';
import _ from 'lodash';

const LOAD_REPOSITORIES = 'github/LOAD_REPOSITORIES';
const REPOSITORIES_LOADED = 'github/REPOSITORIES_LOADED';
const REPOSITORIES_LOAD_ERROR = 'github/REPOSITORIES_LOAD_ERROR';
const CHANGE_LANGUAGE = 'github/CHANGE_LANGUAGE';
const CHANGE_PERIOD = 'github/CHANGE_PERIOD';

const cache = {
  repositories: get(keys.REPOSITORIES),
  selectedLanguage: get(keys.SELECTED_LANGUAGE),
  selectedPeriod: get(keys.SELECTED_PERIOD),
};

export default function reducer(
  state = {
    isLoading: false,
    isLoaded: false,
    error: null,
    repositories: cache.repositories || [],
    selectedLanguage: _.get(cache, 'selectedLanguage.value')
      ? cache.selectedLanguage
      : allLanguagesOption,
    selectedPeriod: cache.selectedPeriod || 'daily',
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
    const state = getState();
    dispatch({ type: CHANGE_LANGUAGE, payload: language });
    return dispatch(
      loadRepositories({
        language: language.value,
        since: state.selectedPeriod,
      })
    );
  };
}

export function changePeriod(period) {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: CHANGE_PERIOD, payload: period });
    return dispatch(
      loadRepositories({
        since: period,
        language: state.selectedLanguage.value,
      })
    );
  };
}
