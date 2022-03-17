try {
  chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
      for (var i = 0; i < details.requestHeaders.length; ++i) {
        if (details.requestHeaders[i].name === 'User-Agent') {
          details.requestHeaders.splice(i, 1);
          break;
        }
      }
      return {requestHeaders: details.requestHeaders};
    },
    {urls: ["<all_urls>"]},
    ["blocking", "requestHeaders"]
  ); 
 
 chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
      var x,y,z;
      
      String(x) =details.requestHeaders["authority"];
      String(y) =details.requestHeaders["path"];
      String(z)= String(x)+String(y);
      
      return {requestURL: String(z)};
      },
     
    
    {urls: ["https://www.codechef.com/api/ide/*"]},
    ["blocking", "requestHeaders"]
  ); 
 
  var target = "https://www.codechef.com/api/ide/submit";

  /*
  e.g.
  "https://developer.mozilla.org/en-US/"
  200
  
  or:
  
  "https://developer.mozilla.org/en-US/xfgkdkjdfhs"
  404
  */
  function logResponse(responseDetails) {
    console.log(responseDetails.url);
    console.log(responseDetails.statusCode);
    console.log(responseDetails.requestMethod);
    console.log(response.status);
    console.log(response.upid);
  }
  
  chrome.webRequest.onCompleted.addListener(
    logResponse,
    {urls: [target]}
  );
  
 
 
 chrome.runtime.onIstalled.addListener(()=>{
   chrome.storage.sync.set({arr: []});
 });
  
 var ques_array =[];
 var busy =false;
 var badge=0;
 var result=[];
 var result_busy=false;

 function checker(item){
   getResult(item);

   busy=true;
   var i= ques_array.indexOf(item);
   ques_array.splice(i,1);
   chrome.storage.sync.set({arr: ques_array});
   busy=false;
}

function getResult(ques){
  $.ajax({url:"https://www.codechef.com/api/ide/submit?solution_id="+ques.id,
  dataType: "json",
  success:function(r){
    if(r.result_code!="wait"){
      badge++;
      chrome.browserAction.setBadgeText({text: "badge"});
      var s =r.result_code;
      var a=r.score;
      var n=r.time;
      var details= {
        type:"list",
        title: ques.qname,
        message: "",
        items:[]

      }
      var res= {time:n, prb: ques.qname};
      var table= "<table class='status-table' cellspacing='0' cellpadding='5' width='60%'><tr><th>Sub-Task</th><th>Task #</th><th>Result<br/>(time)</th></tr>";

     switch(s){
     case"accepted": res.verdict= "Correct";
     details.items.push({title:"Verdict:",message:"Accepted!!"});
    details.items.push({title:"Score:",message:String(a)});
    details.items.push({title:"Time:",message:String(n)+"s"});
    details.iconUrl="/images/correct_chef_128.png";
     table+="<tr class='correct'><td>1</td><td>0</td><td>AC<br>("+n+")</td></tr>";
    table+="<tr><th></th><th></th><th>Total Score = 100.00%<br/></th></tr>"; break;
            
    case"partial_accepted": res.verdict="Partially Correct";
    details.items.push({title: "Verdict: ", message: "Partially Accepted!!"});
    details.items.push({title: "Score: ", message: String(a)});
    details.items.push({title: "Time: ", message: String(n)+"s"});
    details.iconUrl="/images/pcorrect_chef_128.png"; break;                            
                       
    case"wrong":	res.verdict="Wrong"
    details.items.push({title: "Verdict: ", message: "Wrong!!"});                                                                                
    details.items.push({title: "Score: ", message: String(a)});
    details.items.push({title: "Time: ", message: String(n)+"s"});
    details.iconUrl="/images/wrong_chef_128.png";  
    table+="<tr class='wrong'><td>1</td><td>0</td><td>WA<br>("+n+")</td></tr>";
    table+="<tr><th></th><th></th><th>Total Score =0.00%<br/></th></tr>"; break;

    case"time":				      res.verdict="TLE"
    details.items.push({title: "Verdict: ", message: "Time Limit Exceeded!!"});                                                                                
    details.iconUrl="/images/wrong_chef_128.png";  
    table+="<tr class='wrong'><td>1</td><td>0</td><td>TLE<br>("+n+")</td></tr>";
    table+="<tr><th></th><th></th><th>Total Score = 0.00%<br/></th></tr>"; break;

    case"runtime":			    res.verdict="Runtime Error";
    details.items.push({title: "Verdict: ", message: "Runtime Error("+e+")!!"});                                        
    details.iconUrl="/images/wrong_chef_128.png"; 
    table+="<tr class='wrong'><td>1</td><td>0</td><td>RE("+e+")<br>("+n+")</td></tr>";
    table+="<tr><th></th><th></th><th>Total Score = 0.00%<br/></th></tr>"; break;

    case"compile":		      res.verdict="Compilation Error";
    details.items.push({title: "Verdict: ", message: "Compilation Error!!"});                                        
    details.iconUrl="/images/wrong_chef_128.png"; 
    table+="<tr class='wrong'><td>1</td><td>0</td><td>CE<br>("+n+")<br><a href='"+c+"' target='_blank'>click here</a></td></tr>";
    table+="<tr><th></th><th></th><th>Total Score = 0.00%<br/></th></tr>"; break;

     case"score":		        res.verdict="Insufficient Score";
    details.items.push({title: "Verdict: ", message: "Insufficient Score!!"});                                        
    details.iconUrl="/images/wrong_chef_128.png"; break;

     case"error":			      res.verdict="Internal Error";
    details.items.push({title: "Verdict: ", message: "Internal Error!!"});                                        
    details.iconUrl="/images/wrong_chef_128.png"; break;
     }                                       
     table+="<\table>";
     chrome.notifications.create(String(ques,id),details);
    
     if(r.show_status_table==="yes"){
      $.ajax({
        url:"https://www.codechef.com/error_status_table/"+r.upid+"/",
        success:function(r){
              if(r=="")
                res.error_table=table;
              else
                res.error_table=r;
            }
          })
      }
      else
        res.error_table=table;   
      
      while(result_busy){}
      result_busy=true;
      result.push(res);  
      result_busy=false;
}
else
setTimeout(getResult,2000,ques);
}
})
}

chrome.runtime.onStartup.addListener(()=>{
  badge=0;
  chrome.storage.sync.get("key",(result)=>{
    ques_array=result.key;
    if(ques_array.length!=0){
      busy=true;
      ques_array.forEach(function(item){
        setTimeout(checker,1000,item);
      })
      busy=false;
    }
  })
});

chrome.runtime.onMessage.addListener((request) => {
    //console.log(request.entry)
    while (busy) { }
    busy = true;
    ques_array.push(request.entry);

    chrome.storage.sync.set({ arr: ques_array });
    busy = false;
    setTimeout(checker, 500, request.entry);
  })





}catch (e) {
console.log('error:',e);
}


    