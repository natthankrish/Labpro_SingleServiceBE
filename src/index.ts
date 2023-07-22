import * as express from "express"
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import routes from "./routes"
import { port } from "./config"
import postgresSetup from "./utils/postgres";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
