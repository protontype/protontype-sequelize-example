import {SequelizeDB} from "protontype/dist/libs/SequelizeDB";
import {BaseModel, DataTypes} from "protontype/dist/models/BaseModel";
import {TasksModel} from "./TasksModel";
import {Model} from "protontype/dist/libs/SequelizeModelLoader";

/**
 * @author Humberto Machado
 *
 */
@Model({
    name: UsersModel.MODEL_NAME,
    definition: {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }
})
export class UsersModel extends BaseModel {
    public static MODEL_NAME = 'Users';

    public associate(sequelizeDB: SequelizeDB): void {
        this.getInstance().hasMany(sequelizeDB.getModel(TasksModel.MODEL_NAME).getInstance());
    }
}