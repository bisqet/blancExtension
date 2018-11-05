chrome.webRequest.onCompleted.addListener(
	handleRequest,
	{urls: ["<all_urls>"], types:['image']},
	["responseHeaders"]
)
function handleRequest(details){
	replaceAllImages();
}