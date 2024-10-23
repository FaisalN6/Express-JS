const dbConnection =  require('../config/database');

exports.connDB = (req, res) => {
    dbConnection.connect((err) => {
        if (err) {
            res.send('Maaf, DB!');
            console.error('kesalahan koneksi database:', err);
        } else {
            res.send('Hello, DB!');
            console.log('koneksi database berhasil');
        }
    });
};