import { SequelizeDB, BaseModel, DataTypes, Model, SequelizeBaseModelAttr } from "protontype";
import { UsersModel } from "./UsersModel";

/**
 * @author Humberto Machado
 *
 */
@Model({
    name: TasksModel.MODEL_NAME,
    definition: {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
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

    public associate(sequelizeDB: SequelizeDB): void {
        this.getInstance().belongsTo(sequelizeDB.getModel(UsersModel.MODEL_NAME).getInstance());
    }
}

export interface Task extends SequelizeBaseModelAttr{
    title: string;
    done: boolean;
}