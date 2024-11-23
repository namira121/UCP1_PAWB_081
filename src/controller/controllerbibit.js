const config = require('../configs/db');

let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports = {
    getbibit(req, res) {
        pool.query('SELECT * FROM bibit', (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Terjadi kesalahan pada server');
            }
            res.render('bibit', { bibit: results });
        });
    },
    postbibit(req, res) {
        const { nama_bibit, jenis_bibit, jumlah_bibit } = req.body;
        pool.query(
            'INSERT INTO bibit (nama_bibit, jenis_bibit, jumlah_bibit) VALUES (?, ?, ?)',
            [nama_bibit, jenis_bibit, jumlah_bibit],
            (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Gagal menambah data bibit');
                }
                res.redirect('/bibit');
            }
        );
    },

    updatebibit(req, res) {
        const id = req.params.id;
        const { nama_bibit, jenis_bibit, jumlah_bibit } = req.body;

        const query = "UPDATE bibit SET nama_bibit = ?, jenis_bibit = ?, jumlah_bibit = ? WHERE id_bibit = ?";
        const values = [nama_bibit, jenis_bibit, jumlah_bibit, id];

        connection.query(query, values, (err) => {
            if (err) {
                console.error("Error mengupdate data bibit:", err);
                return res.status(500).send("Terjadi kesalahan pada server.");
            }
            res.redirect("/bibit");
        });
    },
    deletebibit(req, res) {
        const { id } = req.params;
        pool.query('DELETE FROM bibit WHERE id_bibit = ?', [id], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Gagal menghapus data bibit');
            }
            res.redirect('/bibit');
        });
    }, 
}