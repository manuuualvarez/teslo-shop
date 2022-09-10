import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { AuthLayout } from '../../components/layouts'
import NextLink from 'next/link';

const RegisterPage = () => {
  return (
    <AuthLayout title={'Sign Up'} pageDescription={'Please Sign Up'} >
        <Box sx={{width: 350, padding:'10px 20px'}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant='h1' component={'h1'}>Sign Up</Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <TextField label="Name" type='name' variant='filled' fullWidth/>
                </Grid>

                <Grid item xs={12}>
                  <TextField label="Surname" type='surname' variant='filled' fullWidth/>
                </Grid>

                <Grid item xs={12}>
                  <TextField label="Email" type='email' variant='filled' fullWidth/>
                </Grid>
                
                <Grid item xs={12}>
                  <TextField label="Password" type='password' variant='filled' fullWidth/>
                </Grid>
                  
                <Grid item xs={12}>
                  <Button color='secondary' className='circular-btn' fullWidth>
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

        </Box>

    </AuthLayout>
  )
}

export default RegisterPage