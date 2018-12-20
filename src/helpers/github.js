import { find } from 'lodash';

export const allLanguagesValue = '__ALL__';
export const allLanguagesOption = {
  label: 'All languages',
  value: allLanguagesValue,
};

export const periodOptions = [
  { value: 'daily', label: 'today' },
  { value: 'weekly', label: 'this week' },
  { value: 'monthly', label: 'this month' },
];

export const findPeriod = periodValue =>
  find(periodOptions, { value: periodValue });

export const findLanguage = (allLanguages, language) => {
  if (allLanguages.length === 1) {
    return allLanguagesOption;
  } else if (allLanguages.length === 3) {
    return find(
      {
        allLanguagesOption,
        ...allLanguages[1].options,
        ...allLanguages[2].options,
      },
      { value: language }
    );
  } else {
    return find(allLanguages, { value: language });
  }
};
