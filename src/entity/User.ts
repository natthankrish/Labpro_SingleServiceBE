import { Entity, PrimaryColumn, Column } from "typeorm"

@Entity()
export class User {
    @PrimaryColumn()
    username: string

    @Column()
    name: string

    @Column()
    password: string

    constructor(username:string, name:string, password:string) {
        this.username = username;
        this.name = name;
        this.password = password;
    }

    public getPassword() {
        return this.password;
    }
}
