import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Perusahaan } from "./entity/Perusahaan"
import { Barang } from "./entity/Barang"

export const AppDataSource = new DataSource({
    type: "postgres",
    // host: "localhost",
    // port: 6500,
    // username: "postgres",
    // password: "0000",
    // database: "postgres",
    url:"postgres://13521162:V5WAz8HEGsDZ@ep-quiet-leaf-073651.ap-southeast-1.aws.neon.tech/SingleServiceBE",
    ssl:true,
    synchronize: true,
    logging: false,
    entities: [User, Perusahaan, Barang],
    migrations: [],
    subscribers: [],
})
