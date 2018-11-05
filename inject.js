let imageReplacement = undefined;


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
        document.defaultView.getComputedStyle(imageContainer, null).getPropertyValue('background-image') !== "none" ||
        imageContainer.nodeName === "IMG" && !imageContainer.classList.contains('NowhiteClassCustomExtensionProperty') &&
        !imageContainer.classList.contains('whiteClassCustomExtensionProperty')
    ) {


        if (document.defaultView.getComputedStyle(imageContainer, null).getPropertyValue('height') !== "0px" &&
            document.defaultView.getComputedStyle(imageContainer, null).getPropertyValue('width') !== "0px") {
            imageContainer.style.height = document.defaultView.getComputedStyle(imageContainer, null).getPropertyValue('height');
            imageContainer.style.width = document.defaultView.getComputedStyle(imageContainer, null).getPropertyValue('width');
        } else if (imageContainer.nodeName === "IMG") {
            imageContainer.onload = function() {
                setStyle(imageContainer);
                imageContainer.classList.add('whiteClassCustomExtensionProperty')
            }
            return;
        }
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

window.onload = function() {
    main();
} //to be sure
chrome.storage.sync.get('imageReplacement', function(result) {
    imageReplacement = result.imageReplacement;
});

document.addEventListener("DOMContentLoaded", function(event) {
    createClass(document);
    setInterval(checkForUpd, 500)
    main();
});
document.addEventListener("DOMAttrModified", function(event) {
    createClass(document);
    main();
});
document.addEventListener("DOMNodeInsertedIntoDocument", function(event) {
    createClass(document);
    main();
});