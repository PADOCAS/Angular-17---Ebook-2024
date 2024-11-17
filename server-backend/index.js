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
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router({ db: {} });
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

module.exports = server;
