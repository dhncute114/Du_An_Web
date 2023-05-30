var express = require('express');
var router = express.Router();
var nhanvienRoute = require('../controllers/nhanvien.controller');

router.get('/', nhanvienRoute.trangchuNhanvien);

router.get('/themhd',nhanvienRoute.themhoadon);
router.post('/themhd',nhanvienRoute.themhoadon);


module.exports = router;