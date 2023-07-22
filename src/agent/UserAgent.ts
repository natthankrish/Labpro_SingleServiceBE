import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { DataSource, Repository } from "typeorm"
import { UpsertOptions } from "typeorm/repository/UpsertOptions";

export class UserAgent {

    private userRepository: Repository<User>;

    constructor(private db: DataSource) {
        this.userRepository = this.db.manager.getRepository(User)
    }

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find()
    }

    async one(username: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { username: username }
        })

        if (!user) {
            return null;
        }
        return user
    }

    async insert(username: string, password:string, name:string) {
        const user = new User(username, name, password);
        await this.userRepository.insert(user);
    }

}