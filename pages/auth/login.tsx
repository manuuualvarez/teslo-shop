import { Button, Chip, Divider, Grid, Link, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState, useEffect } from 'react'
import { AuthLayout } from '../../components/layouts'
import NextLink from 'next/link';
import { useForm } from "react-hook-form";
import { validations } from '../../utils';
import { ErrorOutline } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { getSession, signIn, getProviders } from 'next-auth/react';
import { GetServerSideProps } from 'next'


type FormData = {
  email: string,
  password: string
};

const LoginPage = () => {
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [showError, setShowError] = useState(false);

  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    getProviders().then(prov => {
      console.log(prov)
      setProviders(prov);
    })
  }, [])
  

  const onLoginUser = async ({email, password}: FormData) => {
    setShowError(false)
    await signIn('credentials', { email, password })
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
                    <NextLink 
                      href={ router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register'} 
                      passHref
                    >
                      <Link underline='always'>
                        Go to Sing Up
                      </Link>
                    </NextLink>
                </Grid>

                <Grid item xs={12} display='flex' flexDirection='column' justifyContent={'center'}>
                  <Divider sx={{width: '100%', mb: 2}}/>
                  {
                    Object.values(providers).map( (provider: any) => {

                      if(provider.id === 'credentials') return (<div key='credentials'></div>)
                      return (
                        <Button 
                          key={provider.name}
                          variant='outlined'
                          fullWidth
                          color='primary'
                          sx={{mb: 1}}
                          onClick={() => signIn(provider.id) }
                        >
                          { provider.name }
                        </Button>
                      )
                    })
                  }
                </Grid>


            </Grid>
        </Box>

      </form>

    </AuthLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  
  const session = await getSession({ req });
  const { p = '/' } = query;

  if (session) {
    return {
      redirect:{
        destination: p.toString(),
        permanent: false
      }
    }
  }

  return {
    props: {
      
    }
  }
}

export default LoginPage
