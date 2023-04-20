// import { ISubmission, IUser } from "@/interfaces";
// import { executeQuery } from "@/lib";
// // import users from '../apiFakeData/users.json'

// export const getPatient = async(patientId:number) => {

//   const arrSqlPatient:(string | number | undefined)[] = [patientId];
//   const result:any = await executeQuery({
//       query: 'SELECT * FROM patients WHERE patientId = ?;',
//       values: arrSqlPatient,
//   });

//   return result[0];

// }

// export const getPatientSubmissions = async(patientId:number) => {

//   const arrSqlUser:(string | number | undefined)[] = [patientId];
//   const result:any = await executeQuery({
//       query: 'SELECT * FROM submissions WHERE patientId = ?;',
//       values: arrSqlUser,
//   });

//   var patientSubmissions:ISubmission[] = result;
//     // console.log(patientSubmissions)
  
//     return patientSubmissions;
  
// }