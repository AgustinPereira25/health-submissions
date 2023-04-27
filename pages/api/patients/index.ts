import type { NextApiRequest, NextApiResponse } from 'next';
import { IPatient } from '@/interfaces';
import { executeQuery } from '@/lib';

type Data = 
| { message: string }
| IPatient

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch(req.method){     
        case 'PUT':
            return updatePatientInfo(req,res);

        default:
            return res.status(400).json({ message: 'Bad request.' })
    }
}

const updatePatientInfo = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id, phoneNumber='', weight='', height='', otherInfo='' } = req.body;
    
    const patientIdQry:number = Number(id);

    const arrSqlSub = [phoneNumber,weight,height,otherInfo,patientIdQry];
    const result:any = await executeQuery({
        query: `UPDATE patients SET phone = ?, weight = ?, height = ?, otherInfo = ? WHERE patientId = ?;`,
        values: arrSqlSub,
    });
    
    return res.status(200).json({ message:'changed ' + result.changedRows + ' rows' })
}