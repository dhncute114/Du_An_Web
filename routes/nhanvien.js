var express = require('express');
var router = express.Router();
var nhanvienRoute = require('../controllers/nhanvien.controller');

router.get('/', nhanvienRoute.trangchuNhanvien);

router.get('/chitietsp/:idsp', nhanvienRoute.chitietSp);

router.get('/themhd',nhanvienRoute.themhoadon);
router.post('/themhd',nhanvienRoute.themhoadon);

router.get('/dshoadon',nhanvienRoute.dsHoadon);
router.post('/dshoadon',nhanvienRoute.dsHoadon);


module.exports = router;