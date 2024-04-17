const express = require('express');

const router = express.Router();
const peminjamanController = require('../controllers/peminjaman.controller');

router.get('/', peminjamanController.findAll)
router.post('/create', peminjamanController.create)
router.put('/:id', peminjamanController.update)
router.get('/:id', peminjamanController.findById)
router.delete('/:id', peminjamanController.delete)

module.exports = router;