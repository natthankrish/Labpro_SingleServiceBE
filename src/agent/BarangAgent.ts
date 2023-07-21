import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Barang } from "../entity/Barang"
import { DataSource, Repository } from "typeorm"
import { UpsertOptions } from "typeorm/repository/UpsertOptions";

export class BarangAgent {

    private userRepository: Repository<Barang>;

    constructor(private db: DataSource) {
        this.userRepository = this.db.manager.getRepository(Barang)
    }

    // async all(request: Request, response: Response, next: NextFunction) {
    //     return this.userRepository.find()
    // }

    // async one(username: string): Promise<Barang> {
    //     const user = await this.userRepository.findOne({
    //         where: { id: username }
    //     })

    //     if (!user) {
    //         return null;
    //     }
    //     return user
    // }

    // async insert(username: string, password:string, name:string) {
    //     const user = new User(username, password, name);
    //     await this.userRepository.insert(user);
    // }

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