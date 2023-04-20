import { useContext, useState } from 'react';
import { NextPage } from 'next';
import { Layout } from '@/components/Layouts';
import { useForm } from 'react-hook-form';
import { AuthContext } from '@/context/auth';
import submissionApi from '@/api/submissionApi';
import { TextField } from '@mui/material';


type FormData = {
  id: number,
  title: string,
  patientId:number, //para la grid de los doctores
  doctorId?:number, //para la grid de los pacientes
  status: string,
  createdAt: string,
  symptoms:string,
  prescriptions?:string,  
};


export const PatientNewSubmissionPage:NextPage = () => {
  const { user } = useContext(AuthContext);
  
  var date = new Date(); //Get current date

  // Get year, month, and day part from the date
  var year:string = date.toLocaleString("default", { year: "numeric" });
  var month:string = date.toLocaleString("default", { month: "2-digit" });
  var day:string = date.toLocaleString("default", { day: "2-digit" });

  // Generate yyyy-mm-dd date string
  var currentDate:string = year + "-" + month + "-" + day;
  // console.log(currentDate)

  const [isSaving, setIsSaving] = useState(false);
  
  const { register, handleSubmit, formState:{ errors }, getValues, setValue, watch } = useForm<FormData>({
    defaultValues: {
      id: 0,
      title: '',
      patientId:user?.id,
      doctorId:0,
      status: 'Pending',
      createdAt: currentDate,
      symptoms:'',
      prescriptions:'',      
    }
  });


  const onSubmit = async( form:FormData ) => {
    // console.log({ form })

    setIsSaving(true); //Evitar el doble posteo

    try {
        // const { data } = await submissionApi({
        //     url: '/patient/submissions',
        //     method: 'POST',
        //     data: form
        // });

        // console.log({ data });

        // if ( !form._id ) {
        //     router.replace(`/admin/products/${ form.slug }`);
        // } else {
            setIsSaving(false);
        // }


    } catch (error) {
        console.log(error);
        // setIsSaving(false);
    }
  }


  return (
    <Layout title="Submission details">
      <div className="py-5 w-full h-screen">
        <svg onClick={ () => history.back() } xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="cursor-pointer bi bi-arrow-left" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
        </svg>
        <div className="flex px-3 pt-3 pb-5 w-full border-b-2 border-zinc-100">
          <div className="flex flex-col">
            <p className='text-lg font-medium pr-3 capitalize'>New Submission</p>
          </div>
        </div>
        <form onSubmit={ handleSubmit( onSubmit ) }>
          <div className='flex flex-col px-3 pt-3'>
              <div className='flex flex-col'>
                  <p className="text-zinc-700 text-sm font-medium pb-2">Title</p>
                  <div className="w-3/6">
                    <TextField
                          fullWidth 
                          size='small'
                          { ...register('title', {
                              required: 'This field is required',
                              minLength: { value: 2, message: 'At least 2 characters' }
                          })}
                          error={ !!errors.title }
                          helperText={ errors.title?.message }
                    />
                  </div>
              </div>
              <div className='flex flex-col justify-center pt-5'>
                  <p className="text-zinc-700 text-sm font-medium pb-2">Symptoms</p>
                  <div className="w-3/6">
                    <TextField
                          inputProps={{
                            style:{
                              height:"150px"
                            }
                          }}
                          fullWidth 
                          multiline
                          { ...register('symptoms', {
                              required: 'This field is required',
                              minLength: { value: 2, message: 'At least 2 characters' }
                          })}
                          error={ !!errors.title }
                          helperText={ errors.title?.message }
                    />
                  </div>
              </div>
              <div className='pt-5'>
                  <button 
                      className="text-sm font-medium text-white rounded-lg px-3 py-2 bg-blue-600 tracking-wide"
                      
                      // onClick={ () =>  }
                  >
                      Send submission
                  </button>

              </div>
          </div>
        </form>
      </div>
    </Layout>
  )
}


// Para hacer en un futuro si hay una BD
// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const { id } = ctx.params as {id: string};
//   // console.log(id)

//   // console.log(submissions[1])


//   var submissionInfoArray:ISubmission[] = submissions.filter((s) => s.id === parseInt(id));

//   // console.log(submissionInfoArray)
//   const submissionInfo:ISubmission = submissionInfoArray[0];

//   return {
//     props: {
//       submission: submissionInfo
//     }
//   }
// }

export default PatientNewSubmissionPage;