var mydb = require('../models/sanpham.model');
var mydbuser = require('../models/user.model');

exports.trangchuNhanvien = async (req, res, next) => {
    let filter = {};
    if (typeof (req.query.tensp) !== 'undefined') {
        filter.tensp = new RegExp(req.query.tensp, "i");
    }
    if (typeof (req.query.id_theloai) !== 'undefined') {
        filter.id_theloai = req.query.id_theloai;
    }
    var listsp = await mydb.spmd.find(filter).populate('id_theloai');
    var listl = await mydb.tlmd.find()

    res.render('nhanvien/trangchuNV', { listsp: listsp, listtl: listl });
}
exports.themhoadon = async (req, res, next)=>{
    let msg = '';
    var listsp = await mydb.spmd.find();
    var fs = require('fs');

    let objHD = new mydb.hdmd();

    objHD.tenkh = req.body.tenkh;
    objHD.id_tensp = req.body.sanpham;
    objHD.soluong = req.body.soluong;
    objHD.sdtkh = req.body.sdtkh;
    objHD.diachikh = req.body.diachikh;
    objHD.ngaymua = req.body.ngaymua;

    try {
        let new_hd = await objHD.save();
        res.redirect('/nhanvien')
    } catch (error) {
        console.log(error);
    }

    res.render('nhanvien/themhoadon', {listsp: listsp, msg: msg});
}