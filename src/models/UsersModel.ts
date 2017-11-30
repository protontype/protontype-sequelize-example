import { ModelNames } from './ModelNames';
import * as bcrypt from 'bcrypt-nodejs';
import { SequelizeBaseModel, DataTypes, HasMany, Model, SequelizeBaseModelAttr } from 'protontype-sequelize';

/**
 * @author Humberto Machado
 *
 */
@Model({
    name: ModelNames.USERS,
    definition: {
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
@HasMany(ModelNames.TASKS)
export class UsersModel extends SequelizeBaseModel<User> {
    public configure(): void {
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