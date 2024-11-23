const router = require('express').Router();
const express = require("express");
const pupukController = require('../controller/controllerpupuk');

router.get('/', pupukController.getpupuk);
router.post('/post', pupukController.postpupuk);
router.post('/update/:id', pupukController.updatepupuk);
router.get('/delete/:id', pupukController.deletepupuk);
router.get("/", (req, res) => {
    res.send("Halaman Pupuk");
});

router.post("/tambah", (req, res) => {
    res.send("pupuk Ditambahkan");
});
module.exports = router;