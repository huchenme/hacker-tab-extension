import { fetchRepositories } from '@huchenme/github-trending';
import { allLanguagesValue, isEmptyList } from './helpers/github';
import {
  KEY_REPOSITORIES,
  KEY_SELECTED_LANGUAGE,
  KEY_SELECTED_PERIOD,
  getObject,
  setObject,
} from './helpers/localStorage';

chrome.runtime.onInstalled.addListener(() => {
  console.log('onInstalled....');
  scheduleRequest();
  console.log('schedule watchdog alarm to 5 minutes...');
  chrome.alarms.create('watchdog', { periodInMinutes: 5 });
  startRequest();
});

chrome.runtime.onStartup.addListener(() => {
  console.log('onStartup....');
  startRequest();
});

chrome.alarms.onAlarm.addListener(alarm => {
  console.log('Alarm triggered', alarm);
  if (alarm && alarm.name === 'watchdog') {
    chrome.alarms.get('refresh', alarm => {
      if (alarm) {
        console.log('Refresh alarm exists. Yay.');
        const repos = getObject(KEY_REPOSITORIES);
        if (isEmptyList(repos)) {
          console.log('Refetching because the repo was empty');
          startRequest();
        }
      } else {
        console.log("Refresh alarm doesn't exist, starting a new one");
        startRequest();
        scheduleRequest();
      }
    });
  } else {
    startRequest();
  }
});

function scheduleRequest() {
  console.log('schedule refresh alarm to 30 minutes...');
  chrome.alarms.create('refresh', { periodInMinutes: 30 });
}

async function startRequest() {
  console.log('start HTTP Request...');
  const period = getObject(KEY_SELECTED_PERIOD);
  const lang = getObject(KEY_SELECTED_LANGUAGE);
  const data = await fetchRepositories({
    language: lang === allLanguagesValue ? undefined : lang,
    since: period,
  });
  if (data && data.length > 0) {
    console.log('received data', data);
    setObject(KEY_REPOSITORIES, data);
  }
}
