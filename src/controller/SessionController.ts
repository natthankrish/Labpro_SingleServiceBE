import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response, CookieOptions } from "express"
import { signJWT } from "../jwt/jwt"
import * as db from "./DatabaseController"
import { UserController } from "./UserController"
import { User } from "../entity/User"
import { DataSource } from "typeorm"


export async function createSessionHandler(request: Request, response: Response, data: UserController) {
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

export async function registerAdmin(request: Request, response: Response, data: UserController) {
    const { username, password } = request.body;
    await data.insert(username, password);
    return response.send("Success")
}

// log out handler
export function    getSessionHandler(request: Request, response: Response) {
    // @ts-ignore
    return response.send(request.user);
}
  
export function deleteSessionHandler(request: Request, response: Response) {
    response.cookie("accessToken", "", {
        maxAge: 0,
        httpOnly: true,
    });

    response.cookie("refreshToken", "", {
        maxAge: 0,
        httpOnly: true,
    });

    // @ts-ignore
    const session = invalidateSession(request.user.sessionId);

    return response.send(session);
}

export function test(request: Request, response: Response) {
    return response.json({username:"hehe"});
}
