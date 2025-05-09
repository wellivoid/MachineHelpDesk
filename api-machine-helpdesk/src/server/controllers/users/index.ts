import * as getAll from './GetAll';
import * as getById from './GetById';
import * as getByIdLv from './GetByIdLv';
import * as signIn from './SignIn';
import * as signUp from './SignUp';
import * as updateById from './UpdateById';

export const UserControllers = {
  ...getAll,
  ...getById,
  ...getByIdLv,
  ...signIn,
  ...signUp,
  ...updateById,
};