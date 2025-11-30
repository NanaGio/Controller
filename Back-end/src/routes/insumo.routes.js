const express = require('express');
const router = express.Router();
const insumoController = require('../controllers/insumo.controller');

router.post('/insumos', insumoController.createInsumo);
router.get('/insumos', insumoController.getAllInsumos);
router.get('/insumos/:id', insumoController.getInsumoById);
router.put('/insumos/:id', insumoController.updateInsumo);
router.delete('/insumos/:id', insumoController.deleteInsumo);

module.exports = router;