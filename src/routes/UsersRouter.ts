import { Task, TasksModel } from '../models/TasksModel';
import { UsersModel } from '../models/UsersModel';
import { create } from 'domain';
import { BaseCrudRouter, BaseModel, Method, Route, UseAuth, RouterClass } from 'protontype';

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
@RouterClass({
    baseUrl: "/users",
    modelInstances: [new UsersModel()]
})
export class UsersRouter extends BaseCrudRouter {

    /**
     * You can get model manually by method getModel<?>('modelName')
     */
    @Route({
        endpoint: '/:user_id/tasks',
        method: Method.GET,
        useAuth: true
    })
    public async tasksFromUser(req, res) {
        let tasks: TasksModel = this.getModel<TasksModel>(TasksModel.MODEL_NAME);
        try {
            let task: Task[] = await tasks.getInstance().findAll({ where: req.params });
            res.json(task);
        } catch (error) {
            this.sendErrorMessage(res, error);
        }
    }

    /**
     * Or you can pass modelName directly in @Route configuration and model parameter will be injected
     */
    @Route({
        endpoint: '/:user_id/tasks2',
        method: Method.GET,
        modelName: TasksModel.MODEL_NAME,
        useAuth: true
    })
    public async tasksFromUser2(req, res, model: TasksModel) {
        try {
            let task: Task[] = await model.getInstance().findAll({ where: req.params });
            res.json(task);
        } catch (error) {
            this.sendErrorMessage(res, error);
        }
    }
}