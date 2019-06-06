import { differenceWith, isEqual } from 'lodash';

export const allLanguagesValue = '__ALL__';
export const allLanguagesOption = {
  label: 'All languages',
  value: allLanguagesValue,
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
