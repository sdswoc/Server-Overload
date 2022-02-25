window.addEventListener('DOMContentLoaded', ()=> {
  let bg = chrome.extension.getBackgroundPage();
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    let currentTabId = tabs[0].id;
    let currentPerf = bg.perfWatch[currentTabId];
  });
 alert(window.performance);
});


 