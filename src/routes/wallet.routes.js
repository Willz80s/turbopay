const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/auth.middleware');
const { balance } = require('../controllers/wallet.controller');

router.get('/balance', authenticate, balance);

module.exports = router;