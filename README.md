# blanchExtension
Extension which will display all webpage images as blanch(or you can set your own image) with ability to return to initial site image in one click. Also not break site flow.
## How to use
All is pretty simple but to return initial site image you can click on it. Also you can disable extension using disable button to return all inital site images on all tabs
### This is a hack
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
