import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"
import { Perusahaan } from './Perusahaan';

@Entity()
export class Barang {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    nama: string

    @Column()
    harga: number

    @Column()
    stok: number

    @Column()
    kode: string

    @ManyToOne(() => Perusahaan, perusahaan => perusahaan.barangs)
    perusahaan: Perusahaan;

    constructor(nama:string, harga:number, stok:number, kode:string, perusahaan: Perusahaan) {
        this.nama = nama;
        this.harga = harga;
        this.stok = stok;
        this.kode = kode;
        this.perusahaan = perusahaan;
    }
}