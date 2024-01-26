chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    id: "myContextMenu",
    title: "Test",
    contexts: ["image"]
  });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "myContextMenu") {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {

      const activeTab = tabs[0];

      const formData = new FormData();
      formData.append('size', 'auto');

      // must be a url not a regular local photo
      formData.append('image_url', info.srcUrl);
      
      fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        body: formData,
        headers: {
          'X-Api-Key': 'svjsdMxSwatpaaMFcxpmNwHK',
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
          return response.blob();
        })
        .then((blob) => {
          const url = URL.createObjectURL(blob);

          // javascrpt dom, create anchor element
          const a = document.createElement('a');
          a.href = url;
          // call a function to get classification of photo
          
          a.download = 'img.png';
          a.click();
          URL.revokeObjectURL(url);
        })
        .catch((error) => {
          console.error('Request failed:', error);
        });

        
    });
  }
});
