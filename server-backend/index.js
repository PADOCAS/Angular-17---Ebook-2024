//Local:
// const express = require('express');
// const jsonServer = require('json-server')
// const server = jsonServer.create()
// const router = jsonServer.router('db.json')
// const middlewares = jsonServer.defaults()
//
// const PORT = 3000
//
// server.use(middlewares)
// server.use(router)
//
// server.listen(PORT, () => {
//   console.log('Servidor JSON está rodando na Porta: ' + PORT)
// })
//
// module.exports = server;

//Versel:
const express = require('express');
const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'data.db'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

// Função para carregar dados do ambiente de variáveis
function loadEnvironmentData() {
    try {
        // Tenta obter os dados da variável de ambiente
        const envData = JSON.parse(process.env.DATABASE_DATA || '{}');

        // Se não encontrar dados na variável de ambiente, usa um objeto vazio
        return envData;
    } catch (error) {
        console.error('Erro ao carregar dados do ambiente:', error);
        return {};
    }
}

// Carrega os dados inicialmente
router.db = loadEnvironmentData();

// Middleware personalizado para PUT requests
server.use((req, res, next) => {
    if (req.method === 'PUT') {
        const dbContent = router.db;

        // Atualiza o objeto db com os novos dados
        router.db = { ...dbContent, ...req.body };

        // Salva os dados atualizados na variável de ambiente
        saveEnvironmentData(router.db);

        next();
    } else {
        next();
    }
});

// Função para salvar dados no ambiente de variáveis
function saveEnvironmentData(data) {
    try {
        // Converte o objeto para uma string JSON e o salva na variável de ambiente
        process.env.DATABASE_DATA = JSON.stringify(data);
    } catch (error) {
        console.error('Erro ao salvar dados no ambiente:', error);
    }
}

module.exports = server;
