import { IUser } from '@/interfaces';
import { faker } from '@faker-js/faker';
import type { NextApiRequest, NextApiResponse } from 'next'
import { ISubmission } from '../../interfaces/submission';
import { executeQuery } from '@/lib';
import bcrypt from 'bcryptjs';

type Data = 
| { message: string }
var  idPatients:number[] = [];
var  idDoctors:number[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch(req.method){
        case 'POST':
            createFakeUsers();
            createFakeSubmissions();

            return res.status(200).json({ message:'fake data done.'});

        default:
            return res.status(400).json({ message:'Bad request.'});

    }
}

//https://itnext.io/create-date-from-mysql-datetime-format-in-javascript-912111d57599

export const createFakeUsers = async() => {

    const result = await executeQuery({
        query: 'use submissionsdb;DELETE FROM patients;DELETE FROM doctors;DELETE FROM submissions;DELETE FROM users;ALTER TABLE submissionsdb.users AUTO_INCREMENT = 1;ALTER TABLE submissionsdb.doctors AUTO_INCREMENT = 1;ALTER TABLE submissionsdb.patients AUTO_INCREMENT = 1;',
    });
    
    for(let i:number=1; i<=14 ; i++){
        
        const fakeDate:Date = faker.date.between('2020-01-01T00:00:00.000Z','2030-01-01T00:00:00.000Z');
        let role = faker.helpers.arrayElement(['doctor','patient']);
        let createdAt:string = (fakeDate.getFullYear() + '-' + faker.helpers.arrayElement(['01', '04', '05','10', '12']) + '-' + faker.helpers.arrayElement(['12', '22', '01','11', '16'])).toString();

        //Insert in users table
        const password = bcrypt.hashSync('1234'); //Hashed password
        const fakeEmail = faker.internet.email();
        const arrSqlUser:(string | number | undefined)[] = [faker.name.fullName(),fakeEmail,password,role,createdAt];
        const result:any = await executeQuery({
            query: 'INSERT INTO users (name,email,password,role,created_at) VALUES(?,?,?,?,?)',
            values: arrSqlUser,
        });  
        // console.log({result});

        //Gets recently inserted email .
        // const arrSqlUserToInsert:(string | number | undefined)[] = [fakeEmail];
        // const resultId:any = await executeQuery({
        //     query: 'SELECT id as userId FROM users WHERE email = ?',
        //     values: arrSqlUserToInsert,
        // });  
        // console.log({resultId})
        
        // const userId = resultId[0].userId;
        const userId = result.insertId;
        // console.log({userId});
        if (role === 'patient')
        {
            //insert in patients table
            const arrSqlPatient:(string | number | undefined)[] = [userId,faker.phone.number('(40#) ###-####'),faker.random.numeric(3),faker.random.numeric(3),faker.lorem.paragraph(2)];
            const result = await executeQuery({
                query: 'INSERT INTO patients (patientId,phone,weight,height,otherInfo) VALUES(?,?,?,?,?)',
                values: arrSqlPatient,
            });
        }
        else
        {
            //insert in doctors table
            const arrSqlDoctor:(string | number | undefined)[] = [userId];
            const result = await executeQuery({
                query: 'INSERT INTO doctors(doctorId) VALUES(?)',
                values: arrSqlDoctor,
            });

        }
    }
    await createFakeSubmissions();
}


//Submissions
//random ID from a table: SELECT id FROM table ORDER BY RAND() LIMIT 1;
export const createFakeSubmissions = async() => {
    for(let i:number=0; i<=50 ; i++){

        const fakeSubmDate:Date = faker.date.between('2020-01-01T00:00:00.000Z','2030-01-01T00:00:00.000Z');
        let createdAt:string = (fakeSubmDate.getFullYear() + '-' + faker.helpers.arrayElement(['01', '04', '06','10', '11']) + '-' + faker.helpers.arrayElement(['03','04','01','09', '22', '20','18','19'])).toString();

        let doctorId:number = 0;
        if (i % 2 === 0){
            //Selects random doctorId for the submission.
            const results:any = await executeQuery({ 
                query: 'SELECT doctorId as doctor FROM doctors ORDER BY RAND() LIMIT 1;'
            });
            doctorId = results[0].doctor;
            // doctorId = results.doctor;
        }

        let patientId:number = 0;
        const resultsPatient:any = await executeQuery({ 
            query: 'SELECT patientid as patient FROM patients ORDER BY RAND() LIMIT 1;'
        });
        
        // console.log({resultsPatient});

        patientId = resultsPatient[0].patient;

        //Insert data in submissions table
        const testStatus = faker.helpers.arrayElement(['Pending', 'In progress', 'Done']);
        const testPrescription = testStatus === 'In progress' ? faker.helpers.arrayElement(['https://www.clickdimensions.com/links/TestPDFfile.pdf', '']) : testStatus === 'Done' ? 'https://www.clickdimensions.com/links/TestPDFfile.pdf' : '' ;
        const arrSqlSubmission:(string | number | undefined)[] = [faker.lorem.words(3),faker.lorem.words(12),doctorId,patientId,createdAt,testStatus,testPrescription];
        const result = await executeQuery({
            query: 'INSERT INTO submissions (title,symptoms,doctorId,patientId,created_at,status,prescriptions) VALUES(?,?,?,?,?,?,?)',
            values: arrSqlSubmission,
        });
    }
}

