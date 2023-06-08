var express = require('express');
var router = express.Router();
var quanlyRoute = require('../controllers/quanly.controller');
var multer = require('multer');
var uploader = multer({dest: './tmp'});

router.use((req, res, next) => {
    if (req.session.userlogin) {
        next();
    } else {
        res.redirect('/');
    }
});

router.get('/', quanlyRoute.trangchuQuanly);

router.get('/chitietsp/:idsp', quanlyRoute.chitietSp);

router.get('/themsp', quanlyRoute.themSanpham);
router.post('/themsp',uploader.single("image"), quanlyRoute.themSanpham);

router.delete('/xoasp/:idsp', quanlyRoute.xoaSanpham);
router.get('/xoasp/:idsp', quanlyRoute.xoaSanpham);

router.post('/suasp/:idsp',uploader.single("image"), quanlyRoute.suaSanpham);
router.get('/suasp/:idsp', quanlyRoute.suaSanpham);

router.get('/taikhoan', quanlyRoute.dsTaikhoanNV);
router.get('/taikhoan/chitietnv/:idnv', quanlyRoute.chitietNv);

router.get('/taotknv', quanlyRoute.taoTknv);
router.post('/taotknv', quanlyRoute.taoTknv);

router.delete('/taikhoan/xoatk/:idnv', quanlyRoute.xoaTaikhoannv);
router.get('/taikhoan/xoatk/:idnv', quanlyRoute.xoaTaikhoannv);

router.post('/taikhoan/suatknv/:idnv', quanlyRoute.suaTaikhoannv);
router.get('/taikhoan/suatknv/:idnv', quanlyRoute.suaTaikhoannv);

router.get('/addtheloai', quanlyRoute.themTheloai);
router.post('/addtheloai', quanlyRoute.themTheloai);
router.post('/addtheloai/xoatheloai', quanlyRoute.xoaTheloai);

router.get('/dshoadon',quanlyRoute.dsHoadon);
router.post('/dshoadon',quanlyRoute.dsHoadon);

router.delete('/dshoadon/xoahd/:idhd', quanlyRoute.xoaHoadon);
router.get('/dshoadon/xoahd/:idhd', quanlyRoute.xoaHoadon);
router.get('/chitiethd/:idhd', quanlyRoute.chitiethd);

router.get('/logout', (req, res) => {

    req.session.destroy();
  
    // Chuyển hướng đến trang đăng nhập sau khi đăng xuất
    res.redirect('/');
  });


module.exports = router;
