const express = require('express');
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

//Rodar Local:
// const PORT = 3000

server.use(middlewares)
server.use(router)
//Rodar Local:
// server.listen(PORT, () => {
//   console.log('Servidor JSON está rodando na Porta: ' + PORT)
// })

//Deploy Servidor Vercel:
server.listen(() => {
    console.log('Servidor JSON está rodando')
})

module.exports = server;
