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

// Carregar dados do arquivo db.json e salvá-los em data.db
function loadAndSaveData() {
    let dbContent;

    if (fs.existsSync(path.join(__dirname, 'db.json'))) {
        dbContent = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'));

        // Criar pasta se não existir
        const dataDir = path.dirname(path.join(__dirname, 'data.db'));
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        // Salvar os dados em data.db
        fs.writeFileSync(path.join(__dirname, 'data.db'), JSON.stringify(dbContent));
    } else {
        console.log('Arquivo db.json não encontrado. Criando um novo.');
        dbContent = {};
    }

    return dbContent;
}

// Carregar dados do arquivo ao iniciar o servidor
router.db = loadAndSaveData();

// Salvar dados no arquivo ao parar o servidor
process.on('exit', () => {
    fs.writeFileSync(path.join(__dirname, 'data.db'), JSON.stringify(router.db));
});

module.exports = server;
