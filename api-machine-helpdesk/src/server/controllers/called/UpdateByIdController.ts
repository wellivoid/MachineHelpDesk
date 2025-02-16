import { Request, Response } from 'express';
import * as yup from 'yup';
import validate from '../../shared/middlewares/Validation';
import { StatusCodes } from 'http-status-codes';
import { CalledProvider } from '../../database/providers/called';


const updateSchema = { 
  params:  yup.object({
    id: yup.number().required().moreThan(0),
  }),
  body: yup.object({
    title: yup.string().required().min(5),
    description: yup.string().required(),
    priority: yup.string().required().oneOf(['low', 'medium', 'high']),
    status: yup.string().required().oneOf(['Open', 'In progress', 'Resolved','Closed']),
    userId: yup.number().required().positive(),
  })
};

//interface IUpdateParamsProps extends yup.InferType<typeof updateSchema.params> {}
interface IUpdateBodyProps extends yup.InferType<typeof updateSchema.body> {}

export class UpdateByIdController {
    
  // Middleware de validação antes do create
  static updateByIdValidation = validate(updateSchema);

  static async updateById (req: Request<{id: string},{},IUpdateBodyProps>, res: Response)  {
    const id = Number(req.params.id);    
    
    if (!req.params.id) {
      res.status(StatusCodes.BAD_REQUEST).json({
        errors:{
          default: 'O parâmetro "id" precisa ser informado'
        }
      });
      return;
    }

    const result = await CalledProvider.updateById(id, req.body);

    if (result instanceof Error ){
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: result.message
        }
      });
      return;
    }

    res.status(StatusCodes.NO_CONTENT).json(result);
    return;
  }
  
}

