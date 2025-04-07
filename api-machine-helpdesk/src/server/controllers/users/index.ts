import { SignUpController } from './SignUpController';  
import { SignInController } from './SignInController';
import { GetAllController } from './GetAllController';
import * as getById from './GetById';



export class UsersControllers {
  static signUp = SignUpController.signUp;
  static signUpValidation = SignUpController.signUpValidation;
  static signIn = SignInController.signIn;
  static signInValidation = SignInController.signInValidation;
  static getAll = GetAllController.getAll;
  static getAllInValidation = GetAllController.getAllValidation;
}

export const UserControllers = {
  ...getById
};