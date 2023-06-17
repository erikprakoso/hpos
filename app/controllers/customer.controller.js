const db = require('../models');
const Customer = db.customers;

exports.findAll = (req, res) => {
    Customer.find({})
        .then((customers) => {
            res.status(200).json(customers);
        })
        .catch((err) => {
            res.status(500).send('Gagal mengambil pelanggan.');
        });
};

exports.findOne = (req, res) => {
    const customerId = req.params.id;

    Customer.findById(customerId)
      .then((customer) => {
            res.status(200).json(customer);
        })
      .catch((err) => {
            res.status(500).send('Gagal mengambil pelanggan.');
        });
};

exports.create = (req, res) => {
    const { customer_name, customer_phone } = req.body;

    const customer = new Customer({
        customer_name,
        customer_phone,
    });

    customer
        .save()
        .then(() => {
            res.status(201).send('Pelanggan berhasil ditambahkan.');
        })
        .catch((err) => {
            res.status(500).send('Gagal menyimpan pelanggan.');
        });
};

exports.update = (req, res) => {
    const customerId = req.params.id;
    const { customer_name, customer_phone } = req.body;

    Customer.findByIdAndUpdate(customerId, {
        customer_name,
        customer_phone,
    })
        .then(() => {
            res.status(200).send('Pelanggan berhasil diupdate.');
        })
        .catch((err) => {
            res.status(500).send('Gagal mengupdate pelanggan.');
        });
};

exports.delete = (req, res) => {
    const customerId = req.params.id;

    Customer.findByIdAndRemove(customerId)
        .then(() => {
            res.status(200).send('Pelanggan berhasil dihapus.');
        })
        .catch((err) => {
            res.status(500).send('Gagal menghapus pelanggan.');
        });
}