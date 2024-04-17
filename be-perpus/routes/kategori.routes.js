const express = require('express');

const router = express.Router();
const kategoriController = require('../controllers/kategori.controller');

router.get('/', kategoriController.findAll)
router.post('/create', kategoriController.create)
router.put('/:id', kategoriController.update)
router.get('/:id', kategoriController.findById)
router.delete('/:id', kategoriController.delete)

module.exports = router;