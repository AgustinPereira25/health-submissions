import type { NextApiRequest, NextApiResponse } from 'next';
import { IPatient } from '@/interfaces';
import { executeQuery } from '@/lib';

type Data = 
| { message: string }
| IPatient

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch(req.method){
        case 'GET':
            return getPatientInfo(req, res);

        default:
            return res.status(400).json({ message: 'Bad request.' })
    }
}

export const getPatientInfo = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { id } = req.query;
    
    const patientIdQry:number = Number(id);

    const arrSqlSub = [patientIdQry];

    const result:any = await executeQuery({
        query: `SELECT u.name,u.email, p.* FROM users u INNER JOIN patients p ON u.id = p.patientId AND p.patientId = ?;`,
        values: arrSqlSub,
    });
    // console.log({ result })

    var patient = result[0];
    return res.status(200).json( patient );

}