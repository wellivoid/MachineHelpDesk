import { Router, Request, Response } from 'express'; 
// import { StatusCodes } from 'http-status-codes';
import { CalledControllers } from '../controllers';

const router =  Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Tudo OK, oi');
}); 

//Called
router.post('/called', CalledControllers.createValidation, CalledControllers.create); 
router.get('/called', CalledControllers.getAllValidation, CalledControllers.getAll); 
router.get('/called/:id', CalledControllers.getByIdValidation, CalledControllers.getById); 
router.put('/called/:id', CalledControllers.updateByIdValidation, CalledControllers.updateById); 
router.delete('/called/:id', CalledControllers.deleteByIdValidation, CalledControllers.deleteById); 

export { router };