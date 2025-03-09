import { ICalledCreate } from '../../controllers/called/CreateController';

 
export interface ICalled extends ICalledCreate {
    id: number,
    idUserResponsable: number,
    createdAt: Date,
    inProgressAt: Date,
    resolvedAt: Date,
    closedAt: Date,    
}

