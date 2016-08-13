import * as DataTypes from "sequelize"
import {SequelizeDB} from "typed-api/dist/libs/SequelizeDB";
import {BaseModel} from "typed-api/dist/models/BaseModel";
import {UsersModel} from "./UsersModel";
import {Model} from "typed-api/dist/libs/SequelizeModelLoader";
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
export class TasksModel extends BaseModel {
    public static MODEL_NAME = 'Tasks';

    public associate(sequelizeDB: SequelizeDB): void {
        this.model.belongsTo(sequelizeDB.getModel(UsersModel.MODEL_NAME));
        console.log('Associado models a TASK');
    }
}