import { RouterFunctionParams } from 'protontype/dist/lib';
import { TasksModel } from '../models/TasksModel';
import { BaseCrudRouter, RouterClass, UseAuth, Route, Method } from 'protontype';

/**
 * @author Humberto Machado
 * Router example
 */
@UseAuth()
@RouterClass({
    baseUrl: "/tasks",
    modelInstances: [new TasksModel()]
})
export class TasksRouter extends BaseCrudRouter {

}