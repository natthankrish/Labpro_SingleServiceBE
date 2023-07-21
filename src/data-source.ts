import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    // host: "localhost",
    // port: 6500,
    // username: "postgres",
    // password: "0000",
    // database: "postgres",
    url:"postgres://13521162:V5WAz8HEGsDZ@ep-quiet-leaf-073651.ap-southeast-1.aws.neon.tech/neondb",
    ssl:true,
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
