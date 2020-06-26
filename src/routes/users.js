const express = require('express');
const router = express.Router();

const controller = require('../controllers/users');
const auth = require('../controllers/auth');

// Populate with random data the User and Product Tables
router.get('/populateTables', controller.populateTables);

// USERS
router.get('/:userId', auth.admin, controller.listById);
router.post('/logIn', controller.validateUser);
router.post('/signIn', controller.add);
router.post('/admin', auth.admin, controller.addAdmin);
router.delete('/delete/:id', auth.admin, controller.delete);

module.exports = router;