import { CreateController } from './CreateController';  
import { GetAllController } from './GetAllController';
import { GetByIdController } from './GetByIdController';
import { UpdateByIdController } from './UpdateByIdController';
import { DeleteByIdController } from './DeleteByIdController';


export class CalledControllers {
  static create = CreateController.create;
  static createValidation = CreateController.createValidation;
  static getAll = GetAllController.getAll;
  static getAllValidation = GetAllController.getAllValidation;
  static getById = GetByIdController.getById;
  static getByIdValidation = GetByIdController.getByIdValidation;
  static updateById = UpdateByIdController.updateById;
  static updateByIdValidation = UpdateByIdController.updateByIdValidation;
  static deleteById = DeleteByIdController.deleteById;
  static deleteByIdValidation = DeleteByIdController.deleteByIdValidation;
}