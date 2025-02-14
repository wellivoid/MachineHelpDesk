import { Request, Response } from 'express';
import * as yup from 'yup';
import validate from '../../shared/middlewares/Validation';
import { StatusCodes } from 'http-status-codes';


const getAlldSchema = { 
  query:  yup.object({
    page: yup.number().notRequired().moreThan(0),
    limit: yup.number().notRequired().moreThan(0),
    filter: yup.string().notRequired(),
  })
};

interface IQueryProps extends yup.InferType<typeof getAlldSchema.query> {}

export class GetAllController {
    
  // Middleware de validação antes do create
  static getAllValidation = validate(getAlldSchema);

  static getAll (req: Request<{},{},{},IQueryProps>, res: Response)  {

    console.log(req.query);


    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado GetAll!');
  }
  
}


/*Exemplo 
// Schema contendo validação para `body` e `query`
export const calledSchema = {
  body: yup.object({
    title: yup.string().required('O título é obrigatório').min(5),
    description: yup.string().required(),
    priority: yup.string().oneOf(['low', 'medium', 'high']),
    userId: yup.number().required().positive(),
  }),
  query: yup.object({
    search: yup.string().optional().min(3),
    page: yup.number().positive().integer(),
  }),
};
*/