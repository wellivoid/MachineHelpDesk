import { Request, Response } from 'express';
import * as yup from 'yup';
import validate from '../../shared/middlewares/Validation';
import { StatusCodes } from 'http-status-codes';
import { UsersProvider } from '../../database/providers/users';


const signUpSchema = {
  body: yup.object({
    name: yup.string().required().min(3),
    email: yup.string().required().email().min(5),
    password: yup.string().required().min(4),
  })
};

export interface ISignUp extends yup.InferType<typeof signUpSchema.body> {}

export const signUpValidation = validate(signUpSchema);

export const signUp = async (req: Request<{},{},ISignUp>, res: Response) => {
    
  try {
    const result = await UsersProvider.create(req.body);
  
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
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: error  });
  }

};

  


