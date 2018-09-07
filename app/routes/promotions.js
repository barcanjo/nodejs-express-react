/*
Exporta uma função que configura rotas para a aplicação.
Como a função não está "embrulhada" em outra função, o seu conteúdo será
carregado imediatamente no contexto do Express quando o express-load carregar
esse arquivo.
*/
module.exports = function(app) {

	/*
	Cria uma rota para a URL "/promotion" passando uma função de callback que recebe os
	dados da requisição e prepara os dados da resposta, respectivamente. A variável
	next é utilizada para encaminahr os erros à requisição.
	*/
	app.get('/promotion', function(req, res, next) {

		// Carrega na variável a conexão com o banco de dados através
		var connection = app.db.connection();
		// Carrega na variável a representação da classe de acesso aos dados passando a conexão
		var bookDAO = new app.db.BookDAO(connection);

		/*
		Consulta por todos os registros de book. Quando a query for executada,
		se houver erros solicita ao Express para encaminhá-los à requisição,
		caso contrário renderiza o conteúdo do arquivo "promotion/form", passando uma variável
		"books" com os resultados da consulta.
		Por fim, independete de erros ou não, fecha a conexão.
		*/
	  bookDAO.findAll(function(err, results) {
			if (err)
				return next(err);

	    	res.render('promotion/form', {
	    		books: results,
	    	});
	    });

	    connection.end();
	});


	/*
	Cria uma rota para a URL "/promotion" passando uma função de callback que recebe os
	dados da requisição e prepara os dados da resposta, respectivamente. A variável
	"next" é utilizada para encaminahr os erros à requisição.
	*/
	app.post('/promotion', function(req, res, next) {
		/*
		Define na variável o valor da propriedade "id" do parâmetro "book" presente
		no corpo da requisição HTTP.
		*/
		var id = req.body.book.id;

		// Carrega na variável a conexão com o banco de dados através
		var connection = app.db.connection();
		// Carrega na variável a representação da classe de acesso aos dados passando a conexão
		var bookDAO = new app.db.BookDAO(connection);

		/*
		Consulta por um book através do seu id. Quando a query for executada,
		se houver erros solicita ao Express para encaminhá-los à requisição,
		caso contrário recupera do resultado da consulta a primera linha (que deve
		corresponder ao registro encontrado) e utilizando a biblioteca Socket.io
		(recuperada do contexto do Express) emite na chamada "newPromotion" o valor
		recuperado da consulta, e redireciona a requisição (não confundir com o método
		render) a URL "/promotion".
		Por fim, independete de erros ou não, fecha a conexão.
		*/
		bookDAO.findOne(id, function(err, results) {
			if (err)
				return next(err);

	    var book = results[0];

			app.get('io').emit('newPromotion', book);

			res.redirect('/promotion');
		});

		connection.end();
	});
}
