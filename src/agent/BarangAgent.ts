import { Barang } from "../entity/Barang"
import { DataSource, Repository } from "typeorm"
import { Perusahaan } from "../entity/Perusahaan";

export class BarangAgent {

    private userRepository: Repository<Barang>;

    constructor(private db: DataSource) {
        this.userRepository = this.db.manager.getRepository(Barang)
    }

    async all() {
        return this.userRepository.find()
    }

    async filter(query: string, perusahaan:Perusahaan) {
        return this.userRepository.find({
            where: {perusahaan: perusahaan}
        })
    }

    async search1() {
        return this.userRepository
                        .createQueryBuilder('barang')
                        .leftJoinAndSelect('barang.perusahaan', 'perusahaan')
                        .getMany();
    }

    async search2(searchString: string) {
        return this.userRepository
            .createQueryBuilder('barang')
            .leftJoinAndSelect('barang.perusahaan', 'perusahaan')
            .where('barang.nama LIKE :searchString OR barang.kode LIKE :searchString', { searchString: `%${searchString}%` })
            .getMany();
    }

    async search3(perusahaan_id: string) {
        return this.userRepository
                .createQueryBuilder('barang')
                .leftJoinAndSelect('barang.perusahaan', 'perusahaan')
                .where('perusahaan.id = :perusahaanString', { perusahaan_id })
                .getMany();
    }

    async search4(perusahaan_id: string, searchString:string) {
        return this.userRepository
            .createQueryBuilder('barang')
            .leftJoinAndSelect('barang.perusahaan', 'perusahaan')
            .where('barang.nama LIKE :searchString OR barang.kode LIKE :searchString', { searchString: `%${searchString}%` })
            .andWhere('perusahaan.id = :perusahaanString', { perusahaan_id })
            .getMany();
    }

    async one(id: string): Promise<Barang> {
        const user = await this.userRepository.findOne({
            where: { id: id }
        })

        if (!user) {
            return null;
        }
        return user
    }

    async test(kode: string): Promise<Barang> {
        const user = await this.userRepository.findOne({
            where: { kode: kode }
        })

        if (!user) {
            return null;
        }
        return user
    }

    async insert(nama:string, harga:number, stok:number, perusahaan:Perusahaan, kode:string) {
        const barang = new Barang(nama, harga, stok, kode, perusahaan);
        await this.userRepository.insert(barang);
        return barang;
    }

    async delete(id: string): Promise<Barang> {
        const barang = await this.userRepository.findOne({
            where: { id: id }
        })

        if (!barang) {
            return null;
        }

        await this.userRepository.delete({
            id: id 
        })

        return barang
    }

    async update(id: string, nama:string, harga:number, stok:number, perusahaan:Perusahaan, kode:string): Promise<Barang> {
        const barang = await this.userRepository.findOne({
            where: { id: id }
        })

        barang.id = id;
        barang.nama = nama;
        barang.harga = harga;
        barang.stok = stok;
        barang.perusahaan = perusahaan;
        barang.kode = kode;

        await this.userRepository.save(barang);

        return barang
    }
}