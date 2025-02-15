import { Request, Response } from 'express';
import * as yup from 'yup';
import validate from '../../shared/middlewares/Validation';
import { StatusCodes } from 'http-status-codes';
import { calledProvider } from '../../database/providers/called';


const calledSchema = {
  body: yup.object({
    title: yup.string().required().min(5).max(200),
    description: yup.string().required().max(5000).transform((value) => JSON.stringify(value)),
    priority: yup.string().required().oneOf(['low', 'medium', 'high']),
    userId: yup.number().required().positive(),
    status: yup.string().required().oneOf(['Open']),
  })
};

export interface ICalledCreate extends yup.InferType<typeof calledSchema.body> {}

export class CreateController {
    
  // Middleware de validação antes do create
  static createValidation = validate(calledSchema);

  static async create (req: Request<{},{},ICalledCreate>, res: Response)  {
    // const bodyCreate: ICalledCreate = {
    //   ...req.body,   
    //   status: 'Open', 
    // };    

    const result = await calledProvider.create(req.body);

    if (result instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors:{
          default: result.message
        }
      });   
      return;  
    }
 
    res.status(StatusCodes.CREATED).json(result);
    return;
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