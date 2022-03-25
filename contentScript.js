chrome.runtime.onMessage.addListeners((busy)=>{
   if(busy=="true"){
  var ques={}

qname= document.getElementsByClassName("value")[1].querySelector('a').innerText;
ques.qname= qname;
console.log(qname);
busy="false";}});



chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.busy == "true"){
      sendResponse({entry: ques});
      busy="false";
  }
  });