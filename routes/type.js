 const router = require('express').Router();
 const TypeService = require('../services/TypeService');
 const authMiddleware = require('../middlewares/authMiddleware')
 
 router.get('/all',authMiddleware, TypeService.getAll);
 
 router.get('/:id',authMiddleware, TypeService.get);
 
 router.post('/create',authMiddleware, TypeService.create);
 
 router.post('/update',authMiddleware, TypeService.update);
 
 module.exports = router;
