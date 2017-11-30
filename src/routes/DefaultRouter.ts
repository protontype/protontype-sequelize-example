import { SpecificConfig } from './../conf/Config';
import { ModelNames } from './../models/ModelNames';
import { User, UsersModel } from './../models/UsersModel';
import * as jwt from 'jwt-simple';
import { ExpressRouter, Method, ProtonConfigLoader, Route, RouterClass } from 'protontype';
import { SequelizeDB, ModelInstance } from 'protontype-sequelize';

/**
 * @author Humberto Machado
 * Example custom routes using router instance directly mixing with @Route decorator
 */
@RouterClass({
    baseUrl: "/"
})
export class DefaultRouter extends ExpressRouter {
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
        let cfg: SpecificConfig = ProtonConfigLoader.loadConfig();
        let userModel: UsersModel = SequelizeDB.getBD().getModel(UsersModel);

        if (req.body.email && req.body.password) {
            const email = req.body.email;
            const password = req.body.password;
            try {
                let userInstance: ModelInstance<User> = await userModel.getInstance().findOne({ where: { email: email } });
                let user: User = userInstance.toJSON();
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