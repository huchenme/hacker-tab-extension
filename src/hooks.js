import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { fetchRepositories } from '@huchenme/github-trending';
import useLocalStorage from './hooks/useLocalStorage';

import {
  allLanguagesValue,
  allSpokenLanguagesValue,
  isEmptyList,
} from './helpers/github';

import {
  KEY_REPOSITORIES,
  KEY_LAST_UPDATED,
  KEY_SELECTED_CODE_LANGUAGE,
  KEY_SELECTED_PERIOD,
  KEY_SELECTED_SPOKEN_LANGUAGE,
  KEY_SCHEMA_VERSION,
  KEY_DARK_MODE,
  CURRENT_SCHEMA_VERSION,
} from './helpers/localStorage';

export const useFetchRepositories = ({ language, since, spokenLanguage }) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const data = await fetchRepositories({
        language,
        since,
        spoken_language_code: spokenLanguage,
      });
      setData(data);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [language, since, spokenLanguage]);

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
  const [
    selectedSpokenLanguage,
    setSelectedSpokenLanguage,
  ] = useSelectedSpokenLanguage();
  const [repositories, setRepositories] = useLocalStorage(KEY_REPOSITORIES, []);
  const [lastUpdatedTime, setLastUpdatedTime] = useLastUpdatedTime();
  const prevLang = usePrevious(selectedLanguage);
  const prevPeriod = usePrevious(selectedPeriod);
  const prevSpokenLang = usePrevious(selectedSpokenLanguage);

  const valueChanged =
    (prevLang && prevLang !== selectedLanguage) ||
    (prevSpokenLang && prevSpokenLang !== selectedSpokenLanguage) ||
    prevPeriod !== selectedPeriod;

  const isEmpty = isEmptyList(repositories);

  const { isLoading, data, error, fetchData } = useFetchRepositories({
    since: selectedPeriod,
    language:
      selectedLanguage !== allLanguagesValue ? selectedLanguage : undefined,
    spokenLanguage:
      selectedSpokenLanguage !== allSpokenLanguagesValue
        ? selectedSpokenLanguage
        : undefined,
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
      setLastUpdatedTime();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, isLoading]);

  return {
    isEmpty,
    isLoading,
    repositories,
    lastUpdatedTime,
    error,
    reload: fetchData,
    selectedLanguage,
    selectedPeriod,
    selectedSpokenLanguage,
    setSelectedLanguage,
    setSelectedPeriod,
    setSelectedSpokenLanguage,
  };
};

export const useSelectedLanguage = () =>
  useLocalStorage(KEY_SELECTED_CODE_LANGUAGE, allLanguagesValue);

export const useSelectedPeriod = () =>
  useLocalStorage(KEY_SELECTED_PERIOD, 'daily');

export const useSelectedSpokenLanguage = () =>
  useLocalStorage(KEY_SELECTED_SPOKEN_LANGUAGE, allSpokenLanguagesValue);

export const useDarkMode = () => {
  const preferDarkQuery = '(prefers-color-scheme: dark)';
  const [mode, setMode] = useLocalStorage(
    KEY_DARK_MODE,
    Boolean(window.matchMedia(preferDarkQuery).matches)
  );
  useEffect(() => {
    const mediaQuery = window.matchMedia(preferDarkQuery);
    const handleChange = () => setMode(Boolean(mediaQuery.matches));
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [setMode]);

  return [mode, setMode];
};

export const useLastUpdatedTime = () => {
  const [lastUpdatedTime, setLastUpdatedTime] = useLocalStorage(
    KEY_LAST_UPDATED
  );
  function update() {
    const newTime = new Date();
    setLastUpdatedTime(newTime.getTime());
  }
  return [lastUpdatedTime, update];
};

export const useCheckLocalStorageSchema = () => {
  const [schemaVersion, setSchemaVersion] = useLocalStorage(KEY_SCHEMA_VERSION);
  if (schemaVersion !== CURRENT_SCHEMA_VERSION) {
    window.localStorage.clear();
    setSchemaVersion(CURRENT_SCHEMA_VERSION);
  }
};
