const express = require('express');

const router = express.Router();
const koleksiController = require('../controllers/koleksi.controller');

router.get('/', koleksiController.findAll)
router.post('/create', koleksiController.create)
router.put('/:id', koleksiController.update)
router.get('/:id', koleksiController.findById)
router.delete('/:id', koleksiController.delete)

module.exports = router;