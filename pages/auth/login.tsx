import { Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useState } from 'react'
import { AuthLayout } from '../../components/layouts'
import NextLink from 'next/link';
import { useForm, SubmitHandler } from "react-hook-form";
import { validations } from '../../utils';
import testloApi from '../../api/tesloApi';
import { ErrorOutline } from '@mui/icons-material';
import { AuthContext } from '../../context';
import { useRouter } from 'next/router';


type FormData = {
  email: string,
  password: string
};

const LoginPage = () => {

  const { logginUser } = useContext(AuthContext);
  const router = useRouter()

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
  const [showError, setShowError] = useState(false);

  const onLoginUser = async ({email, password}: FormData) => {
    setShowError(false)
    const isValidLogin = await logginUser(email, password);

    if (!isValidLogin) {
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
      }, 4000);
      return;
    }

    router.replace('/');
  };

  return (
    <AuthLayout title={'Login'} pageDescription={'Please Sign In'} >
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{width: 350, padding:'10px 20px'}}>
            <Grid container spacing={2}>
                {/* Title */}
                <Grid item xs={12}>
                  <Typography variant='h1' component={'h1'}>Sign In</Typography>
                  { showError && (
                    <Chip 
                      label="Please check your email and password"
                      color='error'
                      icon={<ErrorOutline/>}
                      className="fadeIn"
                      sx={{mt: 1, mb: 1}}
                    />
                    )
                  }
                </Grid>
                {/* Email */}
                <Grid item xs={12}>
                  <TextField 
                    label="Email" 
                    type='email' 
                    variant='filled' 
                    fullWidth
                    {
                      ...register('email', {
                        required: 'Email is required',
                        validate: validations.isEmail
                      })
                    }
                    error = { !!errors.email }
                    helperText={ errors.email?.message}

                  />
                </Grid>
                {/* Password */}
                <Grid item xs={12}>
                  <TextField 
                    label="Password" 
                    type='password' 
                    variant='filled' 
                    fullWidth
                    {
                      ...register('password', {
                        required: 'Password is required',
                        minLength: { value: 6, message: '6 characters min.'}
                      })
                    }
                    error = { !!errors.password }
                    helperText={ errors.password?.message}
                  />
                </Grid>
                  {/* Call to Action */}
                <Grid item xs={12}>
                  <Button type='submit' color='secondary' className='circular-btn' fullWidth>
                    Login
                  </Button>
                </Grid>
                {/* Go to Register */}
                <Grid item xs={12} display='flex' justifyContent={'center'}>
                    <NextLink href={'/auth/register'} passHref>
                      <Link underline='always'>
                        Go to Sing Up
                      </Link>
                    </NextLink>
                </Grid>
            </Grid>
        </Box>

      </form>

    </AuthLayout>
  )
}

export default LoginPage
