// Carrega na variável a biblioteca "express" para configuração da aplicação
var express = require("express");

/*
Carrega na variável a biblioteca "express-loader" que fará o carregamento
automático de todos os arquivos JavaScript para o contexto do Express,
permitindo que sejam utiizados na aplicação.
*/
var load = require('express-load');

/*
Carrega na variável a biblioteca "body-parser" que fará o parser das requisições
HTTP para JSON, permitindo que a aplicação acesse os dados enviados através
do método req.body
*/
var bodyParser = require('body-parser');

/*
Carrega na variável a biblioteca "serve-static" para "servir" os arquivos
estáticos da aplicação, acessíveis sem a necessidade de rotas, como imagens,
estilos CSS e plugins.
*/
var serveStatic = require('serve-static');

/*
Carrega na variável a biblioteca "express-validator" para tratar as validações
dos dados enviados nas requisições HTTP.
*/
var expressValidator = require('express-validator');

/*
Define na variável as configurações para servir os arquivos estáticos da
aplicação.
Define o cache dos arquivos em 2 dias.
*/
var serveConfig = { maxAge: '2d' };

/*
Cria uma função responsável por redirecionar a requisição quando a rota ou
página solicitada não for encontrada no servidor.
Redireciona o fluxo da requisição para o arquvo 404, com o status 404.
*/
var notFoundPage = function(req, res, next) {
	res.status(404).render('errors/404');
	next();
};

/*
Cria uma função responsável por redirecionar a requisição for um erro for
encontrado no servidor.
Redireciona o fluxo da requisição para o arquvo 500, com o status 500,
se a variável NODE_ENV for igual a "production" e interrompe o fluxo, caso
contrário exibe o erro na como resposta à requisição.
*/
var serverError = function(err, req, res, next) {
	if (process.env.NODE_ENV == 'production') {
		res.status(500).render('errors/500');
		return;
	}
	next(err);
}

// Exporta a função define as configurações do Express para a aplicação
module.exports = function() {
	// Invoca a função construtura do Express carregada na variável express
	var app = express();

	// Define o tipo de arquivo JSX como o padrão para renderização no motor de views
	app.set("view engine", "jsx");
	// Define no EJS a localização das páginas da aplicação
	app.set('views', './app/views');
	// Configura o view engine da aplicação para usar o react
	app.engine('jsx', require('express-react-views').createEngine());
	/*
	Utilizando o middleware ServeStatic, carregado na variável serveStatic,
	define o mapeamento "/assets" apontando para o diretório "/app/assets", permitindo
	que as páginas possam acessar o conteúdo desse diretório de forma estática.
	*/
	app.use('/assets', serveStatic('./assets', serveConfig));
	// Como feito para assets, cria um mapeamento para o framework bootstrap
	app.use('/bootstrap', serveStatic('./node_modules/bootstrap', serveConfig));
	// Como feito para assets, cria um mapeamento para a biblioteca SweetAlert2
	app.use('/sweetalert2', serveStatic('./node_modules/sweetalert2', serveConfig));
	/*
	Configura o middleware body-parser para realizar o parser de dados enviados
	por um formulário. A propriedade "extended" permite o parser de formulários
	mais complexos.
	*/
	app.use(bodyParser.urlencoded({ extended: true }));
	// Configura o middleware body-parser para realizar o parser de dados JSON
	app.use(bodyParser.json());
	// Carrega no Express o middleware para validações de requisições HTTP
	app.use(expressValidator());

	/*
	Configura a biblioteca "express-loader", carregada na variável load.
	Define que irá carregar todos os arquivos JavaScript presentes na pasta
	"routes", dentro da pasta "app". Em seguida faz o mesmo para a pasta db.
	Por fim, coloca todos os carregamentos dentro da variável app, que representa
	o Express. Desta forma é possível recuperar todos os módulos exportados para
	o Node em cada um dos arquivos carregados. Por padrão, os módulos são expostos
	no Express utilizando seus paths + nome do arquivo. Por exemplo: para criar
	uma instância de BookDAO deve-se utilizar o comando app.db.BookDAO já que
	a função construtura de BookDAO está no arquivo BookDAO, no diretório
	db, na variável do express app.
	*/
	load('routes', { cwd: 'app' })
		.then('db')
		.into(app);

	/*
	Respeitando a ordem das definições de rotas, configura no Express as funções
	que tratará as requisições de páginas não encontradas ou erros no servidor.
	*/
	app.use(notFoundPage);
	app.use(serverError);

	return app;
}
