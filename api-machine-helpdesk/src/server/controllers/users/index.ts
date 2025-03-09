import { SignUpController } from './SignUpController';  
import { SignInController } from './SignInController';
import { GetAllController } from './GetAllController';



export class UsersControllers {
  static signUp = SignUpController.signUp;
  static signUpValidation = SignUpController.signUpValidation;
  static signIn = SignInController.signIn;
  static signInValidation = SignInController.signInValidation;
  static getAll = GetAllController.getAll;
  static getAllInValidation = GetAllController.getAllValidation;
}