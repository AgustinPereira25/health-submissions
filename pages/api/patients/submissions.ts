import { ISubmission } from '@/interfaces';
import { executeQuery } from '@/lib';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
| { message: string }
| ISubmission[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch(req.method){
        case 'GET':
            return getPatientSubmissions(req, res);

        default:
            return res.status(400).json({ message: 'Bad request.' })
    }
}

export const getPatientSubmissions = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { patientId } = req.body;
    // console.log( { patientId } );
    const patientIdQry:number = Number(patientId);
    // console.log({ patientIdQry });
    const arrSqlUser:(string | number | undefined)[] = [patientIdQry];
    const result:any = await executeQuery({
        query: 'SELECT s.*, u.name as doctorName FROM submissions s INNER JOIN users u ON s.doctorId = u.id and s.patientId = ?;',
        values: arrSqlUser,
    });
    // console.log({ result })
    // console.log(result[0].patientName);

    var patientSubmissions:ISubmission[] = result;
    // console.log({patientSubmissions});
  
    return res.status(200).json( patientSubmissions );

}