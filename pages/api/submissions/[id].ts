import { ISubmission } from '@/interfaces';
import { executeQuery } from '@/lib';
import type { NextApiRequest, NextApiResponse } from 'next';


type Data = 
| { message: string }
| ISubmission

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch(req.method){
        case 'GET':
            return getSubmissionInfo(req, res);

        // case 'PUT':
            // return updateSubmissionInfo(req, res);

        default:
            return res.status(400).json({ message: 'Bad request.' })
    }
}

export const getSubmissionInfo = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { id } = req.query;
    
    // console.log( { doctorId } );
    const submissionIdQry:number = Number(id);
    // console.log({ submissionIdQry });
    const arrSqlSub = [submissionIdQry];
    const result:any = await executeQuery({
        query: `SELECT s.*, u.name as doctorName FROM submissions s INNER JOIN users u ON u.id = s.doctorId AND s.submissionId = ?; `,
        values: arrSqlSub,
    });
    // console.log({ result })

    var submissions:ISubmission = result[0];
    // console.log({doctorSubmissions});
    return res.status(200).json( submissions );

}