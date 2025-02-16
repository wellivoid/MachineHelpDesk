import { Request, Response } from 'express';
import * as yup from 'yup';
import validate from '../../shared/middlewares/Validation';
import { StatusCodes } from 'http-status-codes';
import { CalledProvider } from '../../database/providers/called';

const getByIdSchema = { 
  params: yup.object({
    id: yup.number().required().positive().moreThan(0),
  })
};


// interface IParamsProps extends yup.InferType<typeof getByIdSchema.params> {}

export class GetByIdController {
    
  // Middleware de validação antes do create
  static getByIdValidation = validate(getByIdSchema);

  static async getById (req: Request<{id: string}>, res: Response)  {
    const id = Number(req.params.id);

    if (!req.params.id) {
      res.status(StatusCodes.BAD_REQUEST).json({
        errors:{
          default: 'O parâmetro "id" precisa ser informado'
        }
      });
      return;
    }

    const result = await CalledProvider.getById(id);

    if (result instanceof Error ){
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: result.message
        }
      });
      return;
    }

    res.status(StatusCodes.OK).json(result);
    return;
  }
  
}

