var express = require('express');
var router = express.Router();
var nhanvienRoute = require('../controllers/nhanvien.controller');

router.get('/', nhanvienRoute.trangchuNhanvien);


module.exports = router;