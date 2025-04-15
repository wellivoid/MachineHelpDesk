import { Request, Response } from 'express';
import * as yup from 'yup';
import validate from '../../shared/middlewares/Validation';
import { StatusCodes } from 'http-status-codes';
import { UsersProvider } from '../../database/providers/users';
import { JWTService, PasswordCrypto } from '../../shared/services';


const signInSchema = {
  body: yup.object({
    email: yup.string().required().email().min(5),
    password: yup.string().required().min(4),
  })
};

export interface ISignIn extends yup.InferType<typeof signInSchema.body> {}

export const signInValidation = validate(signInSchema);

export const signIn = async (req: Request<{},{},ISignIn>, res: Response) => {
    
  try {
    const { email, password } = req.body;

    const result = await UsersProvider.getByEmail(email);


    if (result instanceof Error || !result.enable) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        errors:{
          default: 'Email ou password inválidos'//result.message
        }
      });   
      return;
    }

    const matchPassword = await PasswordCrypto.verifyPassword(password, result.password);
    
    if (!matchPassword) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        errors:{
          default: 'Email ou password inválidos'//result.message
        }
      });
    } else {
      const accessToken = JWTService.sign({ 
        uid:result.id, 
        ulevel: result.level 
      });

      if (accessToken === 'JTW_SECRET_NOT_FOUND' || accessToken === 'INVALID_TOKEN') {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          errors:{
            default: 'Erro ao gerar o token de acesso'//result.message
          }
        });   
        return;
      }

      res.status(StatusCodes.OK).json({ accessToken: accessToken });
      return;
    
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: error  });
  }
  
};

