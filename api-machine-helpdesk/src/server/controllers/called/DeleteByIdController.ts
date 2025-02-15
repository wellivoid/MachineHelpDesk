import { Request, Response } from 'express';
import * as yup from 'yup';
import validate from '../../shared/middlewares/Validation';
import { StatusCodes } from 'http-status-codes';

const deleteByIdSchema = { 
  params: yup.object({
    id: yup.number().required().positive().moreThan(0),
  })
};

//interface ICalledCreate extends yup.InferType<typeof deleteByIdSchema.params> {}

export class DeleteByIdController {
    
  // Middleware de validação antes do create
  static deleteByIdValidation = validate(deleteByIdSchema);

  static deleteById (req: Request<{id: string}>, res: Response)  {
    const id = Number(req.params.id);
    
    console.log(id);
    

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado DeleteById!');
  }
  
}

