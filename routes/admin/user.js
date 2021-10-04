var express = require('express');
var router = express.Router();
const {getUserList, getUserInfo} = require('../../controller/admin/userController')




/* GET home page. */
router.get('/', getUserList);
router.get('/getUserInfo', getUserInfo);









module.exports = router;