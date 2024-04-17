const express = require('express');

const router = express.Router();
const bukuController = require('../controllers/buku.controller');

router.get('/', bukuController.findAll)
router.post('/create', bukuController.create)
router.put('/:id', bukuController.update)
router.get('/:id', bukuController.findById)
router.delete('/:id', bukuController.delete)

module.exports = router;