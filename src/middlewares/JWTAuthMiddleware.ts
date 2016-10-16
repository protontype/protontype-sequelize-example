import { SpecificConfig } from './../conf/Config';
import { ModelNames } from './../models/ModelNames';
import { User, UsersModel } from './../models/UsersModel';
import * as express from 'express';
import * as passport from 'passport';
import { ExtractJwt, Strategy, StrategyOptions, VerifiedCallback } from 'passport-jwt';
import { AuthMiddleware, Config } from 'protontype';

export class JWTAuthMiddleware extends AuthMiddleware {
    private passportInstance: passport.Passport;
    private config: SpecificConfig = Config;

    public configMiddlewares(): void {
        this.passportInstance = passport;
        let userModel: UsersModel = this.expressApplication.getModel<UsersModel>(ModelNames.USERS);

        let params: StrategyOptions = {
            secretOrKey: this.config.jwtSecret,
            jwtFromRequest: ExtractJwt.fromAuthHeader()
        };

        const strategy: Strategy = new Strategy(params, async (payload: any, done: VerifiedCallback) => {
            try {
                let user: User = await userModel.getInstance().findById(payload.id);
                if (user) {
                    return done(null, {
                        id: user.id,
                        email: user.email
                    });
                }
                return done(null, false);
            } catch (error) {
                return done(error, null);
            }
        });
        this.passportInstance.use(strategy);
        this.expressApplication.getExpress().use(this.passportInstance.initialize());
    }

    public authenticate(): express.Handler {
        return this.passportInstance.authenticate("jwt", this.config.jwtSession);
    }

    public getPassport(): passport.Passport {
        return this.passportInstance;
    }

    public getConfig(): SpecificConfig {
        return this.config;
    }

}