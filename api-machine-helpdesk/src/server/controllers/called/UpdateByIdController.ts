import { Request, Response } from 'express';
import * as yup from 'yup';
import validate from '../../shared/middlewares/Validation';
import { StatusCodes } from 'http-status-codes';


const updateSchema = { 
  params:  yup.object({
    id: yup.number().required().moreThan(0),
  }),
  body: yup.object({
    title: yup.string().required().min(5),
    description: yup.string().required(),
    priority: yup.string().required().oneOf(['low', 'medium', 'high']),
    statusCalled: yup.string().required().oneOf(['Open', 'In progress', 'Resolved','Closed']),
    userId: yup.number().required().positive(),
  })
};

//interface IUpdateParamsProps extends yup.InferType<typeof updateSchema.params> {}
interface IUpdateBodyProps extends yup.InferType<typeof updateSchema.body> {}

export class UpdateByIdController {
    
  // Middleware de validação antes do create
  static updateByIdValidation = validate(updateSchema);

  static updateById (req: Request<{id: string},{},IUpdateBodyProps>, res: Response)  {
    const id = Number(req.params.id);    
    console.log(
      {
        'id': id, 
        'title': req.body.title,
        'description': req.body.description,
        'priority': req.body.priority,
        'statusCalled': req.body.statusCalled,
        'userId': req.body.userId  
      }
    );


    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado UpdateById!');
  }
  
}

