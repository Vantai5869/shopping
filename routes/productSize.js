 const router = require('express').Router();
 const ProductSizeService = require('../services/ProductSizeService');
 const authMiddleware = require('../middlewares/authMiddleware')
 
 router.get('/all', ProductSizeService.getAll);
 
//  get all size of product :id is productId
 router.get('/:id', ProductSizeService.get);
 
 router.post('/create', ProductSizeService.create);
 
 router.post('/update', ProductSizeService.update);
 
 router.delete('/delete/:id', ProductSizeService.delete);

 module.exports = router;
