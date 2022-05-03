 const router = require('express').Router();
 const UserService = require('../services/UserService');
 const authMiddleware = require('../middlewares/authMiddleware')
 
 router.get('/all', UserService.getAll);
 
//  authMiddleware bat buoc phai co
 router.get('/me',authMiddleware, UserService.getMe);

 router.get('/:id', UserService.get);
 
 router.post('/create', UserService.create);
 
 //  authMiddleware bat buoc phai co
 router.post('/updateMe',authMiddleware, UserService.updateMe);

//  router.post('/update', UserService.update);
 
 router.delete('/delete/:id', UserService.delete);
 module.exports = router;
