var http = require('http');

var config = {
	hostname: 'localhost',
	port: 3000,
	path: '/book/save',
	method: 'post',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	}
};

var client = http.request(config, function(res) {
	console.log(res.statusCode);

	res.on('data', function(body) {
		console.log('Data: ' + body);
	});
});

var book = {
	name: 'NodeJS RESTFul',
	description: 'Learn RESTFul on NodeJS',
	price: '20.90',
};

client.end(JSON.stringify(book));