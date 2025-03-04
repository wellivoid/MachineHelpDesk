import { Request, Response } from 'express';
import * as yup from 'yup';
import validate from '../../shared/middlewares/Validation';
import { StatusCodes } from 'http-status-codes';
import { UsersProvider } from '../../database/providers/users';


const signInSchema = {
  body: yup.object({
    email: yup.string().required().email().min(5),
    password: yup.string().required().min(4),
  })
};

export interface ISignIn extends yup.InferType<typeof signInSchema.body> {}

export class SignInController {
    
  // Middleware de validação antes do create
  static signInValidation = validate(signInSchema);

  static async signIn (req: Request<{},{},ISignIn>, res: Response)  {

    const { email, password } = req.body;

    const result = await UsersProvider.getByEmail(email);


    if (result instanceof Error) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        errors:{
          default: 'Email ou password inválidos'//result.message
        }
      });   
      return;
    }

    if (password !== result.password) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        errors:{
          default: 'Email ou password inválidos'//result.message
        }
      }); 
      return;
    } else {
      res.status(StatusCodes.OK).json({ access: 'test.teste.teste' });
      return;
    
    }
 
  }
  
}

