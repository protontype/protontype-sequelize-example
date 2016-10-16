import { TasksModel } from '../models/TasksModel';
import { BaseCrudRouter, RouterClass, UseAuth } from 'protontype';

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