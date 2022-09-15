import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { AuthLayout } from '../../components/layouts'
import NextLink from 'next/link';
import { useForm, SubmitHandler } from "react-hook-form";


type FormData = {
  email: string,
  password: string
};

const LoginPage = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

  const onLoginUser = (data: FormData) => {
    console.log({data});
  }

  return (
    <AuthLayout title={'Login'} pageDescription={'Please Sign In'} >
      <form onSubmit={handleSubmit(onLoginUser)}>
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
                    {...register('email')}
                  />
                </Grid>
                {/* Password */}
                <Grid item xs={12}>
                  <TextField 
                    label="Password" 
                    type='password' 
                    variant='filled' 
                    fullWidth
                    {...register('password')}
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
