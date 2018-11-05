# blancExtension
Extension which will replace all images in the web to blanc not breaking site flow


#THIS NOT WORK:
https://developer.chrome.com/extensions/samples#search:image<br>

##tips:
https://developer.chrome.com/extensions/webRequest

ResourceType: image
OnCompletedOptions: responseHeaders

`var callback = function(details) {...};
      var filter = {...};
      var opt_extraInfoSpec = [...];`
      
Here's an example of listening for the onBeforeRequest event:

      `chrome.webRequest.onBeforeRequest.addListener(
        callback, filter, opt_extraInfoSpec);`
        
        
###HOW I SEE IT:
`chrome.webRequest.onCompleted.addListener(handleRequest)
function handleRequest(details){
  if(details.ResourceType!=='image')return;
  console.dir(details.HttpHeaders)
}`
