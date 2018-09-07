/*
Exporta uma função que configura rotas para a aplicação.
Como a função não está "embrulhada" em outra função, o seu conteúdo será
carregado imediatamente no contexto do Express quando o express-load carregar
esse arquivo.
*/
module.exports = function(app) {

	/*
	Cria uma rota para a URL "/" passando uma função de callback que recebe os
	dados da requisição e prepara os dados da resposta, respectivamente. A variável
	"next" é utilizada para encaminahr os erros à requisição.
	*/
	app.get('/', function(req, res, next) {

		// Carrega na variável a conexão com o banco de dados através
		var connection = app.db.connection();
		// Carrega na variável a representação da classe de acesso aos dados passando a conexão
		var bookDAO = new app.db.BookDAO(connection);

		/*
		Consulta por todos os registros de book. Quando a query for executada,
		se houver erros solicita ao Express para encaminhá-los à requisição,
		caso contrário renderiza o conteúdo do arquivo "home/index", passando uma variável
		"books" com os resultados da consulta.
		Por fim, independete de erros ou não, fecha a conexão.
		*/
	  bookDAO.findAll(function(err, results) {
	  	if (err)
				return next(err);

	    	res.render('home/index', {
	    		books: results,
	    	});
	    });

	    connection.end();
	});
}
