import type { NextApiRequest, NextApiResponse } from 'next'
import { executeQuery } from '@/lib';
import { IUser } from '../../../../interfaces/user';
import bcrypt from 'bcryptjs';

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
    const { name = '' , email = '', password = '', role = '' } = req.body as IUser
    
    //Verify if email isn't empty
    if( email === ''){
        return res.status(400).json({ 
            message: 'correo vacio'
        });
    }

    //2. Verify that email doesn't exist on DB.
    const arrSqlEmail= [email];

    // console.log("req nom", req.body);
    // var arr = [1,'prueba','pepe@gmail.com',1234,'doctor','2023-01-01'];
    const result:any = await executeQuery({
        query: 'SELECT * FROM users WHERE Email = ? ;',
        values: arrSqlEmail,
    });

    // console.log(result[0]);
    
    if ( result[0] !== undefined ){
        return res.status(400).json({ message: 'Email already exists!' });
    }


    //3. Insert new user.
    const dateNow:Date = new Date(); // Gets current date.
    const created_at = (dateNow.getFullYear() + '-' + dateNow.getMonth() + '-' + dateNow.getDay()).toString();
    // console.log({created_at});

    const hashedPassword = bcrypt.hashSync(password); //Hashed password

    const arrSql= [name,email,hashedPassword,role,created_at];
    try {
        // console.log("req nom", req.body);
        // var arr = [1,'prueba','pepe@gmail.com',1234,'doctor','2023-01-01'];
        const result = await executeQuery({
            query: 'INSERT INTO users (name,email,password,role,created_at) VALUES(?,?,?,?,?)',
            values: arrSql,
        });

        if(role === 'doctor'){
            const result = await executeQuery({
                query: 'INSERT INTO doctors VALUES()',
            });
        }

        // console.log( "ttt",result );
        return res.status(200).json({ message: 'Done!' });

  } catch ( error ) {
        // console.log( error );
        return res.status(400).json({ message: 'Badrequest!' });
  }

}
