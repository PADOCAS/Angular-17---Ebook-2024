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
const fs = require('fs').promises;
const path = require('path');

const app = express();

// Caminho para o arquivo db.json
const dbFilePath = path.join(__dirname, 'db.json');
let db = {};

// Carrega o banco de dados quando o servidor inicia
async function loadDB() {
    try {
        const data = await fs.readFile(dbFilePath, 'utf8');
        if (data) {
            db = JSON.parse(data);
        }
    } catch (error) {
        console.error('Erro ao carregar o banco de dados:', error);
        // Se não conseguir ler o arquivo, inicie com um objeto vazio
        db = {};
    }
}

async function saveDB() {
    try {
        await fs.writeFile(dbFilePath, JSON.stringify(db, null, 2));
        console.log('Banco de dados salvo com sucesso.');
    } catch (error) {
        console.error('Erro ao salvar o banco de dados:', error);
    }
}

// Carrega o banco de dados quando o servidor inicia
loadDB();

app.use(express.json());

// Endpoint para listar todas as categorias
app.get('/api/categorias', (req, res) => {
    res.json(db.categorias || []);
});

// Endpoint para buscar uma categoria por ID
app.get('/api/categorias/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const category = db.categorias.find(c => c.id === id);
    if (category) {
        res.json(category);
    } else {
        res.status(404).json({ message: 'Categoria não encontrada' });
    }
});

// Endpoint para adicionar uma nova categoria
app.post('/api/categorias', async (req, res) => {
    const newCategory = {
        id: Date.now(),
        nome: req.body.nome,
        descricao: req.body.descricao
    };
    db.categorias.push(newCategory);
    await saveDB();
    res.status(201).json(newCategory);
});

// Endpoint para atualizar uma categoria
app.put('/api/categorias/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const index = db.categorias.findIndex(c => c.id === id);
    if (index !== -1) {
        Object.assign(db.categorias[index], req.body);
        await saveDB();
        res.json(db.categorias[index]);
    } else {
        res.status(404).json({ message: 'Categoria não encontrada' });
    }
});

// Endpoint para deletar uma categoria
app.delete('/api/categorias/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const index = db.categorias.findIndex(c => c.id === id);
    if (index !== -1) {
        db.categorias.splice(index, 1);
        await saveDB();
        res.status(204).send('Categoria deletada com sucesso');
    } else {
        res.status(404).json({ message: 'Categoria não encontrada' });
    }
});

module.exports = app;
