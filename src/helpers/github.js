import { find, sample } from 'lodash';
import appendQuery from 'append-query';
import { languages as apiLanguages } from '@huchenme/github-trending';

export const periodOptions = [
  { value: 'daily', label: 'Trending today' },
  { value: 'weekly', label: 'Trending this week' },
  { value: 'monthly', label: 'Trending this month' },
];

export const findPeriod = Period => find(periodOptions, { value: Period });

export const getRandomRepositories = (repositories = []) =>
  sample(repositories);

export const getRefUrl = (url = '/') =>
  appendQuery(url, 'ref=HackerTabExtension');

export const getAvatarString = (src, size = 160) =>
  src ? `${src}?s=${size}` : undefined;

export const allLanguagesValue = '__ALL__';

export const allLanguagesLabel = 'All languages';

export const allLanguagesOption = {
  label: allLanguagesLabel,
  value: allLanguagesValue,
};

export const languages = [
  allLanguagesOption,
  ...apiLanguages.map(({ urlParam, name }) => ({
    label: name,
    value: urlParam,
  })),
];

export const findLanguage = value =>
  find(languages, { value: value }) || allLanguagesOption;
