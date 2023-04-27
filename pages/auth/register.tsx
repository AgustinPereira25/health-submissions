import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { AuthLayout } from "@/components/Layouts"
import { Chip, TextField } from "@mui/material"

import { useForm } from "react-hook-form";
import { validations } from '@/utils';
import { AuthContext } from "@/context/auth";
import { signIn } from "next-auth/react";
import { ErrorOutline } from "@mui/icons-material";

type FormData = {
  name    : string;
  email   : string;
  password: string;
  role    : string;
};

export const Register = () => {
  const router = useRouter();
  
  const { registerUser } = useContext(AuthContext);
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false); // Para mostrar error de correo


  const showHideTypedPassword = () => {
    setShowPassword(!showPassword);
    var x:HTMLInputElement = (document.getElementById("PasswdFld") as HTMLInputElement);

    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
    
  }

  const onRegisterUser = async({ name, email, password, role }: FormData) => {
      setShowError(false);
      
      const resp = await registerUser(name, email, password, role);
      
      if ( resp.hasError ) {
          // console.log(resp.message!)

          setShowError(true);
          setTimeout(() => { setShowError(false) }, 3000);
          return;
      }

      //  console.log(name, email, password, role);
      const callBackURL =  role === 'doctor' ? '/doctor/submissions' : '/patient';
      await signIn('credentials', { email, password, callbackUrl: callBackURL });
    
  }
 
  return (
    <AuthLayout title="The Submission App - Register">
      <div className="flex justify-center items-center w-2/5 border-2 rounded-md shadow-2xl bg-white">
        <form onSubmit={ handleSubmit(onRegisterUser) } noValidate>
          <div className="flex flex-col justify-center items-center py-8 px-2">
            <p className="pb-2 text-3xl font-medium">Welcome to The Submissions App</p>
            <p className="text-sm font-normal pb-7">Sign up to access unique features</p>
            <div className="w-4/6">
              <p className="text-zinc-700 text-xs font-medium pb-1">Name</p>
              <TextField
                    fullWidth 
                    size='small'
                    { ...register('name', {
                        required: 'This field is required',
                    })}
                    error={ !!errors.name }
                    helperText={ errors.name?.message }
                    sx={{
                      paddingBottom: '16px',
                    }}
              />

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
              <div className="relative">
                <p className="text-zinc-700 text-xs font-medium pb-1">Create password</p>
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
                        paddingBottom: '16px'
                      }}
                      type="password"
                      id="PasswdFld"
                />
                <button type="button" onMouseUp={ () => showHideTypedPassword() } onMouseDown={ () => showHideTypedPassword() }>
                  {
                    !showPassword
                    ?
                    (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="absolute top-[30px] right-[7px] bi bi-eye-slash" viewBox="0 0 16 16">
                      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                    </svg>              
                    )
                    :
                    (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="absolute top-[30px] right-[7px] bi bi-eye" viewBox="0 0 16 16">
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                    </svg>
                    )
                  }
                </button>
              </div>
              <p className="text-zinc-700 text-xs font-medium pb-1">User type</p>
              <div className="pb-5 flex items-center">
                <div className="flex grow p-3 border-zinc-400 rounded-md border-[1px] border-r-0 rounded-r-none">
                  <input 
                    type="radio" 
                    id="doctor" 
                    value="doctor" 
                    {...register('role')}
                    defaultChecked 
                  />
                  <label className="pl-2" htmlFor="doctor">Doctor</label>
                </div>
                <div className="flex grow p-3 border-zinc-400 rounded-md border-[1px] border-l-[1px] rounded-l-none">
                  <input 
                    type="radio" 
                    id="patient" 
                    value="patient" 
                    {...register('role')} 
                  />
                  <label className="pl-2" htmlFor="patient">Patient</label>
                </div>
              </div>
              <Chip 
                  label="Email already registered!"
                  color="error"
                  icon= { <ErrorOutline /> }
                  className="fadeIn"
                  sx={{ display: showError ? 'flex' : 'none', marginBottom:2 }}
              />
              <button type="submit" className= {showError ? `mb-3 w-full text-sm font-medium text-white rounded-lg py-2 bg-blue-600 tracking-wide hover:bg-blue-500` : 'mb-10 w-full text-sm font-medium text-white rounded-lg py-2 bg-blue-600 tracking-wide hover:bg-blue-500' }>Register</button>
              <div className="flex justify-center items-center">
                  <p className="text-sm text-zinc-500">Already have an account? </p>
                  <button type='button' onClick={ () => router.push('/auth/login')} className="text-sm font-medium cursor-pointer text-blue-600 hover:text-blue-800 pl-1">Log in</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Register
