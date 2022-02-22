console.log(2);
chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
    
    console.log(response.farewell);
  });



 