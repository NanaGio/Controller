const express = require('express');
const router = express.Router();
const bmController = require('../controllers/bm.controller');

router.get('/bm/balanco', bmController.getBalancoMensal);

module.exports = router;