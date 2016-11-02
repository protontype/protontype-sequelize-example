import { Task, TasksModel } from '../models/TasksModel';
import { UsersModel } from '../models/UsersModel';
import { ModelNames } from './../models/ModelNames';
import { BaseCrudRouter, Method, ModelInstance, Route, RouterClass, UseAuth } from 'protontype';

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
        let tasks: TasksModel = this.getModel<TasksModel>(ModelNames.TASKS);
        try {
            let task: ModelInstance<Task>[] = await tasks.getInstance().findAll({ where: req.params });
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
        modelName: ModelNames.TASKS,
        useAuth: true
    })
    public async tasksFromUser2(req, res, model: TasksModel) {
        try {
            let task: ModelInstance<Task>[] = await model.getInstance().findAll({ where: req.params });
            res.json(task);
        } catch (error) {
            this.sendErrorMessage(res, error);
        }
    }
}