import { Express } from "express";
import { UserController } from "./controller/UserController"
import { createSessionHandler, registerAdmin } from "./controller/SessionController";
import { DataSource } from "typeorm";

function routes(app: Express, db: DataSource) {
    const user = new UserController(db);

    app.get('/posts', (req, res) => {
        res.json({username: "hehe"});
    })

    app.post('/login', (req, res) => {
        createSessionHandler(req, res, user);
    })

    app.post('/register', (req, res) => {
        registerAdmin(req, res, user);
    })

    app.get('/barang', (req, res) => {
        return res.status(200).json({
            status: "success",
            message: "hehe",
            data: []
        })
    })

    app.get('/perusahaan', (req, res) => {
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
                name:"haha",
            }
        })
    })


}

export default routes;