import { Request, Response } from 'express';
import { UsersProvider } from '../../database/providers/users';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import validate from '../../shared/middlewares/Validation';

const userSchema = {
  params: yup.object({
    id: yup.number().required().positive().moreThan(0),
  }),
  body: yup.object({
    name: yup.string().required().min(3),
    enable: yup.boolean().required(),
    // level: yup.string().notRequired().oneOf(['admin', 'master', 'common']),
  })
};

export const updateByIdValidation = validate(userSchema);

 interface IUserBodyProps  extends yup.InferType<typeof userSchema.body>{}

export const UpdateById = async (req: Request<{id: string},{},IUserBodyProps >, res: Response) => {

  try {
    const id = Number(req.params.id);

    if (!id) {
      res.status(StatusCodes.BAD_REQUEST).json({
        errors:{
          default: 'O parâmetro "id" precisa ser informado'
        }
      });
      return;
    }   

    const result = await UsersProvider.updateById(id, req.body);
    //
    if (result instanceof Error ){
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: result.message
        }
      });
      return;
    }

    res.status(StatusCodes.NO_CONTENT).json(result); 

  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno no servidor', details: error });
  }
};