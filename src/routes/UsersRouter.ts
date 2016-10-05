import { BaseModel, BaseCrudRouter, Method, Route, UseAuth } from "protontype";
import { UsersModel } from "../models/UsersModel";
import { TasksModel } from "../models/TasksModel";

/**
 * @author Humberto Machado
 * Example using BaseCrudRouter.
 */
@UseAuth()
export class UsersRouter extends BaseCrudRouter {

    public getModelInstances(): BaseModel[] {
        return [new UsersModel()];
    }

    public getBaseUrl(): string {
        return '/users';
    }

    // Parâmetro model não é obrgatório
    @Route({
        endpoint: '/:user_id/tasks',
        method: Method.GET
    })
    public tasksFromUser(req, res) {
        let tasks: TasksModel = this.getModel<TasksModel>(TasksModel.MODEL_NAME);
        tasks.getInstance().findAll({where: req.params})
            .then(result => res.json(result))
            .catch(error => this.sendErrorMessage(res, error))
    }
}