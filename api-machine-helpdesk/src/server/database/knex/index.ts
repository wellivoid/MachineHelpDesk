// import knex from 'knex';
// import { development, production, test } from './Environment';


// const getEnvironment = () =>{
//   switch (process.env.NODE_ENV) {      
//     case 'production': return production;
//     case 'test': return test;

//     default:return development;
//   }
// }; 

// export const Knex = knex(getEnvironment());


import knex from 'knex';
import configKnex from './Environment';
import 'dotenv/config';

//const db = knex(config);
export const Knex = knex(configKnex);

export default Knex;
