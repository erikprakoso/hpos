module.exports = (app) => {
    const order = require('../controllers/order.controller');
    const router = require('express').Router();
    
    router.get('/', order.findAll)
    router.get('/:id', order.findOne)
    router.get('/qty/:id', order.findByOrderId)
    router.post('/', order.create)
    router.put('/:id', order.update)
    router.delete('/:id', order.delete)
    router.get('/daily/reports', order.dailyReport)

    app.use('/api/order', router);
}