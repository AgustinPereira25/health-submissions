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

    var phone:string =  '';
    var weight:string = '';
    var height:string = '';
    var otherInfo:string = '';
    if ( role === 'patient' ){
        //SELECT in patients table
        const arrSqlUser:(string | number | undefined)[] = [id];
        const result:any = await executeQuery({
            query: 'SELECT * FROM patients WHERE patientid = ?;',
            values: arrSqlUser,
        });  
        // console.log({result});
        // console.log(result[0].phone);
        phone = result[0].phone as string;
        weight = result[0].weight as string;
        height =  result[0].height as string;
        otherInfo = result[0].otherInfo as string;
        // console.log(phone);
        // console.log(weight);
    }
        // console.log(phone);
        // console.log(weight);

    return {
        id,
        email: email.toLowerCase(),
        role,
        name,
        phone,
        weight,
        height,
        otherInfo,
    }

}