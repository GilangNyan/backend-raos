import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

class Menu extends Model {
    public id!: number
    public name!: string
    public icon!: string
    public link!: string
    public status!: string
    public level!: number
    public hasSubmenu!: boolean
}

Menu.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        icon: {
            type: DataTypes.STRING,
            allowNull: false
        },
        link: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        hasSubmenu: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'menu'
    }
)

export default Menu