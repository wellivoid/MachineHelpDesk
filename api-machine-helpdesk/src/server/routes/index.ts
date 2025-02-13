import { Router, Request, Response } from 'express'; 
// import { StatusCodes } from 'http-status-codes';
import { CalledControllers } from './../controllers';

const router =  Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Tudo OK, oi');
}); 

router.post('/called', CalledControllers.create); 




export { router };