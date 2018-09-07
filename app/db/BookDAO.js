/*
Cria uma função construtora para BookDAO, que recebe um parâmetro representando
uma conexão com o banco de dados.
BookDAO possui todos os métodos de acesso aos dados da tabela book no banco de dados.
Com a definição dos prototypes, todas as instâncias de BookDAO possuirão as
funções criadas.
*/
function BookDAO(connection) {
	this._connection = connection;
}

/*
Retorna todos os registros de book e executa uma função de callback com a query
for concluída.
*/
BookDAO.prototype.findAll = function(callback) {
	this._connection.query('select * from book', callback);
}

/*
Insere um registro de book e executa uma função de callback com a query
for concluída.
*/
BookDAO.prototype.save = function(product, callback) {
	this._connection.query('insert into book set ?', product, callback);
}

/*
Consulta por um book através do seu ID e executa uma função de callback com a query
for concluída.
*/
BookDAO.prototype.findOne = function(id, callback) {
	this._connection.query('select * from book where id = ?', [ id ], callback);
}

/*
Exporta a função BookDAO.
*/
module.exports = function() {
	return BookDAO;
}
