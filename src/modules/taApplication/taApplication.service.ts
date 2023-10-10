import { PrismaClient } from '@prisma/client';
import { TAApplicationData } from './taApplication.types';

const prisma = new PrismaClient();

export const saveApplication
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    = async ( data: TAApplicationData, file: Express.Multer.File ) => {
        const filePath = file.path;
        return await prisma.tAApplication.create( {
            data: {
                course: { connect: { id: data.courseId } }
                , student: { connect: { userId: data.studentId } }
                , taJob: { connect: { id: data.taJobId } }
                , hoursCanWorkPerWeek: data.hoursCanWorkPerWeek
                , coursesTaken: data.coursesTaken
                // eslint-disable-next-line @typescript-eslint/naming-convention
                , GPA: data.GPA
                , requiredCourses: data.requiredCourses
                , requiredSkills: data.requiredSkills
                , resumeFile: filePath
            }
        } );
    };