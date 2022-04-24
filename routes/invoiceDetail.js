 const router = require('express').Router();
 const InvoiceDetailService = require('../services/InvoiceDetailService');
 const authMiddleware = require('../middlewares/authMiddleware')
 
 router.get('/all',authMiddleware, InvoiceDetailService.getAll);
 
 router.get('/:id',authMiddleware, InvoiceDetailService.get);
 
 router.post('/create',authMiddleware, InvoiceDetailService.create);
 
 router.post('/update',authMiddleware, InvoiceDetailService.update);
 
 module.exports = router;
