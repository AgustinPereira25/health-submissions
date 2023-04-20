import { IUser } from '@/interfaces';
import { createContext } from 'react';


interface contextProps{
     isLoggedIn: boolean;
     user?: IUser;

     //Methods
     registerUser: (name: string, email: string, password: string, role:string) => Promise<{ hasError: boolean;message?: string; }>;
     logout: () => void;
}

export const AuthContext = createContext({} as contextProps)