var express = require('express');
var router = express.Router();
var quanlyRoute = require('../controllers/quanly.controller');
var multer = require('multer');
var uploader = multer({dest: './tmp'});

router.get('/', quanlyRoute.trangchuQuanly);

router.get('/chitietsp/:idsp', quanlyRoute.chitietSp);

router.get('/themsp', quanlyRoute.themSanpham);
router.post('/themsp',uploader.single("image"), quanlyRoute.themSanpham);

router.delete('/xoasp/:idsp', quanlyRoute.xoaSanpham);
router.get('/xoasp/:idsp', quanlyRoute.xoaSanpham);

router.post('/suasp/:idsp', quanlyRoute.suaSanpham);
router.get('/suasp/:idsp', quanlyRoute.suaSanpham);

router.get('/taikhoan', quanlyRoute.dsTaikhoanNV);
router.get('/taikhoan/chitietnv/:idnv', quanlyRoute.chitietNv);

router.get('/taotknv', quanlyRoute.taoTknv);
router.post('/taotknv', quanlyRoute.taoTknv);

router.delete('/taikhoan/xoatk/:idnv', quanlyRoute.xoaTaikhoannv);
router.get('/taikhoan/xoatk/:idnv', quanlyRoute.xoaTaikhoannv);

router.post('/taikhoan/suatknv/:idnv', quanlyRoute.suaTaikhoannv);
router.get('/taikhoan/suatknv/:idnv', quanlyRoute.suaTaikhoannv);

router.post('/addtheloai',quanlyRoute.addtheloai);
router.get('/addtheloai',quanlyRoute.addtheloai);


module.exports = router;
