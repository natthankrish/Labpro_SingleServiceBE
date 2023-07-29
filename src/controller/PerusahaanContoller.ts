import { Request, Response } from "express"
import { PerusahaanAgent } from "../agent/PerusahaanAgent"
import { BarangAgent } from "../agent/BarangAgent";


export async function addPerusahaanHandler(request: Request, response: Response, data: PerusahaanAgent) {
    const { nama, alamat, no_telp, kode } = request.body;
    const test = await data.test(kode.toUpperCase());

    if (test) {
        return response.status(401).json({
            status: "error",
            message: `Kode Perusahaan already exists`,
            data: null
        })
    }

    if (kode.length != 3) {
        return response.status(401).json({
            status: "error",
            message: `Kode Perusahaan harus terdiri atas 3 huruf`,
            data: null
        })
    }
    const perusahaan = await data.insert(nama, alamat, no_telp, kode.toUpperCase());

    return response.status(200).json({
        status: "success",
        message: `Perusahaan ${nama} Added Successfully`,
        data: {
            id: perusahaan.id,
            nama: perusahaan.nama,
            alamat: perusahaan.alamat,
            no_telp: perusahaan.no_telp,
            kode: perusahaan.kode 
        },
    })
}
  
export async function deletePerusahaanHandler(request: Request, response: Response, dataperusahaan: PerusahaanAgent, databarang: BarangAgent) {
    const { id } = request.params;
    const barang = await databarang.search3(id);

    for (const item of barang) {
        databarang.delete(item.id)
    }

    const perusahaan = await dataperusahaan.delete(id);

    if (!perusahaan) {
        return response.status(401).json({
            status: "error",
            message: `Perusahaan Not Found`,
            data: null
        })
    } else {
        return response.status(200).json({
            status: "success",
            message: `Perusahaan ${perusahaan.nama} Removed Successfully`,
            data: {
                id: perusahaan.id,
                nama: perusahaan.nama,
                alamat: perusahaan.alamat,
                no_telp: perusahaan.no_telp,
                kode: perusahaan.kode 
            },
        })
    }
}

export async function updatePerusahaanHandler(request: Request, response: Response, data: PerusahaanAgent) {
    const { id } = request.params;
    const { nama, alamat, no_telp, kode } = request.body;

    const test = await data.test(kode.toUpperCase());

    if (test && id != test.id) {
        return response.status(401).json({
            status: "error",
            message: `Kode Perusahaan already exists`,
            data: null
        })
    }

    if (kode.length != 3) {
        return response.status(401).json({
            status: "error",
            message: `Kode Perusahaan harus terdiri atas 3 huruf`,
            data: null
        })
    }

    const perusahaan = await data.update(id, nama, alamat, no_telp, kode);

    if (!perusahaan) {
        return response.status(401).json({
            status: "error",
            message: `Perusahaan Not Found`,
            data: null
        })
    } else {
        return response.status(200).json({
            status: "success",
            message: `Perusahaan ${perusahaan.nama} Updated Successfully`,
            data: {
                id: perusahaan.id,
                nama: perusahaan.nama,
                alamat: perusahaan.alamat,
                no_telp: perusahaan.no_telp,
                kode: perusahaan.kode 
            },
        })
    }
}

export async function getDetailPerusahaanHandler(request: Request, response: Response, data: PerusahaanAgent) {
    const { id } = request.params;

    const perusahaan = await data.one(id);

    if (!perusahaan) {
        return response.status(200).json({
            status: "error",
            message: `Perusahaan Not Found`,
            data: null
        })
    } else {
        return response.status(200).json({
            status: "success",
            message: `Perusahaan ${perusahaan.nama} Found`,
            data: {
                id: perusahaan.id,
                nama: perusahaan.nama,
                alamat: perusahaan.alamat,
                no_telp: perusahaan.no_telp,
                kode: perusahaan.kode 
            },
        })
    }
}

export async function getPerusahaanHandler(request: Request, response: Response, data: PerusahaanAgent) {
    const { q } = request.query;
    const searchString = q?.toString();

    if (!searchString) {
        const companies = await data.all();
        return response.status(200).json({
            status: "success",
            message: `Perusahaan Found`,
            data: companies,
        })
    }

    const companies = await data.search(searchString);

    if (companies.length === 0) {
        return response.status(404).json({
            status: "error",
            message: `Perusahaan Not Found`,
            data: null
        })
    } else {
        return response.status(200).json({
            status: "success",
            message: `Perusahaan Found`,
            data: companies
        })
    }
}
