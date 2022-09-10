import { Typography, Grid, Card, CardContent, Divider, Box, Button, Link, Chip } from "@mui/material"
import { CartList, OrderSummary } from "../../components/cart"
import { ShopLayout } from "../../components/layouts"
import NextLink from 'next/link';
import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material";

const OrderPage = () => {
    return (
        <ShopLayout title='Order no.: 2345678' pageDescription='Order Resume'>
            <Typography variant='h1' component={'h1'}>Order 2345678</Typography>

            {/* <Chip
                sx={{my: 2}}
                label="Payment pending"
                variant="outlined"
                color="error"
                icon={ <CreditCardOffOutlined/>}
            /> */}
            <Chip
                sx={{my: 2}}
                label="Paid out"
                variant="outlined"
                color="success"
                icon={ <CreditScoreOutlined/>}
            />
    
            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList/>
                </Grid>
    
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Resume (3 items)</Typography>
                            <Divider sx={{my: 1}}/>

                            <Box display={'flex'} justifyContent="space-between">
                                <Typography variant="subtitle1">Order Details</Typography>
                                <NextLink href={'/checkout/address'} passHref>
                                    <Link underline="always">
                                        Edit your address
                                    </Link>
                                </NextLink>
                            </Box>

                            
                            <Typography>Manuel Alvarez</Typography>
                            <Typography>Argentina</Typography>
                            <Typography>Buenos Aires</Typography>
                            <Typography>Av. Córdoba 3547</Typography>
                            <Typography>1188</Typography>
                            <Typography>+541139163068</Typography>

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
                                {/* TODO Pay */}
                                <h1>Pay</h1>

                                <Chip
                                    sx={{my: 2}}
                                    label="Paid out"
                                    variant="outlined"
                                    color="success"
                                    icon={ <CreditScoreOutlined/>}
                                />
                            </Box>
                        </CardContent>
    
                    </Card>
                </Grid>
    
            </Grid>
    
        </ShopLayout>
      )
}

export default OrderPage

