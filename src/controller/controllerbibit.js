const config = require('../configs/db');

let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports = {
    getbibit(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('SELECT * FROM bibit;', function (error, results) {
                if (error) throw error;
            });
            connection.release();
        });
    },
    postbibit(req, res) {
        let { nama_bibit, jenis_bibit, jumlah_bibit } = req.body;
        console.log(nama_bibit, jenis_bibit, jumlah_bibit); 
        if (nama_bibit && jenis_bibit && jumlah_bibit) {
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `INSERT INTO bibit (nama_bibit, jenis_bibit, jumlah_bibit) VALUES (?, ?, ?);`,
                    [nama_bibit, jenis_bibit, jumlah_bibit], 
                    function (error, results) {
                        if (error) {
                            console.error(error);
                            res.send('Gagal menyimpan data');
                            return;
                        }
                        req.flash('color', 'success');
                        req.flash('status', 'Yes..');
                        req.flash('message', 'Data berhasil disimpan');
                        res.redirect('/bibit');
                    }
                );
                connection.release();
            });
        } else {
            res.send('Data tidak lengkap');
        }
    },
    updatebibit(req, res) {
        const { id_bibit } = req.params;
        const { nama_bibit, jenis_bibit, jumlah_bibit } = req.body;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                'UPDATE bibit SET nama_bibit = ?, jenis_bibit = ?, jumlah_bibit = ? WHERE id_bibit = ?',
                [nama_bibit, jenis_bibit, jumlah_bibit, id_bibit],
                function (error, results) {
                    if (error) throw error;
                    res.redirect('/bibit');
                }
            );
            connection.release();
        });
    },
    deletebibit(req, res) {
        const { id_bibit } = req.params; 
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('DELETE FROM bibit WHERE id_bibit = ?', [id], function (error, results) {
                if (error) throw error;
                res.redirect('/bibit');
            });
            connection.release();
        });
    },   
}