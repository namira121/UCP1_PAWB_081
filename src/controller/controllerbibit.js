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
        
}