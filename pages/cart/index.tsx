import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import { ShopLayout } from '../../components/layouts'
import { CartList } from '../../components/cart/CartList';

const CartPage = () => {
  return (
    <ShopLayout title='Cart - 3' pageDescription='Shopping Cart'>
        <Typography variant='h1' component={'h1'}>Shopping Cart</Typography>

        <Grid container>
            <Grid item xs={12} sm={7}>
                <CartList/>
            </Grid>

            <Grid item xs={12} sm={5}>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Order</Typography>
                        <Divider sx={{my: 1}}/>

                        {/* TODO: Order summary */}
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
