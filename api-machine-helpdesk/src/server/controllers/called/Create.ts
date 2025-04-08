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
    status: yup.string().required().oneOf(['open']),
  })
};

export interface ICalledCreate extends yup.InferType<typeof calledSchema.body> {}

export const createValidation = validate(calledSchema);

export const create = async (req: Request<{},{},ICalledCreate>, res: Response) => {    

  try {

    const result = await CalledProvider.create(req.body);

    if (result instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors:{
          default: result.message
        }
      }); 
      return;
    }

    res.status(StatusCodes.CREATED).json(result);
    
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: error });
  }
};

