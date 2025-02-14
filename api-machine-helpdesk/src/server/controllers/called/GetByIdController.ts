import { Request, Response } from 'express';
import * as yup from 'yup';
import validate from '../../shared/middlewares/Validation';
import { StatusCodes } from 'http-status-codes';

const getByIdSchema = { 
  params: yup.object({
    id: yup.number().required().positive().moreThan(0),
  })
};


//interface IParamsProps extends yup.InferType<typeof getByIdSchema.params> {}

export class GetByIdController {
    
  // Middleware de validação antes do create
  static getByIdValidation = validate(getByIdSchema);

  static getById (req: Request<{id: string}>, res: Response)  {
    const id = Number(req.params.id);
    
    console.log(id);
    

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado GetById!');
  }
  
}

