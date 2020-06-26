const express = require('express');
const router = express.Router();

const controller = require('../controllers/products');
const auth = require('../controllers/auth');

// PRODUCTS
router.get('/', auth.both, controller.listAll);
router.post('/', auth.admin, controller.add);
router.get('/:productId', auth.both, controller.listById);
router.put('/:productId', auth.admin, controller.put);
router.delete('/:productId', auth.admin, controller.delete);

module.exports = router;