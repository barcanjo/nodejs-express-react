/*
Exporta uma função que configura rotas para a aplicação.
Como a função não está "embrulhada" em outra função, o seu conteúdo será
carregado imediatamente no contexto do Express quando o express-load carregar
esse arquivo.
*/
module.exports = function(app) {

	/*
	Cria uma rota para a URL "/books" passando uma função de callback que recebe os
	dados da requisição e prepara os dados da resposta, respectivamente. A variável
	"next" é utilizada para encaminahr os erros à requisição.
	*/
	app.get('/books', function(req, res, next) {

		// Carrega na variável a conexão com o banco de dados através
		var connection = app.db.connection();
		// Carrega na variável a representação da classe de acesso aos dados passando a conexão
		var bookDAO = new app.db.BookDAO(connection);

		/*
		Consulta por todos os registros de book. Quando a query for executada,
		se houver erros solicita ao Express para encaminhá-los à requisição,
		caso contrário faz proveito do content-negotiation da resposta que analisa
		o valor do cabeçalho "Accept" para executar uma função de acordo com o
		formato solicitado: quando for html renderiza o conteúdo do arquivo "book/list",
		passando uma variável "books" com os resultados da consulta. Se formato
		solicitado for JSON, envia como resposta à requisição os dados da consulta
		em JSON.
		Por fim, independete de erros ou não, fecha a conexão.
		*/
		bookDAO.findAll(function(err, results) {
	  	if (err)
	    	return next(err);

	    	res.format({
					html: function() {
						res.render('book/list', {
			    		books: results,
			    	});
	    		},
	    		json: function() {
	    			res.send(results);
	    		}
	    	});
	    });

	    connection.end();
	});

	/*
	Cria uma rota para a URL "/book/save" passando uma função de callback que recebe os
	dados da requisição e prepara os dados da resposta, respectivamente.
	Renderiza o conteúdo do arquivo "book/form" para cadastro de um book, passando
	as variáveis "book" e "errors" vazias.
	*/
	app.get('/book/save', function(req, res) {
		res.render('book/form', {
			book: {},
			errors: [],
		});
	});

	/*
	Cria uma rota para a URL "/book/save" passando uma função de callback que recebe os
	dados da requisição e prepara os dados da resposta, respectivamente. A variável
	"next" é utilizada para encaminahr os erros à requisição.
	Recupera os dados recebidos na requisição HTTP, convertidos pela biblioteca
	"body-parser", para salvar um book no banco de dados.
	*/
	app.post('/book/save', function(req, res, next) {
		/*
		Recupera do corpo da requisição os dados do livro informados no formulário,
		criando um objeto JSON com as propriedades e seus valores, presentes na requisição.
		*/
		var book = req.body;

		// Valida a propriedade "name" para rejeitar caso esteja vazia
		req.assert('name', 'is required').notEmpty();
		// Valida a propriedade "price" para rejeitar caso não seja um número flutuante
		req.assert('price', 'must be a valid number').isFloat();

		// Define na variável o resultado da validação das propriedades da requisição
		var errors = req.validationErrors();

		/*
		Se houver erros de validação faz proveito do content-negotiation da resposta que analisa
		o valor do cabeçalho "Accept" para executar uma função de acordo com o
		formato solicitado: quando for html retorna o status 400 e renderiza o conteúdo
		do arquivo "book/form" passando as variáveis "book" (com os dados enviados
		na requisição a fim de mantê-los no formulário) e "errors" (com as mensagens
		de erros da validação). Se formato solicitado for JSON, envia como resposta
		à requisição o status 400 com os erros em formato JSON. Independente do formato
		de resposta, interrompe o fluxo.
		Caso contrário, salva o book no banco de dados e redireciona a requisição
		para a URL "/books".
		*/
		if (errors) {
			res.format({
				html: function() {
					res
					.status(400)
					.render('book/form', {
						book: book,
						errors: errors,
					});
				},
				json: function() {
					res
					.status(400)
					.json(errors);
				}
			});

			return;
		}

		// Carrega na variável a conexão com o banco de dados através
		var connection = app.db.connection();
		// Carrega na variável a representação da classe de acesso aos dados passando a conexão
		var bookDAO = new app.db.BookDAO(connection);

		/*
		Salva o book no banco de dados. Se hovver erros, cria um log e solicita ao
		Express para encaminhá-los à requisição. Caso contrário redireciona a requisição
		para a URL "/books".
		Por fim, independete de erros ou não, fecha a conexão.
		*/
		bookDAO.save(book, function(err, result) {
			if (err) {
				console.log('Could not save book');

				return next(err);
			} else {
				res.redirect('/books');
			}

			connection.end();
		});
	});
}
