let imageReplacement = undefined;
let editedElements = [];
let appStatus = true;
let pageStatus = true;
getInitals();
const IFRAME_SELECTOR = "iframe";

function createClass(document, imageReplacement) {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.id = "ClassCustomExtensionUnique"
    const content = imageReplacement || `url(data:image/gif;base64,R0lGODlhAQABAIAAAP7//wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==)`
    style.innerHTML = `.whiteClassCustomExtensionProperty{
     background-image:${content}!important;
    background-repeat: repeat!important;
    background-size: cover;}
     .whiteClassCustomExtensionPropertyContent{
        content:${content}!important;
            background-size: cover;
     background-image:${content}!important;
 background-repeat: repeat!important;}
      .NowhiteClassCustomExtensionProperty{}`;
    document.getElementsByTagName('head')[0].appendChild(style);
}


function setStyle(imageContainer, styleProp) {
    if (!imageContainer.classList.contains('whiteClassCustomExtensionProperty') && !imageContainer.classList.contains('NowhiteClassCustomExtensionProperty') &&
        document.defaultView.getComputedStyle(imageContainer, null).getPropertyValue('background-image') !== "none" && document.defaultView.getComputedStyle(imageContainer, null).getPropertyValue('background-image').indexOf('gradient')===-1 ||
        imageContainer.nodeName === "IMG" && !imageContainer.classList.contains('NowhiteClassCustomExtensionProperty') &&
        !imageContainer.classList.contains('whiteClassCustomExtensionProperty')||imageContainer.matches('[type=image]')
    ) {
        if (document.defaultView.getComputedStyle(imageContainer, null).getPropertyValue('height') !== "0px" &&
            document.defaultView.getComputedStyle(imageContainer, null).getPropertyValue('width') !== "0px") {
            imageContainer.style.height = document.defaultView.getComputedStyle(imageContainer, null).getPropertyValue('height');
            imageContainer.style.width = document.defaultView.getComputedStyle(imageContainer, null).getPropertyValue('width');
        }
        imageContainer.addEventListener('click', setNoWhite)
        editedElements.push(imageContainer)
        if(imageContainer.nodeName === "IMG"||imageContainer.matches('[type=image]')){
            return imageContainer.classList.add('whiteClassCustomExtensionPropertyContent');
        }
        imageContainer.classList.add('whiteClassCustomExtensionProperty')
    }
}


function setNoWhite(e) {
    imageContainer = e.target;
    calculated = {
        width: document.defaultView.getComputedStyle(imageContainer, null).getPropertyValue('width'),
        height: document.defaultView.getComputedStyle(imageContainer, null).getPropertyValue('height')
    }
    imageContainer.classList.toggle('NowhiteClassCustomExtensionProperty');
    if(imageContainer.nodeName === "IMG"||imageContainer.matches('[type=image]')){
        return imageContainer.classList.toggle('whiteClassCustomExtensionPropertyContent');
    }
    
    imageContainer.classList.toggle('whiteClassCustomExtensionProperty');
}



chrome.storage.onChanged.addListener(function(changes, namespace) {
        editedElements = getUnique(editedElements);
        if(changes.appStatus!==undefined){
            console.log('changes.appStatus', changes.appStatus.newValue)
            appStatus = changes.appStatus.newValue
            if(appStatus===false)setNoWhiteToAllChanged();
            if(appStatus===true&&pageStatus==true){
                setNoWhiteToAllChanged();
                stupidInject();
            }
        }else if(changes.pageStatus!==undefined){
            pageStatus = changes.pageStatus.newValue
            console.log('changes.pageStatus', changes.pageStatus.newValue)
            if(appStatus&&pageStatus===true){
                setNoWhiteToAllChanged();
                stupidInject();
                
            }else{
                setNoWhiteToAllChanged();
            }
        }

      });
function getInitals(){
    chrome.storage.local.get(['imageReplacement','appStatus','pageStatus'], function(result) {
        if(result.imageReplacement)imageReplacement = result.imageReplacement;
        if(result.pageStatus===undefined)result.pageStatus = true;
        if(result.appStatus===undefined)result.appStatus = true;
            pageStatus = result.pageStatus
            appStatus = result.appStatus;
            setTimeout(stupidInject,0)
            setObserver(document);
    });
}

function setNoWhiteToAllChanged(){
    for (let i = 0; i<editedElements.length;i++)setNoWhite({target:editedElements[i]})
}
const setObserver = document => {
const observer = new MutationObserver(function(mutations){
    if(pageStatus===false||appStatus===false)return;
  try{
  for (let i=0; i < mutations.length; i++){
    for (let j=0; j < mutations[i].addedNodes.length; j++){
      if(mutations[i].addedNodes[j].matches===undefined)continue;//throw out text nodes

      if(document.getElementById('ClassCustomExtensionUnique')===null){
            chrome.storage.local.get(['imageReplacement'], function(result) {
        if(result.imageReplacement){
            imageReplacement = result.imageReplacement;
            createClass(document,imageReplacement);
        }
    });
        
      }
      if (mutations[i].addedNodes[j].matches(IFRAME_SELECTOR)){
        setObserver(mutations[i].addedNodes[j].contentDocument)
        continue
      };
      if(mutations[i].addedNodes[j].children.length===0){
        setStyle(mutations[i].addedNodes[j])
        continue;
      }
      for(let o = 0; o< mutations[i].addedNodes[j].querySelectorAll('*').length;o++){
        if(mutations[i].addedNodes[j].querySelectorAll('*')[o].matches===undefined)continue;//throw out text nodes

        if (mutations[i].addedNodes[j].querySelectorAll('*')[o].matches(IFRAME_SELECTOR)){
          setObserver(mutations[i].addedNodes[j].querySelectorAll('*')[o].contentDocument)
          continue
        };
        setStyle(mutations[i].addedNodes[j].querySelectorAll('*')[o])
      }
      // We're iterating through _all_ the elements as the parser parses them,
      // deciding if they're the one we're looking for.


    }
  }
}catch(err){
    //console.error(err)
}
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
  attributes:    true,
  attributesFilter: ['type','src','style','class']
});
}




function stupidInject(){
    function createClass(document) {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.id = "ClassCustomExtensionUnique"
    const content = imageReplacement || `url(data:image/gif;base64,R0lGODlhAQABAIAAAP7//wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==)`
    style.innerHTML = `.whiteClassCustomExtensionProperty{
     background-image:${content}!important;}
     .whiteClassCustomExtensionPropertyContent{
        content:${content}!important;
     background-image:${content}!important;}
      .NowhiteClassCustomExtensionProperty{}`;
    document.getElementsByTagName('head')[0].appendChild(style);
}


function setStyle(imageContainer, styleProp) {
    if (!imageContainer.classList.contains('whiteClassCustomExtensionProperty') && !imageContainer.classList.contains('NowhiteClassCustomExtensionProperty') &&
        document.defaultView.getComputedStyle(imageContainer, null).getPropertyValue('background-image') !== "none" && document.defaultView.getComputedStyle(imageContainer, null).getPropertyValue('background-image').indexOf('gradient')===-1 ||
        imageContainer.nodeName === "IMG" && !imageContainer.classList.contains('NowhiteClassCustomExtensionProperty') &&
        !imageContainer.classList.contains('whiteClassCustomExtensionProperty')
    ) {


        if (document.defaultView.getComputedStyle(imageContainer, null).getPropertyValue('height') !== "0px" &&
            document.defaultView.getComputedStyle(imageContainer, null).getPropertyValue('width') !== "0px") {
            imageContainer.style.height = document.defaultView.getComputedStyle(imageContainer, null).getPropertyValue('height');
            imageContainer.style.width = document.defaultView.getComputedStyle(imageContainer, null).getPropertyValue('width');
        }
        editedElements.push(imageContainer)
        imageContainer.addEventListener('click', setNoWhite)

        if(imageContainer.nodeName === "IMG"){
            return imageContainer.classList.add('whiteClassCustomExtensionPropertyContent');
        }
        imageContainer.classList.add('whiteClassCustomExtensionProperty')
        
    }
    //const y = document.defaultView.getComputedStyle(x, null).getPropertyValue('width')+"x"+document.defaultView.getComputedStyle(x, null).getPropertyValue('height');
    //return y;
}

function main() {


    const elements = getAllElements();

    for (let i = 0; elements[i]; i++) setStyle(elements[i], 'background-image');

}

function setNoWhite(e) {
    imageContainer = e.target;
    calculated = {
        width: document.defaultView.getComputedStyle(imageContainer, null).getPropertyValue('width'),
        height: document.defaultView.getComputedStyle(imageContainer, null).getPropertyValue('height')
    }
    imageContainer.classList.toggle('NowhiteClassCustomExtensionProperty');
    if(imageContainer.nodeName === "IMG"){
        return imageContainer.classList.toggle('whiteClassCustomExtensionPropertyContent');
    }
    
    imageContainer.classList.toggle('whiteClassCustomExtensionProperty');
}
c0untOfImgs = 0;

const getAllElements = () => {
    const allMain = Array.from(document.getElementsByTagName('*'));
    const allIframes = getAllFrameElements();
    return allMain.concat(allIframes)
}
const getAllFrameElements = () => {
    let res = []
    for (let i of document.getElementsByTagName('iframe')) {
        try {
            if (i.contentWindow['ClassCustomExtensionUnique'] === undefined && i.contentWindow !== undefined) createClass(i.contentDocument)
            res = res.concat(Array.from(i.contentDocument.getElementsByTagName("*")))
        } catch (err) {}
    }
    return res;
}

const getAllElementsLength = () => {
    const allMain = document.getElementsByTagName('*').length;
    const allIframes = getAllFrameElementsLength();
    return allMain + allIframes
}
const getAllFrameElementsLength = () => {
    let res = 0
    for (let i of document.getElementsByTagName('iframe')) {
        try {
            if (i === null || i === undefined || i.contentDocument === undefined || i.contentDocument === null) continue;
            res += i.contentDocument.getElementsByTagName("*").length
        } catch (err) {}
    }
    return res;
}
const checkForUpd = () => {
    if (window['ClassCustomExtensionUnique'] === undefined) createClass(document)
    if (getAllElementsLength() === c0untOfImgs) return;
    c0untOfImgs = getAllElementsLength();
    main()
}
 main()
}
function getUnique(a){
    var prims = {"boolean":{}, "number":{}, "string":{}}, objs = [];

    return a.filter(function(item) {
        var type = typeof item;
        if(type in prims)
            return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
        else
            return objs.indexOf(item) >= 0 ? false : objs.push(item);
    });

}