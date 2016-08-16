import {Method} from "typed-api/dist/routes/Method";
import {Route} from "typed-api/dist/libs/RouteConfigLoader";
import {TasksRouter} from "./TasksRouter";

/**
 * Routers can to be extended  
 */
export class TasksCustomRouter extends TasksRouter {

    @Route({
        endpoint: 'message/show',
        method: Method.GET
    })
    public showMessage(req, res, model) {
        res.json({ message: "Hello!" });
    }
}