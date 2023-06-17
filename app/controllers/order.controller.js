const db = require('../models');
const Order = db.orders;

exports.findAll = (req, res) => {
    Order.find({})
        .then((orders) => {
            res.status(200).json(orders);
        })
        .catch((err) => {
            res.status(500).send('Gagal mengambil order.');
        });
};

exports.findOne = (req, res) => {
    const orderId = req.params.id;

    Order.findById(orderId)
        .then((order) => {
            res.status(200).json(order);
        })
        .catch((err) => {
            res.status(500).send('Gagal mengambil order.');
        });
};

exports.create = (req, res) => {
    const { customer_id, product_id, product_qty, total_amount, payment_method, discount } = req.body;

    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    const order_date = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    console.log(order_date); // Output: "2023-06-07 06:54:29"


    const order = new Order({
        customer_id,
        product_id,
        product_qty,
        order_date,
        total_amount,
        payment_method,
        discount
    });

    order
        .save()
        .then(() => {
            res.status(201).send('Order berhasil ditambahkan.');
        })
        .catch((err) => {
            res.status(500).send('Gagal menyimpan order.');
        });
};

exports.update = (req, res) => {
    const orderId = req.params.id;
    const { customer_id, product_id, product_qty, total_amount, payment_method, discount } = req.body;

    Order.findByIdAndUpdate(orderId, {
        customer_id,
        product_id,
        product_qty,
        total_amount,
        payment_method,
        discount
    })
        .then(() => {
            res.status(200).send('Order berhasil diupdate.');
        })
        .catch((err) => {
            res.status(500).send('Gagal mengupdate order.');
        });
};

exports.delete = (req, res) => {
    const orderId = req.params.id;

    Order.findByIdAndRemove(orderId)
        .then(() => {
            res.status(200).send('Order berhasil dihapus.');
        })
        .catch((err) => {
            res.status(500).send('Gagal menghapus order.');
        });
};

exports.dailyReport = (req, res) => {
    try {
        console.log(req.query)
        const { start_date, end_date } = req.query;
        // const { startDate, endDate } = req.query;
        const startDate = new Date(start_date + ' 00:00:00'); // Tanggal mulai
        const endDate = new Date(end_date + ' 23:59:59'); // Tanggal akhir

        console.log(startDate); // Output: "2023-06-07 06:54:29"
        console.log(endDate); // Output: "2023-06-07 06:54:29"
        // Construct the query
        const query = {
            createdAt: {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            },
        };

        // Execute the query
        Order.find(query)
            .then((order) => {
                res.status(200).json(order);
            })
            .catch((err) => {
                res.status(500).send('Gagal mengambil order.');
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
};