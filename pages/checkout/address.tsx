import { FormControl, Grid, MenuItem, TextField, Typography, Box, Button } from '@mui/material';
import { ShopLayout } from "../../components/layouts"
import { GetServerSideProps } from 'next'
import { jwt } from '../../utils';
import { countries } from '../../utils/countries';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { CartContext } from '../../context/cart/CartContext';

type FormData = {
    firstName: string;
    lastName: string;
    address: string;
    address2: string;
    zip: string;
    city: string;
    country: string;
    phone: string;
}


const AddressPage = () => { 
    const router = useRouter();
    const { updateAddress } = useContext(CartContext);

    const getDataFromCookies = (): FormData => {
        return {
            firstName: Cookies.get('firstName') || '',
            lastName: Cookies.get('lastName') || '',
            address: Cookies.get('address') || '',
            address2: Cookies.get('address2') || '',
            zip: Cookies.get('zip') || '',
            city: Cookies.get('city') || '',
            country: Cookies.get('country') || '',
            phone: Cookies.get('phone') || '',
        }
    }

    const { register, handleSubmit, formState: {errors}, reset } = useForm<FormData>({
        defaultValues: {
            firstName: '',
            lastName: '',
            address: '',
            address2: '',
            zip: '',
            city: '',
            country: countries[1].code,
            phone: '',
        }
    });

    useEffect(() => {
        reset(getDataFromCookies());
    }, [reset])
    

    const onSubmitAddress = (data: FormData) => {
        updateAddress(data);
        router.push('/checkout/summary');
    }

  return (
    <ShopLayout title={"Address"} pageDescription={"Confirm your address to destination"}>
        <Typography variant="h1" component={'h1'}>Address</Typography>

        <form onSubmit={handleSubmit(onSubmitAddress)}>
            <Grid container spacing={2} sx={{mt: 2}}>
                {/* Name */}
                <Grid item xs={12} sm={6}>
                    <TextField 
                        label='Name' 
                        fullWidth
                        {
                            ...register('firstName', {
                                required: 'This field is mandatory',
                                minLength: { value: 2, message: '2 Characters is the minimum' }
                            })
                        }
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                    />
                </Grid>
                {/* Surname */}
                <Grid item xs={12} sm={6}>
                    <TextField 
                        label='Surname' 
                        fullWidth
                        {
                            ...register('lastName', {
                                required: 'This field is mandatory',
                                minLength: { value: 2, message: '2 Characters is the minimum' }
                            })
                        }
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                    />
                </Grid>
                {/* Address */}
                <Grid item xs={12} sm={6}>
                    <TextField 
                        label='Address' 
                        fullWidth
                        {
                            ...register('address', {
                                required: 'This field is mandatory',
                                minLength: { value: 2, message: '2 Characters is the minimum' }
                            })
                        }
                        error={!!errors.address2}
                        helperText={errors.address?.message}
                    />
                </Grid>
                {/* Address 2 */}
                <Grid item xs={12} sm={6}>
                    <TextField 
                        label='Floor - Apartment (optional)' 
                        fullWidth
                        {
                            ...register('address2')
                        }
                    />
                </Grid>
                {/* Zip Code */}
                <Grid item xs={12} sm={6}>
                    <TextField 
                        label='Postal Code' 
                        fullWidth
                        {
                            ...register('zip', {
                                required: 'This field is mandatory',
                                minLength: { value: 2, message: '2 Characters is the minimum' }
                            })
                        }
                        error={!!errors.zip}
                        helperText={errors.zip?.message}
                    />
                </Grid>
                {/* City */}
                <Grid item xs={12} sm={6}>
                    <TextField 
                        label='City' 
                        fullWidth
                        {
                            ...register('city', {
                                required: 'This field is mandatory',
                                minLength: { value: 2, message: '2 Characters is the minimum' }
                            })
                        }
                        error={!!errors.city}
                        helperText={errors.city?.message}
                    />
                </Grid>
                {/* Country */}
                <Grid item xs={12} sm={6}>
                    {/* <FormControl fullWidth> */}
                        <TextField
                            // select
                            variant="filled"
                            label="Country"
                            fullWidth
                            // defaultValue={ Cookies.get('country') || countries[1].code}
                            {
                                ...register('country', {
                                    required: 'This field is mandatory',
                                })
                            }
                            error={!!errors.country}
                            helperText={ errors.country?.message}
                        >
                            {/* {
                                countries.map( country => (
                                    <MenuItem value={country.code} key={country.code}>{ country.name}</MenuItem>
                                ))
                            } */}

                        </TextField>
                    {/* </FormControl> */}
                </Grid>
                {/* Phone */}
                <Grid item xs={12} sm={6}>
                    <TextField 
                        label='Phone' 
                        fullWidth
                        {
                            ...register('phone', {
                                required: 'This field is mandatory',
                                minLength: { value: 5, message: '5 Characters is the minimum' }
                            })
                        }
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                    />
                </Grid>

            </Grid>

            <Box sx={{mt: 5}} display="flex" justifyContent={'center'}>
                <Button type='submit' color='secondary' className='circular-btn' size='large'>
                    Review Order
                </Button>
            </Box>
        </form>


    </ShopLayout>
  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({req}) => {
     
    const { token = '' } = req.cookies;
    let isValidToken = false;

    try {
        await jwt.isValidToken(token);
        isValidToken = true;
    } catch (error) {
        isValidToken = false;        
    }

    if(!isValidToken) {
        return {
            redirect: {
                destination: '/auth/login?p=/checkout/address',
                permanent: false
            }
        }
    }

    return {
        props: {
            
        }
    }
}

export default AddressPage
