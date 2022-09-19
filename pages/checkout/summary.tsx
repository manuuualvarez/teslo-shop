import { Typography, Grid, Card, CardContent, Divider, Box, Button, Link } from "@mui/material"
import { CartList, OrderSummary } from "../../components/cart"
import { ShopLayout } from "../../components/layouts"
import NextLink from 'next/link';
import { useContext } from 'react';
import { CartContext } from '../../context/cart/CartContext';
import { countries } from '../../utils/countries';

const SummaryPage = () => {

    const { shippingAddress, numberOfItems } = useContext(CartContext);

    if(!shippingAddress) {
        return <></>
    }

    const { firstName, lastName, country, city, address, address2 = '', phone, zip} = shippingAddress

    return (
        <ShopLayout title='Order resume' pageDescription='Checkout your order'>
            <Typography variant='h1' component={'h1'}>Order resume</Typography>
    
            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList/>
                </Grid>
    
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Resume ({numberOfItems > 1 ? `${numberOfItems} items` : `${numberOfItems} item`})</Typography>
                            <Divider sx={{my: 1}}/>

                            <Box display={'flex'} justifyContent="space-between">
                                <Typography variant="subtitle1">Order Details</Typography>
                                <NextLink href={'/checkout/address'} passHref>
                                    <Link underline="always">
                                        Edit your address
                                    </Link>
                                </NextLink>
                            </Box>
                            
                            <Typography>{ firstName } { lastName } </Typography>
                            <Typography>{address} { address2 ? address2 : '' }</Typography>
                            <Typography>{countries.find( item => item.code === country)?.name}</Typography>
                            <Typography>{city}, { zip }</Typography>
                            <Typography>{phone}</Typography>

                            <Divider sx={{my: 1}}/>

                            <Box display={'flex'} justifyContent="end">
                                <NextLink href={'/cart'} passHref>
                                    <Link underline="always">
                                        Change your order
                                    </Link>
                                </NextLink>
                            </Box>

                            <OrderSummary/>
                            
                            {/* Checkout */}
                            <Box sx={{mt: 3}}>
                                <Button
                                    color='secondary'
                                    className='circular-btn'
                                    fullWidth
                                >
                                    Confirm
                                </Button>
                            </Box>
                        </CardContent>
    
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
      )
}

export default SummaryPage
