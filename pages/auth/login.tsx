import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { AuthLayout } from '../../components/layouts'
import NextLink from 'next/link';

const LoginPage = () => {
  return (
    <AuthLayout title={'Login'} pageDescription={'Please Sign In'} >
        <Box sx={{width: 350, padding:'10px 20px'}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant='h1' component={'h1'}>Sign In</Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <TextField label="Email" type='email' variant='filled' fullWidth/>
                </Grid>
                
                <Grid item xs={12}>
                  <TextField label="Password" type='password' variant='filled' fullWidth/>
                </Grid>
                  
                <Grid item xs={12}>
                  <Button color='secondary' className='circular-btn' fullWidth>
                    Login
                  </Button>
                </Grid>

                <Grid item xs={12} display='flex' justifyContent={'center'}>
                    <NextLink href={'/auth/register'} passHref>
                      <Link underline='always'>
                        Go to Sing Up
                      </Link>
                    </NextLink>
                </Grid>


            </Grid>

        </Box>

    </AuthLayout>
  )
}

export default LoginPage