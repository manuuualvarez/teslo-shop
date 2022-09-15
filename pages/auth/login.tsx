import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { AuthLayout } from '../../components/layouts'
import NextLink from 'next/link';
import { useForm, SubmitHandler } from "react-hook-form";
import { validations } from '../../utils';
import testloApi from '../../api/tesloApi';


type FormData = {
  email: string,
  password: string
};

const LoginPage = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

  const onLoginUser = async ({email, password}: FormData) => {
    try {
      const { data } = await testloApi.post('/users/login', { email, password });
      const { token, user } = data;
      console.log({token, user})
    } catch (error) {
      console.log("error in credentials")
    }
  }

  return (
    <AuthLayout title={'Login'} pageDescription={'Please Sign In'} >
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{width: 350, padding:'10px 20px'}}>
            <Grid container spacing={2}>
                {/* Title */}
                <Grid item xs={12}>
                  <Typography variant='h1' component={'h1'}>Sign In</Typography>
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
