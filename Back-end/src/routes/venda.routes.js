const express = require('express');
const router = express.Router();

const vendaController = require('../controllers/venda.controller');

router.get('/venda', vendaController.getAllVendas)

router.post('/venda', vendaController.postVenda)

router.put('/venda/:id', vendaController.putVenda)

router.delete('/venda/:id', vendaController.deleteVenda)

module.exports = router;