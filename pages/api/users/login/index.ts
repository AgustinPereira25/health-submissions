import type { NextApiRequest, NextApiResponse } from 'next'
import { IUser } from '@/interfaces'

type Data = 
| { message: string }
| IUser

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch(req.method){
        case 'GET':
            loginUser(req, res);    
        default:
            return res.status(400).json({ message: 'Bad request.' })        
    }
    
}

const loginUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { email = '', password = '' } = req.body;
    
}
