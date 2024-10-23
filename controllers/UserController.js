const dbConnection = require('../config/database');

exports.getAllUser = (req, res) => {
    dbConnection.query('SELECT * FROM users', (error, results) =>{
        if (error) {
            console.error('Error mengambil data user:', error);
            res.status(500).json({ message:'Terjadi kesalahan saat mengambil data user'});
        } else {
            res.status(200).json({ results});
        }
    });
};

exports.getUserByID = (req, res) => {
    const userId = req.params.id;
    dbConnection.query('SELECT * FROM users WHERE id = ?', [userId], (error, results) => {
        if (error) {
            console.error('Error mengambil data user berdasarkan ID:', error);
            res.status(500).json({message: 'Terjadi kesalahan saat mengambil data user berdasarkan ID'});
        } else if (results.length === 0){
            res.status(404).json({message: 'User tidak ditemukan'});
        } else {
            res.status(200).json(results[0]);
        }
    });
};

exports.createUser = (req, res) => {
    const { username, password, full_name, role} = req.body;
    dbConnection.query('INSERT INTO users (username, password, full_name, role) VALUES (?, ?, ?, ?)', [username, password, full_name, role], (error, results) => {
        if (error) {
            console.error('Error menambahkan user baru:', error);
            res.status(500).json({ message: 'Terjadi kesalahan saat menambahkan user baru'});
        } else {
            res.status(201).json({ message: 'User berhasil ditambahkan', userId: results.insertId});
        }
    });
};

exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const { username, password, full_name, role } = req.body;

    dbConnection.query('UPDATE users SET username = ?, password = ?, full_name = ?, role = ? WHERE id = ?', [username, password, full_name, role, userId], (error, results) => {
        if (error) {
            console.error('Error saat mengubah data user:', error);
            res.status(500).json({ message: 'Terjadi kesalahan saat mengubah data user'});
        } else if (results.affectedRows === 0) {
            res.status(404).json({ message: 'User tidak ditemukan'});
        } else {
            res.status(200).json({ message: 'User berhasil diubah'});
        }
    });
};

exports.deleteUser = (req, res) => {
    const userId = req.params.id;

    dbConnection.query('DELETE FROM users WHERE id = ?', [userId], (error, results) => {
        if (error) {
            console.error('Error saat menghapus data user:', error);
            res.status(500).json({ message: 'Terjadi kesalahan saat menghapus data user'})
        } else if (results.affectedRows === 0) {
            res.status(404).json({ message: 'User tidak ditemukan'});
        } else {
            res.status(200).json({ message: 'User telah berhasil dihapus'});
        }
    });
};

