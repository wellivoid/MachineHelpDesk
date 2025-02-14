import { CreateController } from './CreateController';  
import { GetAllController } from './GetAllController';

export class CalledControllers {
  static create = CreateController.create;
  static createValidation = CreateController.createValidation;
  static getAll = GetAllController.getAll;
  static getAllValidation = GetAllController.getAllValidation;
}