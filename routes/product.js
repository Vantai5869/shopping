 const router = require('express').Router();
 const ProductService = require('../services/ProductService');
 const authMiddleware = require('../middlewares/authMiddleware')
 
 router.get('/all', ProductService.getAll);
 
 router.get('/:id', ProductService.get);
 
 router.post('/create', ProductService.create);
 
 router.post('/update', ProductService.update);
 
 module.exports = router;