 const router = require('express').Router();
 const ProductService = require('../services/ProductService');
 const authMiddleware = require('../middlewares/authMiddleware')
 
 router.get('/all', ProductService.getAll);
 
 router.get('/:id', ProductService.get);
 
 router.post('/create',authMiddleware, ProductService.create);
 
 router.post('/update',authMiddleware, ProductService.update);

 router.delete('/delete/:id',authMiddleware, ProductService.delete);
 
 module.exports = router;
