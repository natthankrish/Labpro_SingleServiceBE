import { NextFunction, Request, Response } from "express"
import { Perusahaan } from "../entity/Perusahaan"
import { DataSource, Repository } from "typeorm"

export class PerusahaanAgent {

    private userRepository: Repository<Perusahaan>;

    constructor(private db: DataSource) {
        this.userRepository = this.db.manager.getRepository(Perusahaan)
    }

    async all() {
        return this.userRepository.find()
    }

    async search(query: string) {
        return this.userRepository
                        .createQueryBuilder('perusahaan')
                        .where('perusahaan.nama LIKE :searchString OR perusahaan.kode LIKE :searchString', { searchString: `%${query}%` })
                        .getMany();
    }

    async one(id: string) {
        const perusahaan = await this.userRepository.findOne({
            where: { id: id }
        })

        if (!perusahaan) {
            return null;
        }
        return perusahaan
    }

    async insert(nama:string, alamat:string, no_telp:string, kode:string): Promise<Perusahaan> {
        const perusahaan = new Perusahaan(nama, alamat, no_telp, kode);
        await this.userRepository.insert(perusahaan);
        return perusahaan;
    }

    async delete(id: string): Promise<Perusahaan> {
        const perusahaan = await this.userRepository.findOne({
            where: { id: id }
        })

        if (!perusahaan) {
            return null;
        }

        await this.userRepository.delete({
            id: id 
        })

        return perusahaan
    }

    async update(id: string, nama:string, alamat:string, no_telp:string, kode:string): Promise<Perusahaan> {
        const perusahaan = await this.userRepository.findOne({
            where: { id: id }
        })

        if (!perusahaan) {
            return null;
        }

        perusahaan.nama = nama;
        perusahaan.alamat = alamat;
        perusahaan.no_telp = no_telp;
        perusahaan.kode = kode;

        await this.userRepository.save(perusahaan);

        return perusahaan
    }
}