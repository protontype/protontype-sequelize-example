import {ExpressApplication} from "typed-api/dist/libs/ExpressApplication";
import {DefaultMiddleware} from "typed-api/dist/middlewares/DefaultMiddleware";
import {TasksRouter} from "./routes/TasksRouter";
import {UsersRouter} from "./routes/UsersRouter";
import {DefaultRouter} from "./routes/DefaultRouter";
import {TasksCustomRouter} from "./routes/TasksCustomRouter";
/**
 * @author Humberto Machado
 *
 */

let expressApp = new ExpressApplication();
expressApp
    .addMiddleware(new DefaultMiddleware())
    .addRouter(new DefaultRouter())
    .addRouter(new TasksRouter())
    .addRouter(new UsersRouter())
    .addRouter(new TasksCustomRouter())
    .bootstrap();
