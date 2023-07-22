import { Express } from "express";
import { UserAgent } from "./agent/UserAgent"
import * as SessionHandler from "./controller/SessionController";
import * as PerusahaanHandler from "./controller/PerusahaanContoller";
import * as BarangHandler from "./controller/BarangController";
import { DataSource } from "typeorm";
import { PerusahaanAgent } from "./agent/PerusahaanAgent";
import { BarangAgent } from "./agent/BarangAgent";

function routes(app: Express, db: DataSource) {
    const user = new UserAgent(db);
    const perusahaan = new PerusahaanAgent(db);
    const barang = new BarangAgent(db);

    app.post('/login', (req, res) => {
        SessionHandler.createSessionHandler(req, res, user);
    })

    app.post('/register', (req, res) => {
        SessionHandler.registerAdmin(req, res, user);
    })

    app.get('/self', SessionHandler.checkToken, (req, res) => {
        SessionHandler.getSessionHandler(req, res, user);
    })

    app.get('/perusahaan', (req, res) => {
        PerusahaanHandler.getPerusahaanHandler(req, res, perusahaan);
    })

    app.post('/perusahaan', SessionHandler.checkToken, (req, res) => {
        PerusahaanHandler.addPerusahaanHandler(req, res, perusahaan);
    })

    app.get('/perusahaan/:id', (req, res) => {
        PerusahaanHandler.getDetailPerusahaanHandler(req, res, perusahaan);
    })

    app.delete('/perusahaan/:id', SessionHandler.checkToken, (req, res) => {
        PerusahaanHandler.deletePerusahaanHandler(req, res, perusahaan);
    })

    app.put('/perusahaan/:id', SessionHandler.checkToken, (req, res) => {
        PerusahaanHandler.updatePerusahaanHandler(req, res, perusahaan);
    })
    
    app.get('/barang', (req, res) => {
        BarangHandler.getBarangHandler(req, res, barang, perusahaan);
    })

    app.post('/barang', SessionHandler.checkToken, (req, res) => {
        BarangHandler.addBarangHandler(req, res, barang, perusahaan);
    })

    app.get('/barang/:id', (req, res) => {
        BarangHandler.getDetailBarangHandler(req, res, barang);
    })

    app.delete('/barang/:id', SessionHandler.checkToken, (req, res) => {
        BarangHandler.deleteBarangHandler(req, res, barang);
    })

    app.put('/barang/:id', SessionHandler.checkToken, (req, res) => {
        BarangHandler.updateBarangHandler(req, res, barang, perusahaan);
    })
}

export default routes;