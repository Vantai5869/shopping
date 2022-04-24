 const router = require('express').Router();
 const CommentService = require('../services/CommentService');
 const authMiddleware = require('../middlewares/authMiddleware')
 
 router.get('/all',authMiddleware, CommentService.getAll);
 
 router.get('/:id',authMiddleware, CommentService.get);
 
 router.post('/create',authMiddleware, CommentService.create);
 
 router.post('/update',authMiddleware, CommentService.update);
 
 module.exports = router;
