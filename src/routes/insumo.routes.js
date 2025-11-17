const express = require('express');
const router = express.Router();

const insumoController = require('.../controllers/insumo.controller');

router.get('/insumos', insumoController.getAllIsumos);

router.post('/insumos', insumoController.createInsumo);

router.put('/insumos/:id', insumoController.updateInsumo);

router.delete('/insumos/:id', insumoController.deleteInsumo);

module.exports = router;