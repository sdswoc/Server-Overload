try {
  chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {if(details.method==="GET"){
      console.log("hello");  
      console.log(details);
      myurl=details.url;
      mytoken=details.requestHeaders[2].value;
      submission_id=myurl.substring(myurl.indexOf('=')+1);
      console.log(myurl);
      console.log(mytoken);
      console.log(submission_id);
      
      chrome.runtime.sendMessage(
      {busy:"true"})

      ;}});
     
      /*for (var i = 0; i < details.requestHeaders.length; ++i) {
        if (details.requestHeaders[i].name === 'User-Agent') {
          details.requestHeaders.splice(i, 1);
          break;
        }
      }
     return {requestHeaders: details.requestHeaders};*/
  
    /*{urls: ["https://www.codechef.com/api/ide/*"]},
    
    ["requestHeaders"]
  );*/
  chrome.runtime.onInstalled.addListener(()=>{
   chrome.storage.sync.set({arr: []});
 });
  
 var ques_array =[];
 var busy =false;
 var badge=0;
 var result=[];
 var result_busy=false;

 chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id,{busy:"true"} , function(response) {
    console.log(response.entry);
    busy = true;
    ques_array.push(response.entry);
    ques_array.forEach((element)=>{
      element.id=submission_id;
      chrome.storage.sync.set({ arr: ques_array });
      busy = false;
      setTimeout(checker, 500, request.entry);
    
    
  });
});
 });
 function checker(item){
   console.log("checker")
   getResult(item);

   busy=true;
   var i= ques_array.indexOf(item);
   ques_array.splice(i,1);
   chrome.storage.sync.set({arr: ques_array});
   busy=false;
}

function getResult(ques){
  console.log(20);
  $.ajax({url:myurl,
  dataType: "json",
  headers: [{name: 'sec-ch-ua', value: '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"'},
 {name: 'Accept', value: 'application/json, text/javascript '},
 {name: 'x-csrf-token', value: '4698bd6e02c9d329e78f9d9a21525d1849251e05b3050cb969373c4a1276c061'},
 {name: 'sec-ch-ua-mobile', value: '?0'},
 {name: 'User-Agent', value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWeb…ML, like Gecko) Chrome/99.0.4844.82 Safari/537.36'},
 {name: 'X-Requested-With', value: 'XMLHttpRequest'},
 {name: 'sec-ch-ua-platform', value: '"Windows"'}],
  success:function(r){
    if(r.result_code!="wait"){
      console.log(30);
      badge++;
      chrome.action.setBadgeText({text: "badge"});
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
     chrome.notifications.create(String(ques.id),details);
    
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
  console.log("startup");
  chrome.storage.sync.get((['arr'],(result)=>{
    ques_array=result.key;
    console.log(ques_array);
    if(ques_array.length!=0){
      busy=true;
      ques_array.forEach(function(item){
        console.log("timeout");
        setTimeout(checker,1000,item);
      })
      busy=false;
    }
  }))
});

/*chrome.runtime.onMessage.addListener((request) => {
    //console.log(request.entry)
    while (busy) { }
    busy = true;
    ques_array.push(request.entry);
    ques_array.forEach((element)=>{
      element.id=submission_id;
    })
    

    chrome.storage.sync.set({ arr: ques_array });
    busy = false;
    setTimeout(checker, 500, request.entry);
  })*/




  }catch (e) {
console.log('error:',e);
}


    