import { ICalledCreate } from '../../controllers/called/CreateController';

 
export interface ICalled extends ICalledCreate {
    id: number,
    createdAt: Date,
}

