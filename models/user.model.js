const { Schema, model } = require("mongoose");
var db = require('./db');

var nhanvienchema = new db.mongoose.Schema(
    {
        usernameNV: {type: String, required: true},
        passNV: {type: String, required: true},
        email: {type: String, required: true},
        sdt: {type: String, required: true},
        diachi: {type: String, required: false}
    },
    {
        collection: 'nhan_vien'
    }
)

var quanlychema = new db.mongoose.Schema(
    {
        username: {type: String, required: true},
        pass: {type: String, required: true}
    },
    {
        collection: 'quan_ly'
    }
)

let nhanvienmd = db.mongoose.model('nhanvienmd', nhanvienchema);
let quanlymd = db.mongoose.model('quanlymd', quanlychema);

module.exports = {nhanvienmd, quanlymd}