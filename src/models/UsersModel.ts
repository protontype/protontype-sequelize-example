import { TasksModel } from './TasksModel';
import { BaseModel, DataTypes, Model, SequelizeBaseModelAttr, SequelizeDB } from 'protontype';
import * as bcrypt from 'bcrypt';

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
export class UsersModel extends BaseModel<User> {
    public static MODEL_NAME = 'Users';

    public associate(sequelizeDB: SequelizeDB): void {
        this.getInstance().hasMany(sequelizeDB.getModel(TasksModel.MODEL_NAME).getInstance());
    }

    public configure(sequelizeDB: SequelizeDB): void {
        this.getInstance().beforeCreate((user: any) => {
            let salt: string = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
        });
    }

    public isPassword(encodedPassword: string, password: string): boolean {
        return bcrypt.compareSync(password, encodedPassword);
    }
}

export interface User extends SequelizeBaseModelAttr {
    name: string;
    password: string;
    email: string;
}