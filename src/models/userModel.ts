import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import Role from "./roleModel";

class User extends Model {
    public id!: number
    public username!: string
    public password!: string
    public fullname!: string
    public email!: string
    public phone!: string
    public profileImage!: string
    public roleId!: number
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isNumeric: true,
                len: [10, 13]
            }
        },
        profileImage: {
            type: DataTypes.STRING,
        },
        roleId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'user'
    }
)

Role.hasMany(User)
User.belongsTo(Role)

export default User