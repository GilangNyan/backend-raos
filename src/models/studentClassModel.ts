import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import Student from "./studentModel";
import Grade from "./gradeModel";
import AcademicYear from "./academicYearModel";

class StudentsGrade extends Model {
    public studentId!: number
    public gradeId!: number
    public academicYearId!: number
}

StudentsGrade.init(
    {
        studentId: {
            type: DataTypes.INTEGER.UNSIGNED,
            references: {
                model: Student,
                key: 'id'
            }
        },
        gradeId: {
            type: DataTypes.INTEGER.UNSIGNED,
            references: {
                model: Grade,
                key: 'id'
            }
        },
        academicYearId: {
            type: DataTypes.INTEGER.UNSIGNED,
            references: {
                model: AcademicYear,
                key: 'id'
            }
        }
    },
    {
        sequelize,
        modelName: 'studentsGrade'
    }
)

export default StudentsGrade