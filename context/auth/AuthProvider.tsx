import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { testloApi } from '../../api';
import { IUser } from '../../interfaces';
import { AuthContext, authReducer } from './';
import { useSession, signOut } from 'next-auth/react';

export interface AuthState {
     isLoggedIn: boolean;
     user?: IUser
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined
}


export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {

  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  const router = useRouter();
  const { data, status } = useSession();

  // useEffect(() => {
  //   checkToken();
  // }, []);

  useEffect(() => {
    if(status === 'authenticated') {
      console.log({user: data?.user})
      dispatch({type: '[Auth] - Login', payload: data?.user as IUser})
    }

  }, [status, data])
  

  const checkToken = async () => {
    if(!Cookies.get('token')) {
      return;
    }
    try {
      const { data } = await testloApi.get('/users/validate-token');
      const { token, user } = data;
      Cookies.set('token', token)
      dispatch({ type: '[Auth] - Login', payload: user});
    } catch (error) {
      Cookies.remove('token');
    }
  }
  
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

  const logOutUser  = () => {
    Cookies.remove('cart');
    
    Cookies.remove('firstName');
    Cookies.remove('lastName');
    Cookies.remove('address');
    Cookies.remove('address2');
    Cookies.remove('zip');
    Cookies.remove('city');
    Cookies.remove('country');
    Cookies.remove('phone');
    signOut();


    // Cookies.remove('token');
    // router.reload();
  }

  return (
   <AuthContext.Provider value={{
     ...state,
    //  Methods
      logginUser,
      registerUser,
      logOutUser
   }}>
     { children }
   </AuthContext.Provider>
  )
}   