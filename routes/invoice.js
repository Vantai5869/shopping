 const router = require('express').Router();
 const InvoiceService = require('../services/InvoiceService');
 const authMiddleware = require('../middlewares/authMiddleware')
 
 router.get('/all', InvoiceService.getAll);
 
 router.get('/:id', InvoiceService.get);
 
 router.post('/create', InvoiceService.create);
 
 router.post('/update', InvoiceService.update);
 
 module.exports = router;
