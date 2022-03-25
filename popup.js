var bg= chrome.extension.getBackgroundPage();
var result= bg.result;
var busy= bg.result_busy;
var i=0;
function show(j){
    document.getElementById("name").innerHTML= result[j].prb;
    document.getElementById("verdict").innerHTML= result[j].verdict;
    if(result[j].verdict==="Correct")
    {
        document.getElementById("verdict").style="color: green";
        document.getElementsByTagName("body")[0].style="background-color:#e4f0ad";   
    }
    else
    {
        document.getElementById("verdict").style="color: red";
        document.getElementsByTagName("body")[0].style="background-color:#fae6e0"
    }
    document.getElementById("time").innerHTML=result[j].time+" s";
    document.getElementById("status_table").innerHTML=result[j].error_table;
    if(j==result.length-1){
        document.getElementById("next").disabled=true;
    }
    if(j==0){
        document.getElementById("prev").disabled=true;  
    }
}
window.onload=function(){
   if(result.length==0){
    document.getElementById("name").innerHTML= "No pending submissions available";
    document.getElementById("next").disabled=true;
    document.getElementById("prev").disabled=true;
    document.getElementById("done").disabled=true;
   }
   else{
       show(j);
   }
   document.getElementById("prev").onclick=prev;
   document.getElementById("next").onclick=next;
   document.getElementById("done").onclick=done; 
   if(result.length==1){
    document.getElementById("next").disabled=true;
    document.getElementById("prev").disabled=true;    
   }
};
function next(){
    if(j!=result.length-1){
        j++;
    }
    show(j);
}

function prev(){
    // console.log(i);
    document.getElementById("next").disabled=false;    
     if(j!=0)
         j--;
     show(j); 
 }

 function done(){
     if(result.length!=0){
         busy=true;
         result.splice(j,1);
         busy=false;
         if(j==result.length){
             j--;
         
         if(result.length==0){
            document.getElementById("name").innerHTML= "No pending submissions available";
              j=0;
         }
     }else{show(j);
        bg.badge--;
        if(bg.badge!=0){
           chrome.browserAction.setBadgeText({text: String(bg.badge)});
        }else{
            chrome.browserAction.setBadgeText({text: ""}); 
        }
       }
      }else{
        document.getElementById("name").innerHTML= "No pending submissions available";
      }}




