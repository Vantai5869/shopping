 const router = require('express').Router();
 const BlogService = require('../services/BlogService');
 const authMiddleware = require('../middlewares/authMiddleware')
 
 router.get('/all',authMiddleware, BlogService.getAll);
 
 router.get('/:id',authMiddleware, BlogService.get);
 
 router.post('/create',authMiddleware, BlogService.create);
 
 router.post('/update',authMiddleware, BlogService.update);
 
 router.delete('/delete/:id',authMiddleware, BlogService.delete);
 module.exports = router;
