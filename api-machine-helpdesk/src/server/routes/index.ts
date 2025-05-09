import { Router } from 'express'; 
// import { StatusCodes } from 'http-status-codes';
import { CalledsControllers, UserControllers } from '../controllers';
import { ensureAuthenticated } from '../shared/middlewares/EnsureAuthenticated';
import { ensureAuthorization } from '../shared/middlewares/EnsureAuthorization';

const router =  Router();

// router.get('/', (req: Request, res: Response) => {
//   res.send('Tudo OK, oi');
// }); 

//Called
router.post('/called', ensureAuthenticated, ensureAuthorization(['all']), CalledsControllers.createValidation, CalledsControllers.create); 
router.get('/called', ensureAuthenticated, ensureAuthorization(['all']), CalledsControllers.getAllValidation, CalledsControllers.getAll); 
router.get('/called/:id', ensureAuthenticated, ensureAuthorization(['all']), CalledsControllers.getByIdValidation, CalledsControllers.getById); 
router.put('/called/:id', ensureAuthenticated, ensureAuthorization(['all']), CalledsControllers.updateByIdValidation, CalledsControllers.updateById); 
router.delete('/called/:id', ensureAuthenticated, ensureAuthorization(['all']), CalledsControllers.deleteByIdValidation, CalledsControllers.deleteById); 

//Users
router.post('/login',UserControllers.signInValidation, UserControllers.signIn);
router.post('/register',UserControllers.signUpValidation, UserControllers.signUp);

router.get('/users', ensureAuthenticated, ensureAuthorization(['all']), UserControllers.getAllValidation, UserControllers.getAll); 
router.get('/users/:id', ensureAuthenticated, ensureAuthorization(['all']), UserControllers.getByIdValidation, UserControllers.GetById);
router.get('/users/lv/:id', ensureAuthenticated, ensureAuthorization(['master']), UserControllers.getByIdLvValidation, UserControllers.GetByIdLv);
router.put('/users/:id', ensureAuthenticated, ensureAuthorization(['master']), UserControllers.updateByIdValidation, UserControllers.UpdateById);


export { router };