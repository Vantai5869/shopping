 const router = require('express').Router();
 const ProductSizeService = require('../services/ProductSizeService');
 const authMiddleware = require('../middlewares/authMiddleware')
 
 router.get('/all', ProductSizeService.getAll);
 
 router.get('/:id', ProductSizeService.get);
 
 router.post('/create', ProductSizeService.create);
 
 router.post('/update', ProductSizeService.update);
 
 module.exports = router;
