import {ExpressApplication} from "protontype/dist/libs/ExpressApplication";
import {DefaultMiddleware} from "protontype/dist/middlewares/DefaultMiddleware";
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
