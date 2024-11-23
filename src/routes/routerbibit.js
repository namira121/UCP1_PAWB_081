const router = require('express').Router();
const express = require("express");
const bibitController = require('../controller/controllerbibit');

router.get('/', bibitController.getbibit);
router.post('/post', bibitController.postbibit);
router.post('/update/:id', bibitController.updatebibit);
router.get('/delete/:id', bibitController.deletebibit);
router.get("/", (req, res) => {
    res.send("Halaman Bibit");
});

router.post("/tambah", (req, res) => {
    res.send("Bibit Ditambahkan");
});
module.exports = router;