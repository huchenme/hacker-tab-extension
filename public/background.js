// https://developer.chrome.com/extensions/examples/extensions/gmail/background.js

chrome.runtime.onStartup.addListener(() => {
  console.log('onStartup....');
  startRequest();
});

chrome.runtime.onInstalled.addListener(() => {
  console.log('onInstalled....');
  localStorage.test = 0;
  startRequest();
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
  chrome.alarms.create('refresh', { periodInMinutes: 1 });
}

function startRequest() {
  console.log('start HTTP Request...');
  console.log(++localStorage.test);
  console.log(Date(Date.now()).toString());
}
