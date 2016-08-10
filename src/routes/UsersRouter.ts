import {UsersModel} from "../models/UsersModel";
import {ExpressRouter} from "typed-api/dist/api/routes/ExpressRouter";
import {Method} from "typed-api/dist/api/routes/Method";
import {ExpressApplication} from "typed-api/dist/api/libs/ExpressApplication";
import {Route} from "typed-api/dist/api/libs/RouteConfigLoader";

/**
 * Rotas para Users
 */
export class UsersRouter extends ExpressRouter {
    public getBaseUrl(): string {
        return '/users';
    }

    @Route({
        method: Method.GET,
        endpoint: '/',
        modelName: UsersModel.MODEL_NAME
    })
    public findAll(req, res, model) {
        model.findAll({})
            .then(result => res.json(result))
            .catch(error => this.sendErrorMessage(res, error));
    }

    @Route({
        method: Method.POST,
        endpoint: '/',
        modelName: UsersModel.MODEL_NAME
    })
    public create(req, res, model) {
        model.create(req.body)
            .then(result => res.json(result))
            .catch(error => this.sendErrorMessage(res, error));
    }

    @Route({
        method: Method.GET,
        endpoint: '/:id',
        modelName: UsersModel.MODEL_NAME
    })
    public findOne(req, res, model) {
        model.findOne({ where: req.params })
            .then(result => {
                if (result) {
                    res.json(result);
                } else {
                    res.sendStatus(404);
                }
            })
            .catch(error => this.sendErrorMessage(res, error));
    }

    @Route({
        method: Method.PUT,
        endpoint: '/:id',
        modelName: UsersModel.MODEL_NAME
    })
    public update(req, res, model) {
        model.update(req.body, { where: req.params })
            .then(result => res.sendStatus(204))
            .catch(error => this.sendErrorMessage(res, error));
    }

    @Route({
        method: Method.DELETE,
        endpoint: '/:id',
        modelName: UsersModel.MODEL_NAME
    })
    public delete(req, res, model) {
        model.destroy({ where: req.params })
            .then(result => res.sendStatus(204))
            .catch(error => this.sendErrorMessage(res, error));
    }
}

