// Invaca a função construtura com as configurações do Express
var app = require('./app/config/express.js')();

// Cria uma instância de um servidor HTTP passando as configurações do Express
var http = require('http').Server(app);

// Cria uma instância do Socket.io para manipular conexões Web Socket sobre HTTP
var io = require('socket.io')(http);

// Cria uma variável chamada "io" no contexto do Express com a instância criada no Socket.io
app.set('io', io);

/*
 Se a variável de ambiente NODE_ENV não for "production", carrega a biblioteca
 dotenv, que por padrão lê um arquivo .env na pasta raiz do projeto, e cria uma
 variável de ambiente com seu respectivo valor, para cada chave - valor do arquivo.
*/
if (process.env.NODE_ENV != 'production')
	require('dotenv').load();

// Porta HTTP da aplicação
const port = 3000;
// Inicia a instância do servidor HTTP na porta 3000 e cria um log quando iniciado
http.listen(port, function() {
    console.log(`Server running on port ${port}!`);
});
