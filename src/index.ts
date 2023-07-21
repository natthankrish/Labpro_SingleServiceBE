import * as express from "express"
import * as bodyParser from "body-parser"
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as jwt from "jsonwebtoken"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import routes from "./routes"
import { User } from "./entity/User"

import { port } from "./config"
import deserializeUser from "./middleware/deserializeUser";
import postgresSetup from "./jwt/postgres";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(deserializeUser);

app.use(
    cors({
        credentials: true,
        origin: '*',
    })
);

async function main() {
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });

    const db = await postgresSetup();

    routes(app, db);
}

main();
