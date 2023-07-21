import internal = require("stream");
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    username: string

    @Column()
    password: string

    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    public getPassword() {
        return this.password;
    }
}
