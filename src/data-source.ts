import "reflect-metadata"
import { DataSource, TreeRepositoryNotSupportedError } from "typeorm"
import { User } from "./entity/User"
import { Perusahaan } from "./entity/Perusahaan"
import { Barang } from "./entity/Barang"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "db",
    port: 5432,
    username: "test",
    password: "0000",
    database: "SingleServiceBE",
    // url:"postgres://13521162:V5WAz8HEGsDZ@ep-quiet-leaf-073651.ap-southeast-1.aws.neon.tech/SingleServiceBE",
    // ssl:true,
    synchronize: true,
    logging: true,
    entities: [User, Perusahaan, Barang],
    migrations: [],
    subscribers: [],
})
