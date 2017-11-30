import { RouterFunctionParams } from 'protontype/dist/lib';
import { TasksModel } from '../models/TasksModel';
import { RouterClass, UseAuth, Route, Method } from 'protontype';
import { SequelizeCrudRouter } from 'protontype-sequelize';

/**
 * @author Humberto Machado
 * Router example
 */
@RouterClass({
    baseUrl: "/tasks",
    model: TasksModel
})
export class TasksRouter extends SequelizeCrudRouter {

}