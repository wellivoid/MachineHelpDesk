import express, { Request, Response } from 'express';

const server = express();

server.get("/", (req: Request, res: Response) => {
    res.send("Tudo OK, oi");
});

server.get("/user",(req: Request, res: Response) => {
    let usuarios = [
        {
            nome: "Wellington",
            idade: 33
        },
        {
            nome: "Urbano",
            idade: 30
        }
    ]
    res.send(usuarios)
})

export default server;

