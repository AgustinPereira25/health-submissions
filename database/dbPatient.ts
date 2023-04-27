import { executeQuery } from '@/lib';

export const getPatientInfo = async(patientId: string) => {
    //SELECT in patients table
    const arrSqlUser:(string | number | undefined)[] = [patientId];
    const result:any = await executeQuery({
        query: 'SELECT * FROM patients WHERE patientid = ?;',
        values: arrSqlUser,
    });  

    // console.log({result});
    
    // console.log({user});

    return {
        // id,
        // email: email.toLowerCase(),
        // role,
        // name,
    }

}