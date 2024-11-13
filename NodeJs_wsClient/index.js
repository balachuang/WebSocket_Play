var fileObj = null;
var websSvr = null;

// == <body onReady="initWsClient">
$(document).ready(initWsClient);

function initWsClient()
{
	// document.getElemntById('file').addEventListener('change', onFileChange)
	$('#file').change(onFileChange);
	// document.getElemntById('sendImage').addEventListener('click', sendFile)
	$('#sendImage').click(sendFile);

	//使用 WebSocket 的網址向 Server 開啟連結
	websSvr = new WebSocket('ws://localhost:8866');

	//開啟後執行的動作，指定一個 function 會在連結 WebSocket 後執行
	websSvr.onopen = () => { logInfo('open connection'); }
}

function onFileChange()
{
	// $('#file').get(0).files[0] == document.getElemntById('#file').files[0]
	fileObj = $('#file').get(0).files[0];
}

function sendFile()
{
	if (websSvr == null) return logInfo('no WebSocket object');
	if (fileObj == null) return logInfo('no file to be sent');

	logInfo('start send file...');

	// HTML5
	const reader = new FileReader();
	let rawData = new ArrayBuffer();

	reader.onload = function (e) {
		rawData = e.target.result;
		let fs = {
			name: 'test.jpg',
			length: rawData.length,
			content: rawData
		};
		logInfo("2. send image")
		websSvr.send(JSON.stringify(fs));
		fileObj = null;
		logInfo("3. done.")
	}

	// read the file
	logInfo('1. read image file');
	reader.readAsDataURL(fileObj);
}

function logInfo(msg)
{
	$('#log-area').append(msg + '<br>');
	console.log(msg);
}
