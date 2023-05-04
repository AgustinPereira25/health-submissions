import { ISubmission } from '@/interfaces';
import { executeQuery } from '@/lib';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = 
| { message: string }
| ISubmission[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch(req.method){
        case 'GET':
            return getDoctorSubmissions(req, res);

        default:
            return res.status(400).json({ message: 'Bad request.' })
    }
}

export const getDoctorSubmissions = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { doctorId, status } = req.body;
    // console.log( { doctorId } );
    const doctorIdQry:number = Number(doctorId);
    // console.log({ doctorIdQry, status });
    let arrSqlUser:(string | number | undefined)[] = [];
    if (status !== '')
    {
        arrSqlUser = [status];
        
    }
    else
    {
        arrSqlUser = [doctorIdQry];
    }
    var query:string = '';
    if( status !== '' ){
        query = `SELECT s.*, u.name as patientName FROM submissions s INNER JOIN users u ON s.patientId = u.id and s.status = ? ;`
    }
    else
    {
        query = `SELECT s.*, u.name as patientName FROM submissions s INNER JOIN users u ON s.patientId = u.id and s.doctorId = ? and s.status <> 'Pending' ;`
    }
    const result:any = await executeQuery({
        query: query,
        values: arrSqlUser,
    });
    // console.log({ result })
    // console.log(result[0].patientName);

    var doctorSubmissions:ISubmission[] = result;
    // console.log({doctorSubmissions});
    return res.status(200).json( doctorSubmissions );

}