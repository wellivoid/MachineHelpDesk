import { ICalled } from './../../models';

declare module 'knex/types/tables' {
    interface Tables {
        called: ICalled 

    }
}