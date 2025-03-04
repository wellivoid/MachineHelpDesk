import * as create from './Create';
import * as getAll from './GetAll';
import * as getById from './GetById';
import * as getByEmail from './GetByEmail';
import * as updateById from './UpdateById';


export const UsersProvider = {
  ...create,
  ...getAll,
  ...getById,
  ...getByEmail,
  ...updateById,
};