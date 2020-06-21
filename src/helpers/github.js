import { find, sample, uniqBy, compact, snakeCase } from 'lodash';
import axios from 'axios';
import appendQuery from 'append-query';
import {
  languages as apiLanguages,
  spokenLanguages as apiSpokenLanguages,
} from '@huchenme/github-trending';

export const periodOptions = [
  { value: 'daily', label: 'Trending today' },
  { value: 'weekly', label: 'Trending this week' },
  { value: 'monthly', label: 'Trending this month' },
];

export const findPeriod = (value) => find(periodOptions, { value });

export const getRandomRepositories = (repositories = [], current) => {
  if (repositories.length < 2 || !current) {
    return sample(repositories);
  }
  const otherRepos = repositories.filter(
    (repo) => repo.author !== current.author && repo.name !== current.name
  );
  return sample(otherRepos);
};

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

const popularLanguages = [
  'C++',
  'HTML',
  'Java',
  'JavaScript',
  'PHP',
  'Python',
  'Ruby',
  'CSS',
  'Objective-C',
  'Swift',
  'TypeScript',
];

export const languages = [
  allLanguagesOption,
  ...uniqBy(
    compact([
      ...popularLanguages.map((lang) => find(apiLanguages, { name: lang })),
      ...apiLanguages,
    ]),
    'name'
  ).map(({ urlParam, name }) => ({
    label: name,
    value: urlParam,
  })),
];

export const findLanguage = (value) =>
  find(languages, { value }) || allLanguagesOption;

export const isEmptyList = (list) => !list || list.length === 0;

export const allSpokenLanguagesValue = '__ALL__';

export const allSpokenLanguagesLabel = 'All spoken languages';

export const allSpokenLanguagesOption = {
  label: allSpokenLanguagesLabel,
  value: allSpokenLanguagesValue,
};

// taken from https://octoverse.github.com/
const popularSpokenLanguages = [
  'English',
  'Chinese',
  'Hindi',
  'German',
  'Japanese',
  'French',
  'Russian',
  'Portuguese',
  'Dutch, Flemish',
  'Korean',
  'Spanish, Castilian',
  'Turkish',
];

export const spokenLanguages = [
  allSpokenLanguagesOption,
  ...uniqBy(
    compact([
      ...popularSpokenLanguages.map((lang) =>
        find(apiSpokenLanguages, { name: lang })
      ),
      ...apiSpokenLanguages,
    ]),
    'name'
  ).map(({ urlParam, name }) => ({
    label: name,
    value: urlParam,
  })),
];

export const findSpokenLanguage = (value) =>
  find(spokenLanguages, { value }) || allSpokenLanguagesOption;

export function buildUrl(baseUrl, params = {}) {
  const queryString = Object.keys(params)
    .filter((key) => params[key])
    .map((key) => `${snakeCase(key)}=${params[key]}`)
    .join('&');

  return queryString === '' ? baseUrl : `${baseUrl}?${queryString}`;
}

export async function fetchRepositories(params = {}) {
  const { data, status } = await axios(
    buildUrl(`https://ghapi.huchen.dev/repositories`, params)
  );
  if (status !== 200) {
    throw new Error('Something went wrong');
  }
  return data;
}
