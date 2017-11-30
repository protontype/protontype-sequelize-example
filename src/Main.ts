import { DefaultRouter } from './routes/DefaultRouter';
import { TasksRouter } from './routes/TasksRouter';
import { UsersRouter } from './routes/UsersRouter';
import { ProtonApplication } from 'protontype';
import { SequelizeDBConnector } from 'protontype-sequelize';
/**
 * @author Humberto Machado
 *
 */
new ProtonApplication()
    .withDBConnector(new SequelizeDBConnector())
    .addRouter(new DefaultRouter())
    .addRouter(new TasksRouter())
    .addRouter(new UsersRouter())
    .bootstrap();
