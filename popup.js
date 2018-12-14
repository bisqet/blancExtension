document.addEventListener("DOMContentLoaded", function(event) { 
 document.querySelector('div input').addEventListener('change',newFile);
 document.querySelector('#default').addEventListener('click',defaultFile);
 document.querySelector('#turn').addEventListener('click',turnToggle);
 document.querySelector('#turnApp').addEventListener('click',turnAppToggle);
});
let pageStatus = true;
let appStatus = true;
chrome.storage.local.get(['appStatus','pageStatus'], function(result) {
    if(result.appStatus!==undefined)appStatus = result.appStatus;
    if(result.pageStatus!==undefined)pageStatus = result.pageStatus;
      chrome.storage.local.set({'pageStatus': pageStatus}, function() {
    changeStatusInGUI(appStatus, pageStatus)
  });
  chrome.storage.local.set({'appStatus': appStatus}, function() {
    changeStatusInGUI(appStatus, pageStatus)
  });
    changeStatusInGUI(appStatus,pageStatus)
  });
function newFile() {

  //var preview = document.querySelector('img');
  const file    = document.querySelector('input[type=file]').files[0];
  const reader  = new FileReader();

  reader.onloadend = function () {
    chrome.storage.local.set({'imageReplacement': `url(${reader.result})`}, function() {
      document.querySelector('div p').innerText = "Images replacement updated!";
    });
  }
	reader.readAsDataURL(file);
}

function defaultFile() {
    chrome.storage.local.set({'imageReplacement': 'url(data:image/gif;base64,R0lGODlhAQABAIAAAP7//wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==)'}, function() {
      document.querySelector('div p').innerText = "Images replacement is blanc now!";
    });
}
function turnToggle () {
  pageStatus = toggle(pageStatus)
  chrome.storage.local.set({'pageStatus': pageStatus}, function() {
    changeStatusInGUI(appStatus, pageStatus)
  });
}
function turnAppToggle () {
  appStatus = toggle(appStatus)
  chrome.storage.local.set({'appStatus': appStatus}, function() {
    changeStatusInGUI(appStatus, pageStatus)
  });
}
function toggle(bool){
  if(bool){
    return false
  }
  return true;
}
function changeStatusInGUI(appStatus,pageStatus){
    turn.innerText = pageStatus === false?'Enable on this page':"Disable on this page"
    turn.classList = pageStatus === false?'on':"off";
    turnApp.innerText = appStatus === false?'Enable extension':"Disable extension"
    turnApp.classList = appStatus === false?'on':"off";
}