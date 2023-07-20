import * as express from "express"
import * as bodyParser from "body-parser"
import cookieParser from "cookie-parser";
import cors from "cors";
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import { User } from "./entity/User"

import { port } from "./config"

function handleError(err, req, res, next) {
    res.status(err.statusCode || 500).send(err.message);
}

AppDataSource.initialize().then(async () => {
    const app = express()
    app.use(bodyParser.json())

    Routes.forEach(route => {
        (app as any)[route.method](route.route, async (req: Request, res: Response, next: Function) => {
            try {
                const result = await (new (route.controller as any))[route.action](req, res, next)
                res.json(result);
            } catch (error) {
                next(error);
            }
        })
    })

    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000",
    })
    );

    app.use(handleError)
    app.listen(port)

    console.log(`Express server has started on port ${port}. Open http://localhost:${port}/users to see results`)

}).catch(error => console.log(error))
