import * as create from './Create';
import * as getAll from './GetAll';
import * as getByEmail from './GetByEmail';
import * as updateById from './UpdateByEmail';


export const UsersProvider = {
  ...create,
  ...getAll,
  ...getByEmail,
  ...updateById,
};