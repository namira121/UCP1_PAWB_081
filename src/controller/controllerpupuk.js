const config = require('../configs/db');

let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports = {
    getpupuk(req, res) {
        pool.query('SELECT * FROM pupuk', (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Terjadi kesalahan pada server');
            }
            res.render('pupuk', { pupuk: results });
        });
    },
    postpupuk(req, res) {
        const { nama_pupuk, jenis_pupuk, jumlah_pupuk } = req.body;
        pool.query(
            'INSERT INTO pupuk (nama_pupuk, jenis_pupuk, jumlah_pupuk) VALUES (?, ?, ?)',
            [nama_pupuk, jenis_pupuk, jumlah_pupuk],
            (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Gagal menambah data pupuk');
                }
                res.redirect('/pupuk');
            }
        );
    },

    updatepupuk(req, res) {
        const { id } = req.params;
        const { nama_pupuk, jenis_pupuk, jumlah_pupuk } = req.body;
        pool.query(
            'UPDATE pupuk SET nama_pupuk = ?, jenis_pupuk = ?, jumlah_pupuk = ? WHERE id_pupuk = ?',
            [nama_pupuk, jenis_pupuk, jumlah_pupuk, id],
            (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Gagal memperbarui data pupuk');
                }
                res.redirect('/pupuk');
            }
        );
    },
    deletepupuk(req, res) {
        const { id } = req.params;
        pool.query('DELETE FROM pupuk WHERE id_pupuk = ?', [id], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Gagal menghapus data pupuk');
            }
            res.redirect('/pupuk');
        });
    }, 
}