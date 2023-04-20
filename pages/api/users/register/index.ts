import type { NextApiRequest, NextApiResponse } from 'next'
import { executeQuery } from '@/lib';
import { IUser } from '../../../../interfaces/user';

type Data = 
{ message: string }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch(req.method){
        case 'POST':
           return createUser(req,res);

        default:
            res.status(400).json({ message: 'Bad request' })

    }
}


//Para probar con postman: enviar la req como JSON con etc.
const createUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    console.log("req nom", req.body);
    // const { id =0, name = 'prueba',email = 'pepe@gmail.com', password = '1234', role = 'doctor', created_at = '2023-01-01' } = req.body as IUser
    const { id =1, name = 'pepe',email = 'eeee', password = '', role = 'e', created_at = '' } = req.body as IUser
    
    if( email === ''){
        return res.status(400).json({ 
            message: 'correo vacio'
        });
    }
    const arrSql= [id,name,email,password,role,created_at];

    try {
        console.log("req nom", req.body);
        // var arr = [1,'prueba','pepe@gmail.com',1234,'doctor','2023-01-01'];
        const result = await executeQuery({
            query: 'INSERT INTO users (id,name,email,password,role,created_at) VALUES(?,?,?,?,?,?)',
            values: arrSql,
        });

        console.log( "ttt",result );
        return res.status(200).json({ message: 'Done!' });

  } catch ( error ) {
        console.log( error );
        return res.status(400).json({ message: 'Badrequest!' });
  }

}
