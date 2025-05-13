import { Request, Response } from 'express';
import { UsersProvider } from '../../database/providers/users';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import validate from '../../shared/middlewares/Validation';
import { IUserUpdate } from '../../database/models';

const userSchema = {
  params: yup.object({
    id: yup.number().required().positive().moreThan(0),
  }),
  body: yup.object({
    name: yup.string().required().min(3),
    enable: yup.boolean().required(),
    level: yup.string().notRequired().oneOf(['admin', 'master', 'common']),
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

    const dataUser = await UsersProvider.getByIdCompl(id);
    if (dataUser instanceof Error) {
      res.status(StatusCodes.NOT_FOUND).json({
        errors: {
          default: dataUser.message
        }
      });
      return;
    }
   
    if (dataUser.level !== 'master' && dataUser.level !== 'admin' && dataUser.level !== 'common') {
      res.status(StatusCodes.NOT_FOUND).json({
        errors: {
          default:'Descrição de level incorreto do DB'
        }
      });
      return;
    }

    const data: IUserUpdate = {
      name: req.body.name,
      enable: req.body.enable,
      createdAt: dataUser.createdAt,
      level: ''
    };

    if (req.body.level === 'admin' || req.body.level === 'master' || req.body.level === 'common') {
      data.level = req.body.level;
    } else {
      data.level = dataUser.level;
    }

    const result = await UsersProvider.updateById(id, data);


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