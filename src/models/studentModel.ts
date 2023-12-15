import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import Grade from "./gradeModel";
import AcademicYear from "./academicYearModel";
import StudentsGrade from "./studentClassModel";

class Student extends Model {
    public id!: number
    public nipd!: string
    public nisn!: string
    public name!: string
    public gender!: string
    public birthPlace!: string
    public birthDate!: string
}

Student.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        nipd: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nisn: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender: {
            type: DataTypes.CHAR,
            allowNull: false
        },
        birthPlace: {
            type: DataTypes. STRING,
            allowNull: false
        },
        birthDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'student'
    }
)

Student.belongsToMany(Grade, {through: StudentsGrade})
Grade.belongsToMany(Student, {through: StudentsGrade})
Grade.belongsToMany(AcademicYear, {through: StudentsGrade})
AcademicYear.belongsToMany(Grade, {through: StudentsGrade})

export default Student