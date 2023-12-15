import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

class Grade extends Model {
    public id!: number
    public name!: string
}

Grade.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'grade'
    }
)

export default Grade