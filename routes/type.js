 const router = require('express').Router();
 const TypeService = require('../services/TypeService');
 const authMiddleware = require('../middlewares/authMiddleware')
 
 router.get('/all', TypeService.getAll);
 
 router.get('/:id', TypeService.get);
 
 router.post('/create',authMiddleware, TypeService.create);
 
 router.post('/update',authMiddleware, TypeService.update);
 
 router.delete('/delete/:id',authMiddleware, TypeService.delete);

 module.exports = router;
