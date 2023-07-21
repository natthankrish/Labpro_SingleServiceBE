import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm"
import { Barang } from './Barang';

@Entity()
export class Perusahaan {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    nama: string

    @Column()
    alamat: string

    @Column()
    no_telp: string

    @Column()
    kode: string

    @OneToMany(() => Barang, barang => barang.perusahaan, {cascade: true})
    barangs: Barang[] | undefined;

    constructor(nama:string, alamat:string, no_telp:string, kode:string) {
        this.nama = nama;
        this.alamat = alamat;
        this.no_telp = no_telp;
        this.kode = kode;
    }
}