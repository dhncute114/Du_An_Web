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

exports.chitietSp = async (req, res, next) => {
    let idsp = req.params.idsp;
    let sp = await mydb.spmd.findById(idsp).populate('id_theloai');

    res.render('nhanvien/chitietsp', { sp: sp });
}

exports.dsHoadon = async (req, res, next) => {
    let filter = {};
    if (typeof (req.query.tenkh) !== 'undefined') {
        filter.tenkh = new RegExp(req.query.tenkh, "i");
    }

    var listhd = await mydb.hdmd.find(filter).populate('id_tensp');

    res.render('nhanvien/danhsachhd', { listhd: listhd });
}

exports.themhoadon = async (req, res, next) => {
    let msg = '';
    var listsp = await mydb.spmd.find();

    if (req.method == 'POST') {
        let objHD = new mydb.hdmd();

        objHD.tenkh = req.body.tenkh;
        objHD.id_tensp = req.body.sanpham;
        objHD.soluong = req.body.soluong;
        objHD.sdtkh = req.body.sdtkh;
        objHD.diachikh = req.body.diachikh;
        objHD.ngaymua = req.body.ngaymua;
        objHD.tongtien = req.body.tongtien;

        try {
            let new_hd = await objHD.save();
            res.redirect('/nhanvien/dshoadon')
        } catch (error) {
            console.log(error);
            msg = error;
        }
    }

    res.render('nhanvien/themhoadon', { listsp: listsp, msg: msg });
}

exports.chitiethd = async (req, res, next) => {
    let idhd = req.params.idhd;
    let hd = await mydb.hdmd.findById(idhd).populate('id_tensp');

    res.render('nhanvien/chitiethd', { hd: hd });
}

exports.xoaHoadon = async (req, res, next) => {
    let id = req.params.idhd;

    try {
        await mydb.hdmd.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
    res.redirect('/nhanvien/dshoadon')
}