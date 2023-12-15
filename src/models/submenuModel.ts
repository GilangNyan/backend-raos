import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import Menu from "./menuModel";

class Submenu extends Model {
    public id!: number
    public name!: string
    public link!: string
    public status!: string
    public level!: number
    public menuId!: number
}

Submenu.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
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
        menuId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'submenu'
    }
)

Menu.hasMany(Submenu)
Submenu.belongsTo(Menu)

export default Submenu