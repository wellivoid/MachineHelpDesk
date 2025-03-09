import { Request, Response } from 'express';
import * as yup from 'yup';
import validate from '../../shared/middlewares/Validation';
import { StatusCodes } from 'http-status-codes';
import { CalledProvider } from '../../database/providers/called';
import { format } from 'date-fns';


const updateSchema = { 
  params:  yup.object({
    id: yup.number().required().moreThan(0),
  }),
  body: yup.object({
    title: yup.string().required().min(5),
    description: yup.string().required(),
    priority: yup.string().required().oneOf(['low', 'medium', 'high']),
    status: yup.string().required().oneOf(['open', 'inProgress', 'resolved','closed']),
    userId: yup.number().required().positive(),
    idUserResponsable:yup.number().notRequired().positive(),
  })
};

//interface IUpdateParamsProps extends yup.InferType<typeof updateSchema.params> {}
interface IUpdateBodyProps extends yup.InferType<typeof updateSchema.body> {
  inProgressAt?: string;
  resolvedAt?: string;
  closedAt?: string;
}

export class UpdateByIdController {
    
  // Middleware de validação antes do create
  static updateByIdValidation = validate(updateSchema);

  static async updateById (req: Request<{id: string},{},IUpdateBodyProps>, res: Response)  {
    const id = Number(req.params.id);    
    
    if (!id) {
      res.status(StatusCodes.BAD_REQUEST).json({
        errors:{
          default: 'O parâmetro "id" precisa ser informado'
        }
      });
      return;
    }

    const resp = await CalledProvider.getById(id);

    // Verifica se resp é um erro antes de acessar inProgressAt
    if (resp instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: resp.message
        }
      });
      return;
    }
    
    if (req.body.status === 'inProgress' && !resp.inProgressAt) {
      req.body.inProgressAt = format(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss.SSSXXX');
    }

    if (req.body.status === 'resolved' && !resp.resolvedAt) {
      req.body.resolvedAt = format(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss.SSSXXX');
    }

    if (req.body.status === 'closed' && !resp.closedAt) {
      req.body.closedAt = format(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss.SSSXXX');
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

