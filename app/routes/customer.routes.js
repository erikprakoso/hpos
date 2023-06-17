module.exports = (app) => {
    const customer = require('../controllers/customer.controller');
    const router = require('express').Router();
    
    router.get('/', customer.findAll)
    router.get('/:id', customer.findOne)
    router.post('/', customer.create)
    router.put('/:id', customer.update)
    router.delete('/:id', customer.delete)

    app.use('/api/customer', router);
}