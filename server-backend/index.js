//Local:
/*
const express = require('express');
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

module.exports = server;
*/


//Versel:

const express = require('express');
const cors = require('cors');
const fs = require('fs/promises');
const path = require('path');

const app = express();

// Configurar CORS
const corsOptions = {
    origin: '*', // Permite acesso de qualquer origem
    optionsSuccessStatus: 200 // Algumas versões antigas de navegadores (IE11, diversos SmartTVs) têm problemas com 204
};

app.use(cors(corsOptions));

// Caminho para o arquivo db.json
const dbFilePath = path.join(__dirname, 'db.json');

// Sistema de cache para evitar múltiplas leituras do arquivo
let cachedDB;

async function loadDB() {
    if (cachedDB) return cachedDB;

    try {
        const data = await fs.readFile(dbFilePath, 'utf8');
        if (data) {
            cachedDB = JSON.parse(data);
        } else {
            cachedDB = {};
        }
    } catch (error) {
        console.error('Erro ao carregar o banco de dados:', error);
        // Se não conseguir ler o arquivo, inicie com um objeto vazio
        cachedDB = {};
    }
    return cachedDB;
}

function saveDB() {
    try {
        fs.writeFileSync(dbFilePath, JSON.stringify(cachedDB, null, 2));
        console.log('Banco de dados salvo com sucesso.');
    } catch (error) {
        console.error('Erro ao salvar o banco de dados:', error);
    }
}

// Carrega o banco de dados quando o servidor inicia
loadDB();

app.use(express.json());

// Endpoint para listar todas as categorias
app.get('/api/categorias', async (req, res) => {
    const db = await loadDB();
    res.json(db.categorias || []);
});

// Endpoint para buscar uma categoria por ID
app.get('/api/categorias/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const db = await loadDB();
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
    const db = await loadDB();
    db.categorias.push(newCategory);
    saveDB();
    res.status(201).json(newCategory);
});

// Endpoint para atualizar uma categoria
app.put('/api/categorias/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const db = await loadDB();
    const index = db.categorias.findIndex(c => c.id === id);
    if (index !== -1) {
        Object.assign(db.categorias[index], req.body);
        saveDB();
        res.json(db.categorias[index]);
    } else {
        res.status(404).json({ message: 'Categoria não encontrada' });
    }
});

// Endpoint para deletar uma categoria
app.delete('/api/categorias/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const db = await loadDB();
    const index = db.categorias.findIndex(c => c.id === id);
    if (index !== -1) {
        db.categorias.splice(index, 1);
        saveDB();
        res.status(204).send('Categoria deletada com sucesso');
    } else {
        res.status(404).json({ message: 'Categoria não encontrada' });
    }
});

module.exports = app;
