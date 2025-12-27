const express = require('express');
const router = express.Router();

const produtoController = require('../controllers/produto.controller.js');

router.get('/produto', produtoController.getAllProdutos);

router.get('/produto/:id', produtoController.getProdutoById);

router.post('/produto', produtoController.createProduto);

router.put('/produto/:id', produtoController.updateProduto);

router.delete('/produto/:id', produtoController.deleteProduto);

module.exports = router;