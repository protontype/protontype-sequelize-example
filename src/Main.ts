import { JWTAuthMiddleware } from './middlewares/JWTAuthMiddleware';
import { DefaultRouter } from './routes/DefaultRouter';
import { TasksRouter } from './routes/TasksRouter';
import { UsersRouter } from './routes/UsersRouter';
import { ProtonApplication } from 'protontype';
/**
 * @author Humberto Machado
 *
 */
new ProtonApplication().withAuthMiddleware(new JWTAuthMiddleware())
    .addRouter(new DefaultRouter())
    .addRouter(new TasksRouter())
    .addRouter(new UsersRouter())
    .bootstrap();
