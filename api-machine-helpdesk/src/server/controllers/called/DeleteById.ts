import { Request, Response } from 'express';
import * as yup from 'yup';
import validate from '../../shared/middlewares/Validation';
import { StatusCodes } from 'http-status-codes';
import { CalledProvider } from '../../database/providers/called';

const deleteByIdSchema = { 
  params: yup.object({
    id: yup.number().required().positive().moreThan(0),
  })
};

//interface IParamProps extends yup.InferType<typeof deleteByIdSchema.params> {}

export const deleteByIdValidation = validate(deleteByIdSchema);


export const deleteById = async (req: Request<{ id: string }>, res: Response) => {
  
  try {
    const id = Number(req.params.id);
    
    if (!req.params.id){
      res.status(StatusCodes.BAD_REQUEST).json({
        errors: {
          default: 'O parâmetro "id" precisa ser informado'
        }
      });      
    }
    const result = await CalledProvider.deleteById(id);

    if (result instanceof Error ){
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: result.message
        }
      });
    }
    
    res.status(StatusCodes.NO_CONTENT).json();

  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: error  });
  }

};

