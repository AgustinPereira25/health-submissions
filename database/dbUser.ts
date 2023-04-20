import bcrypt from 'bcryptjs';
import { executeQuery } from '@/lib';

export const checkUserEmailPassword = async( email: string, password: string) => {
    //SELECT in users table
    const arrSqlUser:(string | number | undefined)[] = [email];
    const result:any = await executeQuery({
        query: 'SELECT * FROM users WHERE email = ?;',
        values: arrSqlUser,
    });  

    // console.log({result});
    const user = result[0];
    // console.log({user});

    if( !user ){
        return null; 
    }

    if ( !bcrypt.compareSync( password, user.password!) ){
        return null;
    }

    const { role, name, id } = user;


    return {
        id,
        email: email.toLowerCase(),
        role,
        name,
    }

}