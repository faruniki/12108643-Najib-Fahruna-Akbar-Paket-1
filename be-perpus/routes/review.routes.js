const express = require('express');

const router = express.Router();
const reviewController = require('../controllers/review.controller');
const auth = require('../middlewares/auth.middleware');

router.get('/', auth, reviewController.findAll)
router.post('/create', reviewController.create)
router.put('/:id', reviewController.update)
router.get('/:id', reviewController.findById)
router.delete('/:id', reviewController.delete)

module.exports = router;