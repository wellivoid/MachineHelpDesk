import { Router, Request, Response } from "express"; 
import { StatusCodes } from "http-status-codes";

const router =  Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Tudo OK, oi");
}); 

router.post("/test", (req: Request, res: Response) => {
  console.log(req);
  res.status(StatusCodes.OK).json(req.body);
}); 



export { router };