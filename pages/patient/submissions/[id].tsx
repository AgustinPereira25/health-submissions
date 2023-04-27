import { useRef } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { IPatient, ISubmission, IUser } from '@/interfaces';
import { Layout } from '@/components/Layouts';
import submissionApi from '@/api/submissionApi';

interface Props{
  submission:ISubmission;
  patient: IPatient;
}


export const PatientSubmissionPage:NextPage<Props> = ({submission, patient}) => {
  
  //Para que el boton de cargar imagen, se comporte como el input que tiene debajo.
  //el UseRef no re-renderiza si hay algun cambio
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <Layout title="Submission details">
      <div className="py-5 w-full h-screen">
        <svg onClick={ () => history.back() } xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="cursor-pointer bi bi-arrow-left" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
        </svg>
        <div className="flex px-3 pt-3 pb-5 w-full border-b-2 border-zinc-100">
          <div className="flex flex-col">
            <p className='text-lg font-medium pr-3 capitalize'>{ submission.title }</p>
            <p className='text-sm text-zinc-500 capitalize'>{ submission.doctorId ? (`${ submission.doctorName } • ${ submission.created_at.substring(0, submission.created_at.indexOf('T')) }`) : (`${ submission.created_at.substring(0, submission.created_at.indexOf('T')) }`)  }</p>
          </div>
          <div className='mt-0.5'>
            {
              submission.status === 'Pending' ? <p className="px-3 py-0.5 font-normal text-blue-800 rounded-full bg-blue-100">Pending</p> 
                      : submission.status === 'In progress' ? <p className="px-3 py-0.5 font-normal text-green-800 rounded-full bg-green-200">In progress</p>
                      : <p className="px-3 py-0.5 font-normal rounded-full bg-zinc-200">Done</p>
            }
          </div>
        </div>

        <div className='flex px-3 pt-3 gap-80'>
          <div className='flex flex-col'>
            <p className="text-zinc-500 text-sm font-medium">Email Address</p>
            <p className='text-sm'>{patient.email}</p>
          </div>
          <div className='flex flex-col justify-center'>
              <p className="text-zinc-500 text-sm font-medium">Phone</p>
              <p className='text-sm'>{patient.phone}</p>
          </div>
        </div>

        <div className='flex px-3 pt-3 flex-1'>
          <div className='flex flex-col'>
            <p className="text-zinc-500 text-sm font-medium">Other info</p>
            <p className='text-sm'>{patient.otherInfo}</p>
          </div>
        </div>

        <div className='flex px-3 pt-3 flex-1'>
          <div className='flex flex-col'>
            <p className="text-zinc-500 text-sm font-medium">Symptoms</p>
            <p className='text-sm'>{submission.symptoms}</p>
          </div>
        </div>

        <div className='flex px-3 pt-3 flex-1'>
          <div className='flex flex-col grow'>
            <p className="text-zinc-500 text-sm font-medium">Prescriptions</p>
            <div className='flex items-center flex-1'>
              {
                submission.status === 'Done'
                ? 
                (
                  <div className='flex flex-1 mt-2 px-3 py-3 rounded-md border-x-2 border-y-2 border-zinc-200'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="gray" className="bi bi-paperclip" viewBox="0 0 16 16">
                      <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"/>
                    </svg>
                    <p className='px-1 text-black text-sm'>{ submission.prescriptions?.substring(submission.prescriptions!.lastIndexOf('/')+1) }</p>
                    <div className="flex flex-1 justify-end">
                      <button className="text-blue-600 text-sm font-medium cursor-pointer">Download</button>
                    </div>
                  </div>
                )
                :
                (
                  <div className='flex grow shrink-0 bg-zinc-100 rounded-lg px-3 py-3 mt-2 items-center'>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.364 16.364C19.8787 12.8492 19.8787 7.15076 16.364 3.63604C12.8492 0.12132 7.15076 0.12132 3.63604 3.63604M16.364 16.364C12.8492 19.8787 7.15076 19.8787 3.63604 16.364C0.12132 12.8492 0.12132 7.15076 3.63604 3.63604M16.364 16.364L3.63604 3.63604" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                    <p className='px-2 text-black'>No prescriptions have been added yet.</p>
                  </div>
                )
              }
            </div>
          </div>
        </div>

      </div>
    </Layout>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params as {id: string};

  // console.log('*Id: ' + id);
  const submissionId:number = Number(id);
  //1. get submission info
  const response = await submissionApi.get<ISubmission>(`/submissions`, {data: submissionId , headers: { 'Content-Type': 'application/json' } });
  const submissionInfo:ISubmission = response.data;
  // console.log({ submissionInfo })
  
  //2. get patient info (we only need name, email, address, phone.. for now).
  const response2 = await submissionApi.get<IPatient>(`/patients/${submissionInfo.patientId}`, { headers: { 'Content-Type': 'application/json' } });
  const patient:IPatient = response2.data;
// console.log({patient})
  return {
    props: {
      submission: JSON.parse(JSON.stringify(submissionInfo)),
      patient: JSON.parse(JSON.stringify(patient)),
    }
  }
}

export default PatientSubmissionPage;