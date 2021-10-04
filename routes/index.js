var express = require('express');
var router = express.Router();

router.get("/",(req,res,next)=>{
    res.json({title:"Quicar Api"})
})
router.use('/api',require('./api'))

module.exports = router;
