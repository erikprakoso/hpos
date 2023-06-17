const db = require('../models');
const Product = db.products;
const multer = require('multer');

exports.findAll = (req, res) => {
    Product.find({})
        .then((products) => {
            res.status(200).json(products);
        })
        .catch((err) => {
            res.status(500).send('Gagal mengambil produk.');
        });
};

exports.findOne = (req, res) => {
    const productId = req.params.id;

    Product.findById(productId)
        .then((product) => {
            // res.set('Content-Type', product.product_image['contentType']);
            // res.send(product.product_image['data']);
            res.status(200).json(product);
        })
        .catch((err) => {
            res.status(500).send('Gagal mengambil produk.');
        });
};

// Mengatur penyimpanan gambar dengan Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.create = (req, res) => {
    upload.single('product_image')(req, res, (err) => {
        const { category_id, product_name, product_desc, product_price, product_qty } = req.body;

        const product = new Product({
            category_id,
            product_name,
            product_desc,
            product_price,
            product_qty,
            product_image: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            },
        });

        product
            .save()
            .then(() => {
                res.status(201).send('Produk berhasil ditambahkan.');
            })
            .catch((err) => {
                res.status(500).send('Gagal menyimpan produk.');
            });
    });
};


exports.update = (req, res) => {
    upload.single('product_image')(req, res, (err) => {
        const productId = req.params.id;
        const { category_id, product_name, product_desc, product_price, product_qty } = req.body;

        Product.findByIdAndUpdate(productId, {
            category_id,
            product_name,
            product_desc,
            product_price,
            product_qty,
            product_image: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            },
        })
            .then(() => {
                res.status(200).send('Produk berhasil diupdate.');
            })
            .catch((err) => {
                res.status(500).send('Gagal mengupdate produk.');
            });
    });
};

exports.delete = (req, res) => {
    const productId = req.params.id;

    Product.findByIdAndRemove(productId)
        .then(() => {
            res.status(200).send('Produk berhasil dihapus.');
        })
        .catch((err) => {
            res.status(500).send('Gagal menghapus produk.');
        });
}