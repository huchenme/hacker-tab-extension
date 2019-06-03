import { find, differenceWith, isEqual, get } from 'lodash';

import { get as getValue, keys } from './localStorage';

export const allLanguagesValue = '__ALL__';
export const allLanguagesOption = {
  label: 'All languages',
  value: allLanguagesValue,
};

export const findLanguage = (allLanguages, language) => {
  if (allLanguages.length === 1) {
    return allLanguagesOption;
  } else if (allLanguages.length === 3) {
    return find(
      [
        allLanguagesOption,
        ...allLanguages[1].options,
        ...allLanguages[2].options,
      ],
      { value: language }
    );
  } else {
    return find(allLanguages, { value: language });
  }
};

export const transformLanguages = ({ popular, all } = {}) => {
  const popularOptions = popular.map(transformLanguage);
  const allOptions = all.map(transformLanguage);

  return [
    allLanguagesOption,
    {
      label: 'Popular',
      options: popularOptions,
    },
    {
      label: 'All Languages',
      options: differenceWith(allOptions, popularOptions, isEqual),
    },
  ];
};

const transformLanguage = ({ urlParam, name } = {}) => ({
  label: name,
  value: urlParam,
});

export const defaultLanguagesOptions = getValue(keys.SELECTED_LANGUAGE)
  ? [getValue(keys.SELECTED_LANGUAGE)]
  : [allLanguagesOption];
