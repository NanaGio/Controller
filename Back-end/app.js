const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('ERRO: a variável de ambiente `MONGO_URI` não foi encontrada. Verifique se o arquivo `.env` está na raiz do projeto ou ajuste o caminho para ele.');
}

// importando rotas
const insumoRoutes = require('./src/routes/insumo.routes');
const produtoRoutes = require('./src/routes/produto.routes');
const vendaRoutes = require('./src/routes/venda.routes.js')
const bmRoutes = require ('./src/routes/bm.routes.js')

// express
app.use(cors()); // Habilita o CORS para todas as origens
app.use(express.json());

// teste
app.get('/', (req,res) => {
    res.send('API Delicake ONLINE');
});

app.use('/api', insumoRoutes);
app.use('/api', produtoRoutes);
app.use('/api', vendaRoutes);
app.use('/api', bmRoutes);

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log(" -|-|- CONECTADO AO MONGODB ATLAS -|-|-")
        app.listen(PORT, () => {
            console.log(`SERVER RODANDO em ${PORT}`);
        });
    })
    .catch((error) => {
        console.error(" ERRO ao conectar", error);
        process.exit(1);
    })
// === x x x x x ===
