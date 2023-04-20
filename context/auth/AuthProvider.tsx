import { useEffect, useReducer } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { IUser } from '@/interfaces';
import { AuthContext, authReducer } from './';
import submissionApi from '@/api/submissionApi';
import axios from 'axios';


export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;

}


const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: true,
    user: undefined,
}

interface Props{
    children: React.ReactNode
}



export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
    
    const { data, status } = useSession();
    // console.log({data})
    useEffect(() => {
        if ( status === 'authenticated' ){
        //   console.log({ user: data?.user });
          dispatch({ type: '[Auth] - Login', payload: data?.user as IUser  });
  
        }
      
      }, [ status, data ])

      const registerUser = async( name:string, email:string, password: string, role:string): Promise<{hasError: boolean; message?:string}> => {
        try {
            const { data } = await submissionApi.post('/user/register', { name, email, password, role });
            const { user } = data;
            //Opcional, token firmarlo en register API
            // const { token, user } = data;
            // Cookies.set('token', token); //guardo el token en las cookies.
            dispatch({ type: '[Auth] - Login', payload: user });
            return {
                hasError: false
            }

        } catch (error) {
            if ( axios.isAxiosError(error) ){
                return {
                    hasError: true,
                    message: error.response?.data.message,
                }
            }

            return{
                hasError: true,
                message: 'No se pudo crear el usuario - intente de nuevo'
            }
        }

    }

    const logout = () => {
        signOut();

        // router.reload(); //similar al F5
        // Cookies.remove('token');
    }

    return (
 
    <AuthContext.Provider value={{
        ...state,

       //Methods
       registerUser,
       logout,
    }}>
            { children }
    </AuthContext.Provider>
    )
}