
function injectScript(file_path, tag) {
  var node = document.getElementsByTagName(tag)[0];
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', file_path);
  node.appendChild(script);
}
injectScript(chrome.extension.getURL('inject-script.js'), 'body');

window.addEventListener('message', function (event){ //runtime api used to communicate b/w content and background script
  if(event.data.type
    && (event.data.type == "FROM_PAGE")
    && typeof chrome.app.isInstalled !== 'undefined'){
      chrome.runtime.sendMessage({ essential: event.data.essential});

    }
  
},false);