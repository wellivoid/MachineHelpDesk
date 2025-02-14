import { Request, Response } from 'express';
import * as yup from 'yup';
import validate from '../../shared/middlewares/Validation';


export const calledSchema = yup.object({
  title: yup.string().required('O título é obrigatório').min(5),
  description: yup.string().required(),
  priority: yup.string().oneOf(['low', 'medium', 'high']),
  userId: yup.number().required().positive(),
});

interface ICalledCreate extends yup.InferType<typeof calledSchema> {}

export class CreateController {
    
  // Middleware de validação antes do create
  static createValidation = validate(calledSchema);

  static create (req: Request<{},{},ICalledCreate>, res: Response)  {

    console.log(req.body);


    res.send('Create!');
  }
  
}

//export default CalledControllers;