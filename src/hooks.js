import { useMemo, useState, useEffect, useCallback } from 'react';
import {
  fetchAllLanguages,
  fetchRepositories,
} from '@huchenme/github-trending';
import useLocalStorage from 'react-use/lib/useLocalStorage';

import {
  transformLanguages,
  allLanguagesValue,
  allLanguagesOption,
} from './helpers/language';

import {
  KEY_ALL_LANGUAGES,
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

export const useAllLanguages = () => {
  const [languages, setLanguages] = useLocalStorage(KEY_ALL_LANGUAGES);
  const [selectedLanguage] = useSelectedLanguageOption();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllLanguages();
      if (data) {
        setLanguages(data);
      }
    };

    if (!languages) {
      fetchData();
    }
  }, [languages, setLanguages]);

  return languages ? transformLanguages(languages) : [selectedLanguage];
};

export const useRepositories = ({
  selectedLanguageValue,
  selectedPeriodValue,
} = {}) => {
  const [repositories, setRepositories] = useLocalStorage(KEY_REPOSITORIES);

  let options = {};
  if (selectedPeriodValue) {
    options = { since: selectedPeriodValue };
  }
  if (selectedLanguageValue && selectedLanguageValue !== allLanguagesValue) {
    options = { ...options, language: selectedLanguageValue };
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

export const useSelectedLanguageOption = () => {
  const [selectedLanguage, setSelectedLanguage] = useLocalStorage(
    KEY_SELECTED_LANGUAGE,
    allLanguagesOption
  );

  return [selectedLanguage, setSelectedLanguage];
};

export const useSelectedPeriodValue = () => {
  const [selectedPeriod, setSelectedPeriod] = useLocalStorage(
    KEY_SELECTED_PERIOD,
    'daily'
  );

  return [selectedPeriod, setSelectedPeriod];
};

export const useCheckLocalStorageSchema = () => {
  const [schemaVersion, setSchemaVersion] = useLocalStorage(KEY_SCHEMA_VERSION);
  if (schemaVersion !== CURRENT_SCHEMA_VERSION) {
    window.localStorage.clear();
    setSchemaVersion(CURRENT_SCHEMA_VERSION);
  }
};
