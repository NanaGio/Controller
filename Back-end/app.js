require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

// importando rotas
const insumoRoutes = require('./src/routes/insumo.routes');
const produtoRoutes = require('./src/routes/produto.routes');
const vendaRoutes = require('./src/routes/venda.routes.js')
const bmRoutes = require ('./src/routes/bm.routes.js')

// express
app.use(express.json()); 

// teste
app.get('/', (req,res) => {
    res.send('API Delicake ONLINE');
});

app.use('/api', insumoRoutes, produtoRoutes, vendaRoutes, bmRoutes);

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log(" -|-|- CONECTADO AO MONGODB ATLAS -|-|-")
        app.listen(PORT, () => {
            console.log(`SERVER RODANDO em ${PORT}`);
        });
    })
    .catch((error) => {
        console.error(" ERRO ao conectar", error.message);
    })
// === x x x x x ===

app.listen(PORT, () => {
    console.log(`Server Teste rodando em ${PORT}`);
});