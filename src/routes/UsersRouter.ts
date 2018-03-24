import { Task, TasksModel } from '../models/TasksModel';
import { UsersModel } from '../models/UsersModel';
import { ModelNames } from './../models/ModelNames';
import { Method, Route, RouterClass, UseAuth, RouterFunctionParams } from 'protontype';
import { SequelizeCrudRouter, ModelInstance, SequelizeDB } from 'protontype-sequelize';

/**
 * @author Humberto Machado
 * Example using BaseCrudRouter.
 */
@RouterClass({
    baseUrl: "/users",
    model: UsersModel
})
export class UsersRouter extends SequelizeCrudRouter {

    /**
     * You can get model manually by method getModel<?>('modelName')
     */
    @Route({
        endpoint: '/:user_id/tasks',
        method: Method.GET,
        useAuth: true
    })
    public async tasksFromUser(params: RouterFunctionParams) {
        let tasks: TasksModel = SequelizeDB.getBD().getModel<TasksModel>(ModelNames.TASKS);
        try {
            let task: ModelInstance<Task>[] = await tasks.getInstance().findAll({ where: params.req.params });
            params.res.json(task);
        } catch (error) {
            this.sendErrorMessage(params.res, error);
        }
    }

    /**
     * Or you can pass modelName directly in @Route configuration and model parameter will be injected
     */
    @Route({
        endpoint: '/:user_id/tasks2',
        method: Method.GET,
        useAuth: true
    })
    public async tasksFromUser2(params: RouterFunctionParams) {
        try {
            let tasks: TasksModel = SequelizeDB.getBD().getModel<TasksModel>(ModelNames.TASKS);
            let task: ModelInstance<Task>[] = await tasks.getInstance().findAll({ where: params.req.params });
            params.res.json(task);
        } catch (error) {
            this.sendErrorMessage(params.res, error);
        }
    }
}