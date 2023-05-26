var express = require('express');
var router = express.Router();
var taikhoanRoute = require('../controllers/taikhoan.controller')

router.get('/', taikhoanRoute.loginQuanly);
router.post('/', taikhoanRoute.loginQuanly);

router.get('/nhanvienlogin', taikhoanRoute.loginNhanvien);
router.post('/nhanvienlogin', taikhoanRoute.loginNhanvien)

module.exports = router;