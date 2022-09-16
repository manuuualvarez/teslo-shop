import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography, Box, Button } from '@mui/material';
import { ShopLayout } from "../../components/layouts"
import { GetServerSideProps } from 'next'
import { jwt } from '../../utils';
import { redirect } from 'next/dist/server/api-utils';


const AddressPage = () => {
  return (
    <ShopLayout title={"Address"} pageDescription={"Confirm your address to destination"}>
        <Typography variant="h1" component={'h1'}>Address</Typography>

        <Grid container spacing={2} sx={{mt: 2}}>
            {/* Name */}
            <Grid item xs={12} sm={6}>
                <TextField label='Name' fullWidth/>
            </Grid>
            {/* Name */}
            <Grid item xs={12} sm={6}>
                <TextField label='Surname' fullWidth/>
            </Grid>
            {/* Name */}
            <Grid item xs={12} sm={6}>
                <TextField label='Address' fullWidth/>
            </Grid>
            {/* Name */}
            <Grid item xs={12} sm={6}>
                <TextField label='Address 2 (optional)' fullWidth/>
            </Grid>
            {/* Name */}
            <Grid item xs={12} sm={6}>
                <TextField label='Postal Code' fullWidth/>
            </Grid>
            {/* Name */}
            <Grid item xs={12} sm={6}>
                <TextField label='City' fullWidth/>
            </Grid>
            {/* Name */}
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <Select
                        variant="filled"
                        label="country"
                        value= {1}
                    >
                        <MenuItem value={1}>Argentina</MenuItem>
                        <MenuItem value={2}>EE.UU.</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            {/* Name */}
            <Grid item xs={12} sm={6}>
                <TextField label='Phone' fullWidth/>
            </Grid>

        </Grid>

        <Box sx={{mt: 5}} display="flex" justifyContent={'center'}>
            <Button color='secondary' className='circular-btn' size='large'>
                Review Order
            </Button>
        </Box>

    </ShopLayout>
  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// export const getServerSideProps: GetServerSideProps = async ({req}) => {
     
//     const { token = '' } = req.cookies;
//     let isValidToken = false;

//     try {
//         await jwt.isValidToken(token);
//         isValidToken = true;
//     } catch (error) {
//         isValidToken = false;        
//     }

//     if(!isValidToken) {
//         return {
//             redirect: {
//                 destination: '/auth/login?p=/checkout/address',
//                 permanent: false
//             }
//         }
//     }

//     return {
//         props: {
            
//         }
//     }
// }

export default AddressPage
