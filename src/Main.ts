import {ExpressApplication} from "protontype-api/dist/libs/ExpressApplication";
import {DefaultMiddleware} from "protontype-api/dist/middlewares/DefaultMiddleware";
import {TasksRouter} from "./routes/TasksRouter";
import {UsersRouter} from "./routes/UsersRouter";
import {DefaultRouter} from "./routes/DefaultRouter";
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
    .bootstrap();
