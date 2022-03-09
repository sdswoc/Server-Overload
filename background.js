window.perfWatch = {};// popup script has access to background global objects
chrome.runtime.onMessage.addListener((message,sender,sendResponse) =>{
  window.perfWatch[sender.tab.id]= message.essential || null;

});
 http