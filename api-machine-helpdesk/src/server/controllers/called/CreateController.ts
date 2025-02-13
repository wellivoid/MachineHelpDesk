import { Request, Response } from 'express';

interface ICalledCreate {
    id:number
    title: string
    description:string
    status: number
}

export class CreateController {
  
  
  static create (req: Request<{},{},ICalledCreate>, res: Response)  {

    console.log(req.body);


    res.send('Create!');
  }
}