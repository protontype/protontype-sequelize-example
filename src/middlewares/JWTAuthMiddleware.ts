import { UsersModel } from './../models/UsersModel';
import { Middleware } from 'protontype';
import {Config, GlobalConfig} from "protontype";

export class JWTAuthMiddleware extends Middleware {

    public configMiddlewares(): void {
        let userModel: UsersModel = this.expressApplication.getModel<UsersModel>(UsersModel.MODEL_NAME);
        let conf: any = Config;
        console.log(conf.jwtSecret);
        
    }
    
}