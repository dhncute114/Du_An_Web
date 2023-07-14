var express = require('express');
var router = express.Router();
var APIroute = require('../controllers/API.controller')

router.get('/listsp', APIroute.getListSP);
router.get('/listnv', APIroute.getListUserNV);
router.get('/listql', APIroute.getListUserQL);

router.post('/addsp', APIroute.addSP);

module.exports = router;