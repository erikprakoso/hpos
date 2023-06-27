const db = require('../models');
const Order = db.orders;
const ProductQty = db.product_qtys;
const ProductName = db.product_names;

exports.findAll = (req, res) => {
    const orderArray = [];
    Order.find({})
        .then((orders) => {
            const orderArray = [];

            const promises = orders.map((order) => {
                const orderId = order._id.toString();

                const qtyPromise = ProductQty.findOne({ order_id: orderId });
                const pnamePromise = ProductName.findOne({ order_id: orderId });

                return Promise.all([qtyPromise, pnamePromise])
                    .then(([qty, pname]) => {
                        const orderObject = {
                            customer_id: order.customer_id,
                            product_id: order.product_id,
                            product_qty: qty ? qty.product_qty : null,
                            product_name: pname ? pname.product_name : null,
                            order_date: order.order_date,
                            total_amount: order.total_amount,
                            payment_method: order.payment_method,
                            discount: order.discount,
                            createdAt: order.createdAt,
                            updatedAt: order.updatedAt,
                            order_id: orderId,
                        };
                        orderArray.push(orderObject);
                    });
            });

            Promise.all(promises)
                .then(() => {
                    res.status(200).json(orderArray);
                })
                .catch((err) => {
                    res.status(500).send('Gagal mengambil order.');
                });
        })
        .catch((err) => {
            res.status(500).send('Gagal mengambil order.');
        });
};

exports.findOne = (req, res) => {
    const orderId = req.params.id;

    Order.findById(orderId)
        .then((order) => {
            ProductQty.findOne({ order_id: orderId })
                .then((qty) => {
                    ProductName.findOne({ order_id: orderId })
                        .then((pname) => {
                            const data = {
                                customer_id: order.customer_id,
                                product_id: order.product_id,
                                product_qty: qty.product_qty,
                                product_name: pname.product_name,
                                order_date: order.order_date,
                                total_amount: order.total_amount,
                                payment_method: order.payment_method,
                                discount: order.discount,
                                createdAt: order.createdAt,
                                updatedAt: order.updatedAt,
                                order_id: order.order_id
                            }
                            res.status(200).json(data);
                        })
                        .catch((err) => {
                            res.status(500).send('Gagal mengambil order.');
                        });
                })
                .catch((err) => {
                    res.status(500).send('Gagal mengambil order.');
                });
        })
        .catch((err) => {
            res.status(500).send('Gagal mengambil order.');
        });
};

exports.findByOrderId = (req, res) => {
    const orderId = req.params.id;

    ProductQty.findOne({ order_id: orderId })
        .then((qty) => {
            res.status(200).json(qty);
        })
        .catch((err) => {
            res.status(500).send('Gagal mengambil order.');
        });
}

exports.create = (req, res) => {
    const { customer_id, product_id, product_qty, product_name, total_amount, payment_method, discount } = req.body;

    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    const order_date = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    const order = new Order({
        customer_id,
        product_id,
        order_date,
        total_amount,
        payment_method,
        discount
    });

    order
        .save()
        .then((savedOrder) => {
            const qty = new ProductQty({
                order_id: savedOrder.id,
                product_qty: product_qty
            });
            qty
                .save()
                .then(() => {
                    const pname = new ProductName({
                        order_id: savedOrder.id,
                        product_name: product_name
                    });
                    pname
                        .save()
                        .then(() => {
                            res.status(201).send('Order berhasil ditambahkan.');
                        })
                })
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