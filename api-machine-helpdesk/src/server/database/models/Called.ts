import { ICalledCreate } from '../../controllers/called/Create';

 
export interface ICalled extends ICalledCreate {
    id: number,
    idUserResponsable: number,
    createdAt: Date,
    inProgressAt: Date,
    resolvedAt: Date,
    closedAt: Date,    
}

