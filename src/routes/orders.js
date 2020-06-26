const express = require('express');
const router = express.Router();

const controller = require('../controllers/orders');
const auth = require('../controllers/auth');

// ORDERS
router.get('/', auth.admin, controller.listAll);
router.post('/', auth.user, controller.add);
router.get('/:orderId', auth.user, controller.listById);
router.put('/:orderId', auth.admin, controller.put);
router.delete('/:orderId', auth.admin, controller.delete);

module.exports = router;