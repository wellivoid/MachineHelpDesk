import { Request, Response } from 'express';
import * as yup from 'yup';
import validate from '../../shared/middlewares/Validation';
import { StatusCodes } from 'http-status-codes';
import { CalledProvider } from '../../database/providers/called';


const calledSchema = {
  body: yup.object({
    title: yup.string().required().min(5).max(200),
    description: yup.string().required().min(5).max(5000),
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

    const result = await CalledProvider.create(req.body);

    if (result instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors:{
          default: result.message
        }
      });   
        
    }
 
    res.status(StatusCodes.CREATED).json(result);
    return;
  }
  
}

