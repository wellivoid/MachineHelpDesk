import { Request, Response } from 'express';
import * as yup from 'yup';
import validate from '../../shared/middlewares/Validation';
import { StatusCodes } from 'http-status-codes';


const calledSchema = {
  body: yup.object({
    title: yup.string().required().min(5),
    description: yup.string().required(),
    priority: yup.string().required().oneOf(['low', 'medium', 'high']),
    userId: yup.number().required().positive(),
  })
};

export interface ICalledCreate extends yup.InferType<typeof calledSchema.body> {}

export class CreateController {
    
  // Middleware de validação antes do create
  static createValidation = validate(calledSchema);

  static create (req: Request<{},{},ICalledCreate>, res: Response)  {

    console.log(req.body);

 
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado Create!');
  }
  
}


/*Exemplo 
// Schema contendo validação para `body` e `query`
export const calledSchema = {
  body: yup.object({
    title: yup.string().required('O título é obrigatório').min(5),
    description: yup.string().required(),
    priority: yup.string().oneOf(['low', 'medium', 'high']),
    userId: yup.number().required().positive(),
  }),
  query: yup.object({
    search: yup.string().optional().min(3),
    page: yup.number().positive().integer(),
  }),
};
*/