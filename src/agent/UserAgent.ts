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
        const user = new User(username, password, name);
        await this.userRepository.insert(user);
    }

    // async save(request: Request, response: Response, next: NextFunction) {
    //     const { username, password } = request.body;

    //     const user = Object.assign(new User(), {
    //         username,
    //         password
    //     })

    //     return this.userRepository.save(user)
    // }

    // async remove(request: Request, response: Response, next: NextFunction) {
    //     const id = parseInt(request.params.id)

    //     let userToRemove = await this.userRepository.findOneBy({ id })

    //     if (!userToRemove) {
    //         return "this user not exist"
    //     }

    //     await this.userRepository.remove(userToRemove)

    //     return "user has been removed"
    // }

}