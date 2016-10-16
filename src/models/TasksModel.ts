import { SequelizeDB, BaseModel, DataTypes, Model, SequelizeBaseModelAttr } from "protontype";
import { UsersModel } from "./UsersModel";

/**
 * @author Humberto Machado
 *
 */
@Model({
    name: TasksModel.MODEL_NAME,
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
export class TasksModel extends BaseModel<Task> {
    public static MODEL_NAME = 'Tasks';

    public configure(): void {
        this.belongsTo(UsersModel.MODEL_NAME);
    }
}

export interface Task extends SequelizeBaseModelAttr {
    title: string;
    done: boolean;
    user_id: number;
}