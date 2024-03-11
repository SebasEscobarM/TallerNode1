import express, {Express, Request, Response} from "express";
import dotenv from 'dotenv';

import {db} from './config/db'; 
import routes from "./routes";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded( { extended: true } ));

const port = process.env.PORT || 3000;

//const app = require('express')();

app.get('/', (req: Request, res: Response) => { 

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hello world');

});

app.get('/about', (req: Request, res: Response) => {

    res.send('About us');

});

// tienen que usarlo con cuidado

app.post('/about', (req: Request, res: Response) => {

    res.send("name: " + req.body.name);

});

routes(app);

db.then(() => {
    app.listen(port, () => {

        console.log(`Server is running on port ${port}`);
        //console.log("server is running on port " + port);
    
    });
}).catch((err) => console.log(err));