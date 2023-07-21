import { Request, Response } from "express"
import { BarangAgent } from "../agent/BarangAgent"
import { PerusahaanAgent } from "../agent/PerusahaanAgent";


export async function addBarangHandler(request: Request, response: Response, databarang: BarangAgent, dataperusahaan: PerusahaanAgent) {
    const { nama, harga, stok, perusahaan_id, kode } = request.body;
    const testbarang = await databarang.test(kode);

    if (testbarang) {
        return response.status(401).json({
            status: "error",
            message: `Kode Barang already exists`,
            data: null
        })
    }

    const testperusahaan = await dataperusahaan.one(perusahaan_id);

    if (!testperusahaan) {
        return response.status(401).json({
            status: "error",
            message: `Perusahaan not found`,
            data: null
        })
    }

    const barang = await databarang.insert(nama, harga, stok, testperusahaan, kode);

    return response.status(200).json({
        status: "success",
        message: `Barang ${nama} Added Successfully`,
        data: {
            id: barang.id,
            nama: barang.nama,
            harga: barang.harga,
            stok: barang.stok,
            kode: barang.kode,
            perusahaan_id: barang.perusahaan.id 
        },
    })
}
  
export async function deleteBarangHandler(request: Request, response: Response, data: BarangAgent) {
    const { id } = request.params;

    const barang = await data.delete(id);

    if (!barang) {
        return response.status(401).json({
            status: "error",
            message: `Barang Not Found`,
            data: null
        })
    } else {
        return response.status(200).json({
            status: "success",
            message: `Barang ${barang.nama} Removed Successfully`,
            data: {
                id: barang.id,
                nama: barang.nama,
                harga: barang.harga,
                stok: barang.stok,
                kode: barang.kode,
                perusahaan_id: barang.perusahaan.id
            },
        })
    }
}

export async function updateBarangHandler(request: Request, response: Response, databarang: BarangAgent, dataperusahaan: PerusahaanAgent) {
    const { id } = request.params;
    const { nama, harga, stok, perusahaan_id, kode } = request.body;

    const caribarang = await databarang.one(id);

    if (!caribarang) {
        return response.status(401).json({
            status: "error",
            message: `Barang Not Found`,
            data: null
        })
    }

    const testbarang = await databarang.test(kode);

    if (testbarang && testbarang.id != caribarang.id) {
        return response.status(401).json({
            status: "error",
            message: `Kode Barang already exists`,
            data: null
        })
    }

    const testperusahaan = await dataperusahaan.one(perusahaan_id);

    if (!testperusahaan) {
        return response.status(401).json({
            status: "error",
            message: `Barang not found`,
            data: null
        })
    }

    const barang = await databarang.update(id, nama, harga, stok, testperusahaan, kode);

    return response.status(200).json({
        status: "success",
        message: `Barang ${barang.nama} Updated Successfully`,
        data: {
            id: barang.id,
            nama: barang.nama,
            harga: barang.harga,
            stok: barang.stok,
            kode: barang.kode,
            perusahaan_id: barang.perusahaan.id 
        },
    })
}

export async function getDetailBarangHandler(request: Request, response: Response, data: BarangAgent) {
    const { id } = request.params;

    const barang = await data.one(id);

    if (!barang) {
        return response.status(401).json({
            status: "error",
            message: `Barang Not Found`,
            data: null
        })
    } else {
        return response.status(200).json({
            status: "success",
            message: `Barang ${barang.nama} Found`,
            data: {
                id: barang.id,
                nama: barang.nama,
                harga: barang.harga,
                stok: barang.stok,
                kode: barang.kode,
                perusahaan_id: barang.perusahaan.id
            },
        })
    }
}

export async function getBarangHandler(request: Request, response: Response, databarang: BarangAgent, dataperusahaan: PerusahaanAgent) {
    const { q, perusahaan } = request.query;
    const searchString = q?.toString();
    const perusahaanString = perusahaan?.toString();

    if (!searchString && !perusahaanString) {
        const items = await databarang.search1()
        return response.status(200).json({
            status: "success",
            message: `Barang Found`,
            data: items
        })
    }
      
    if (perusahaanString && !searchString) {
        const perusahaanEntity = await dataperusahaan.one(perusahaanString);
        if (!perusahaanEntity) {
            return response.status(404).json({
                status: "error",
                message: `Barang Not Found`,
                data: null
            })
        }

        const items = await databarang.search2(perusahaanString);

        return response.status(200).json({
            status: "success",
            message: `Barang Found`,
            data: items
        })
    }

    if (!perusahaanString && searchString) {
        const items = await databarang.search3(searchString)
        return response.status(200).json({
            status: "success",
            message: `Barang Found`,
            data: items
        })
    }

    const items = await databarang.search4(perusahaanString, searchString)

    return response.status(200).json({
        status: "success",
        message: `Barang Found`,
        data: items
    })
}
