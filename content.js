
const link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = chrome.runtime.getURL('content.css');
document.head.appendChild(link);

const message = document.createElement('div');
message.classList.add('helmessage')
document.body.appendChild(message);
const pauseit =document.createElement('div')
const pause = document.createElement('div')
const pausep = document.createElement('p')
const pauseimg = document.createElement('img')
pauseimg.src="https://cdn-icons-png.flaticon.com/512/16/16427.png"
pause.appendChild(pauseimg)
pause.classList.add('pause')
pausep.textContent='Pause'
pauseit.appendChild(pause)
pauseit.appendChild(pausep)
const playit =document.createElement('div')
const play = document.createElement('div')
const playp = document.createElement('p')
const playimg = document.createElement('img')
playimg.src="https://icon-library.com/images/play-stop-pause-icon/play-stop-pause-icon-15.jpg"
play.appendChild(playimg)
play.classList.add('pause')
playp.textContent='Play'
playit.appendChild(play)
playit.appendChild(playp)

const camit =document.createElement('div')
const cam = document.createElement('div')
const camp = document.createElement('p')
const camimg = document.createElement('img')
camimg.src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Video_camera_icon.svg/1200px-Video_camera_icon.svg.png"
cam.appendChild(camimg)
cam.classList.add('pause')
cam.classList.add('cam')
camp.textContent='cam'
camit.appendChild(cam)
camit.appendChild(camp)

const micit =document.createElement('div')
const mic = document.createElement('div')
const micp = document.createElement('p')
const micimg = document.createElement('img')
micimg.src="https://cdn-icons-png.flaticon.com/512/1082/1082810.png"
mic.appendChild(micimg)
mic.classList.add('pause')
mic.classList.add('cam')
micp.textContent='mic'
micit.appendChild(mic)
micit.appendChild(micp)


const delit =document.createElement('div')
const del = document.createElement('div')
const delimg = document.createElement('img')
delimg.src="https://img.icons8.com/ios11/600w/FFFFFF/filled-trash.png"
del.appendChild(delimg)
del.classList.add('del')
delit.appendChild(del)


message.appendChild(pauseit)
message.appendChild(playit)
message.appendChild(camit)
message.appendChild(micit)
message.appendChild(delit)

let mediaRecorder;



/* eslint-disable no-undef */
console.log("been injected");

var recorder = null;
function onAccessApproved(stream) {
	recorder = new MediaRecorder(stream);

	recorder.start();

	recorder.onstop = function () {
		stream.getTracks().forEach(function (track) {
			if (track.readyState === "Live") {
				track.stop();
			}
		});
	};

	recorder.ondataavailable = function (event) {
    let recordedBlob = event.data;
		var formdata = new FormData();
		formdata.append(
			"video",
			recordedBlob,
			"https://amara-hngtask-chrome-extension.onrender.com/api/upload",
		);

		let url = URL.createObjectURL(recordedBlob);
		console.log(url);
    let a = document.createElement("a");
		a.style.display = "none";
		a.href = url;
		a.download = `${url}.mp4`;
		a.target = "_blank";

		document.body.appendChild(a);
		a.click();

		document.body.removeChild(a);

		URL.revokeObjectURL(url);
		window.location.assign("https://helpoutt.vercel.app/");

	};
}
pauseit.addEventListener('click', function(){
  recorder.onstop();
  let node = document.createElement("p");
  node.textContent = "Stopped recording";
  document.body.appendChild(node);
})


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === "start_recording") {
		console.log("start recording");

		sendResponse(`seen ${message.action}`);

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
        console.log('access approved')
			});
	}

	if (message.action === "stopVideo") {
		console.log("stopping video");
		sendResponse(`seen ${message.action}`);
		if (!recorder) return console.log("no recorder");

		recorder.stop();
	}
});