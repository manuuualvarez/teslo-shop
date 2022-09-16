import { Box, Button, Card, Divider, CardContent, Grid, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { ShopLayout } from '../../components/layouts'
import { CartList } from '../../components/cart/CartList';
import { OrderSummary } from '../../components/cart';
import { CartContext } from '../../context';
import { useRouter } from 'next/router';

const CartPage = () => {
    const { isLoaded, cart } = useContext(CartContext);
    const router = useRouter()

    useEffect(() => {
        if(isLoaded && cart.length === 0) {
            router.replace('/cart/empty');
        }
    }, [isLoaded, cart, router ])
    
    if(!isLoaded || cart.length === 0) {
        return(<></>);
    }
    
  return (
    
    <ShopLayout title='Cart - 3' pageDescription='Shopping Cart'>
        <Typography variant='h1' component={'h1'}>Shopping Cart</Typography>

        <Grid container>
            <Grid item xs={12} sm={7}>
                <CartList editable/>
            </Grid>

            <Grid item xs={12} sm={5}>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Order</Typography>
                        <Divider sx={{my: 1}}/>

                        <OrderSummary/>
                        

                        {/* Checkout */}
                        <Box sx={{mt: 3}}>
                            <Button
                                color='secondary'
                                className='circular-btn'
                                fullWidth
                            >
                                Checkout
                            </Button>
                        </Box>
                    </CardContent>

                </Card>
            </Grid>

        </Grid>

    </ShopLayout>
  )
}

export default CartPage
