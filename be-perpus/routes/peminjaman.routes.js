const express = require('express');

const router = express.Router();
const peminjamanController = require('../controllers/peminjaman.controller');
const auth = require('../middlewares/auth.middleware');

router.get('/', auth, peminjamanController.findAll)
router.get('/admin', auth, peminjamanController.adminFindAll)
router.post('/create', peminjamanController.create)
router.put('/:id', peminjamanController.update)
router.get('/:id', peminjamanController.findById)
router.delete('/:id', peminjamanController.delete)

module.exports = router;