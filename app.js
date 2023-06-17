const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./app/models');
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Database berhasil dibuat.');
    }).catch((err) => {
        console.log('Database gagal dibuat.');
        process.exit();
    })

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to API'
    })
})

require('./app/routes/category.routes')(app);
require('./app/routes/customer.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/order.routes')(app);
require('./app/routes/product.routes')(app);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});