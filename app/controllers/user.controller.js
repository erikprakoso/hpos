const db = require('../models');
const User = db.users;

exports.findAll = (req, res) => {
    User.find({})
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => {
            res.status(500).send('Gagal mengambil user.');
        });
};

exports.findOne = (req, res) => {
    const userId = req.params.id;

    User.findById(userId)
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((err) => {
            res.status(500).send('Gagal mengambil user.');
        });
};

exports.create = (req, res) => {
    const { user_email, user_password, user_name, user_role } = req.body;

    const user = new User({
        user_email,
        user_password,
        user_name,
        user_role,
    });

    user
        .save()
        .then(() => {
            res.status(201).send('User berhasil ditambahkan.');
        })
        .catch((err) => {
            res.status(500).send('Gagal menyimpan user.');
        });
};

exports.update = (req, res) => {
    const userId = req.params.id;
    const { user_email,
        user_password,
        user_name,
        user_role } = req.body;

    User.findByIdAndUpdate(userId, {
        user_email,
        user_password,
        user_name,
        user_role,
    })
        .then(() => {
            res.status(200).send('User berhasil diupdate.');
        })
        .catch((err) => {
            res.status(500).send('Gagal mengupdate user.');
        });
};

exports.delete = (req, res) => {
    const userId = req.params.id;

    User.findByIdAndRemove(userId)
        .then(() => {
            res.status(200).send('User berhasil dihapus.');
        })
        .catch((err) => {
            res.status(500).send('Gagal menghapus user.');
        });
}

exports.login = (req, res) => {
    const user_email = req.body.user_email;
    User.findOne({ user_email: user_email })
        .then((user) => {
            const result = req.body.user_password === user.user_password;
            if (result) {
                res.status(200).json({
                    code: 'success',
                    message: 'data found successfully',
                    data: user
                });
            } else {
                res.status(400).json({ 
                    code: 'fail',
                    message: 'wrong password',
                    data: null
                });
            }
        })
        .catch((err) => {
            res.status(500).json({ 
                code: 'error',
                data: err
            });
        });
};

exports.register = (req, res) => {
    const { user_email, user_password, user_name, user_role } = req.body;

    const user = new User({
        user_email,
        user_password,
        user_name,
        user_role,
    });

    user
        .save()
        .then(() => {
            res.status(201).json({
                code: 'success',
                message: 'User saved successfully'
            });
        })
        .catch((err) => {
            res.status(500).json({
                code: 'error',
                message: err.message
            });
        });
};