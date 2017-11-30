import { ModelNames } from './ModelNames';
import { SequelizeBaseModel, BelongsTo, DataTypes, Model, SequelizeBaseModelAttr } from 'protontype-sequelize';

/**
 * @author Humberto Machado
 *
 */
@Model({
    name: ModelNames.TASKS,
    definition: {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        done: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }
})
@BelongsTo(ModelNames.USERS)
export class TasksModel extends SequelizeBaseModel<Task> {
}

export interface Task extends SequelizeBaseModelAttr {
    title: string;
    done: boolean;
    user_id: number;
}