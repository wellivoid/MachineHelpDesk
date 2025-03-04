import { Router, Request, Response } from 'express'; 
// import { StatusCodes } from 'http-status-codes';
import { CalledControllers, UsersControllers } from '../controllers';
import { ensureAuthenticated } from '../shared/middlewares/EnsureAuthenticated';

const router =  Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Tudo OK, oi');
}); 

//Called
router.post('/called', CalledControllers.createValidation, CalledControllers.create); 
router.get('/called', CalledControllers.getAllValidation, CalledControllers.getAll); 
router.get('/called/:id', ensureAuthenticated ,CalledControllers.getByIdValidation, CalledControllers.getById); 
router.put('/called/:id', CalledControllers.updateByIdValidation, CalledControllers.updateById); 
router.delete('/called/:id', CalledControllers.deleteByIdValidation, CalledControllers.deleteById); 

//Users
router.post('/login',UsersControllers.signInValidation, UsersControllers.signIn);
router.post('/register',UsersControllers.signUpValidation, UsersControllers.signUp);

export { router };