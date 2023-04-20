import { IUser } from '@/interfaces';
import { faker } from '@faker-js/faker';
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';
import { ISubmission } from '../../interfaces/submission';
// import { Blob } from 'buffer';

/**
var patientWithSubmissions= submissions.filter((s) => {
return patients.find((p) => p.id === s.patientId);
});


mysql node cli
 */


var  idPatients:number[] = [];
var  idDoctors:number[] = [];

export const createFakeUsers = ():number => {
    var fakeUsers:IUser[] = [];


    for(let i:number=1; i<=10 ; i++){

        const fakeUser: IUser = {
            id: faker.helpers.unique(faker.datatype.number, [{ min: 1, max: 100 }], { maxRetries: 1000, maxTime: 1000 }),
            name: faker.name.fullName(),
            email: faker.internet.email(),
            password: '1234',
            role: 'doctor',
        }

        
        if (i % 2 !== 0) //Patient
        { 
            fakeUser.id       =faker.helpers.unique(faker.datatype.number,[{ min: 200, max: 300 }], { maxRetries: 1000, maxTime:1000 })
            fakeUser.name     =faker.name.fullName()
            fakeUser.phone    =faker.phone.number('(40#) ###-####')
            fakeUser.email    =faker.internet.email()
            fakeUser.otherInfo=faker.lorem.paragraph(2)
            fakeUser.weight   =faker.random.numeric(3)
            fakeUser.height   =faker.random.numeric(3)
            fakeUser.password ='1234'
            fakeUser.role     ='patient'
            //Pushes the id of the new patient in order to have a "memory" of given ids for patients.
            idPatients.push(fakeUser.id);
        } else{
            //Pushes the id of the new doctor in order to have a "memory" of given ids for doctors.
            idDoctors.push(fakeUser.id);
        }
        
        
        // console.log(fakeUser);
        fakeUsers.push(fakeUser);
    }
    // var ret = 1
    var ret = saveUsersData(fakeUsers);

    return ret;
}

export function saveUsersData(data:IUser[]):number {

    //deletes file users.json if exists
    if (fs.existsSync('apiFakeData/users.json')){

        fs.unlink('apiFakeData/users.json',(err) => {
            if (err) return 0
            // console.log('apiFakeData/users.json was deleted');
          });
    }


    fs.appendFile('apiFakeData/users.json',JSON.stringify(data), () => {})

    return 1;
}

//Submissions
// Deprecated:
    // patientId     :faker.helpers.unique(faker.datatype.number,[{ min: 200, max: 250 }], { maxRetries: 1000, maxTime:1000 }), //para la grid de los doctores
    //doctorId      :(i % 2 === 0 ? faker.helpers.unique(faker.datatype.number,[{ min: 1, max: 50}], { maxRetries: 1000, maxTime:1000}) : 0), //para la grid de los pacientes
export const createFakeSubmissions = ():number => {
    var fakeSubmissions:ISubmission[] = [];

    for(let i:number=0; i<=12 ; i++){
        const fakeSubmission: ISubmission = {
            id            :faker.helpers.unique(faker.datatype.number,[{ min: 1, max: 100 }]),
            title         :faker.lorem.words(2),
            patientId     :idPatients[Math.floor(Math.random()* idPatients.length)],
            doctorId      :(i % 2 === 0 ? idDoctors[Math.floor(Math.random()* idDoctors.length)] : 0),
            status        :faker.helpers.arrayElement(['Pending', 'In progress', 'Done']),
            createdAt     :faker.date.between('2020-01-01T00:00:00.000Z', '2030-01-01T00:00:00.000Z').toLocaleDateString('en-US', {year:'2-digit', month:'2-digit', day:'2-digit'}),
            symptoms      :faker.lorem.words(12), 
            prescriptions :faker.helpers.arrayElement(['https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png', undefined]),
        };

        // console.log(fakeSubmission);
        fakeSubmissions.push(fakeSubmission);
    }

    var ret = 1
    var ret = saveSubmissionsData(fakeSubmissions);

    return ret;
}

export function saveSubmissionsData(data:ISubmission[]):number {

    //deletes file submissions.json if exists
    if (fs.existsSync('apiFakeData/submissions.json')){

        fs.unlink('apiFakeData/submissions.json',(err) => {
            if (err) return 0
            // console.log('apiFakeData/submissions.json was deleted');
          });
    }


    fs.appendFile('apiFakeData/submissions.json',JSON.stringify(data), () => {console.log('apiFakeData/submissions.json was deleted')})

    return 1;
}


type Data = 
| { message: string }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    var ret1 = createFakeUsers();
    var ret2 = createFakeSubmissions();

    var ret = 0
    if (ret1 === 1 && ret2 === 1)
        ret = 1; //both process finished OK.

    res.status(200).json({ message: ret.toString() });
}

