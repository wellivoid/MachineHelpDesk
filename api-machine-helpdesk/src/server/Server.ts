import express from 'express'; 
import { router } from './routes';
import cors from 'cors';
import 'dotenv/config';

const server = express();

server.use(express.json());

server.use(cors({
  origin: process.env.ENABLED_CORS?.split(';')
}));
// server.use(cors());



// console.log(process.env.ENABLED_CORS);
// console.log(typeof process.env.ENABLED_CORS);

server.use(router);

export default server;

