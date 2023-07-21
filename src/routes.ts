import { Express } from "express";
import { UserAgent } from "./agent/UserAgent"
import { createSessionHandler, registerAdmin } from "./controller/SessionController";
import * as PerusahaanHandler from "./controller/PerusahaanContoller";
import { DataSource } from "typeorm";
import { PerusahaanAgent } from "./agent/PerusahaanAgent";

function routes(app: Express, db: DataSource) {
    const user = new UserAgent(db);
    const perusahaan = new PerusahaanAgent(db);

    app.get('/posts', (req, res) => {
        res.json({username: "hehe"});
    })

    app.post('/login', (req, res) => {
        createSessionHandler(req, res, user);
    })

    app.post('/register', (req, res) => {
        registerAdmin(req, res, user);
    })

    app.get('/perusahaan', (req, res) => {
        PerusahaanHandler.getPerusahaanHandler(req, res, perusahaan);
    })

    app.post('/perusahaan', (req, res) => {
        PerusahaanHandler.addPerusahaanHandler(req, res, perusahaan);
    })

    app.get('/perusahaan/:id', (req, res) => {
        PerusahaanHandler.getDetailPerusahaanHandler(req, res, perusahaan);
    })

    app.delete('/perusahaan/:id', (req, res) => {
        PerusahaanHandler.deletePerusahaanHandler(req, res, perusahaan);
    })

    app.put('/perusahaan/:id', (req, res) => {
        PerusahaanHandler.updatePerusahaanHandler(req, res, perusahaan);
    })
    
    app.get('/barang', (req, res) => {
        return res.status(200).json({
            status: "success",
            message: "hehe",
            data: []
        })
    })

    app.get('/self', (req, res) => {
        return res.status(200).json({
            status: "success",
            message: "hehe",
            data: {
                username:"haha",
                name:"admin",
            }
        })
    })


}

export default routes;