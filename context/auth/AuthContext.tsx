import { createContext } from 'react';
import { IUser } from '../../interfaces';


interface ContextProps {
     isLoggedIn: boolean;
     user?: IUser;
     // Methods
     logginUser: (email: string, password: string) => Promise<boolean>;
     registerUser: (name: string, email: string, password: string) => Promise<{hasError: boolean;message?: string;}>;
     logOutUser: () => void;
}


export const AuthContext = createContext({} as ContextProps);