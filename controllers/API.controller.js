var mydbuser = require("../models/user.model");
var mydbsp = require("../models/sanpham.model");

const API_RESPONSE = {
  SUCCESS: { status: 1, message: "Success" },
  ERROR: { status: 0, message: "Error" },
  NOT_FOUND: { status: 0, message: "Data not found" },
};

exports.getListSP = async (req, res, next) => {
  try {
    const listSP = await mydbsp.spmd.find();
    if (listSP.length > 0) {
      const response = { ...API_RESPONSE.SUCCESS, data: listSP };
      res.json(response);
    } else {
      const response = { ...API_RESPONSE.NOT_FOUND };
      res.json(response);
    }
  } catch (err) {
    console.error(err);
    const response = { ...API_RESPONSE.ERROR };
    res.status(500).json(response);
  }
};

exports.getListUserNV = async (req, res, next) => {
  const listUserNV = await mydbuser.nhanvienmd.find();
  try {
    if (listUserNV.length > 0) {
      const response = { ...API_RESPONSE.SUCCESS, data: listUserNV };
      res.json(response);
    } else {
      const response = { ...API_RESPONSE.NOT_FOUND };
      res.json(response);
    }
  } catch (error) {
    console.log(error);
    const response = { ...API_RESPONSE.ERROR };
    res.json(response);
  }
};

exports.getListUserQL = async (req, res, next) => {
  const listUserQL = await mydbuser.quanlymd.find();
  try {
    if (listUserQL.length > 0) {
      const response = { ...API_RESPONSE.SUCCESS, data: listUserQL };
      res.json(response);
    } else {
      const response = { ...API_RESPONSE.NOT_FOUND };
      res.json(response);
    }
  } catch (error) {
    console.log(error);
    const response = { ...API_RESPONSE.ERROR };
    res.json(response);
  }
};

exports.addSP = async (req, res, next) => {
  const fakedata = {
    tensp: "hoa",
    mota: "huong duong",
    image: 'image',
    soluong: 21,
    gia: 4574000,
  };
  try {
    const newsp = new mydbsp.spmd({
      tensp: fakedata.tensp,
      mota: fakedata.mota,
      image: fakedata.image,
      soluong: fakedata.soluong,
      gia: fakedata.gia,
    });
    await newsp.save();
    const response = { ...API_RESPONSE.SUCCESS, data: newsp };
    res.json(response);
  } catch (error) {
    console.log(error);
    const response = { ...API_RESPONSE.ERROR };
    res.json(response);
  }
};
