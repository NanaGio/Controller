require('dotenv').config();
const express = require('express');
const app = express();

// importando rotas
const insumoRoutes = require('./src/routes/insumo.routes');

// express
app.use(express.json()); 

// teste
app.get('/', (req,res) => {
    res.send('API Delicake (versão MOCK) está no ar!');
});

// === AQUI ROTAS ===
// Diz ao Express que qualquer rota que comece com /api
// deve ser gerenciada pelo seu arquivo 'insumoRoutes'
app.use('/api', insumoRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server Teste rodando em ${PORT}`);
    console.log("Atenção: Rodando em modo MOCK (sem banco de dados).");
});