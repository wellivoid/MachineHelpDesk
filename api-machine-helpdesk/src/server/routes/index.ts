import { Router, Request, Response } from 'express'; 
// import { StatusCodes } from 'http-status-codes';
import { CalledControllers } from './../controllers';

const router =  Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Tudo OK, oi');
}); 

router.get('/called', CalledControllers.getAllValidation, CalledControllers.getAll); 
router.post('/called', CalledControllers.createValidation, CalledControllers.create); 




export { router };