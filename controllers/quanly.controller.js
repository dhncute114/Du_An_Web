var mydb = require('../models/sanpham.model');
var mydbuser = require('../models/user.model');

exports.trangchuQuanly = async (req, res, next) => {
    let filter = {};
    if (typeof (req.query.tensp) !== 'undefined') {
        filter.tensp = new RegExp(req.query.tensp, "i");
    }
    if (typeof (req.query.id_theloai) !== 'undefined') {
        filter.id_theloai = req.query.id_theloai;
    }
    var list = await mydb.spmd.find(filter).populate('id_theloai');
    var listl = await mydb.tlmd.find()

    res.render('quanly/trangchuQL', { listsp: list, listtl: listl });
}

exports.chitietSp = async (req, res, next) => {
    let idsp = req.params.idsp;
    let sp = await mydb.spmd.findById(idsp).populate('id_theloai');

    res.render('quanly/chitietsp', { sp: sp });
}

exports.chitietNv = async (req, res, next) => {
    let idnv = req.params.idnv;
    let nv = await mydbuser.nhanvienmd.findById(idnv);

    res.render('quanly/chitietnv', { nv: nv });
}

exports.themSanpham = async (req, res, next) => {

    let msg = '';

    var listtl = await mydb.tlmd.find();
    var fs = require('fs');

    if (req.method == 'POST') {
        if (req.body.tensp == "") {
            msg = 'Vui lòng nhập tên sản phẩm'
        } else if (req.body.mota == "") {
            msg = 'Vui lòng nhập mô tả sản phẩm'
        } else if (req.body.gia == "") {
            msg = 'Vui lòng nhập giá sản phẩm'
        } else if (req.body.image == "") {
            msg = 'Vui lòng thêm ảnh sản phẩm'
        } else if (req.body.soluong == "") {
            msg = 'Vui lòng thêm số lượng sản phẩm'
        } else {
            let objSP = new mydb.spmd();
            let url_file = '/uploads/' + req.file.originalname;

            objSP.tensp = req.body.tensp;
            objSP.id_theloai = req.body.theloai;
            objSP.image = url_file;
            objSP.mota = req.body.mota;
            objSP.soluong = req.body.soluong;            
            objSP.gia = req.body.gia;

            try {
                fs.renameSync(req.file.path, "./public/uploads/" + req.file.originalname);
                let new_sp = await objSP.save();
                res.redirect('/quanly')
            } catch (error) {
                console.log(error);
            }
        }
    }
    res.render('quanly/themSanpham', { listtl: listtl, msg: msg });
}

exports.suaSanpham = async (req, res, next) => {
    var listtl = await mydb.tlmd.find();

    let idsp = req.params.idsp;
    let objsp = await mydb.spmd.findById(idsp);

    if (req.method == 'POST') {
        objsp.tensp = req.body.tensp;
        objsp.id_theloai = req.body.theloai;
        objsp.image = req.body.image;
        objsp.soluong = req.body.soluong;
        objsp.mota = req.body.mota;
        objsp.gia = req.body.gia;

        try {
            await mydb.spModel.findByIdAndUpdate({ _id: idsp }, objsp)
            msg = 'sua thanh cong';
        } catch (error) {
            msg = 'loi' + error.message;
            console.log(error);
        }
    }

    res.render('quanly/suasanpham', { listtl: listtl, objsp: objsp });
}


exports.xoaSanpham = async (req, res, next) => {
    let id = req.params.idsp;

    try {
        await mydb.spmd.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
    res.redirect('/quanly')
}

exports.dsTaikhoanNV = async (req, res, next) => {

    let filter = {};
    if (typeof (req.query.usernameNV) !== 'undefined') {
        filter.usernameNV = new RegExp(req.query.usernameNV, "i");
    }
    var list = await mydbuser.nhanvienmd.find(filter).sort({usernameNV: 1});
    res.render('quanly/danhsachtknv', { listtk: list });
}

exports.taoTknv = async (req, res, next) => {
    let msg = '';

    if (req.method == 'POST') {
        console.log(req.body);

        if (req.body.passNV != req.body.repassNV) {
            msg = 'Mật khẩu không khớp';
            res.render('quanly/themtknv', { msg: msg });
        } else {
            let obju = await mydbuser.nhanvienmd.findOne({ usernameNV: req.body.usernameNV });
            if (obju != null) {
                msg = 'Username đã tồn tại';
                return res.render('quanly/themtknv', { msg: msg });
            } else {
                obju = new mydbuser.nhanvienmd({
                    usernameNV: req.body.usernameNV,
                    passNV: req.body.passNV,
                    email: req.body.email,
                    sdt: req.body.sdt,
                    diachi: req.body.diachi,
                });
                try {
                    await obju.save();
                    return res.redirect('taikhoan');
                } catch (error) {
                    msg = error.message;
                }
            }
        }
    }
    res.render('quanly/themtknv', { msg: msg })
}

exports.xoaTaikhoannv = async (req, res, next) => {
    let id = req.params.idnv;

    try {
        await mydbuser.nhanvienmd.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
    res.redirect('/quanly/taikhoan')
}

exports.suaTaikhoannv = async (req, res, next) => {
    let msg = '';

    let id = req.params.idnv;
    let objsp = await mydbuser.nhanvienmd.findById(id);

    if (req.method == 'POST') {
        objsp.usernameNV = req.body.usernameNV,
        objsp.passNV = req.body.passNV,
        objsp.email = req.body.email,
        objsp.sdt = req.body.sdt,
        objsp.diachi = req.body.diachi

        try {
            await mydbuser.nhanvienmd.findByIdAndUpdate({ _id: id }, objsp)
            msg = 'sua thanh cong';
            res.redirect('/quanly/taikhoan')
        } catch (error) {
            msg = 'loi' + error.message;
            console.log(error);
        }
    }

    res.render('quanly/suatknv', { objsp: objsp, msg: msg });
}