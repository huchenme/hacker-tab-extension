import { fetchRepositories } from '@huchenme/github-trending';
import { allLanguagesValue, allSpokenLanguagesValue } from '../helpers/github';
import {
  KEY_REPOSITORIES,
  KEY_SELECTED_CODE_LANGUAGE,
  KEY_SELECTED_PERIOD,
  KEY_SELECTED_SPOKEN_LANGUAGE,
  KEY_LAST_UPDATED,
  getObject,
  setObject,
} from '../helpers/localStorage';

export default async function startRequest() {
  console.log('start HTTP Request...');
  const period = getObject(KEY_SELECTED_PERIOD);
  const lang = getObject(KEY_SELECTED_CODE_LANGUAGE);
  const spokenLang = getObject(KEY_SELECTED_SPOKEN_LANGUAGE);
  let data = [];
  try {
    data = await fetchRepositories({
      language: lang === allLanguagesValue ? undefined : lang,
      since: period,
      spoken_language_code:
        spokenLang === allSpokenLanguagesValue ? undefined : spokenLang,
    });
  } catch (e) {
    console.error(e);
  }
  if (data && data.length > 0) {
    setObject(KEY_REPOSITORIES, data);
    setObject(KEY_LAST_UPDATED, new Date().getTime());
  }
}
