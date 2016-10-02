import { JWTAuthentication } from './../auth/JWTAuthentication';
import { SpecificConfig } from './../conf/Config';
import { UsersModel } from './../models/UsersModel';
import { Middleware, Config, GlobalConfig } from 'protontype';
import * as passport from "passport";

export class JWTAuthMiddleware extends Middleware {

    public configMiddlewares(): void {
        let auth: JWTAuthentication = new JWTAuthentication(this.expressApplication);
        let passport: passport.Passport = auth.getPassport();
        this.express.use(passport.initialize());
    }

}