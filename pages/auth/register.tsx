import { Button, Grid, Link, TextField, Typography, Chip } from '@mui/material';
import { Box } from '@mui/system'
import React from 'react'
import { AuthLayout } from '../../components/layouts'
import NextLink from 'next/link';
import { useForm, SubmitHandler } from "react-hook-form";
import { validations } from '../../utils';
import testloApi from '../../api/tesloApi';
import { ErrorOutline } from '@mui/icons-material';
import {useState} from 'react';


type FormData = {
  name: string,
  email: string,
  password: string
};

const RegisterPage = () => {
  const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<FormData>();
  const [showError, setShowError] = useState(false);

  const onRegisterUser = async ({email, password, name}: FormData) => {

    try {
      const { data } = await testloApi.post('/users/register', { email, password, name });
      const { token, user } = data;
      setShowError(false)
    } catch (error) {
      console.log("error in credentials")
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
      }, 3000);
    }
  }

  return (
    <AuthLayout title={'Sign Up'} pageDescription={'Please Sign Up'} >
      <form onSubmit={handleSubmit(onRegisterUser)} noValidate>
        <Box sx={{width: 350, padding:'10px 20px'}}>
            <Grid container spacing={2}>
              {/* Title */}
                <Grid item xs={12}>
                  <Typography variant='h1' component={'h1'}>Sign Up</Typography>
                </Grid>
                {/* Name */}
                <Grid item xs={12}>
                  <TextField 
                    label="Name" 
                    type='name' 
                    variant='filled' 
                    fullWidth
                    {
                      ...register('name', {
                        required: 'Name is required',
                        minLength: { value: 2, message: '2 characters min.'}
                      })
                    }
                    error = { !!errors.name }
                    helperText={ errors.name?.message}
                  />
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
                  {/* Call to action */}
                <Grid item xs={12}>
                  <Button type='submit' color='secondary' className='circular-btn' fullWidth>
                    Sign Up
                  </Button>
                </Grid>

                <Grid item xs={12} display='flex' justifyContent={'center'}>
                    <NextLink href={'/auth/login'} passHref>
                      <Link underline='always'>
                        Allready have an account? Go to login
                      </Link>
                    </NextLink>
                </Grid>
            </Grid>
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
        </Box>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage