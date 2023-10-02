
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startScreenRecording") {
    console.log("requesting recording");

    sendResponse(`processed: ${message.action}`);

    navigator.mediaDevices
      .getDisplayMedia({
        audio: true,
        video: {
          width: 9999999999,
          height: 9999999999,
        },
      })
      .then((stream) => {
        onAccessApproved(stream);
        console.log(stream)
      });
  }

  if (message.action === "stopvideo") {
    console.log("stopping video");
    sendResponse(`processed: ${message.action}`);
    if (!recorder) return console.log("no recorder");

    recorder.stop();
  }
});

// Listen for messages from the popup
/*chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'startScreenRecording') {
    // Request screen capture
    console.log(sender)
    chrome.desktopCapture.chooseDesktopMedia(['screen', 'window'], message.data, function (streamId) {
      if (streamId) {
        const constraints = {
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: streamId,
            },
          },
        };

        // Get access to user media
        Navigator.mediaDevices.getUserMedia(constraints)
        console.log(navigator, navigator.mediaDevices)
          .then(function (stream) {
            // Handle the media stream, e.g., record or display
            const mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = function (event) {
              // Handle recorded data
              console.log('Recording data:', event.data);
            };

            mediaRecorder.start();

            setTimeout(function () {
              mediaRecorder.stop();
              stream.getTracks().forEach(function (track) {
                track.stop();
              });
            }, 3000);
          })
          .catch(function (error) {
            console.error('Error accessing media stream:', error);
          });
      } else {
        console.error('User canceled screen capture');
      }
    });
  }
});







/*
chrome.runtime.onMessage.addListener(function (message, sender) {
  var showing = false;
  if (message.action == 'popact') {
    switch (message.event) {
      case 'both':
        console.log('here');
        showing = true;
        break;
      case 'audioonly':
        console.log('only audio was selected');
        break;
      case 'cameraonly':
        console.log('only camera was selected');
        break;
      case 'none':
        console.log('none, obviously');
        break;
      default:
        break;
    }
  }
  if (message.action == 'cont') {
    console.log('way forward');
    chrome.tabs.query({}, function (tabs) {
      tabs.forEach(tab => {
        if (tab.active == true) {
          chrome.desktopCapture.chooseDesktopMedia(['screen', 'window'], tab, function (streamId) {
            if (streamId) {
              const constraints = {
                audio: false,
                video: {
                  mandatory: {
                    chromeMediaSource: 'desktop',
                    chromeMediaSourceId: streamId,
                  },
                },
              };
              try {
                navigator.mediaDevices.getUserMedia(constraints)
                  .then(function (stream) {
                    const mediaRecorder = new MediaRecorder(stream);

                    mediaRecorder.ondataavailable = function (event) {
                      console.log('already recording' + event.data);
                    };

                    mediaRecorder.start();

                    // This code will stop recording after 2 seconds (adjust as needed)
                    setTimeout(function () {
                      mediaRecorder.stop();
                      stream.getTracks().forEach(function (track) {
                        track.stop();
                        console.log('stopped');
                      });
                    }, 2000);
                  })
                  .catch(function (error) {
                    console.error('Error accessing media stream:', error);
                  });
              } catch (error) {
                console.error('Error in getUserMedia:', error);
              }
            } else {
              console.log('error o');
            }
          });
        }
      });
    });
  }
});



/*let recorder;
let data = [];

async function startRecording(streamId) {
  if (recorder?.state === 'recording') {
    throw new Error('Called startRecording while recording is in progress.');
  }

  const media = await navigator.mediaDevices.getUserMedia({
    audio: {
      mandatory: {
        chromeMediaSource: 'tab',
        chromeMediaSourceId: streamId
      }
    },
    video: {
      mandatory: {
        chromeMediaSource: 'tab',
        chromeMediaSourceId: streamId
      }
    }
  });

  const output = new AudioContext();
  const source = output.createMediaStreamSource(media);
  source.connect(output.destination);

  recorder = new MediaRecorder(media, { mimeType: 'video/webm' });
  recorder.ondataavailable = (event) => data.push(event.data);
  recorder.onstop = () => {
    const blob = new Blob(data, { type: 'video/webm' });
    window.open(URL.createObjectURL(blob), '_blank');

    recorder = undefined;
    data = [];
  };
  recorder.start();

  window.location.hash = 'recording';
}

async function stopRecording() {
  recorder.stop();

  recorder.stream.getTracks().forEach((t) => t.stop());

  window.location.hash = '';

}*/

