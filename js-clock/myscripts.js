var time = new Date().getHours(); 
var messageText; 
var noon = 12; 
var evening = 18; // 6PM 
var wakeupTime = 9; // 9AM 
var lunchTime = 12; // 12PM 
var partyTime = 17; // 5PM 
var napTime = lunchTime + 2; // 2PM 
var updateClock = function(){ 
  
  var lolcatImage = document.getElementById("lolcat"); 
var image = "https://i.pinimg.com/474x/7d/84/fa/7d84faf397434c0ac68976b16f822ca5.jpg"; 

var timeEventJS = document.getElementById("timeEvent"); 
if (time == partyTime) 
{ 
        image = "https://cliparting.com/wp-content/uploads/2016/07/Party-clip-art-free-free-clipart-images.gif"; 
      messageText = "Party time!!"; 
      lolcatImage.src = image; 
} else if (time == napTime) 
{ 
      
        image = "http://images.clipartpanda.com/sleep-clipart-sleep-hotel-md.png"; 
        messageText = "NAP TIME..."; 
        lolcatImage.src = image; 
} else if (time == lunchTime) 
{ 
      
         image = "https://i.pinimg.com/originals/17/49/05/1749052bd2086e9df0aa8540d606bb3e.png"; 
          messageText = "LUNCH TIME!!"; 
        lolcatImage.src = image; 
} else if (time == wakeupTime) 
{ 
          image = "https://img.pngio.com/waking-up-man-people-person-bed-morning-holidays-arms-man-in-bed-waking-up-png-512_512.png"; 
    messageText = "WAKE UP."; 
  lolcatImage.src = image; 
} else if (time < noon) 
{ 
        image = "https://i.pinimg.com/736x/7c/73/be/7c73be86203cd174608d902855f1d1ba.jpg"; 
 messageText = "Good morning!"; 
        lolcatImage.src = image; 
} else if (time > evening) 
{ 
    image = "https://png.clipart.me/previews/035/beautiful-evening-vector-10794.jpg";
    messageText = "Good Evening!"; 
    lolcatImage.src = image;
} else 
{ 
    messageText = "Good afternoon!"; 
} 
timeEventJS.innerText = messageText; 
  
} 
updateClock(); 

var showCurrentTime = function() 
{ 
    // display the string on the webpage 
    var clock = document.getElementById('clock'); 
  
    var currentTime = new Date(); 
  
    var hours = currentTime.getHours(); 
    var minutes = currentTime.getMinutes(); 
    var seconds = currentTime.getSeconds(); 
    var meridian = "AM"; 
  
    // Set hours 
    if (hours >= noon) 
    { 
        meridian = "PM"; 
    }   
    if (hours > noon) 
    { 
        hours = hours - 12; 
    } 
  
    // Set Minutes 
    if (minutes < 10) 
    { 
        minutes = "0" + minutes; 
    } 
  
    // Set Seconds 
    if (seconds < 10) 
    { 
        seconds = "0" + seconds; 
    } 
  
    // put together the string that displays the time 
    var clockTime = hours + ":" + minutes + ":" + seconds + " " + meridian + "!"; 
  
    clock.innerText = clockTime; 
  
}; 
showCurrentTime(); 



var oneSecond = 1000; 
setInterval(updateClock, oneSecond); 

var partyTimeButton = document.getElementById("partyTimeButton"); 
var isPartyTime = false; 
  
var partyEvent = function() { 
  
   if (isPartyTime === false) { 
      isPartyTime = true; 
      time = partyTime; 
      partyTimeButton.innerText = "PARTY TIME!"; 
      partyTimeButton.style.backgroundColor = "#222"; 
   } else { 
      isPartyTime = false; 
      time = new Date().getHours(); 
      partyTimeButton.innerText = "PARTY OVER"; 
      partyTimeButton.style.backgroundColor = "#0A8DAB"; 
   } 
}; 
  
partyTimeButton.addEventListener('click', partyEvent); 


var wakeUpTimeSelector = document.getElementById("wakeUpTimeSelector"); 
var lunchTimeSelector = document.getElementById("lunchTimeSelector"); 
var napTimeSelector = document.getElementById("napTimeSelector"); 
var wakeUpEvent = function(){ 
wakeupTime = wakeUpTimeSelector.value; 
}; 
wakeUpTimeSelector.addEventListener('change', wakeUpEvent); 
var napTimeEvent = function(){ 
napTime = napTimeSelector.value; 
}; 
napTimeSelector.addEventListener('change', napTimeEvent); 

var lunchTimeEvent = function(){ 
lunchTime = lunchTimeSelector.value; 
}; 
lunchTimeSelector.addEventListener('change', lunchTimeEvent); 
