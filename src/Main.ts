import {ExpressApplication} from "typed-api/dist/api/libs/ExpressApplication";
import {DefaultMiddleware} from "typed-api/dist/api/middlewares/DefaultMiddleware";
import {TasksRouter} from "./routes/TasksRouter";
import {UsersRouter} from "./routes/UsersRouter";
import {DefaultRouter} from "./routes/DefaultRouter";
/**
 * Created by beto_ on 05/08/2016.
 */

let expressApp = new ExpressApplication();
expressApp
    .addMiddleware(new DefaultMiddleware(expressApp))
    .addRouter(new DefaultRouter())
    .addRouter(new TasksRouter())
    .addRouter(new UsersRouter())
    .bootstrap();
