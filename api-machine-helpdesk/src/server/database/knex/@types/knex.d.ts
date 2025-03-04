import { ICalled, IUser } from './../../models';

declare module 'knex/types/tables' {
    interface Tables {
      user: IUser;
      called: ICalled;

    }
}