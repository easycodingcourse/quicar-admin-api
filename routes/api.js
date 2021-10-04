var express = require('express');
var router = express.Router();


router.use('/admin',require('./admin'))
router.use('/user',require('./user'))
router.use('/partner',require('./partner'))

module.exports = router;
