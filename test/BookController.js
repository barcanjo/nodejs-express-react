process.env.NODE_ENV = 'test';

var path = require('path');
var express = require('../app/config/express')();
var request = require('supertest')(express);

describe('#BookController', function() {
	beforeEach(function(done) {
		var connection = express.db.connection();
		connection.query('delete from book', function(err, results) {
			if (!err)
				done();
		});
	});

	it('#consulta de produtos', function(done) {
		request
			.get('/books')
			.set('Accept', 'application/json')
			.expect('Content-type', /json/)
			.expect(200, done);
	});

	it('#cadastro de produto com dados invalidos', function(done) {
		var book = {
			namme: '',
			description: 'Some book',
			price: 10.9,
		};

		request
			.post('/book/save')
			.send(book)
			.expect(400, done);
	});

	it('#cadastro de produto com dados validos', function(done) {
		var book = {
			name: 'Some title',
			description: 'Some description',
			price: 10.90,
		};

		request
			.post('/book/save')
			.send(book)
			.expect(302, done);
	});
});