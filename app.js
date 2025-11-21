require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

// importando rotas
const insumoRoutes = require('./src/routes/insumo.routes');

// express
app.use(express.json()); 

// teste
app.get('/', (req,res) => {
    res.send('API Delicake ONLINE');
});

app.use('/api', insumoRoutes);

// === AQUI ROTAS ===
// Diz ao Express que qualquer rota que comece com /api
// deve ser gerenciada pelo seu arquivo 'insumoRoutes'

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