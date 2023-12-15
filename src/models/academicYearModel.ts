import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

class AcademicYear extends Model {
    public id!: number
    public startYear!: number
    public endYear!: number
}

AcademicYear.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        startYear: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        endYear: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'academicYear'
    }
)

export default AcademicYear