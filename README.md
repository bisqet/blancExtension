# blancExtension
Extension which will display all webpage images as blanc(or you can set your own image) with ability to return image to initial state in one click.
Also not break site flow.
      
###This is a hack
ye, Chrome team about five years can't do API to handle web requests from extensions. So this extension may not work with specific case.
#### How I see it right way:
```javascript
chrome.webRequest.onCompleted.addListener(handleRequest)
function handleRequest(details){
  if(details.ResourceType!=='image')return;
  blockRequest();
}
```
#### tips:
https://developer.chrome.com/extensions/webRequest
## Updates
Ye, this extension needs to increase count of situations with images which it can handle. I know, just it not in my interests to continue work on it because it was part of freelance job. You can write me or in the [issues](https://github.com/bisqet/blancExtension/issues) to get feedback or to have [talk](https://github.com/bisqet) about your case in which you need this extension