import { find, sample } from 'lodash';
import appendQuery from 'append-query';

export const periodOptions = [
  { value: 'daily', label: 'Trending today' },
  { value: 'weekly', label: 'Trending this week' },
  { value: 'monthly', label: 'Trending this month' },
];

export const findPeriod = periodValue =>
  find(periodOptions, { value: periodValue });

export const getRandomRepositories = (repositories = []) =>
  sample(repositories);

export const getRefUrl = (url = '') =>
  appendQuery(url, 'ref=HackerTabExtension');
