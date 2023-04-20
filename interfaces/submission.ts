// import { Blob } from "buffer";


export interface ISubmission {
    submissionId: number,
    title: string,
    patientId:number, 
    patientName?:string,
    doctorId?:number, 
    doctorName?:string,
    status: string,
    created_at: string,
    symptoms:string,
    prescriptions?:string,
}