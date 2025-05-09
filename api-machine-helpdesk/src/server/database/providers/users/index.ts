import * as create from './Create';
import * as getAll from './GetAll';
import * as getByEmail from './GetByEmail';
import * as updateById from './UpdateById';
import * as getById from './GetById';
import * as getByidCompl from './GetByIdCompl';
import * as count from './Count';


export const UsersProvider = {
  ...create,
  ...getAll,
  ...getByEmail,
  ...updateById,
  ...getById,
  ...getByidCompl,
  ...count,
};