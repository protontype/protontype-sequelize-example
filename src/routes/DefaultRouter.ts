import { SpecificConfig } from './../conf/Config';
import { UsersModel, User } from './../models/UsersModel';
import * as jwt from 'jwt-simple';
import { BaseModel, Config, ExpressRouter, Method, Route } from 'protontype';

/**
 * @author Humberto Machado
 * Example custom routes using router instance directly mixing with @Route decorator
 */
export class DefaultRouter extends ExpressRouter {

    public getModelInstances(): BaseModel<any>[] {
        return [];
    }

    public getBaseUrl(): string {
        return "/";
    }

    @Route({
        method: Method.GET,
        endpoint: 'routes'
    })
    public listRoutes(req, res, model): void {
        res.json(this.expressApplication.getRoutesList());
    }

    @Route()
    public rootRoute(): void {
        this.router.get("", (req, res) =>
            res.sendFile('routes.html', { "root": "./src/views" })
        );
    }

    @Route({
        method: Method.POST,
        endpoint: 'token'
    })
    public async tokenRoute(req: any, res: any) {
        let cfg: SpecificConfig = Config;
        let userModel: UsersModel = this.getModel<UsersModel>(UsersModel.MODEL_NAME);

        if (req.body.email && req.body.password) {
            const email = req.body.email;
            const password = req.body.password;
            try {
                let user: User = await userModel.getInstance().findOne({ where: { email: email } });
                if (userModel.isPassword(user.password, password)) {
                    const payload = { id: user.id };
                    res.json({ token: jwt.encode(payload, cfg.jwtSecret) });
                } else {
                    res.sendStatus(401);
                }
            } catch (error) {
                res.sendStatus(401)
            }
        } else {
            res.sendStatus(401);
        }
    }
}