import axios from 'axios';
import Cookies from 'js-cookie';
import { FC, PropsWithChildren, useReducer } from 'react';
import { testloApi } from '../../api';
import { IUser } from '../../interfaces';
import { AuthContext, authReducer } from './';

export interface AuthState {
     isLoggedIn: boolean;
     user?: IUser
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined
}


export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {

  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)

  const logginUser = async (email: string, password: string) : Promise<boolean> => {
    try {
      const { data } = await testloApi.post('/users/login', {email, password});
      const { token, user } = data;
      Cookies.set('token', token)
      dispatch({ type: '[Auth] - Login', payload: user});
      return true;
    } catch (error) {
      return false;
    }
  }

  const registerUser = async (name: string, email: string, password: string) : Promise<{hasError: boolean; message?: string}> => {
    try {
      const { data } = await testloApi.post('/users/register', {email, password, name});
      const { token, user } = data;
      Cookies.set('token', token)
      dispatch({ type: '[Auth] - Login', payload: user});
      return {
        hasError: false,

      }
    } catch (error) {
      if (axios.isAxiosError(error)){
        const { message } = error.response?.data as {message : string}
        return {
          hasError: true,
          message
        }
      }
      return {
        hasError: true,
        message: 'We can not create the user, try again or please connect with the admin'
      }
    }
  }

  return (
   <AuthContext.Provider value={{
     ...state,
    //  Methods
      logginUser,
      registerUser
   }}>
     { children }
   </AuthContext.Provider>
  )
}   