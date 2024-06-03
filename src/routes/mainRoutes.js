const express = require('express');
const router = express.Router();
const usersRoutes = require('./usersRoutes');
const questionsRoutes = require('./questionsRoutes');

router.use('/users', usersRoutes);
router.use('/questions', questionsRoutes);

module.exports = router;