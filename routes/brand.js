 const router = require('express').Router();
 const BrandService = require('../services/BrandService');
 const authMiddleware = require('../middlewares/authMiddleware')
 
 router.get('/all', BrandService.getAll);
 
 router.get('/:id', BrandService.get);
 
 router.post('/create',authMiddleware, BrandService.create);
 
 router.post('/update', BrandService.update);

 router.delete('/delete/:id',authMiddleware, BrandService.delete);
 
 module.exports = router;

//  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im11YWRvbmd5ZXV0aHVzb25nM3hAZ21haWwiLCJpYXQiOjE2NTA4MTI1NzQsImV4cCI6MTY1MTQxNzM3NH0.XdIpLET4XGeggYtc9iQx9AjbfsZt2uhXPMCAqluX70M