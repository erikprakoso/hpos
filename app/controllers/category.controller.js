const db = require('../models');
const Category = db.categories;

exports.findAll = (req, res) => {
    Category.find({})
        .then((categories) => {
            res.status(200).json(categories);
        })
        .catch((err) => {
            res.status(500).send('Gagal mengambil kategori.');
        });
};

exports.findOne = (req, res) => {
    const categoryId = req.params.id;

    Category.findById(categoryId)
      .then((category) => {
            res.status(200).json(category);
        })
      .catch((err) => {
            res.status(500).send('Gagal mengambil kategori.');
        });
};

exports.create = (req, res) => {
    const { category_name, category_desc } = req.body;

    const category = new Category({
        category_name,
        category_desc,
    });

    category
        .save()
        .then(() => {
            res.status(201).send('Kategori berhasil ditambahkan.');
        })
        .catch((err) => {
            res.status(500).send('Gagal menyimpan kategori.');
        });
};

exports.update = (req, res) => {
    const categoryId = req.params.id;
    const { category_name, category_desc } = req.body;

    Category.findByIdAndUpdate(categoryId, {
        category_name,
        category_desc,
    })
        .then(() => {
            res.status(200).send('Kategori berhasil diupdate.');
        })
        .catch((err) => {
            res.status(500).send('Gagal mengupdate kategori.');
        });
};

exports.delete = (req, res) => {
    const categoryId = req.params.id;

    Category.findByIdAndRemove(categoryId)
        .then(() => {
            res.status(200).send('Kategori berhasil dihapus.');
        })
        .catch((err) => {
            res.status(500).send('Gagal menghapus kategori.');
        });
}