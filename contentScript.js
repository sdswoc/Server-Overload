
/*async function logRequests() {
    let harLog = await chrome.devtools.network.getHAR();
    console.log(`HAR version: ${harLog.version}`);
    for (let entry of harLog.entries) {
      console.log(entry.request.url);
    }
  }
  chrome.browserAction 
  
  logRequestsButton.addEventListener("click", logRequests);*/
  
var submission_id= requestURL.substring(52);
var ques={
    
}
ques.id= submission_id;
qname= document.getElementsByClassName("value")[1].querySelector('a').innerText;
ques.qname= qname;
ques.requestURL=String(z);

console.log(submission_id);
chrome.runtime.sendMessage({entry:ques});