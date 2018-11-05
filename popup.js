document.addEventListener("DOMContentLoaded", function(event) { 
 document.querySelector('div input').addEventListener('change',newFile);
 document.querySelector('#default').addEventListener('click',defaultFile);
});
function newFile() {
	
  //var preview = document.querySelector('img');
  const file    = document.querySelector('input[type=file]').files[0];
  const reader  = new FileReader();

  reader.onloadend = function () {
    chrome.storage.sync.set({'imageReplacement': `url(${reader.result})`}, function() {
      document.querySelector('div p').innerText = "Images replacement updated!";
    });
  }
	reader.readAsDataURL(file);
}

function defaultFile() {
    chrome.storage.sync.set({'imageReplacement': 'url(data:image/gif;base64,R0lGODlhAQABAIAAAP7//wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==)'}, function() {
      document.querySelector('div p').innerText = "Images replacement is blanc now!";
    });
}