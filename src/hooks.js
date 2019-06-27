import { useMemo, useState, useEffect, useCallback } from 'react';
import { fetchRepositories } from '@huchenme/github-trending';
import useLocalStorage from 'react-use/lib/useLocalStorage';

import { allLanguagesValue } from './helpers/github';

import {
  KEY_REPOSITORIES,
  KEY_SELECTED_LANGUAGE,
  KEY_SELECTED_PERIOD,
  KEY_SCHEMA_VERSION,
  CURRENT_SCHEMA_VERSION,
} from './helpers/localStorage';

export const useFetchRepositories = ({ language, since }) => {
  const [isLoading, setLoading] = useState(false);
  const [isFirstLoaded, setFirstLoaded] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const data = await fetchRepositories({ language, since });
      setData(data);
      setFirstLoaded(true);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [language, since]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    isLoading,
    isFirstLoaded,
    data,
    error,
    reload: fetchData,
  };
};

export const useRepositories = ({ selectedLanguage, selectedPeriod } = {}) => {
  const [repositories, setRepositories] = useLocalStorage(KEY_REPOSITORIES);

  let options = {};
  if (selectedPeriod) {
    options = { since: selectedPeriod };
  }
  if (selectedLanguage && selectedLanguage !== allLanguagesValue) {
    options = { ...options, language: selectedLanguage };
  }

  const {
    isLoading,
    isFirstLoaded,
    data,
    error,
    reload,
  } = useFetchRepositories({
    ...options,
  });

  useMemo(() => {
    if (!isLoading && !error && data) {
      setRepositories(data);
    }
  }, [data, error, isLoading, setRepositories]);

  const isEmptyRepo = !repositories || repositories.length === 0;

  const isEmptyState = isFirstLoaded && !isLoading && isEmptyRepo;

  return {
    isEmptyState,
    isLoading,
    repositories,
    error,
    reload,
  };
};

export const useSelectedLanguage = () =>
  useLocalStorage(KEY_SELECTED_LANGUAGE, allLanguagesValue);

export const useSelectedPeriod = () =>
  useLocalStorage(KEY_SELECTED_PERIOD, 'daily');

export const useCheckLocalStorageSchema = () => {
  const [schemaVersion, setSchemaVersion] = useLocalStorage(KEY_SCHEMA_VERSION);
  if (schemaVersion !== CURRENT_SCHEMA_VERSION) {
    window.localStorage.clear();
    setSchemaVersion(CURRENT_SCHEMA_VERSION);
  }
};
