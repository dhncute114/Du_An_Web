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
    var list = await mydb.spmd.find(filter).populate('id_theloai');
    var listl = await mydb.tlmd.find()

    res.render('nhanvien/trangchuNV', { listsp: list, listtl: listl });
}