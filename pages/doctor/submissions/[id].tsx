import { ChangeEvent, useRef, useState } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { IPatient, ISubmission } from '@/interfaces';
import { Layout } from '@/components/Layouts';
import { SubmissionButton } from '@/components/submission';
import submissionApi from '@/api/submissionApi';
import { Chip } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

interface Props{
  submission:ISubmission,
  patient:IPatient

}


export const SubmissionInfoPage:NextPage<Props> = ({submission, patient}) => {
  
  //Para que el boton de cargar imagen, se comporte como el input que tiene debajo.
  //el UseRef no re-renderiza si hay algun cambio
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filePreview = submission.prescriptions; //toDo: show only the name of file.
  const [fileAndSubmState, setFileAndSubmState] = useState({ file: filePreview , state: submission.status });
  // const [filePreview, setFilePreview] = useState<string | undefined>(submission.prescriptions);

  const [showError, setShowError] = useState(fileAndSubmState.file ? false : true);

  const onClickChange = () => {
    switch(fileAndSubmState.state){
      case 'Pending':
        setFileAndSubmState({ file:fileAndSubmState.file, state:'In progress' });
        //update state in db field

        break;

      case 'In progress':
        if (!fileAndSubmState.file){
          return setShowError(true);
        }
        //update db field

        break;
    }
    
  }

  const onFileSelected = ({ target }: ChangeEvent<HTMLInputElement>) => {
    
    if ( !target.files || target.files.length === 0 ){
      setShowError(true);
      return;
    }

    const file = target.files[0];

    /** File validation */
    // if (!file.type.startsWith("pdf") || !file.type.startsWith("txt") || !file.type.startsWith("docx")) {
    //   alert("Please select a valid file. (.pdf, .txt, .docx).");
    //   return;
    // }

      // console.log({file})
      // const { data } = await submissionApi.post<{ message:string }>('/admin/upload', formData);

    setFileAndSubmState({ file: file.name, state: fileAndSubmState.state });
    setShowError(false);

    //TODO:
    // try {
    //   var formData = new FormData();
    //   formData.append("file", file);

    //   // const { data } = await submissionApi.post<{ message:string }>('/admin/upload', formData);
    //   const res = await fetch("/api/upload", {
    //     method: "POST",
    //     body: formData,
    //   });

    //   const {
    //     data,
    //     error,
    //   }: {
    //     data: {
    //       url: string | string[];
    //     } | null;
    //     error: string | null;
    //   } = await res.json();

    //   if (error || !data) {
    //     alert(error || "Sorry! something went wrong.");
    //     return;
    //   }

    //   console.log("File was uploaded successfylly:", data);
    // } catch (error) {
    //   console.error(error);
    //   alert("Sorry! something went wrong.");
    // }
  }

  return (
    <Layout title="Submission details">
      <div className="py-5 w-full h-screen">
        <svg onClick={ () => history.back() } xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="cursor-pointer bi bi-arrow-left" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
        </svg>
        <div className="flex px-3 pt-3 pb-5 w-full border-b-2 border-zinc-100">
          <div className="flex flex-col">
            <div className="flex items-center">
              <p className='text-lg font-medium pr-3 capitalize'>{ submission.title }</p>
              <div className='mt-0.5'>
                {
                  submission.status === 'Pending' ? <p className="px-3 py-0.5 font-normal text-blue-800 rounded-full bg-blue-100">Pending</p> 
                          : submission.status === 'In progress' ? <p className="px-3 py-0.5 font-normal text-green-800 rounded-full bg-green-200">In progress</p>
                          : <p className="px-3 py-0.5 font-normal rounded-full bg-zinc-200">Done</p>
                }
              </div>              
            </div>
            <p className='text-sm text-zinc-500 capitalize'>{ `${ patient.name } • ${ submission.created_at.substring(0, submission.created_at.indexOf('T')) }` }</p>
          </div>

          <SubmissionButton submission={submission}/>
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
          </div>
        </div>
        <div className='flex items-center flex-1'>
          {/* ToDo: Utilizar useState para sincronizar los datos entre el futuro childcomponent(FileSelection) y este (parent), crear state {state: xxx, file:xxx}, props: in:submission in: onFileChange*/}
              {
                submission.status === 'Done'
                ? 
                (
                  <div className='flex flex-1 mt-1 px-2 py-2 rounded-md border-x-2 border-y-2 border-zinc-200'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="gray" className="bi bi-paperclip" viewBox="0 0 16 16">
                      <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"/>
                    </svg>
                    <p className='px-1 text-black text-sm'>{ submission.prescriptions!.substring(submission.prescriptions!.lastIndexOf('/')+1) }</p>
                    <div className="flex flex-1 justify-end">
                      <p className="text-blue-600 text-sm font-medium">Download</p>
                    </div>
                  </div>
                )
                :
                submission.status === 'Pending'
                ?
                (
                  <div className='flex flex-col  text-md font-medium grow'>
                    <div className='flex items-center px-3 pb-4'>
                      <button 
                        className="px-3 py-1 bg-gray-100 text-md text-gray-300 font-medium rounded-sm mt-1 cursor-default"
                        // onClick={ () => fileInputRef.current?.click() }
                      >
                        Choose file
                      </button>
                      <p className='px-2 font-normal text-gray-400'>No file chosen</p>
                    </div>

                    <div className='flex flex-1 px-3 py-3 bg-blue-50 text-md font-medium rounded-md my-1 items-center'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="blue" className="bi bi-info-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                      </svg>
                      <p className='pl-3 text-md text-blue-800 font-medium rounded-md'>Accept this submission to add a diagnosis</p>
                    </div>
                  </div>
                )
                : //In progress submission
                (
                  <div className='flex flex-col'>
                    <div className='flex items-center pb-6'>
                      <button 
                        className="px-3 py-1 bg-blue-50 text-md text-blue-600 font-medium rounded-md mt-1"
                        onClick={ () => fileInputRef.current?.click() }
                      >
                        Choose file
                      </button>
                      <input 
                          ref={ fileInputRef }
                          type='file'
                          multiple
                          accept='.txt, .pdf'
                          style={{ display:'none' }}
                          onChange={ onFileSelected }
                      />
                      {/* <p className={submission.prescriptions === undefined ? 'px-2 text-gray-400 font-normal' : 'px-2 text-black' }>{ submission.prescriptions === undefined ? ('No file chosen') : (submission.prescriptions.substring(submission.prescriptions?.lastIndexOf('/')+1))}</p> */}
                      <p className={fileAndSubmState.file === undefined ? 'px-2 text-gray-400 font-normal' : 'px-2 text-black' }>{ fileAndSubmState.file === undefined ? ('No file chosen') : fileAndSubmState.file.substring(fileAndSubmState.file.lastIndexOf('/')+1) }</p>
                    </div>
                    <Chip 
                      label="Must upload a prescription in order to finish the submission"
                      color="error"
                      icon= { <ErrorOutline/> }
                      className="fadeIn"
                      sx={{ display: showError ? 'flex' : 'none' }}
                    />  
                  </div>
                )
              }
            </div>
      </div>
    </Layout>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params as {id: string};
  // console.log('*Id: ' + id);
  // const submissionId:number = Number(id);
  //1. get submission info
  const response = await submissionApi.get<ISubmission>(`/submissions/${id}`, { headers: { 'Content-Type': 'application/json' } });
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

export default SubmissionInfoPage;