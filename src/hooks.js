import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { fetchRepositories } from '@huchenme/github-trending';
import useLocalStorage from './hooks/useLocalStorage';

import { allLanguagesValue, isEmptyList } from './helpers/github';

import {
  KEY_REPOSITORIES,
  KEY_SELECTED_LANGUAGE,
  KEY_SELECTED_PERIOD,
  KEY_SCHEMA_VERSION,
  CURRENT_SCHEMA_VERSION,
} from './helpers/localStorage';

export const useFetchRepositories = ({ language, since }) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const data = await fetchRepositories({ language, since });
      setData(data);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [language, since]);

  return {
    isLoading,
    data,
    error,
    fetchData,
  };
};

export function usePrevious(value) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const useRepositories = () => {
  const [selectedLanguage, setSelectedLanguage] = useSelectedLanguage();
  const [selectedPeriod, setSelectedPeriod] = useSelectedPeriod();
  const [repositories, setRepositories] = useLocalStorage(KEY_REPOSITORIES, []);
  const prevLang = usePrevious(selectedLanguage);
  const prevPeriod = usePrevious(selectedPeriod);

  const valueChanged =
    (prevLang && prevLang !== selectedLanguage) ||
    prevPeriod !== selectedPeriod;

  const isEmpty = isEmptyList(repositories);

  const { isLoading, data, error, fetchData } = useFetchRepositories({
    since: selectedPeriod,
    language:
      selectedLanguage !== allLanguagesValue ? selectedLanguage : undefined,
  });

  useEffect(() => {
    if (isEmpty || valueChanged) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueChanged]);

  useMemo(() => {
    if (!isLoading && !error && data) {
      setRepositories(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, isLoading]);

  return {
    isEmpty,
    isLoading,
    repositories,
    error,
    reload: fetchData,
    selectedLanguage,
    selectedPeriod,
    setSelectedLanguage,
    setSelectedPeriod,
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
