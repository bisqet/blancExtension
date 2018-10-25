chrome.webRequest.onBeforeRequest.addListener(
        function(details) {
          return {cancel: details.url.indexOf("://www.evil.com/") != -1};
        },
        {urls: ["<all_urls>"]},
        ["blocking"]);
