import { NextFunction, Request, Response} from "express"
import { signJWT, verifyJWT } from "../utils/jwt"
import { UserAgent } from "../agent/UserAgent"

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

    const accessToken = signJWT({   
            username: username,
            password: user.password,
            name: user.name
        },
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

export async function getSessionHandler(req: Request, res: Response, data: UserAgent): Promise<Response> { 
    // @ts-ignore 
    const username = req.payload.username 

    const user = await data.one(username)

    if (!user) { 
        return res.status(401).json({
            status: "error",
            message: "Invalid username or password",
            data: {
                username:null,
                name:null,
            }
        })
    } 

    return res.status(200).json({
        status: "success",
        message: "Session Valid",
        data: {
            username:username,
            name:user.name,
        }
    })
} 


export async function registerAdmin(request: Request, response: Response, data: UserAgent) {
    const { username, password, name} = request.body;
    await data.insert(username, password, name);
    return response.send("Success")
}

export function checkToken(req: Request, res: Response, next: NextFunction) { 
    const token = req.headers.authorization; 
   
    if (!token) { 
        return res.status(401).json({
            status: "error",
            message: "Authorization failed",
            data: null,
        })
    } 
   
    let bearerToken: string; 
    if (token.startsWith("Bearer ")) { 
        bearerToken = token.split(" ")[1]; 
    } else { 
        bearerToken = token; 
    } 
   
    const { payload, expired } = verifyJWT(bearerToken); 
   
    //@ts-ignore 
    if (!payload) { 
        return res.status(403).json({
            status: "error",
            message: "Authorization failed",
            data: null,
        })
    } 
   
    //@ts-ignore 
    req.payload = payload; 
    return next(); 
}
