import { SignUpController } from './SignUpController';  
import { SignInController } from './SignInController';



export class UsersControllers {
  static signUp = SignUpController.signUp;
  static signUpValidation = SignUpController.signUpValidation;
  static signIn = SignInController.signIn;
  static signInValidation = SignInController.signInValidation;
}