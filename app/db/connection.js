// Carrega na variável a biblioteca de conexão com o banco de dados MySQL
var mysql = require('mysql');

/*
Define na variável uma função que cria uma conexão com o banco de dados
de acordo com o valor da variável NODE_ENV: se não tiver qualquer valor, utiliza
o valor das chaves contidas no arquivo .env, carregado na inicialização da
aplicação. Se o valor da variável for igual a "test", cria uma conexão com
um banco de dados destinado a testes da aplicação.
*/
var create = function() {
	if (!process.env.NODE_ENV) {
		return mysql.createConnection({
	    	host: process.env.DB_HOST,
	    	user: process.env.DB_USER,
	    	password: process.env.DB_PASSWORD,
	    	database: process.env.DB_DATABASE,
	    });
	}

	if (process.env.NODE_ENV == 'test') {
		return mysql.createConnection({
	    	host: 'localhost',
	    	user: 'root',
	    	password: 'password',
	    	database: 'nodejs_book_test',
	    });
	}
}

/*
Exporta a função create "embrulhada". Isso permite que a função create não seja
invocada assim que este arquivo for carregado imediatamente pelo Node, a não ser
que seja invocada diretamente. Ex: var connection = require('/db/connection')().
*/
module.exports = function() {
    return create;
}
