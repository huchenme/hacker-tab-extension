import { useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import useLocalStorage from './hooks/useLocalStorage';

import {
  allLanguagesValue,
  allSpokenLanguagesValue,
  fetchRepositories,
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

const getReposByParams = async (key, params) => fetchRepositories(params);

export const useRepositories = () => {
  const [selectedLanguage, setSelectedLanguage] = useSelectedLanguage();
  const [selectedPeriod, setSelectedPeriod] = useSelectedPeriod();
  const [
    selectedSpokenLanguage,
    setSelectedSpokenLanguage,
  ] = useSelectedSpokenLanguage();
  const [repositories, setRepositories] = useLocalStorage(KEY_REPOSITORIES, []);
  const [lastUpdatedTime, setLastUpdatedTime] = useLastUpdatedTime();

  const queryKey = useMemo(
    () => [
      'repositories',
      {
        since: selectedPeriod,
        language:
          selectedLanguage !== allLanguagesValue ? selectedLanguage : undefined,
        spokenLanguageCode:
          selectedSpokenLanguage !== allSpokenLanguagesValue
            ? selectedSpokenLanguage
            : undefined,
      },
    ],
    [selectedPeriod, selectedLanguage, selectedSpokenLanguage]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialQueryKey = useMemo(() => queryKey, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialRepositories = useMemo(() => repositories, []);

  const { isFetching, isError, data, refetch } = useQuery(
    queryKey,
    getReposByParams,
    {
      onSuccess: () => {
        setLastUpdatedTime();
      },
      initialData:
        queryKey === initialQueryKey && !isEmptyList(initialRepositories)
          ? initialRepositories
          : undefined,
    }
  );

  useEffect(() => {
    if (!isEmptyList(data)) {
      setRepositories(data);
    }
  }, [data, setRepositories]);

  const isEmpty = isEmptyList(repositories);

  return {
    isEmpty,
    isLoading: isFetching,
    repositories,
    lastUpdatedTime,
    isError,
    refetch,
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
