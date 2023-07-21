import { Request, Response } from "express"
import { PerusahaanAgent } from "../agent/PerusahaanAgent"


export async function addPerusahaanHandler(request: Request, response: Response, data: PerusahaanAgent) {
    const { nama, alamat, no_telp, kode } = request.body;
    const perusahaan = await data.insert(nama, alamat, no_telp, kode);

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
  
export async function deletePerusahaanHandler(request: Request, response: Response, data: PerusahaanAgent) {
    const { id } = request.params;

    const perusahaan = await data.delete(id);

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
        return response.status(401).json({
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
