const { Schema, model, default: mongoose } = require("mongoose");
var db = require('./db');

const spchema = new db.mongoose.Schema(
    {
        tensp: { type: String, required: true },
        id_theloai: { type: db.mongoose.Schema.Types.ObjectID, ref: 'tlmd' },
        image: { type: Object, required: true },
        mota: { type: String, required: false },
        soluong: { type: Number, required: true},
        gia: { type: Number, required: true }
    },
    { collection: 'san_pham' }
);

const hoadonchema = new mongoose.Schema (
    {
        id_tensp: {type: db.mongoose.Schema.Types.ObjectID, ref: 'spmd'},
        id_gia: {type: db.mongoose.Schema.Types.ObjectID, ref: 'spmd'},
        id_soluong: {type: db.mongoose.Schema.Types.ObjectID, ref: 'spmd'},
        soluong: { type: String, required: true},
        tenkh: { type: String, required: true},
        sdtkh: {type: String, required: true},
        diachikh: {type: String, required: true},
        ngaymua: {type: String, required: true},
        tongtien: {type: String, required: false}
    },
    { collection: 'hoa_don' }
)

const theloaichema = new db.mongoose.Schema(
    {
        theloai: { type: String, required: true }
    },
    { collection: 'the_loai'}
);

let spmd = db.mongoose.model('spmd', spchema);
let tlmd = db.mongoose.model('tlmd', theloaichema);
let hdmd = db.mongoose.model('hdmd', hoadonchema)

module.exports = { spmd, tlmd, hdmd };