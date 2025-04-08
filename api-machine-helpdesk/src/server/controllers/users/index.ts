import * as getAll from './GetAll';
import * as getById from './GetById';
import * as signIn from './SignIn';
import * as signUp from './SignUp';
import * as update from './Update';

export const UserControllers = {
  ...getAll,
  ...getById,
  ...signIn,
  ...signUp,
  ...update,
};