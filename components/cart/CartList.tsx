import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { ItemCounter } from '../ui';
import { FC, useContext } from 'react';
import { CartContext } from '../../context';
import { ICartProduct } from '../../interfaces';


interface Props {
    editable?: boolean;
}

export const CartList: FC<Props> = ({editable = false}) => {

    const { cart, updateCartQuantity } = useContext(CartContext);

    const changeQuantityItems = (product: ICartProduct, newQuantityValue: number) => {
        product.quantity = newQuantityValue;
        updateCartQuantity(product);
    }

  return (
    <>
        {
        cart.map(product => (
            <Grid container key={ product.slug + product.size } spacing={2} sx={{mb: 1, mt: 1}}>

                <Grid item xs={3}>
                    <NextLink href={`/product/${ product.slug }`} passHref>
                        <Link>
                            <CardActionArea>
                                <CardMedia
                                    image={`/products/${ product.image}`}
                                    component='img'
                                    sx={{borderRadius: '5px'}}
                                />
                            </CardActionArea>
                        </Link>
                    </NextLink>
                </Grid>

                <Grid item xs={7}>
                    <Box display={'flex'} flexDirection={'column'}>
                        <Typography variant='body1'>{ product.title }</Typography>
                        <Typography variant='body1'> Size: <strong>{ product.size }</strong></Typography>
                        {
                            editable
                            ? <ItemCounter
                                    currentValue={ product.quantity }
                                    updateQuantity = { (newValue) =>  changeQuantityItems(product, newValue) }
                                    maxValue = { product.quantity + 2 }
                                />
                            : <Typography variant='h5'>{ product.quantity } { product.quantity > 1 ? 'items' : 'item' }</Typography>
                        }
                    </Box>
                </Grid>

                <Grid item xs={2} display='flex' alignItems={'center'} flexDirection="column">
                    <Typography variant='subtitle1'>$ { product.price }</Typography>
                    {
                        editable && (
                            <Button variant='text' color='secondary'>
                                Remove
                            </Button>
                        )
                    }
                </Grid>
                
            </Grid>
        ))
    }
    </>
  )
}
