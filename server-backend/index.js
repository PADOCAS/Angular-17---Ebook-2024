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

// Função para salvar dados no ambiente de variáveis
function saveEnvironmentData(data) {
    try {
        // Converte o objeto para uma string JSON e o salva na variável de ambiente
        process.env.DATABASE_DATA = JSON.stringify(data);
    } catch (error) {
        console.error('Erro ao salvar dados no ambiente:', error);
    }
}

// Função para carregar dados do arquivo db.json e salvá-los em data.db
function loadAndSaveData() {
    let dbContent;

    try {
        // Tenta ler o conteúdo de db.json
        const dbPath = path.join(__dirname, 'db.json');

        if (fs.existsSync(dbPath)) {
            dbContent = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

            // Salva os dados em data.db
            fs.writeFileSync(path.join(__dirname, 'data.db'), JSON.stringify(dbContent));
        } else {
            console.log('Arquivo db.json não encontrado. Criando um novo.');
            dbContent = {};
        }

        saveEnvironmentData(dbContent);
    } catch (error) {
        console.error('Erro ao carregar ou salvar dados:', error);
        dbContent = {};
    }

    return dbContent;
}

// Carrega dados do arquivo ao iniciar o servidor
router.db = loadAndSaveData();

// Salvar dados no ambiente ao parar o servidor
process.on('exit', () => {
    try {
        const envData = router.db;
        saveEnvironmentData(envData);
    } catch (error) {
        console.error('Erro ao salvar dados no ambiente ao sair:', error);
    }
});

module.exports = server;
