import * as create from './Create';
import * as deleteById from './DeleteById';
import * as getAll from './GetAll';
import * as getById from './GetById';
import * as update from './Update';


export const CalledsControllers = {
  ...create,
  ...deleteById,
  ... getAll,
  ...getById,
  ...update,
};