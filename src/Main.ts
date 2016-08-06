import {ExpressApplication} from "typed-api/dist/src/libs/ExpressApplication";
import {DefaultMiddleware} from "typed-api/dist/src/middlewares/DefaultMiddleware";
import {DefaultRouter} from "./routes/DefaultRouter";
import {TasksRouter} from "./routes/TasksRouter";
import {UsersRouter} from "./routes/UsersRouter";
/**
 * Created by beto_ on 05/08/2016.
 */

let expressApp = new ExpressApplication();
expressApp
    .addMiddleware(new DefaultMiddleware(expressApp))
    .addRouter(new DefaultRouter(expressApp))
    .addRouter(new TasksRouter(expressApp))
    .addRouter(new UsersRouter(expressApp))
    .bootstrap();
