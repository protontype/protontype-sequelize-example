import {create} from 'domain';
import { TasksModel, Task } from '../models/TasksModel';
import { UsersModel } from '../models/UsersModel';
import { BaseCrudRouter, BaseModel, Method, Route, UseAuth } from 'protontype';

/**
 * @author Humberto Machado
 * Example using BaseCrudRouter.
 */
@UseAuth({
    create: false,
    update: true,
    read: true,
    delete: true
})
export class UsersRouter extends BaseCrudRouter {

    public getModelInstances(): BaseModel<any>[] {
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
    public async tasksFromUser(req, res) {
        let tasks: TasksModel = this.getModel<TasksModel>(TasksModel.MODEL_NAME);
        try {
            let task: Task[] = await tasks.getInstance().findAll({ where: {Resre:""} });
            res.json(task);
        } catch (error) {
            this.sendErrorMessage(res, error);
        }
    }
}