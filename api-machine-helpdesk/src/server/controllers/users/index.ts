import * as getAll from './GetAll';
import * as getById from './GetById';
import * as signIn from './SignIn';
import * as signUp from './SignUp';
import * as updateById from './UpdateById';

export const UserControllers = {
  ...getAll,
  ...getById,
  ...signIn,
  ...signUp,
  ...updateById,
};