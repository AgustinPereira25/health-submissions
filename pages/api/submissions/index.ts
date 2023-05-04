import { ISubmission } from '@/interfaces';
import { executeQuery } from '@/lib';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = 
| { message: string }
| ISubmission
| number

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch(req.method){
        case 'GET':
            return getSubmissionInfo(req, res);
        
        case 'PUT':
            return updateSubmission(req, res);

        case 'POST':
            return createSubmission(req, res);


        default:
            return res.status(400).json({ message: 'Bad request.' })
    }
}

export const getSubmissionInfo = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const submissionId = req.body as number;

    const arrSqlSub = [submissionId];
    const result:any = await executeQuery({
        query: `SELECT s.*, u.name as doctorName FROM submissions s left join users u ON u.id = s.doctorId where s.submissionId = ?;`,
        values: arrSqlSub,
    });
    // console.log({ result })

    var submissions:ISubmission = result[0];

    return res.status(200).json( submissions );

}

export const updateSubmission = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id, status = '', file = '' } = req.body;
    
    const submissionIdQry:number = Number(id);
    
    var dbStatus = ''
    if (status !== ''){
        dbStatus = status;
        switch(status){
            case 'Pending':
                dbStatus = 'In progress';
    
            case 'In progress':
                dbStatus = 'Done';
    
            case 'Done':
                dbStatus = 'Done'; //Doesn't change.
        }
    }

    if (file !== ''){
        var dbFile = file;
    }

    let arrSqlSub = dbStatus ? dbFile ? [dbStatus,dbFile,submissionIdQry] : [dbStatus,submissionIdQry] : [dbFile,submissionIdQry];
    const result:any = await executeQuery({
        query: `UPDATE submissions set ${ dbStatus ? dbFile ? `status = ?, prescriptions = ?` : `status = ?`  : `prescriptions = ?` } WHERE submissionId = ?; `,
        values: arrSqlSub,
    });

    // var submissions:ISubmission = result[0];
    // console.log({result});
    return res.status(200).json( { message: 'Ok' } );
}


export const createSubmission = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { title = '', patientId, doctorId, status = 'Pending', createdAt, symptoms = '', prescriptions = '' } = req.body;

    const patientIdNumber:number = Number(patientId);
    const doctorIdNumber:number = Number(doctorId);
    // console.log({patientIdNumber});
    // console.log({doctorIdNumber});

    let arrSqlSub = [title, symptoms, doctorIdNumber, patientIdNumber, createdAt, status, prescriptions];
    const result:any = await executeQuery({
        query: `INSERT INTO submissions (title,symptoms,doctorId,patientId,created_at,status,prescriptions) VALUES(?,?,?,?,?,?,?);`,
        values: arrSqlSub,
    });
    // console.log({result});
    const submissionId:number = result.insertId;
    // console.log({submissionId});
    return res.status(200).json( submissionId );
}