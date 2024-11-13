var imgSrcVar = 'empty';

const express = require('express');
const SocketServer = require('ws').Server;

// const PORT = process.env.PORT || 8686;
const PORT = 8866;

// create HTTP & Websocket server
const app = express();
app.set('view engine', 'ejs');

const svr = app.listen(PORT, () => { console.log(`Node.js Server ON ${PORT}`) });
const wss = new SocketServer({ server : svr });

wss.on('connection', ws => {
	//連結時執行此 console 提示
	console.log('Client connected')

	ws.on('message', data => {
		console.log('>>> message got: ' + data);
		if (data.indexOf('{"name":"') >= 0)
		{
			let dataJson = JSON.parse(data);
			imgSrcVar = dataJson.content;
		}
	})
});

// routing
app.get('/image', (request, response) => {
	response.render('image', { imgSrc : imgSrcVar });
});
app.get('/resetImg', (request, response) => {
	imgSrcVar = 'empty';
	response.render('image', { imgSrc : imgSrcVar });
});
