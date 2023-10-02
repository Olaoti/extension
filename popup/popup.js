const checkcamera =document.getElementById('checkcamera')
const checkaudio =document.getElementById('checkaudio')
const button = document.getElementById('button')
button.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "start_recording" },
      function (response) {
        if (!chrome.runtime.lastError) {
          console.log(response);
        } else {
          console.log(chrome.runtime.lastError, "error line 14");
        }
      },
    );
  });
});
/*chrome.desktopCapture.chooseDesktopMedia(['screen', 'window'], function (streamId) {
  if (streamId) {
    // Use the stream ID to capture the selected screen/window
    const constraints = {
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: streamId
        }
      }
    };
    navigator.mediaDevices.getUserMedia(constraints)
      .then(function (stream) {
        console.log('stream')
      })
      .catch(function (error) {
        console.error('Error accessing media stream:', error);
      });
  } else {
    console.log('çancelled')
  }
});


*/

