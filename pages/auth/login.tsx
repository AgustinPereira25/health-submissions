import { AuthLayout } from "@/components/Layouts"
import { TextField } from "@mui/material"
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { validations } from '@/utils';

type FormData = {
  email   : string;
  password: string;
};

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
 

  const onLoginUser = async({ email, password }: FormData) => {

    await signIn('credentials', { email, password, callbackUrl: '/patient' });
     
  }
 
  return (
    <AuthLayout title="The Submission App - Login">
      <div className="flex justify-center items-center w-2/5 border-2 rounded-md shadow-2xl bg-white">
        <form onSubmit={ handleSubmit(onLoginUser) } noValidate>
          <div className="flex flex-col justify-center items-center py-9 px-2">
            <p className="pb-2 text-3xl font-medium">Welcome to The Submissions App</p>
            <p className="text-sm font-normal pb-7">Log in to access to unique features</p>
            <div className="w-4/6">

              <p className="text-zinc-700 text-xs font-medium pb-1">Email</p>
              <TextField
                    // label = 'Email' 
                    fullWidth 
                    size='small'
                    { ...register('email', {
                        required: 'This field is required',
                        validate: (val) => validations.isEmail(val)
                    })}
                    error={ !!errors.email }
                    helperText={ errors.email?.message }
                    sx={{
                      paddingBottom: '16px',
                    }}
              />

              <p className="text-zinc-700 text-xs font-medium pb-1">Password</p>
              <TextField
                    // label = "Password"
                    fullWidth 
                    size='small'
                    { ...register('password', {
                        required: 'This field is required',
                        // minLength: { value: 4, message: 'At least 4 characters' }
                    })}
                    error={ !!errors.password }
                    helperText={ errors.password?.message }
                    sx={{
                      paddingBottom: '30px'
                    }}
              />
              <button type="submit" className='mb-10 w-full text-sm font-medium text-white rounded-lg py-2 bg-blue-600 tracking-wide hover:bg-blue-500'>Log in</button>
              <div className="flex justify-center items-center pb-7">
                  <p className="text-sm text-zinc-500">Don´t have an account yet?</p>
                  <button className="text-sm font-medium cursor-pointer text-blue-600 hover:text-blue-800 pl-1">Sign up</button>
              </div>
              <div className="flex flex-col justify-center items-center">
                <button className="text-xs font-medium cursor-pointer text-blue-600 hover:text-blue-800">Reset password</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login
