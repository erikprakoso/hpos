module.exports = (app) => {
    const product = require('../controllers/product.controller');
    const router = require('express').Router();
    
    router.get('/', product.findAll)
    router.get('/:id', product.findOne)
    router.post('/', product.create)
    router.put('/:id', product.update)
    router.delete('/:id', product.delete)

    app.use('/api/product', router);
}