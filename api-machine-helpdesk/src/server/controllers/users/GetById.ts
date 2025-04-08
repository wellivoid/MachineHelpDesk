import { Request, Response } from 'express';
import { UsersProvider } from '../../database/providers/users';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import validate from '../../shared/middlewares/Validation';

const userSchema = {
  params: yup.object({
    id: yup.number().required().positive().moreThan(0),
  })
};

export const getByIdValidation = validate(userSchema);

// interface IUserProps  extends yup.InferType<typeof userSchema.params>{}

export const GetById = async (req: Request<{id: string}>, res: Response) => {

  try {
    const id = Number(req.params.id);
    const result = await UsersProvider.getByid(id);

    if (result instanceof Error ){
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: result.message
        }
      });
      return;
    }

    res.json(result);

  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno no servidor', details: error });
  }
};