import { JWTAuthMiddleware } from './../middlewares/JWTAuthMiddleware';
import { BaseModel, ExpressRouter, Method, Route, ExpressApplication } from "protontype";
import { TasksModel, Task } from "../models/TasksModel";

/**
 * @author Humberto Machado
 * Router example using decorator @Route and model
 */
export class TasksRouter extends ExpressRouter {

    public getModelInstances(): BaseModel<any>[] {
        return [new TasksModel()];
    }

    public getBaseUrl(): string {
        return '/tasks';
    }

    @Route({
        method: Method.GET,
        endpoint: '',
        modelName: TasksModel.MODEL_NAME,
        useAuth: true
    })
    public async findAllTasks(req, res, tasks: TasksModel) {
        try {
            let task: Task[] = await tasks.getInstance().findAll({});
            res.json(task);
        } catch (error) {
            this.sendErrorMessage(res, error)
        }
    }

    @Route({
        method: Method.POST,
        endpoint: '',
        modelName: TasksModel.MODEL_NAME
    })
    public async createTask(req, res, tasks: TasksModel) {
        try {
            let task: Task = await tasks.getInstance().create(req.body);
            res.json(task);
        } catch (error) {
            this.sendErrorMessage(res, error);
        }
    }

    @Route({
        method: Method.GET,
        endpoint: '/:id',
        modelName: TasksModel.MODEL_NAME
    })
    public async findOneTask(req, res, tasks: TasksModel) {
        try {
            let task: Task = await tasks.getInstance().findOne({ where: req.params });
            if (task) {
                res.json(task);
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            this.sendErrorMessage(res, error);
        }
    }

    @Route({
        method: Method.PUT,
        endpoint: '/:id',
        modelName: TasksModel.MODEL_NAME
    })
    public async updateTask(req, res, tasks: TasksModel) {
        try {
            await tasks.getInstance().update(req.body, { where: req.params });
            res.sendStatus(204);
        } catch (error) {
            this.sendErrorMessage(res, error);
        }
    }

    @Route({
        method: Method.DELETE,
        endpoint: '/:id',
        modelName: TasksModel.MODEL_NAME
    })
    public async deleteTask(req, res, tasks: TasksModel) {
        try {
            await tasks.getInstance().destroy({ where: req.params });
            res.sendStatus(204);
        } catch (error) {
            this.sendErrorMessage(res, error);
        }
    }
}