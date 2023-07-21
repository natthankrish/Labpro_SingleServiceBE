import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response, CookieOptions } from "express"
import { signJWT } from "../utils/jwt"
import { UserAgent } from "../agent/UserAgent"
import { User } from "../entity/User"
import { DataSource } from "typeorm"


export async function createSessionHandler(request: Request, response: Response, data: UserAgent) {
    const { username, password } = request.body;

    const user = await data.one(username);

    if (!user || user.getPassword() !== password) {
        return response.status(401).json({
            status: "error",
            message: "Invalid email or password",
            data: null,
        });
    }

    const accessToken = signJWT(
        { username: username },
        "5s"
    );


    return response.status(200).json({
        status: "success",
        message: "Login Successful",
        data: {
            user: {
                username: username,
                name: "haha",
            },
            token: accessToken,
        },
    })
}

export async function registerAdmin(request: Request, response: Response, data: UserAgent) {
    const { username, password, name} = request.body;
    await data.insert(username, password, name);
    return response.send("Success")
}
