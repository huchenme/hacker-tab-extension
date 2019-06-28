const KEY_REPOSITORIES = 'repositories';
const KEY_SELECTED_LANGUAGE = 'selectedLanguage';
const KEY_SELECTED_PERIOD = 'selectedPeriod';

chrome.runtime.onInstalled.addListener(() => {
  console.log('onInstalled....');
  scheduleRequest();
  chrome.alarms.create('watchdog', { periodInMinutes: 2 });
});

chrome.alarms.onAlarm.addListener(alarm => {
  console.log('Alarm triggered', alarm);
  if (alarm && alarm.name === 'watchdog') {
    chrome.alarms.get('refresh', alarm => {
      if (alarm) {
        console.log('Refresh alarm exists. Yay.');
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
  console.log('scheduleRequest()');
  chrome.alarms.create('refresh', { periodInMinutes: 30 });
}

async function startRequest() {
  console.log('start HTTP Request...');
  const period = JSON.parse(localStorage.getItem(KEY_SELECTED_PERIOD));
  const lang = JSON.parse(localStorage.getItem(KEY_SELECTED_LANGUAGE));
  const data = await fetchRepositories({
    language: lang === '__ALL__' ? undefined : lang,
    since: period,
  });
  if (data && data.length > 0) {
    localStorage.setItem(KEY_REPOSITORIES, JSON.stringify(data));
  }
}

function buildUrl(baseUrl, params = {}) {
  const queryString = Object.keys(params)
    .filter(key => params[key])
    .map(key => `${key}=${params[key]}`)
    .join('&');

  return queryString === '' ? baseUrl : `${baseUrl}?${queryString}`;
}

async function fetchRepositories(params) {
  console.log(params);
  const res = await fetch(
    buildUrl(`https://github-trending-api.now.sh/repositories`, params)
  );
  return res.json();
}
