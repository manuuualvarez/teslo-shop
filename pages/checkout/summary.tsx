import { Typography, Grid, Card, CardContent, Divider, Box, Button, Link } from "@mui/material"
import { CartList, OrderSummary } from "../../components/cart"
import { ShopLayout } from "../../components/layouts"
import NextLink from 'next/link';

const SummaryPage = () => {
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
