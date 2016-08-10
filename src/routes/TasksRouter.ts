import {TasksModel} from "../models/TasksModel";
import {ExpressRouter} from "typed-api/dist/api/routes/ExpressRouter";
import {Method} from "typed-api/dist/api/routes/Method";
import {ExpressApplication} from "typed-api/dist/api/libs/ExpressApplication";
import {Route} from "typed-api/dist/api/libs/RouteConfigLoader";

/**
 * Rotas para Taks
 */
export class TasksRouter extends ExpressRouter {

    public getBaseUrl(): string {
        return '/tasks';
    }

    @Route({
        method: Method.GET,
        endpoint: '/',
        modelName: TasksModel.MODEL_NAME
    })
    public findAll(req, res, model) {
        model.findAll({})
            .then(result => res.json(result))
            .catch(error => this.sendErrorMessage(res, error));
    }

    @Route({
        method: Method.POST,
        endpoint: '/',
        modelName: TasksModel.MODEL_NAME
    })
    public create(req, res, model) {
        model.create(req.body)
            .then(result => res.json(result))
            .catch(error => this.sendErrorMessage(res, error));
    }

    @Route({
        method: Method.GET,
        endpoint: '/:id',
        modelName: TasksModel.MODEL_NAME
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
        modelName: TasksModel.MODEL_NAME
    })
    public update(req, res, model) {
        model.update(req.body, { where: req.params })
            .then(result => res.sendStatus(204))
            .catch(error => this.sendErrorMessage(res, error));
    }

    @Route({
        method: Method.DELETE,
        endpoint: '/:id',
        modelName: TasksModel.MODEL_NAME
    })
    public delete(req, res, model) {
        model.destroy({ where: req.params })
            .then(result => res.sendStatus(204))
            .catch(error => this.sendErrorMessage(res, error));
    }
}



