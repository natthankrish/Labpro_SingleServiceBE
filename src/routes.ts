import { UserController } from "./controller/UserController"
import { SessionController } from "./controller/SessionController";
import requireUser from "./middleware/requireUser";

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}, {
    method: "post",
    route: "/api/session",
    controller: SessionController,
    action: "createSessionHandler"
}, {
    method: "delete",
    route: "/api/session",
    controller: SessionController,
    action: "logoutHandler"
}, {
    method: "get",
    route: "/api/protected",
    controller: SessionController,
    action: "getSessionHandler"
}]