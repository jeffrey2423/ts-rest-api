import { Router } from "express";
import { IRouter } from "../interfaces/IRouter";

export class Auth implements IRouter{

    private router: Router;

    constructor(){
        this.router = Router();
    }

    getRouter():Router {
        return this.router;
    }

    public HelloAuth() : void {
        this.getRouter().get("/", (req, res) => {
            res.send("Hello Auth");
        }  
    }

}