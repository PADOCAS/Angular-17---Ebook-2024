const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const PORT = 3000

server.use(middlewares)
server.use(router)
server.listen(PORT, () => {
  console.log('Servidor JSON está rodando na Porta: ' + PORT)
})