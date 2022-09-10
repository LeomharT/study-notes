import { createConnection } from 'mysql';
import Application from "../app/app";
import { HOST } from "../data/host";


const { app } = Application.getInstance();


const conn = createConnection(HOST);

console.log(conn);
