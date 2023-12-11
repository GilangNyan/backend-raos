import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

class Config extends Model {
    public id!: number
    public key!: string
    public value!: number
    public description!: string
}

Config.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        key: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        value: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        }
    },
    {
        sequelize,
        modelName: 'config'
    }
)

export default Config