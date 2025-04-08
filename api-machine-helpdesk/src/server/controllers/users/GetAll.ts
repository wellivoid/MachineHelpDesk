import { Request, Response } from 'express';
import * as yup from 'yup';
import validate from '../../shared/middlewares/Validation';
import { StatusCodes } from 'http-status-codes';
import { UsersProvider } from '../../database/providers/users';


const getAlldSchema = { 
  query:  yup.object({
    page: yup.number().notRequired().moreThan(0),
    limit: yup.number().notRequired().moreThan(0),
    filter: yup.string().notRequired(),
  })
};

interface IQueryProps extends yup.InferType<typeof getAlldSchema.query> {
  userId?: number; // Tornar opcional para evitar erro de tipagem
}

export const getAllValidation = validate(getAlldSchema);

export const getAll = async (req: Request<{},{},{},IQueryProps>, res: Response) => {
    
  try {
    const { page, limit, filter } = req.query;
      
    const result = await UsersProvider.getAll(page || 1, limit || 10, filter || '');
    const count = await UsersProvider.count(filter || '');
  
  
    if (result instanceof Error ){
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: result.message
        }
      });
      return;
    } else if (count instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors:{ default: count.message }
      });
      return;
    }
  
  
    res.setHeader('access-control-expose-headers', 'users-total-count');
    res.setHeader('users-total-count', count);
  
    res.status(StatusCodes.OK).json(result);

  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: error  });
  }
  
};
