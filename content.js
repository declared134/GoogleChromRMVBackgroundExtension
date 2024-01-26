chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "printString") {
      const imageUrl = message.srcUrl;
      printString(imageUrl);

    }
  });
  
  function printString(message) {
    console.log(message);
  }
  

 