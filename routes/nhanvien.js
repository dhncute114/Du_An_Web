var express = require('express');
var router = express.Router();
var nhanvienRoute = require('../controllers/nhanvien.controller');

router.use((req, res, next) => {
    if (req.session.userlogin) {
        next();
    } else {
        res.redirect('/');
    }
});

router.get('/', nhanvienRoute.trangchuNhanvien);

router.get('/chitietsp/:idsp', nhanvienRoute.chitietSp);
router.get('/chitiethd/:idhd', nhanvienRoute.chitiethd);

router.get('/themhd',nhanvienRoute.themhoadon);
router.post('/themhd',nhanvienRoute.themhoadon);

router.get('/dshoadon',nhanvienRoute.dsHoadon);
router.post('/dshoadon',nhanvienRoute.dsHoadon);

router.get('/logout', (req, res) => {

    req.session.destroy();
  
    // Chuyển hướng đến trang đăng nhập sau khi đăng xuất
    res.redirect('/');
  });

module.exports = router;