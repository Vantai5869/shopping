 const router = require('express').Router();
 const ProductService = require('../services/ProductService');
 const authMiddleware = require('../middlewares/authMiddleware')
 
 router.get('/comments/:productId', ProductService.getComments);

 router.get('/all', ProductService.getAll);
 
 router.get('/:id', ProductService.get);
 
 router.post('/create', ProductService.create);
 
 router.post('/update', ProductService.update);

 router.delete('/delete/:id', ProductService.delete);
 
 module.exports = router;
