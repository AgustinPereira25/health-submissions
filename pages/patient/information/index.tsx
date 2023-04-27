import { useContext, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Layout } from '@/components/Layouts';
import { useForm } from 'react-hook-form';
import { AuthContext } from '@/context/auth';
import submissionApi from '@/api/submissionApi';
import { TextField } from '@mui/material';


type FormData = {
  id         :number,
  phoneNumber:string,
  weight     :string,
  height     :string,
  otherInfo  :string,   
};


export const PatientInformationPage:NextPage = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [isSaving, setIsSaving] = useState(false);
  
  const { register, handleSubmit, formState:{ errors }, getValues, setValue, watch } = useForm<FormData>({
    defaultValues: {
      id: user?.id,
      phoneNumber: user?.phone,
      weight: user?.weight,
      height: user?.height,
      otherInfo: user?.otherInfo,
    }
  });


  const onSubmit = async( form:FormData ) => {
    // console.log({ form })

    setIsSaving(true); //Evitar el doble posteo

    try {
        const { data } = await submissionApi({
            url: `/patients`,
            method: 'PUT',
            data: form
        });

        router.push('/patient/submissions/new');

        setIsSaving(false);
    } catch (error) {
        // console.log(error);
        // setIsSaving(false);
    }
  }

  return (
    <Layout title="Patient Information">
      <div className="py-5 w-full h-screen">
        <svg onClick={ () => history.back() } xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="cursor-pointer bi bi-arrow-left" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
        </svg>
        <div className="flex px-3 pt-3 pb-5 w-full border-b-2 border-zinc-100">
          <div className="flex flex-col">
            <p className='text-lg font-medium pr-3 capitalize'>Patient information</p>
          </div>
        </div>
        <form onSubmit={ handleSubmit( onSubmit ) }>
          <div className='flex flex-col px-3 pt-3 w-3/6'>
              <div className='flex flex-col'>
                  <p className="text-zinc-700 text-sm font-medium pb-2">Phone number</p>
                  <div className="flex">
                    <TextField
                      sx={{
                        "& .MuiInputBase-root": {
                            height: 38,
                            padding:'9px, 13px, 9px, 13px',
                        }
                      }}                               
                      fullWidth 
                      { ...register('phoneNumber', {
                          required: 'This field is required',
                          minLength: { value: 6, message: 'At least 6 characters' }
                      })}
                      error={ !!errors.phoneNumber }
                      helperText={ errors.phoneNumber?.message }
                    />
                  </div>
              </div>
              <div className='flex justify-center pt-5 gap-3'>
                  <div className="flex flex-col grow">
                    <p className="text-zinc-700 text-sm font-medium ">Weight</p>
                    <TextField
                      sx={{
                        "& .MuiInputBase-root": {
                            height: 38,
                            padding:'9px, 13px, 9px, 13px',
                        }
                      }}                  
                      fullWidth 
                      // multiline
                      { ...register('weight', {
                          required: 'This field is required',
                          minLength: { value: 2, message: 'At least 2 characters' }
                      })}
                      error={ !!errors.weight }
                      helperText={ errors.weight?.message }
                    />
                  </div>
                  <div className="flex flex-col grow ">
                    <p className="text-zinc-700 text-sm font-medium">Height</p>
                    <TextField
                      sx={{
                        "& .MuiInputBase-root": {
                            height: 38,
                            padding:'9px, 13px, 9px, 13px',
                        }
                      }}  
                      fullWidth 
                      // multiline
                      { ...register('height', {
                          required: 'This field is required',
                          minLength: { value: 2, message: 'At least 2 characters' }
                      })}
                      error={ !!errors.height }
                      helperText={ errors.height?.message }
                    />
                  </div>                  
              </div>
              <div className='flex flex-col pt-3'>
                  <p className="text-zinc-700 text-sm font-medium pb-2">Other info</p>
                  <div className="flex min-h-[150px]">
                    <TextField
                      sx={{
                        "& .MuiInputBase-root": {
                            // minHeight: 150,
                            padding:'9px, 13px, 9px, 13px',
                            height: '100%'
                        },
                        "& .MuiInputBase-inputMultiline": {
                          height:'100%!important'
                        },
                      }}   
                      multiline                            
                      fullWidth 
                      { ...register('otherInfo', {
                          required: 'This field is required',
                          minLength: { value: 5, message: 'At least 5 characters' }
                      })}
                      error={ !!errors.otherInfo }
                      helperText={ errors.otherInfo?.message }
                    />
                  </div>
              </div>              
              <div className='pt-5'>
                  <button 
                      className="text-sm font-medium text-white rounded-lg px-3 py-2 bg-blue-600 hover:bg-blue-500 tracking-wide"
                      type='submit'
                  >
                      Update profile
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

export default PatientInformationPage;